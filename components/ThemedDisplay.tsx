'use client';

import { ThemeType } from '@/types/theme';
import MinimalDisplay from './themed/MinimalDisplay';
import MedievalDisplay from './themed/MedievalDisplay';
import FlipDisplay from './themed/FlipDisplay';
import VintageDisplay from './themed/VintageDisplay';

interface ThemedDisplayProps {
  display: string;
  subtext?: string;
  theme: ThemeType;
}

export default function ThemedDisplay({ display, subtext, theme }: ThemedDisplayProps) {
  switch (theme) {
    case 'medieval':
      return <MedievalDisplay display={display} subtext={subtext} />;
    case 'flip':
      return <FlipDisplay display={display} subtext={subtext} />;
    case 'vintage':
      return <VintageDisplay display={display} subtext={subtext} />;
    case 'minimal':
    default:
      return <MinimalDisplay display={display} subtext={subtext} />;
  }
}
