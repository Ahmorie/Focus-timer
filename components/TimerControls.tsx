import HoldToResetButton from './HoldToResetButton';
import { playClickSound } from '@/utils/audio';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  const handleMainClick = () => {
    playClickSound();
    isRunning ? onPause() : onStart();
  };

  const handleResetClick = () => {
    playClickSound();
    onReset();
  };

  return (
    <div className="flex gap-2 sm:gap-3 w-full">
      <button
        onClick={handleMainClick}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        className="group relative flex-1 min-h-[48px] py-4 sm:py-5 px-6 sm:px-8 bg-white text-black rounded-xl sm:rounded-2xl hover:bg-white/95 active:scale-[0.98] active:translate-y-[1px] transition-all duration-300 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-semibold overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
        style={{
          boxShadow: `
            0 4px 8px rgba(0, 0, 0, 0.3),
            0 1px 2px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2)
          `
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-100 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative z-10">{isRunning ? 'Pause' : 'Start'}</span>
      </button>
      {isRunning ? (
        <HoldToResetButton onReset={onReset} />
      ) : (
        <button
          onClick={handleResetClick}
          aria-label="Reset timer"
          className="group relative min-h-[48px] py-4 sm:py-5 px-6 sm:px-8 border border-white/15 rounded-xl sm:rounded-2xl hover:border-white/40 hover:bg-white/5 active:scale-[0.98] active:translate-y-[1px] transition-all duration-300 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
          style={{
            boxShadow: `
              0 2px 4px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `
          }}
        >
          <span className="relative z-10">Reset</span>
        </button>
      )}
    </div>
  );
}
