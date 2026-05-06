'use client';

import { useState, useRef, useCallback } from 'react';

interface HoldToResetButtonProps {
  onReset: () => void;
  disabled?: boolean;
}

export default function HoldToResetButton({ onReset, disabled = false }: HoldToResetButtonProps) {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdStartRef = useRef<number>(0);

  const HOLD_DURATION = 2000; // 2 seconds

  const startHold = useCallback(() => {
    if (disabled) return;

    setIsHolding(true);
    holdStartRef.current = Date.now();

    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);

      setHoldProgress(progress);

      if (progress >= 100) {
        if (holdTimerRef.current) {
          clearInterval(holdTimerRef.current);
        }
        setIsHolding(false);
        setHoldProgress(0);
        onReset();
      }
    }, 16); // ~60fps
  }, [onReset, disabled]);

  const cancelHold = useCallback(() => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
    }
    setIsHolding(false);
    setHoldProgress(0);
  }, []);

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      aria-label="Hold to reset timer"
      disabled={disabled}
      className="group relative min-h-[48px] py-4 sm:py-5 px-6 sm:px-8 border border-white/15 rounded-xl sm:rounded-2xl hover:border-white/40 hover:bg-white/5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {/* Progress bar background */}
      {isHolding && (
        <div
          className="absolute inset-0 bg-white/20 transition-all duration-75 ease-linear"
          style={{
            width: `${holdProgress}%`,
            transitionDuration: '0ms'
          }}
        />
      )}

      <span className="relative z-10">
        {isHolding ? 'Resetting...' : 'Hold to Reset'}
      </span>
    </button>
  );
}
