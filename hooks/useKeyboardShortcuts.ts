'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsConfig {
  onSpace?: () => void;
  onReset?: () => void;
  onEscape?: () => void;
  onNumber?: (num: number) => void;
  onP?: () => void;
  onT?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onSpace,
  onReset,
  onEscape,
  onNumber,
  onP,
  onT,
  enabled = true
}: KeyboardShortcutsConfig) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Prevent default for shortcuts
      switch (e.key.toLowerCase()) {
        case ' ':
          if (onSpace) {
            e.preventDefault();
            onSpace();
          }
          break;
        case 'r':
          if (onReset) {
            e.preventDefault();
            onReset();
          }
          break;
        case 'escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
        case 'p':
          if (onP) {
            e.preventDefault();
            onP();
          }
          break;
        case 't':
          if (onT) {
            e.preventDefault();
            onT();
          }
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          if (onNumber) {
            e.preventDefault();
            onNumber(parseInt(e.key));
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSpace, onReset, onEscape, onNumber, onP, onT, enabled]);
}
