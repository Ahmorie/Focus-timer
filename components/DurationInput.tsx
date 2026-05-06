'use client';

import { useState } from 'react';

interface DurationInputProps {
  onStart: (minutes: number) => void;
}

export default function DurationInput({ onStart }: DurationInputProps) {
  const [minutes, setMinutes] = useState(25);
  const [showManualInput, setShowManualInput] = useState(false);

  const presets = [
    { value: 15, label: '15 min' },
    { value: 25, label: '25 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '60 min' },
    { value: 0, label: 'Custom →' },
  ];

  const handleIncrement = () => {
    if (minutes < 999) {
      setMinutes(minutes + 1);
    }
  };

  const handleDecrement = () => {
    if (minutes > 1) {
      setMinutes(minutes - 1);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Primary: Preset buttons */}
      <div className="space-y-4">
        <div className="text-white/50 text-[0.625rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-center font-medium">
          Choose Duration
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                if (preset.value === 0) {
                  setShowManualInput(true);
                } else {
                  setMinutes(preset.value);
                  setShowManualInput(false);
                }
              }}
              className={`min-h-[56px] sm:min-h-[64px] py-4 sm:py-5 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 touch-manipulation ${
                minutes === preset.value && !showManualInput
                  ? 'bg-white text-black shadow-lg shadow-white/20 scale-[1.02]'
                  : preset.value === 0 && showManualInput
                  ? 'bg-white text-black shadow-lg shadow-white/20 scale-[1.02]'
                  : 'border border-white/15 hover:bg-white/5 hover:border-white/30 active:scale-95'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary: Manual input (only shown when "Autre..." selected) */}
      {showManualInput && (
        <div className="text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleDecrement}
              aria-label="Decrease duration"
              disabled={minutes <= 1}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all duration-300 text-xl sm:text-2xl font-normal disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
            >
              −
            </button>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 1)}
              aria-label="Duration in minutes"
              className="w-24 sm:w-28 bg-transparent border-b border-white/20 text-center text-4xl sm:text-5xl font-medium tabular-nums focus:outline-none focus:border-white/60 pb-2 transition-all duration-300"
              min="1"
              max="999"
            />
            <button
              onClick={handleIncrement}
              aria-label="Increase duration"
              disabled={minutes >= 999}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all duration-300 text-xl sm:text-2xl font-normal disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
            >
              +
            </button>
          </div>
          <div className="text-white/30 text-[0.625rem] sm:text-xs mt-2 tracking-[0.15em] uppercase font-normal">minutes</div>
        </div>
      )}

      {/* Start button */}
      <button
        onClick={() => onStart(minutes)}
        disabled={minutes < 1}
        className="group w-full min-h-[56px] sm:min-h-[64px] py-4 sm:py-5 px-6 sm:px-8 bg-white text-black rounded-xl sm:rounded-2xl hover:bg-white/95 active:scale-[0.98] transition-all duration-300 text-sm sm:text-base tracking-[0.12em] uppercase font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/20 touch-manipulation"
      >
        <span className="relative z-10">Start {minutes} min</span>
      </button>
    </div>
  );
}
