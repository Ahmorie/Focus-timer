interface VintageDisplayProps {
  display: string;
  subtext?: string;
}

export default function VintageDisplay({ display, subtext }: VintageDisplayProps) {
  return (
    <div className="text-center relative">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-radial from-orange-900/20 via-transparent to-transparent blur-2xl"></div>

        <div className="relative bg-gradient-to-br from-orange-950/40 to-red-950/40 rounded-3xl p-8 md:p-10 border-4 border-orange-800/30 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5),0_0_30px_rgba(234,88,12,0.2)]">
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-orange-600/40 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-orange-600/40 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-orange-600/40 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-orange-600/40 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>

          <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600 tracking-wider drop-shadow-[0_0_20px_rgba(234,88,12,0.8)] font-mono" style={{
            textShadow: '0 0 40px rgba(234, 88, 12, 0.8), 0 0 10px rgba(234, 88, 12, 0.9)',
            WebkitTextStroke: '1px rgba(234, 88, 12, 0.3)'
          }}>
            {display}
          </div>

          {subtext && (
            <div className="text-orange-700/80 text-xs mt-4 tracking-[0.3em] uppercase font-bold">
              {subtext}
            </div>
          )}

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 via-transparent to-white/5 pointer-events-none"></div>
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-gradient-to-r from-transparent via-orange-900/20 to-transparent blur-sm"></div>
      </div>
    </div>
  );
}
