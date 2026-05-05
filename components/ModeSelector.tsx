'use client';

import type { TimerMode } from '@/types';

interface ModeSelectorProps {
  onSelectMode: (mode: TimerMode) => void;
}

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <button
        onClick={() => onSelectMode('pomodoro')}
        className="w-full py-4 px-6 border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm tracking-widest uppercase"
      >
        Pomodoro
      </button>
      <button
        onClick={() => onSelectMode('countdown')}
        className="w-full py-4 px-6 border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm tracking-widest uppercase"
      >
        Timer
      </button>
    </div>
  );
}
