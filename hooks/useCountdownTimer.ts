'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { playSound, getSelectedSound, initAudioContext } from '@/utils/audio';

export function useCountdownTimer(
  onComplete?: (duration: number) => void,
  onAudioError?: (error: Error) => void
) {
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

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
          playSound(getSelectedSound(), onAudioError);
          setIsRunning(false);
          setTimeLeft(0);
          endTimeRef.current = null;
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          // Notify parent component
          if (onComplete) {
            onComplete(duration);
          }
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
  }, [isRunning, duration, onComplete, onAudioError]);

  // Update document title with timer
  useEffect(() => {
    if (isRunning && typeof window !== 'undefined') {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      document.title = formattedTime;
    } else if (typeof window !== 'undefined' && !isRunning) {
      document.title = 'Focus Timer';
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.title = 'Focus Timer';
      }
    };
  }, [timeLeft, isRunning]);

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
    setTimeLeft(duration);
  }, [duration]);

  const updateDuration = useCallback((newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
  }, []);

  // Calculate progress percentage
  const elapsed = duration - timeLeft;
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  return {
    timeLeft,
    isRunning,
    progress,
    start,
    pause,
    reset,
    setDuration: updateDuration,
  };
}
