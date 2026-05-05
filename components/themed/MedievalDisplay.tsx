interface MedievalDisplayProps {
  display: string;
  subtext?: string;
}

export default function MedievalDisplay({ display, subtext }: MedievalDisplayProps) {
  return (
    <div className="text-center relative">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">⚔️</div>

      <div className="border-4 border-amber-600/40 rounded-lg p-8 bg-gradient-to-b from-amber-950/20 to-amber-900/10 shadow-2xl relative">
        <div className="absolute top-2 left-2 text-amber-600/30 text-2xl">✦</div>
        <div className="absolute top-2 right-2 text-amber-600/30 text-2xl">✦</div>
        <div className="absolute bottom-2 left-2 text-amber-600/30 text-2xl">✦</div>
        <div className="absolute bottom-2 right-2 text-amber-600/30 text-2xl">✦</div>

        <div className="text-6xl md:text-7xl font-serif text-amber-200 tracking-wider drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
          {display}
        </div>

        {subtext && (
          <div className="text-amber-600/70 text-xs mt-4 tracking-[0.3em] uppercase font-serif">
            ✧ {subtext} ✧
          </div>
        )}
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-4xl">🛡️</div>
    </div>
  );
}
