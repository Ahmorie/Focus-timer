'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import PomodoroSettings from './PomodoroSettings';
import ProgressRing from './ProgressRing';
import KeyboardHint from './KeyboardHint';
import CompletionOverlay from './CompletionOverlay';
import Toast from './Toast';
import PomodoroTooltip from './PomodoroTooltip';
import type { ThemeType } from '@/types/theme';

interface PomodoroTimerProps {
  onBack: () => void;
  theme: ThemeType;
  onKeyboardHintsChange?: (hints: { key: string; action: string }[]) => void;
}

export default function PomodoroTimer({ onBack, theme, onKeyboardHintsChange }: PomodoroTimerProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionData, setCompletionData] = useState<{ duration: number; isBreak: boolean } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleComplete = useCallback((duration: number, isBreak: boolean) => {
    setCompletionData({ duration, isBreak });
    setShowCompletion(true);
  }, []);

  const handleAudioError = useCallback((error: Error) => {
    setToastMessage(error.message || 'Audio playback failed');
    setShowToast(true);
  }, []);

  const {
    timeLeft,
    isRunning,
    config,
    isBreak,
    currentSession,
    progress,
    start,
    pause,
    reset,
    updateConfig,
  } = usePomodoroTimer(handleComplete, handleAudioError);

  // Update keyboard hints when running state changes
  useEffect(() => {
    if (onKeyboardHintsChange) {
      onKeyboardHintsChange([
        { key: 'Space', action: isRunning ? 'Pause' : 'Start' },
        { key: 'R', action: 'Reset' },
        { key: 'Esc', action: 'Back' }
      ]);
    }
  }, [isRunning, onKeyboardHintsChange]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSpace: () => isRunning ? pause() : start(),
    onReset: () => reset(),
    onEscape: () => {
      if (showCompletion) {
        setShowCompletion(false);
      } else {
        onBack();
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

      <div className="w-full flex justify-center mb-6">
        <ProgressRing progress={progress} size={240} strokeWidth={3} timeLeft={timeLeft}>
          <TimerDisplay
            timeLeft={timeLeft}
            theme={theme}
            subtext={isBreak ? 'Break' : `Work Session ${currentSession}`}
            compact
          />
        </ProgressRing>
      </div>

      <TimerControls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      {/* Collapsed settings preview with expand */}
      <div className="w-full">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="group w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 touch-manipulation"
        >
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60 group-hover:text-white/80">
            <span>{Math.floor(config.workDuration / 60)}min work</span>
            <span className="text-white/30">•</span>
            <span>{Math.floor(config.breakDuration / 60)}min break</span>
            <PomodoroTooltip />
          </div>
          <svg
            className={`w-4 h-4 text-white/40 transition-transform duration-300 ${showSettings ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showSettings && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <PomodoroSettings config={config} onUpdate={updateConfig} />
          </div>
        )}
      </div>

      <CompletionOverlay
        isOpen={showCompletion}
        onClose={() => setShowCompletion(false)}
        duration={completionData?.duration || 0}
        sessionType={completionData?.isBreak ? 'break' : 'work'}
      />

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
