import { ThemeType } from '@/types/theme';
import MinimalDisplay from './themed/MinimalDisplay';
import FlipDisplay from './themed/FlipDisplay';
import VintageDisplay from './themed/VintageDisplay';

interface ThemePreviewProps {
  theme: ThemeType;
  isSelected: boolean;
  onClick: () => void;
  label: string;
}

export default function ThemePreview({ theme, isSelected, onClick, label }: ThemePreviewProps) {
  const previewDisplay = '12:34';

  const renderPreview = () => {
    const props = { display: previewDisplay, subtext: undefined };

    switch (theme) {
      case 'flip':
        return <FlipDisplay {...props} />;
      case 'vintage':
        return <VintageDisplay {...props} />;
      case 'minimal':
      default:
        return <MinimalDisplay {...props} />;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`group relative w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-500 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white touch-manipulation ${
        isSelected
          ? 'bg-white/10 border-white shadow-lg shadow-white/10 scale-[1.02]'
          : 'border-white/10 hover:bg-white/5 hover:border-white/30 active:scale-[0.98]'
      }`}
    >
      {/* Shimmer effect on hover for non-selected */}
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/3 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      )}

      <div className="relative z-10 space-y-3">
        {/* Preview container with fixed height and scaling */}
        <div
          className="flex items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105"
          style={{
            height: '140px',
            background: 'oklch(0% 0.005 240 / 0.3)',
          }}
        >
          <div className="scale-[0.4] origin-center transition-transform duration-300">
            {renderPreview()}
          </div>
        </div>

        {/* Label */}
        <div className={`text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
          isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
        }`}>
          {label}
        </div>
      </div>
    </button>
  );
}
