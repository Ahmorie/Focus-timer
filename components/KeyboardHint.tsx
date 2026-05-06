interface KeyboardHintProps {
  hints: { key: string; action: string }[];
  compact?: boolean;
}

export default function KeyboardHint({ hints, compact = false }: KeyboardHintProps) {
  if (hints.length === 0) return null;

  // Adapt sizing based on number of hints
  const isSmallSet = hints.length <= 2;
  const isMediumSet = hints.length === 3;

  if (compact) {
    // Compact mode - smaller, fixed position at bottom
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[oklch(10%_0.01_250/0.8)] border border-white/10">
        {hints.map((hint, index) => (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && <span className="text-white/20 text-xs">•</span>}
            <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white/10 rounded border border-white/20 text-white/70">
              {hint.key}
            </kbd>
            <span className="text-[10px] text-white/40 whitespace-nowrap">{hint.action}</span>
          </div>
        ))}
      </div>
    );
  }

  // Regular mode - adapts to number of hints
  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 ${
      isSmallSet
        ? 'px-3 py-1.5 rounded-full'
        : isMediumSet
        ? 'px-3 py-2 rounded-xl'
        : 'px-4 py-2 rounded-xl'
    } bg-[oklch(10%_0.01_250/0.8)] border border-white/10`}>
      {hints.map((hint, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-white/20 text-xs">•</span>}
          <kbd className={`px-2 py-0.5 font-medium bg-white/10 rounded border border-white/20 text-white/80 ${
            isSmallSet ? 'text-xs' : 'text-[11px]'
          }`}>
            {hint.key}
          </kbd>
          <span className={`text-white/50 whitespace-nowrap ${
            isSmallSet ? 'text-xs' : 'text-[11px]'
          }`}>{hint.action}</span>
        </div>
      ))}
    </div>
  );
}
