import { useState } from 'react';

export default function PomodoroTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent button click
          setIsOpen(!isOpen);
        }}
        className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label="What is Pomodoro?"
      >
        <span className="text-[10px] text-white/60">?</span>
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-sm font-semibold text-white mb-2 tracking-wide">
              Pomodoro Technique
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              A time management method that uses focused work intervals (typically 25 minutes) separated by short breaks.
            </p>
            <ul className="text-xs text-white/60 space-y-1">
              <li>• Work for 25 minutes</li>
              <li>• Take a 5-minute break</li>
              <li>• After 4 sessions, take a 15-minute break</li>
            </ul>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-3 text-xs text-white/80 hover:text-white transition-colors"
            >
              Got it
            </button>
          </div>
        </>
      )}
    </div>
  );
}
