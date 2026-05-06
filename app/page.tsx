'use client';

import { useState, useEffect } from 'react';
import FocusTimer from '@/components/FocusTimer';
import SettingsButton from '@/components/SettingsButton';
import Settings from '@/components/Settings';
import Onboarding from '@/components/Onboarding';
import type { ThemeType } from '@/types/theme';

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('flip');
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('timerTheme') as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden" style={{ background: 'oklch(4% 0.008 250)' }}>
      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

      {/* Content */}
      <div className="relative z-10">
        <FocusTimer theme={theme} />
      </div>

      <SettingsButton onClick={() => setShowSettings(true)} />
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onThemeChange={setTheme}
      />
    </main>
  );
}
