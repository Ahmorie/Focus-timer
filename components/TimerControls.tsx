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
  return (
    <div className="flex space-x-4 w-full">
      <button
        onClick={isRunning ? onPause : onStart}
        className="flex-1 py-4 px-6 bg-white text-black rounded-xl hover:bg-white/90 transition-all duration-300 text-sm tracking-widest uppercase font-medium"
      >
        {isRunning ? 'Pause' : 'Démarrer'}
      </button>
      <button
        onClick={onReset}
        className="py-4 px-6 border border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm tracking-widest uppercase"
      >
        Reset
      </button>
    </div>
  );
}
