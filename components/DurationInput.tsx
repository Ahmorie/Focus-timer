'use client';

import { useState } from 'react';

interface DurationInputProps {
  onStart: (minutes: number) => void;
}

export default function DurationInput({ onStart }: DurationInputProps) {
  const [minutes, setMinutes] = useState(25);

  const presets = [
    { value: 15, label: '15' },
    { value: 30, label: '30' },
    { value: 45, label: '45' },
    { value: 50, label: '50' },
    { value: 60, label: '60' },
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
    <div className="space-y-6 w-full">
      <div className="text-center">
        <div className="text-white/60 text-sm tracking-widest uppercase mb-4">
          Durée du timer
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDecrement}
            className="w-12 h-12 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 text-2xl"
          >
            -
          </button>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 1)}
            className="w-32 bg-transparent border-b-2 border-white/40 text-center text-5xl font-light focus:outline-none focus:border-white pb-2"
            min="1"
            max="999"
          />
          <button
            onClick={handleIncrement}
            className="w-12 h-12 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 text-2xl"
          >
            +
          </button>
        </div>
        <div className="text-white/40 text-sm mt-2">minutes</div>
      </div>

      <div className="space-y-2">
        <div className="text-white/60 text-xs tracking-widest uppercase text-center">
          Presets rapides
        </div>
        <div className="grid grid-cols-5 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setMinutes(preset.value)}
              className={`py-2 px-3 rounded-lg text-xs tracking-wider transition-all duration-300 ${
                minutes === preset.value
                  ? 'bg-white text-black'
                  : 'border border-white/20 hover:bg-white/10'
              }`}
            >
              {preset.label}m
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(minutes)}
        disabled={minutes < 1}
        className="w-full py-4 px-6 bg-white text-black rounded-xl hover:bg-white/90 transition-all duration-300 text-sm tracking-widest uppercase font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Démarrer
      </button>
    </div>
  );
}
