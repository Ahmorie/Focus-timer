'use client';

import { useState, useEffect } from 'react';
import { playSound, SoundType, SOUND_OPTIONS } from '@/utils/audio';
import { ThemeType, THEME_OPTIONS } from '@/types/theme';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: ThemeType) => void;
}

export default function Settings({ isOpen, onClose, onThemeChange }: SettingsProps) {
  const [selectedSound, setSelectedSound] = useState<SoundType>('complete');
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('minimal');

  useEffect(() => {
    const savedSound = localStorage.getItem('timerSound') as SoundType;
    if (savedSound && SOUND_OPTIONS.find(opt => opt.value === savedSound)) {
      setSelectedSound(savedSound);
    }

    const savedTheme = localStorage.getItem('timerTheme') as ThemeType;
    if (savedTheme && THEME_OPTIONS.find(opt => opt.value === savedTheme)) {
      setSelectedTheme(savedTheme);
      onThemeChange(savedTheme);
    }
  }, [onThemeChange]);

  const handleSoundChange = (sound: SoundType) => {
    setSelectedSound(sound);
    localStorage.setItem('timerSound', sound);
    playSound(sound);
  };

  const handleThemeChange = (theme: ThemeType) => {
    setSelectedTheme(theme);
    localStorage.setItem('timerTheme', theme);
    onThemeChange(theme);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="glass-effect rounded-2xl p-6 max-w-md w-full glow-effect"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-light tracking-widest uppercase">Paramètres</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <div className="text-white/60 text-sm tracking-widest uppercase mb-3">
              Thème d&apos;affichage
            </div>
            <div className="space-y-2">
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                    selectedTheme === option.value
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="font-medium tracking-wider">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    selectedTheme === option.value ? 'text-black/60' : 'text-white/40'
                  }`}>
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white/60 text-sm tracking-widest uppercase mb-3">
              Son de fin de timer
            </div>
            <div className="space-y-2">
              {SOUND_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSoundChange(option.value)}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                    selectedSound === option.value
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="font-medium tracking-wider">{option.label}</div>
                  <div className={`text-xs mt-1 ${
                    selectedSound === option.value ? 'text-black/60' : 'text-white/40'
                  }`}>
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
