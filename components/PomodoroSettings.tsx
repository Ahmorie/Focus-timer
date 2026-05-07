'use client';

import type { PomodoroConfig } from '@/types';
import NumberInputWithButtons from './NumberInputWithButtons';

interface PomodoroSettingsProps {
  config: PomodoroConfig;
  onUpdate: (config: Partial<PomodoroConfig>) => void;
}

export default function PomodoroSettings({ config, onUpdate }: PomodoroSettingsProps) {
  return (
    <div className="space-y-5 w-full p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02]">
      <NumberInputWithButtons
        label="Work Duration"
        value={config.workDuration / 60}
        onChange={(val) => onUpdate({ workDuration: val * 60 })}
        min={1}
        max={120}
        unit="min"
      />

      <NumberInputWithButtons
        label="Short Break"
        value={config.breakDuration / 60}
        onChange={(val) => onUpdate({ breakDuration: val * 60 })}
        min={1}
        max={30}
        unit="min"
      />

      <NumberInputWithButtons
        label="Long Break"
        value={config.longBreakDuration / 60}
        onChange={(val) => onUpdate({ longBreakDuration: val * 60 })}
        min={1}
        max={60}
        unit="min"
      />

      <NumberInputWithButtons
        label="Sessions Until Long Break"
        value={config.sessionsUntilLongBreak}
        onChange={(val) => onUpdate({ sessionsUntilLongBreak: val })}
        min={2}
        max={10}
      />

      {/* Auto-start breaks toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <div className="flex-1">
          <label htmlFor="auto-start-breaks" className="text-xs sm:text-sm text-white/80 cursor-pointer">
            Auto-start breaks
          </label>
          <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">
            Automatically start break timer after work session
          </p>
        </div>
        <button
          id="auto-start-breaks"
          role="switch"
          aria-checked={config.autoStartBreaks}
          onClick={() => onUpdate({ autoStartBreaks: !config.autoStartBreaks })}
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            config.autoStartBreaks ? 'bg-white' : 'bg-white/20'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 ${
              config.autoStartBreaks ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white/60'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
