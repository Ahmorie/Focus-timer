'use client';

import { useState } from 'react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import Clock from './Clock';
import ModeSelector from './ModeSelector';
import PomodoroTimer from './PomodoroTimer';
import CountdownTimer from './CountdownTimer';
import KeyboardHint from './KeyboardHint';
import type { TimerMode } from '@/types';
import type { ThemeType } from '@/types/theme';

interface FocusTimerProps {
  theme: ThemeType;
}

export default function FocusTimer({ theme }: FocusTimerProps) {
  const [mode, setMode] = useState<TimerMode>('clock');
  const [currentHints, setCurrentHints] = useState<{ key: string; action: string }[]>([]);

  // Keyboard shortcuts for mode selection (only on clock)
  useKeyboardShortcuts({
    onP: () => setMode('pomodoro'),
    onT: () => setMode('countdown'),
    enabled: mode === 'clock' // Only enable these shortcuts in clock mode
  });

  return (
    <>
      <div className="glass-effect rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[580px] lg:max-w-[680px] hover-lift transition-all duration-500">
        <div className="flex flex-col items-center space-y-8 md:space-y-10">
          {mode === 'clock' && (
            <>
              <Clock theme={theme} />
              <ModeSelector onSelectMode={setMode} />
            </>
          )}
          {mode === 'pomodoro' && (
            <PomodoroTimer
              onBack={() => setMode('clock')}
              theme={theme}
              onKeyboardHintsChange={setCurrentHints}
            />
          )}
          {mode === 'countdown' && (
            <CountdownTimer
              onBack={() => setMode('clock')}
              theme={theme}
              onKeyboardHintsChange={setCurrentHints}
            />
          )}
        </div>
      </div>

      {mode === 'clock' ? (
        <KeyboardHint hints={[
          { key: 'P', action: 'Pomodoro' },
          { key: 'T', action: 'Timer' }
        ]} />
      ) : (
        <KeyboardHint hints={currentHints} compact />
      )}
    </>
  );
}
