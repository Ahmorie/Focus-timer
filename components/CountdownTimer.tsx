'use client';

import { useState, useCallback, useEffect } from 'react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import DurationInput from './DurationInput';
import ProgressRing from './ProgressRing';
import KeyboardHint from './KeyboardHint';
import Toast from './Toast';
import type { ThemeType } from '@/types/theme';

interface CountdownTimerProps {
  onBack: () => void;
  theme: ThemeType;
  onKeyboardHintsChange?: (hints: { key: string; action: string }[]) => void;
}

export default function CountdownTimer({ onBack, theme, onKeyboardHintsChange }: CountdownTimerProps) {
  const [showSettings, setShowSettings] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAudioError = useCallback((error: Error) => {
    setToastMessage(error.message || 'Audio playback failed');
    setShowToast(true);
  }, []);

  const { timeLeft, isRunning, progress, start, pause, reset, setDuration } = useCountdownTimer(handleAudioError);

  // Update keyboard hints when state changes
  useEffect(() => {
    if (onKeyboardHintsChange) {
      if (showSettings) {
        onKeyboardHintsChange([
          { key: '1-5', action: 'Quick start' },
          { key: 'Esc', action: 'Back' }
        ]);
      } else {
        onKeyboardHintsChange([
          { key: 'Space', action: isRunning ? 'Pause' : 'Start' },
          { key: 'R', action: 'Reset' },
          { key: 'Esc', action: 'Back' }
        ]);
      }
    }
  }, [showSettings, isRunning, onKeyboardHintsChange]);

  const handleStartTimer = (minutes: number) => {
    setDuration(minutes * 60);
    setShowSettings(false);
    start();
  };

  // Keyboard shortcuts
  const presets = [15, 25, 30, 40, 50];
  useKeyboardShortcuts({
    onSpace: () => showSettings ? null : (isRunning ? pause() : start()),
    onReset: () => {
      reset();
      setShowSettings(true);
    },
    onEscape: onBack,
    onNumber: (num) => {
      if (showSettings && num >= 1 && num <= 5) {
        handleStartTimer(presets[num - 1]);
      }
    },
    enabled: true
  });

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      {/* Back button - visible on hover */}
      <button
        onClick={onBack}
        className="self-start px-3 py-1.5 text-xs text-white/40 hover:text-white transition-all duration-300 tracking-wider uppercase flex items-center gap-1 hover:gap-2 group"
        aria-label="Back to clock"
      >
        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>

      {showSettings ? (
        <DurationInput onStart={handleStartTimer} />
      ) : (
        <>
          <div className="w-full flex justify-center mb-6">
            <ProgressRing progress={progress} size={240} strokeWidth={3} timeLeft={timeLeft}>
              <TimerDisplay timeLeft={timeLeft} theme={theme} compact />
            </ProgressRing>
          </div>
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

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
