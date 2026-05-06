interface VintageDisplayProps {
  display: string;
  subtext?: string;
}

export default function VintageDisplay({ display, subtext }: VintageDisplayProps) {
  const parts = display.split(':');

  return (
    <div className="text-center relative">
      {/* Warm vintage glow */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-900/10 via-transparent to-transparent blur-3xl"></div>

      {/* Editorial vintage display - inspired by "THE SHIFT" aesthetic */}
      <div className="relative">
        {/* Decorative vintage accent dot */}
        <div className="absolute top-0 right-1/3 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>

        {/* Main timer with vintage editorial typography */}
        <div className="flex items-center justify-center text-[3rem] xs:text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] font-semibold leading-none tracking-[-0.015em] tabular-nums">
          {parts.map((part, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && (
                <span className="text-amber-900/20 mx-1 sm:mx-2">:</span>
              )}
              <span
                className={i === parts.length - 1 ? 'text-amber-200/40' : 'text-amber-100'}
                style={{
                  textShadow: '0 2px 8px rgba(251,191,36,0.15)'
                }}
              >
                {part}
              </span>
            </span>
          ))}
        </div>

        {/* Vintage caption with warm tones */}
        {subtext && (
          <div className="text-amber-300/50 text-[0.65rem] sm:text-xs mt-6 sm:mt-8 tracking-[0.18em] uppercase font-medium leading-relaxed">
            {subtext}
          </div>
        )}
      </div>

      {/* Subtle vintage border accent */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-600/30 to-transparent"></div>
    </div>
  );
}
