interface MinimalDisplayProps {
  display: string;
  subtext?: string;
}

export default function MinimalDisplay({ display, subtext }: MinimalDisplayProps) {
  const parts = display.split(':');

  return (
    <div className="text-center relative">
      <div className="relative">
        {/* Main timer - clean white text, bold and geometric */}
        <div className="flex items-center justify-center text-[3rem] xs:text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] font-bold leading-none tracking-[-0.03em] tabular-nums text-white">
          {parts.map((part, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && (
                <span className="text-white/15 mx-1 sm:mx-2">:</span>
              )}
              <span className={i === parts.length - 1 ? 'text-white/40' : ''}>
                {part}
              </span>
            </span>
          ))}
        </div>

        {/* Subtext with geometric accents */}
        {subtext && (
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20"></div>
            <div className="text-white/40 text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase font-semibold">
              {subtext}
            </div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20"></div>
          </div>
        )}
      </div>
    </div>
  );
}
