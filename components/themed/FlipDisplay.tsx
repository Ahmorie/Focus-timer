'use client';

import { useEffect, useState } from 'react';

interface FlipDisplayProps {
  display: string;
  subtext?: string;
}

function FlipCard({ value, isFlipping }: { value: string; isFlipping: boolean }) {
  return (
    <div className="relative w-16 md:w-20 h-20 md:h-28 mx-1">
      <div className={`absolute inset-0 transition-all duration-300 ${isFlipping ? 'animate-flip' : ''}`}>
        <div className="w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg border-2 border-zinc-700 shadow-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-600"></div>
          <div className="text-4xl md:text-5xl font-bold text-white font-mono">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function FlipDisplay({ display, subtext }: FlipDisplayProps) {
  const [prevDisplay, setPrevDisplay] = useState(display);
  const [flipping, setFlipping] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (display !== prevDisplay) {
      const chars = display.split(/[:,]/);
      const prevChars = prevDisplay.split(/[:,]/);

      const newFlipping: { [key: number]: boolean } = {};
      chars.forEach((char, i) => {
        if (char !== prevChars[i]) {
          newFlipping[i] = true;
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
        {parts.map((part, partIndex) => (
          <div key={partIndex} className="flex items-center">
            {partIndex > 0 && (
              <div className="text-3xl md:text-4xl text-zinc-500 font-bold mx-2">:</div>
            )}
            {part.split('').map((digit, digitIndex) => {
              const globalIndex = partIndex * 3 + digitIndex;
              return (
                <FlipCard
                  key={globalIndex}
                  value={digit}
                  isFlipping={flipping[globalIndex] || false}
                />
              );
            })}
          </div>
        ))}
      </div>

      {subtext && (
        <div className="text-zinc-500 text-xs mt-6 tracking-widest uppercase font-mono">
          {subtext}
        </div>
      )}
    </div>
  );
}
