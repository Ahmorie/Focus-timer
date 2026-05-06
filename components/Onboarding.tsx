'use client';

import { useState, useEffect } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    } else {
      onComplete();
    }
  }, [onComplete]);

  const handleDismiss = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-[oklch(2%_0.01_250/0.95)] flex items-center justify-center z-50 p-4 animate-in fade-in duration-500"
      onClick={handleDismiss}
    >
      <div
        className="glass-effect rounded-2xl md:rounded-[2rem] p-8 md:p-12 max-w-2xl w-full animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.15em] uppercase mb-3">
            Welcome to Focus Timer
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            A minimalist productivity timer designed for deep work
          </p>
        </div>

        {/* Modes */}
        <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
          <div className="border border-white/10 rounded-xl p-5 md:p-6 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <kbd className="px-3 py-2 text-base md:text-lg font-bold bg-white/10 rounded-lg border border-white/20 text-white flex-shrink-0 min-w-[3rem] text-center">
                P
              </kbd>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-[0.1em] uppercase mb-2">
                  Pomodoro
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Work in focused 25-minute sessions with 5-minute breaks. The Pomodoro Technique helps maintain consistent productivity while preventing burnout.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 rounded-xl p-5 md:p-6 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <kbd className="px-3 py-2 text-base md:text-lg font-bold bg-white/10 rounded-lg border border-white/20 text-white flex-shrink-0 min-w-[3rem] text-center">
                T
              </kbd>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-[0.1em] uppercase mb-2">
                  Timer
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Set a custom countdown for any duration. Choose from quick presets (15, 25, 30, 45, 60 minutes) or enter your own time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="border-t border-white/10 pt-6 md:pt-8 mb-8">
          <h3 className="text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-white/80 mb-4">
            Essential Shortcuts
          </h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs font-medium bg-white/10 rounded border border-white/20 text-white/70">
                Space
              </kbd>
              <span className="text-sm text-white/50">Start / Pause</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs font-medium bg-white/10 rounded border border-white/20 text-white/70">
                R
              </kbd>
              <span className="text-sm text-white/50">Reset</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs font-medium bg-white/10 rounded border border-white/20 text-white/70">
                Esc
              </kbd>
              <span className="text-sm text-white/50">Back</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs font-medium bg-white/10 rounded border border-white/20 text-white/70">
                1-5
              </kbd>
              <span className="text-sm text-white/50">Quick start</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleDismiss}
          className="w-full px-6 py-4 bg-white text-black text-sm md:text-base font-semibold tracking-[0.15em] uppercase rounded-xl hover:bg-white/90 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Get Started
        </button>

        <p className="text-center text-white/30 text-xs mt-4">
          Press any key or click to dismiss
        </p>
      </div>
    </div>
  );
}
