import ThemedDisplay from './ThemedDisplay';
import { ThemeType } from '@/types/theme';

interface TimerDisplayProps {
  timeLeft: number;
  theme: ThemeType;
  subtext?: string;
  compact?: boolean;
}

export default function TimerDisplay({ timeLeft, theme, subtext, compact = false }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return <ThemedDisplay display={display} subtext={subtext} theme={theme} compact={compact} />;
}
