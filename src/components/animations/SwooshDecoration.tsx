import React from 'react';

interface SwooshDecorationProps {
  size?: number;
  className?: string;
  theme?: 'dark' | 'light';
  speed?: number;
}

export const SwooshDecoration: React.FC<SwooshDecorationProps> = ({
  size = 320,
  className = '',
  theme = 'light',
}) => {
  const strokeColor = theme === 'dark' ? 'rgba(216, 185, 232, 0.25)' : 'rgba(104, 19, 154, 0.18)';
  const accentColor = theme === 'dark' ? 'rgba(164, 75, 192, 0.7)' : 'rgba(104, 19, 154, 0.5)';
  const glowColor = theme === 'dark' ? 'rgba(164, 75, 192, 0.15)' : 'rgba(242, 232, 248, 0.6)';

  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft Ambient Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: glowColor }}
      />

      {/* Rotating Speed Swoosh Ring - CSS Hardware Accelerated */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-[spin_25s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#68139A" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#A44BC0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D8B9E8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Circular Swoosh Arc */}
        <path
          d="M 100, 15 A 85,85 0 1,1 18, 120"
          stroke="url(#swooshGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Inner Counter Arc */}
        <path
          d="M 100, 35 A 65,65 0 0,1 165, 100"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeDasharray="4 6"
        />

        {/* Orbiting Speed Particle */}
        <circle cx="100" cy="15" r="4.5" fill={accentColor} />
      </svg>
    </div>
  );
};
