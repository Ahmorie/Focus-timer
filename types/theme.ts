export type ThemeType = 'flip' | 'minimal' | 'vintage';

export interface Theme {
  value: ThemeType;
  label: string;
  description: string;
}

export const THEME_OPTIONS: Theme[] = [
  { value: 'flip', label: 'Flip Clock', description: 'Retro split-flap display' },
  { value: 'minimal', label: 'Minimal', description: 'Clean monochrome design' },
  { value: 'vintage', label: 'Vintage', description: 'Retro 70s aesthetic' },
];
