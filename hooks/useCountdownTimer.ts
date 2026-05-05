'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { playSound, getSelectedSound } from '@/utils/audio';

export function useCountdownTimer() {
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playSound(getSelectedSound());
            setIsRunning(false);
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

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(duration);
  }, [duration]);

  const updateDuration = useCallback((newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
  }, []);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setDuration: updateDuration,
  };
}
