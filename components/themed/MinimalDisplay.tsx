interface MinimalDisplayProps {
  display: string;
  subtext?: string;
}

export default function MinimalDisplay({ display, subtext }: MinimalDisplayProps) {
  const parts = display.split(':');

  return (
    <div className="text-center">
      <div className="text-7xl md:text-8xl font-light tracking-wider">
        {parts.map((part, i) => (
          <span key={i}>
            {i > 0 && ':'}
            <span className={i === parts.length - 1 ? 'text-white/40' : ''}>
              {part}
            </span>
          </span>
        ))}
      </div>
      {subtext && (
        <div className="text-white/40 text-sm mt-4 tracking-widest uppercase">
          {subtext}
        </div>
      )}
    </div>
  );
}
