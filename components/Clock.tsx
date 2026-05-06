'use client';

import { useState, useEffect } from 'react';
import ThemedDisplay from './ThemedDisplay';
import { ThemeType } from '@/types/theme';

interface ClockProps {
  theme: ThemeType;
}

export default function Clock({ theme }: ClockProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="text-center">
        <div className="text-7xl md:text-8xl font-medium tracking-wide tabular-nums">
          --:--<span className="text-white/40">:--</span>
        </div>
        <div className="text-white/40 text-sm mt-4 tracking-widest uppercase">
          Loading...
        </div>
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

  return (
    <ThemedDisplay
      display={`${hours}:${minutes}:${seconds}`}
      subtext={dateStr}
      theme={theme}
    />
  );
}
