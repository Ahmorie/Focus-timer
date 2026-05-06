'use client';

import { ThemeType } from '@/types/theme';
import MinimalDisplay from './themed/MinimalDisplay';
import FlipDisplay from './themed/FlipDisplay';
import VintageDisplay from './themed/VintageDisplay';

interface ThemedDisplayProps {
  display: string;
  subtext?: string;
  theme: ThemeType;
  compact?: boolean;
}

export default function ThemedDisplay({ display, subtext, theme, compact = false }: ThemedDisplayProps) {
  switch (theme) {
    case 'flip':
      return <FlipDisplay display={display} subtext={subtext} compact={compact} />;
    case 'vintage':
      return <VintageDisplay display={display} subtext={subtext} />;
    case 'minimal':
    default:
      return <MinimalDisplay display={display} subtext={subtext} />;
  }
}
