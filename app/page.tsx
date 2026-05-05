'use client';

import { useState, useEffect } from 'react';
import FocusTimer from '@/components/FocusTimer';
import SettingsButton from '@/components/SettingsButton';
import Settings from '@/components/Settings';
import type { ThemeType } from '@/types/theme';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('minimal');

  useEffect(() => {
    const savedTheme = localStorage.getItem('timerTheme') as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <FocusTimer theme={theme} />
      <SettingsButton onClick={() => setShowSettings(true)} />
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onThemeChange={setTheme}
      />
    </main>
  );
}
