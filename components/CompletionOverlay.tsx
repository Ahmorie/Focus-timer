'use client';

import { useEffect } from 'react';

interface CompletionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  duration: number;
  sessionType?: 'work' | 'break';
}

export default function CompletionOverlay({
  isOpen,
  onClose,
  duration,
  sessionType = 'work'
}: CompletionOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(duration / 60);
  const title = sessionType === 'work' ? 'Work Session Complete' : 'Break Complete';
  const message = sessionType === 'work'
    ? `You focused for ${minutes} minutes`
    : `You rested for ${minutes} minutes`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-500"
      style={{
        background: 'radial-gradient(circle at center, oklch(12% 0.005 240) 0%, oklch(0% 0.005 240) 100%)'
      }}
    >
      {/* Pulsing glow effect */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        <div
          className="w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(100% 0.008 240 / 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-6">
        <div className="space-y-3">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.1em] uppercase"
            style={{
              textShadow: '0 0 40px oklch(100% 0.008 240 / 0.3)'
            }}
          >
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-white/60 tracking-[0.15em]">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="group relative px-8 py-4 bg-white text-black rounded-2xl hover:bg-white/95 active:scale-[0.98] transition-all duration-300 text-sm tracking-[0.15em] uppercase font-semibold shadow-lg shadow-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          <span className="relative z-10">Continue</span>
        </button>

        <div className="text-xs text-white/40 tracking-widest uppercase">
          Press Esc to close
        </div>
      </div>
    </div>
  );
}
