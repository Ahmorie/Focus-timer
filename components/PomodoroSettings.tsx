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
    </div>
  );
}
