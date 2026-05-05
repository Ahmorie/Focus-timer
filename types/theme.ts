export type ThemeType = 'minimal' | 'medieval' | 'flip' | 'vintage';

export interface Theme {
  value: ThemeType;
  label: string;
  description: string;
}

export const THEME_OPTIONS: Theme[] = [
  { value: 'minimal', label: 'Minimaliste', description: 'Design épuré noir et blanc' },
  { value: 'medieval', label: 'Médiéval', description: 'Style fantasy avec ornements' },
  { value: 'flip', label: 'Flip Clock', description: 'Horloge à bascule rétro' },
  { value: 'vintage', label: 'Vintage', description: 'Style rétro années 70' },
];
