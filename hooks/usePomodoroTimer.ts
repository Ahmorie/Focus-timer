'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { PomodoroConfig } from '@/types';
import { playSound, getSelectedSound, initAudioContext } from '@/utils/audio';

const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsUntilLongBreak: 4,
  currentSession: 1,
  isBreak: false,
};

export function usePomodoroTimer(
  onComplete?: (duration: number, isBreak: boolean) => void,
  onAudioError?: (error: Error) => void
) {
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);
  const [timeLeft, setTimeLeft] = useState(config.workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentSession, setCurrentSession] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const handleTimerComplete = useCallback(() => {
    const completedDuration = isBreak
      ? (currentSession % config.sessionsUntilLongBreak === 0 ? config.longBreakDuration : config.breakDuration)
      : config.workDuration;

    playSound(getSelectedSound(), onAudioError);
    setIsRunning(false);
    endTimeRef.current = null;

    // Notify parent component
    if (onComplete) {
      onComplete(completedDuration, isBreak);
    }

    if (isBreak) {
      setIsBreak(false);
      setTimeLeft(config.workDuration);
    } else {
      const nextSession = currentSession + 1;
      const shouldTakeLongBreak = currentSession % config.sessionsUntilLongBreak === 0;

      setIsBreak(true);
      setCurrentSession(nextSession);
      setTimeLeft(shouldTakeLongBreak ? config.longBreakDuration : config.breakDuration);
    }
  }, [isBreak, currentSession, config, onComplete, onAudioError]);

  useEffect(() => {
    if (isRunning) {
      // Set end time when starting
      if (endTimeRef.current === null) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }

      timerRef.current = setInterval(() => {
        if (endTimeRef.current === null) return;

        const remaining = Math.ceil((endTimeRef.current - Date.now()) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          handleTimerComplete();
        } else {
          setTimeLeft(remaining);
        }
      }, 100); // Check every 100ms for accuracy
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      endTimeRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, handleTimerComplete]);

  // Update document title with timer
  useEffect(() => {
    if (isRunning && typeof window !== 'undefined') {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      const mode = isBreak ? 'Pause' : 'Focus';
      document.title = `${formattedTime} - ${mode}`;
    } else if (typeof window !== 'undefined' && !isRunning) {
      document.title = 'Focus Timer';
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.title = 'Focus Timer';
      }
    };
  }, [timeLeft, isRunning, isBreak]);

  const start = useCallback(() => {
    initAudioContext();
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    endTimeRef.current = null;
    setIsBreak(false);
    setCurrentSession(1);
    setTimeLeft(config.workDuration);
  }, [config.workDuration]);

  const updateConfig = useCallback((newConfig: Partial<PomodoroConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      if (!isRunning) {
        setTimeLeft(isBreak ? updated.breakDuration : updated.workDuration);
      }
      return updated;
    });
  }, [isRunning, isBreak]);

  // Calculate progress percentage
  const totalDuration = isBreak
    ? (currentSession % config.sessionsUntilLongBreak === 0 ? config.longBreakDuration : config.breakDuration)
    : config.workDuration;
  const elapsed = totalDuration - timeLeft;
  const progress = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;

  return {
    timeLeft,
    isRunning,
    config,
    isBreak,
    currentSession,
    progress,
    start,
    pause,
    reset,
    updateConfig,
  };
}
