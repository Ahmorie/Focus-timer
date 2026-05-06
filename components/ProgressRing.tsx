import { useState } from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
  timeLeft?: number;
}

export default function ProgressRing({
  progress,
  size = 400,
  strokeWidth = 4,
  children,
  timeLeft
}: ProgressRingProps) {
  const [isHovering, setIsHovering] = useState(false);
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')} left`;
  };

  return (
    <div
      className="relative mx-auto group"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* SVG Progress Ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        style={{ filter: 'drop-shadow(0 0 4px oklch(100% 0 0 / 0.06))' }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="oklch(100% 0.008 240 / 0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="oklch(95% 0.003 250 / 0.7)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="group-hover:stroke-white/90 transition-colors"
          style={{
            transition: 'stroke-dashoffset 0.3s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s',
          }}
        />
      </svg>

      {/* Content centered */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center w-full">
          {children}
        </div>
      </div>

      {/* Hover tooltip */}
      {isHovering && timeLeft !== undefined && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[oklch(10%_0.01_250)] border border-white/20 rounded-lg animate-in fade-in zoom-in-95 duration-200">
          <span className="text-xs text-white/90 whitespace-nowrap">
            {formatTime(timeLeft)}
          </span>
        </div>
      )}
    </div>
  );
}
