'use client';

import { useState } from 'react';
import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import PomodoroSettings from './PomodoroSettings';
import type { ThemeType } from '@/types/theme';

interface PomodoroTimerProps {
  onBack: () => void;
  theme: ThemeType;
}

export default function PomodoroTimer({ onBack, theme }: PomodoroTimerProps) {
  const [showSettings, setShowSettings] = useState(false);
  const {
    timeLeft,
    isRunning,
    config,
    isBreak,
    currentSession,
    start,
    pause,
    reset,
    updateConfig,
  } = usePomodoroTimer();

  return (
    <div className="flex flex-col items-center space-y-8 w-full">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase"
        >
          ← Retour
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase"
        >
          {showSettings ? 'Fermer' : 'Réglages'}
        </button>
      </div>

      {showSettings ? (
        <PomodoroSettings config={config} onUpdate={updateConfig} />
      ) : (
        <>
          <div className="text-center w-full">
            <TimerDisplay
              timeLeft={timeLeft}
              theme={theme}
              subtext={isBreak ? 'Pause' : `Session ${currentSession}`}
            />
          </div>
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </>
      )}
    </div>
  );
}
