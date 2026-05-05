'use client';

import { useState } from 'react';
import Clock from './Clock';
import ModeSelector from './ModeSelector';
import PomodoroTimer from './PomodoroTimer';
import CountdownTimer from './CountdownTimer';
import type { TimerMode } from '@/types';
import type { ThemeType } from '@/types/theme';

interface FocusTimerProps {
  theme: ThemeType;
}

export default function FocusTimer({ theme }: FocusTimerProps) {
  const [mode, setMode] = useState<TimerMode>('clock');

  return (
    <div className="glass-effect rounded-3xl p-8 md:p-12 min-w-[320px] md:min-w-[500px] glow-effect">
      <div className="flex flex-col items-center space-y-8">
        {mode === 'clock' && (
          <>
            <Clock theme={theme} />
            <ModeSelector onSelectMode={setMode} />
          </>
        )}
        {mode === 'pomodoro' && (
          <PomodoroTimer onBack={() => setMode('clock')} theme={theme} />
        )}
        {mode === 'countdown' && (
          <CountdownTimer onBack={() => setMode('clock')} theme={theme} />
        )}
      </div>
    </div>
  );
}
