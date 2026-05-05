'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { PomodoroConfig } from '@/types';
import { playSound, getSelectedSound } from '@/utils/audio';

const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsUntilLongBreak: 4,
  currentSession: 1,
  isBreak: false,
};

export function usePomodoroTimer() {
  const [config, setConfig] = useState<PomodoroConfig>(DEFAULT_CONFIG);
  const [timeLeft, setTimeLeft] = useState(config.workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentSession, setCurrentSession] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = useCallback(() => {
    playSound(getSelectedSound());
    setIsRunning(false);

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
  }, [isBreak, currentSession, config]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
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

  return {
    timeLeft,
    isRunning,
    config,
    isBreak,
    currentSession,
    start,
    pause,
    reset,
    updateConfig,
  };
}
