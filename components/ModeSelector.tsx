'use client';

import type { TimerMode } from '@/types';
import { playClickSound } from '@/utils/audio';

interface ModeSelectorProps {
  onSelectMode: (mode: TimerMode) => void;
}

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  const handleClick = (mode: TimerMode) => {
    playClickSound();
    onSelectMode(mode);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => handleClick('pomodoro')}
        aria-label="Switch to Pomodoro mode"
        className="group relative w-full py-4 sm:py-5 px-6 sm:px-8 border border-white/15 rounded-xl sm:rounded-2xl hover:border-white/30 hover:bg-white/5 active:translate-y-[1px] transition-all duration-300 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
        style={{
          boxShadow: `
            0 1px 3px oklch(0% 0 0 / 0.3),
            inset 0 1px 0 oklch(100% 0 0 / 0.04)
          `
        }}
      >
        <span className="relative z-10">Pomodoro</span>
      </button>
      <button
        onClick={() => handleClick('countdown')}
        aria-label="Switch to Timer mode"
        className="group relative w-full py-4 sm:py-5 px-6 sm:px-8 border border-white/15 rounded-xl sm:rounded-2xl hover:border-white/30 hover:bg-white/5 active:translate-y-[1px] transition-all duration-300 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
        style={{
          boxShadow: `
            0 1px 3px oklch(0% 0 0 / 0.3),
            inset 0 1px 0 oklch(100% 0 0 / 0.04)
          `
        }}
      >
        <span className="relative z-10">Timer</span>
      </button>
    </div>
  );
}
