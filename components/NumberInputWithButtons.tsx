interface NumberInputWithButtonsProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
  unit?: string;
  disabled?: boolean;
}

export default function NumberInputWithButtons({
  value,
  min,
  max,
  onChange,
  label,
  unit = '',
  disabled = false
}: NumberInputWithButtonsProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-white/60 text-xs tracking-wider uppercase font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label={`Diminuer ${label || 'valeur'}`}
          className="w-12 h-12 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all duration-300 text-xl font-normal disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
        >
          −
        </button>

        <div className="flex items-center gap-1.5 min-w-[60px] justify-center">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            min={min}
            max={max}
            aria-label={label}
            className="w-12 bg-transparent text-center text-xl sm:text-2xl font-medium tabular-nums focus:outline-none disabled:opacity-50"
          />
          {unit && (
            <span className="text-white/40 text-sm">{unit}</span>
          )}
        </div>

        <button
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label={`Augmenter ${label || 'valeur'}`}
          className="w-12 h-12 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all duration-300 text-xl font-normal disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation"
        >
          +
        </button>
      </div>
    </div>
  );
}
