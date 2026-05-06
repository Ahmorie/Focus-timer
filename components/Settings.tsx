'use client';

import { useState, useEffect } from 'react';
import { playSound, SoundType, SOUND_OPTIONS, getVolume, setVolume } from '@/utils/audio';
import { ThemeType, THEME_OPTIONS } from '@/types/theme';
import ThemePreview from './ThemePreview';
import Toast from './Toast';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: ThemeType) => void;
}

type TabType = 'display' | 'audio';

export default function Settings({ isOpen, onClose, onThemeChange }: SettingsProps) {
  const [selectedSound, setSelectedSound] = useState<SoundType>('complete');
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('minimal');
  const [volume, setVolumeState] = useState(0.3);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('display');

  useEffect(() => {
    try {
      const savedSound = localStorage.getItem('timerSound') as SoundType;
      if (savedSound && SOUND_OPTIONS.find(opt => opt.value === savedSound)) {
        setSelectedSound(savedSound);
      }

      const savedTheme = localStorage.getItem('timerTheme') as ThemeType;
      if (savedTheme && THEME_OPTIONS.find(opt => opt.value === savedTheme)) {
        setSelectedTheme(savedTheme);
        onThemeChange(savedTheme);
      }

      const savedVolume = getVolume();
      setVolumeState(savedVolume);
    } catch (error) {
      setToastMessage('Settings could not be loaded. Storage may be unavailable.');
      setShowToast(true);
    }
  }, [onThemeChange]);

  const handleSoundChange = (sound: SoundType) => {
    setSelectedSound(sound);
    try {
      localStorage.setItem('timerSound', sound);
    } catch (error) {
      setToastMessage('Settings could not be saved. Storage may be full or unavailable.');
      setShowToast(true);
    }
    playSound(sound);
  };

  const handleThemeChange = (theme: ThemeType) => {
    setSelectedTheme(theme);
    try {
      localStorage.setItem('timerTheme', theme);
    } catch (error) {
      setToastMessage('Settings could not be saved. Storage may be full or unavailable.');
      setShowToast(true);
    }
    onThemeChange(theme);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[oklch(2%_0.01_250/0.95)] flex items-center sm:items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="glass-effect rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 max-w-lg w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto glow-effect animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 id="settings-title" className="text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">Settings</h2>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="text-white/40 hover:text-white hover:rotate-90 transition-all duration-300 text-2xl sm:text-3xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('display')}
            className={`px-4 py-2 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 border-b-2 ${
              activeTab === 'display'
                ? 'border-white text-white'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            Display
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 py-2 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 border-b-2 ${
              activeTab === 'audio'
                ? 'border-white text-white'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            Audio
          </button>
        </div>

        {/* Display Tab */}
        {activeTab === 'display' && (
          <div className="animate-in fade-in duration-300">
            <div>
              <div className="text-white/50 text-[0.625rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-5 font-medium">
                Theme
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {THEME_OPTIONS.map((option) => (
                  <ThemePreview
                    key={option.value}
                    theme={option.value}
                    label={option.label}
                    isSelected={selectedTheme === option.value}
                    onClick={() => handleThemeChange(option.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audio Tab */}
        {activeTab === 'audio' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            <div>
              <div className="text-white/50 text-[0.625rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-normal">
                Volume
              </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-white/30">🔇</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="Notification volume"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={volume}
                aria-valuetext={`${Math.round(volume * 100)}%`}
                className="flex-1 h-1 bg-white/5 rounded-full appearance-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  background: `linear-gradient(to right, oklch(100% 0.008 240 / 0.8) ${volume * 100}%, oklch(100% 0.008 240 / 0.05) ${volume * 100}%)`
                }}
              />
              <span className="text-xs sm:text-sm text-white/30">🔊</span>
              <button
                onClick={() => playSound(selectedSound)}
                aria-label="Test selected sound"
                className="px-3 sm:px-4 py-2 min-h-[44px] text-[0.625rem] sm:text-xs border border-white/10 rounded-lg sm:rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 tracking-wider backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation whitespace-nowrap"
              >
                Test
              </button>
            </div>
            </div>

            <div>
              <div className="text-white/50 text-[0.625rem] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-normal">
                Completion Sound
              </div>
            <div className="space-y-2 sm:space-y-3">
              {SOUND_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSoundChange(option.value)}
                  aria-label={`Change sound to ${option.label}`}
                  aria-pressed={selectedSound === option.value}
                  className={`group w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-500 text-left backdrop-blur-sm relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation ${
                    selectedSound === option.value
                      ? 'bg-white text-black border-white shadow-lg shadow-white/20 scale-[1.02]'
                      : 'border-white/10 hover:bg-white/5 hover:border-white/30 active:scale-[0.98]'
                  }`}
                >
                  {selectedSound !== option.value && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/3 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  )}
                  <div className="relative z-10">
                    <div className="font-medium tracking-[0.15em] text-sm">{option.label}</div>
                    <div className={`text-xs mt-1.5 ${
                      selectedSound === option.value ? 'text-black/50' : 'text-white/40'
                    }`}>
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            </div>
          </div>
        )}
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
