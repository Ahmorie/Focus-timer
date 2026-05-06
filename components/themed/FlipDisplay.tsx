'use client';

import { useEffect, useState } from 'react';

interface FlipDisplayProps {
  display: string;
  subtext?: string;
  compact?: boolean;
}

function FlipCard({ value, isFlipping, compact = false }: { value: string; isFlipping: boolean; compact?: boolean }) {
  return (
    <div className={`relative mx-0.5 ${
      compact
        ? 'w-7 xs:w-8 sm:w-9 md:w-10 lg:w-11 xl:w-12 h-10 xs:h-11 sm:h-12 md:h-14 lg:h-16 xl:h-18'
        : 'w-10 xs:w-11 sm:w-12 md:w-14 h-14 xs:h-15 sm:h-16 md:h-20'
    }`}>
      <div className={`absolute inset-0 transition-all duration-300 ${isFlipping ? 'animate-flip' : ''}`}>
        {/* Card body with rich shadows and depth */}
        <div
          className="w-full h-full rounded-lg relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
            boxShadow: `
              0 8px 16px rgba(0, 0, 0, 0.6),
              0 2px 4px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              inset 0 -1px 0 rgba(0, 0, 0, 0.5)
            `
          }}
        >
          {/* Top reflection highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 via-white/3 to-transparent"></div>

          {/* Middle split line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[oklch(10%_0.01_250/0.6)] z-10"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[oklch(20%_0.008_250/0.8)] z-10" style={{ transform: 'translateY(1px)' }}></div>

          {/* Number display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`font-bold tabular-nums ${
                compact
                  ? 'text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl'
                  : 'text-2xl xs:text-3xl sm:text-3xl md:text-4xl'
              }`}
              style={{
                color: '#e0e0e0',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.1)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 700
              }}
            >
              {value}
            </div>
          </div>

          {/* Bottom shadow for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent"></div>

          {/* Border frame */}
          <div className="absolute inset-0 rounded-lg" style={{
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}></div>
        </div>

        {/* Card shadow projection */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-2 rounded-full blur-sm"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.4) 0%, transparent 70%)'
          }}
        ></div>
      </div>
    </div>
  );
}

export default function FlipDisplay({ display, subtext, compact = false }: FlipDisplayProps) {
  const [prevDisplay, setPrevDisplay] = useState(display);
  const [flipping, setFlipping] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (display !== prevDisplay) {
      // Compare character by character including separators
      const newFlipping: { [key: string]: boolean } = {};

      // Build a flat array of all characters with their positions
      const displayChars = display.split('');
      const prevChars = prevDisplay.split('');

      // Track only digit positions (skip ':')
      let digitIndex = 0;
      displayChars.forEach((char, i) => {
        if (char !== ':') {
          const prevChar = prevChars[i];
          if (char !== prevChar) {
            newFlipping[digitIndex.toString()] = true;
          }
          digitIndex++;
        }
      });

      setFlipping(newFlipping);
      setPrevDisplay(display);

      setTimeout(() => setFlipping({}), 300);
    }
  }, [display, prevDisplay]);

  const parts = display.split(':');

  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        {parts.map((part, partIndex) => {
          // Calculate starting digit index for this part
          const startDigitIndex = parts.slice(0, partIndex).reduce((sum, p) => sum + p.length, 0);

          return (
            <div key={partIndex} className="flex items-center">
              {partIndex > 0 && (
                <div
                  className={`font-bold mx-0.5 sm:mx-1 tabular-nums ${
                    compact
                      ? 'text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl'
                      : 'text-xl xs:text-2xl sm:text-2xl md:text-3xl'
                  }`}
                  style={{
                    color: '#606060',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >:</div>
              )}
              {part.split('').map((digit, digitIndex) => {
                const globalDigitIndex = startDigitIndex + digitIndex;
                return (
                  <FlipCard
                    key={globalDigitIndex}
                    value={digit}
                    isFlipping={flipping[globalDigitIndex.toString()] || false}
                    compact={compact}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {subtext && (
        <div
          className="text-xs sm:text-sm mt-4 sm:mt-5 tracking-wider uppercase font-medium"
          style={{
            color: '#808080',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}
