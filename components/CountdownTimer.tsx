'use client';

import { useState } from 'react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import DurationInput from './DurationInput';
import type { ThemeType } from '@/types/theme';

interface CountdownTimerProps {
  onBack: () => void;
  theme: ThemeType;
}

export default function CountdownTimer({ onBack, theme }: CountdownTimerProps) {
  const [showSettings, setShowSettings] = useState(true);
  const { timeLeft, isRunning, start, pause, reset, setDuration } = useCountdownTimer();

  const handleStartTimer = (minutes: number) => {
    setDuration(minutes * 60);
    setShowSettings(false);
    start();
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <button
        onClick={onBack}
        className="text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase self-start"
      >
        ← Retour
      </button>

      {showSettings ? (
        <DurationInput onStart={handleStartTimer} />
      ) : (
        <>
          <TimerDisplay timeLeft={timeLeft} theme={theme} />
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={() => {
              reset();
              setShowSettings(true);
            }}
          />
        </>
      )}
    </div>
  );
}
