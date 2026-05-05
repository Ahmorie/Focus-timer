'use client';

import type { PomodoroConfig } from '@/types';

interface PomodoroSettingsProps {
  config: PomodoroConfig;
  onUpdate: (config: Partial<PomodoroConfig>) => void;
}

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

function NumberInput({ label, value, onChange, min, max }: NumberInputProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-white/60 text-xs tracking-widest uppercase">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
        >
          -
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = parseInt(e.target.value) || min;
            onChange(Math.min(Math.max(val, min), max));
          }}
          className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-center focus:outline-none focus:border-white/40 appearance-none"
        />
        <button
          onClick={handleIncrement}
          className="w-10 h-10 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function PomodoroSettings({ config, onUpdate }: PomodoroSettingsProps) {
  return (
    <div className="space-y-6 w-full">
      <NumberInput
        label="Durée de travail (min)"
        value={config.workDuration / 60}
        onChange={(val) => onUpdate({ workDuration: val * 60 })}
        min={1}
        max={120}
      />

      <NumberInput
        label="Durée pause courte (min)"
        value={config.breakDuration / 60}
        onChange={(val) => onUpdate({ breakDuration: val * 60 })}
        min={1}
        max={30}
      />

      <NumberInput
        label="Durée pause longue (min)"
        value={config.longBreakDuration / 60}
        onChange={(val) => onUpdate({ longBreakDuration: val * 60 })}
        min={1}
        max={60}
      />

      <NumberInput
        label="Sessions avant pause longue"
        value={config.sessionsUntilLongBreak}
        onChange={(val) => onUpdate({ sessionsUntilLongBreak: val })}
        min={2}
        max={10}
      />
    </div>
  );
}
