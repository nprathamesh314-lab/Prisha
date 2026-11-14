import React from 'react';

interface MobileAnimatedTruckProps {
  isTransparent?: boolean;
}

export const MobileAnimatedTruck: React.FC<MobileAnimatedTruckProps> = ({
  isTransparent = false,
}) => {
  return (
    <div
      className="flex sm:hidden flex-1 items-center justify-center min-w-0 px-1 pointer-events-none select-none overflow-hidden"
      aria-label="Prisha Xpress fast delivery"
      role="img"
    >
      <div className="relative w-full max-w-[130px] min-[360px]:max-w-[150px] min-[390px]:max-w-[170px] min-[414px]:max-w-[190px] h-8 flex items-center justify-center overflow-hidden">
        {/* Subtle Background City Skyline Silhouette (Behind Road & Truck) */}
        <div
          className={`absolute bottom-[7px] left-0 right-0 h-3 flex items-end justify-between px-1 pointer-events-none opacity-25 transition-opacity ${
            isTransparent ? 'text-purple-200' : 'text-px-violet'
          }`}
          aria-hidden="true"
        >
          {/* Subtle minimal vector skyline buildings */}
          <svg
            className="w-full h-full"
            viewBox="0 0 160 14"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            {/* Minimalist modern city silhouette */}
            <rect x="5" y="6" width="7" height="8" rx="0.5" />
            <rect x="15" y="3" width="9" height="11" rx="0.5" />
            <polygon points="19.5,0 17,3 22,3" />
            <rect x="27" y="7" width="6" height="7" rx="0.5" />
            <rect x="36" y="4" width="8" height="10" rx="0.5" />
            <rect x="47" y="8" width="6" height="6" rx="0.5" />
            <rect x="56" y="2" width="10" height="12" rx="0.5" />
            <polygon points="61,0 59,2 63,2" />
            <rect x="69" y="5" width="7" height="9" rx="0.5" />
            <rect x="79" y="7" width="8" height="7" rx="0.5" />
            <rect x="90" y="3" width="9" height="11" rx="0.5" />
            <rect x="102" y="6" width="7" height="8" rx="0.5" />
            <rect x="112" y="2" width="11" height="12" rx="0.5" />
            <polygon points="117.5,0 115,2 120,2" />
            <rect x="126" y="5" width="8" height="9" rx="0.5" />
            <rect x="137" y="7" width="6" height="7" rx="0.5" />
            <rect x="146" y="4" width="9" height="10" rx="0.5" />
          </svg>
        </div>

        {/* Stationary Road Track */}
        <div
          className="absolute bottom-[5px] left-0 right-0 h-[2px] pointer-events-none"
          aria-hidden="true"
        >
          {/* Base Road Line */}
          <div
            className={`w-full h-full rounded-full transition-colors ${
              isTransparent
                ? 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
                : 'bg-gradient-to-r from-transparent via-purple-300/80 to-transparent'
            }`}
          />
          {/* Subtle Highway Dashed Line */}
          <div
            className={`absolute inset-x-3 -top-[1px] h-[1px] border-b border-dashed transition-colors ${
              isTransparent ? 'border-white/30' : 'border-px-primary/30'
            }`}
          />
        </div>

        {/* Moving Delivery Truck Container */}
        <div
          className="px-truck-wrapper absolute left-0 bottom-[6px] will-change-transform"
          aria-hidden="true"
        >
          {/* Realistic Prisha Xpress Delivery Truck SVG */}
          <svg
            viewBox="0 0 76 30"
            className="h-[22px] min-[360px]:h-[24px] w-auto overflow-visible drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground Contact Shadow */}
            <ellipse
              cx="38"
              cy="28.5"
              rx="34"
              ry="1.2"
              fill="rgba(0,0,0,0.2)"
            />

            {/* Undercarriage & Chassis Beam */}
            <rect x="5" y="24" width="65" height="1.5" rx="0.5" fill="#1E1B4B" />
            {/* Fuel Tank */}
            <rect x="25" y="23.5" width="13" height="2" rx="0.6" fill="#4B5563" />
            {/* Battery / Utility Box */}
            <rect x="40" y="23.5" width="7" height="2" rx="0.5" fill="#374151" />
            {/* Mudflap / Rear Guard */}
            <rect x="2" y="22" width="2" height="4" rx="0.5" fill="#1F2937" />

            {/* WHITE CARGO CONTAINER (Box Body) */}
            <rect
              x="3"
              y="3"
              width="47"
              height="21"
              rx="1.8"
              fill="#FFFFFF"
              stroke="#35065C"
              strokeWidth="1"
            />
            {/* Cargo Box Roof Reinforcement */}
            <rect x="3" y="3" width="47" height="2" rx="0.5" fill="#F3E8FF" />

            {/* Official Primary Purple Body Stripe */}
            <rect x="3" y="15" width="47" height="3" fill="#68139A" />
            {/* Accent Violet Pin Stripe */}
            <rect x="3" y="18" width="47" height="0.8" fill="#A44BC0" />

            {/* Rear Door Vertical Divide & Latches */}
            <line
              x1="5"
              y1="5"
              x2="5"
              y2="22"
              stroke="#D1D5DB"
              strokeWidth="0.8"
            />
            <rect x="4.2" y="9" width="1.6" height="2" rx="0.3" fill="#6B7280" />
            <rect x="4.2" y="16" width="1.6" height="2" rx="0.3" fill="#6B7280" />

            {/* Mini Official Prisha Xpress Brand On Container Side */}
            <image
              href="/prisha-logo.png"
              x="6.5"
              y="5.5"
              width="8"
              height="8"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x="16"
              y="10.5"
              fill="#35065C"
              fontSize="4.2"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
              letterSpacing="0.4"
            >
              PRISHA
            </text>
            <text
              x="16"
              y="14"
              fill="#A44BC0"
              fontSize="2.8"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
              letterSpacing="0.6"
            >
              XPRESS
            </text>

            {/* DEEP PURPLE CAB (Driver Cabin) */}
            {/* Aerodynamic Cab Body */}
            <path
              d="M 50 8.5 L 61.5 8.5 C 63.5 8.5 64.5 9.5 65.5 11.5 L 70.5 17.5 C 71.5 18.8 72 20.2 72 21.8 L 72 25 C 72 25.5 71.5 25.8 71 25.8 L 50 25.8 Z"
              fill="#35065C"
              stroke="#21152A"
              strokeWidth="0.8"
            />

            {/* Aerodynamic Wind Deflector Roof Cap */}
            <path
              d="M 50 4.5 C 50 4.5 56.5 5.8 61.5 8.5 L 50 8.5 Z"
              fill="#68139A"
            />

            {/* Windshield & Side Window (Daylight Sky Blue Tint) */}
            <path
              d="M 52 10 L 61 10 C 62 10 62.7 10.6 63.3 11.6 L 67 16.8 C 67.3 17.3 67 17.8 66.3 17.8 L 52 17.8 Z"
              fill="#E0F2FE"
              stroke="#BAE6FD"
              strokeWidth="0.5"
            />
            {/* Window Light Glare Reflection Line */}
            <line
              x1="55"
              y1="11"
              x2="62.5"
              y2="16.5"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Cab Door Seam */}
            <line
              x1="57.5"
              y1="10"
              x2="57.5"
              y2="25"
              stroke="#21152A"
              strokeWidth="0.6"
            />
            {/* Chrome Door Handle */}
            <rect
              x="53.5"
              y="19"
              width="2.4"
              height="0.7"
              rx="0.3"
              fill="#FFFFFF"
            />

            {/* Side View Mirror */}
            <rect
              x="51"
              y="12.5"
              width="1.4"
              height="3.2"
              rx="0.5"
              fill="#1E1B4B"
              stroke="#68139A"
              strokeWidth="0.4"
            />

            {/* Headlight (Warm Amber Glow) */}
            <path
              d="M 70.8 20.5 L 72 21 L 72 23 L 70.8 23.5 Z"
              fill="#FDE047"
            />
            {/* Front Bumper */}
            <rect
              x="70.5"
              y="23.8"
              width="2.5"
              height="2"
              rx="0.5"
              fill="#111827"
            />

            {/* WHEELS (Rear Dual Tandem + Front Steer) */}
            {/* Rear Wheel 1 */}
            <g transform="translate(13, 25.5)">
              <circle r="3.6" fill="#111827" stroke="#374151" strokeWidth="0.5" />
              <circle r="2.1" fill="#E5E7EB" />
              <circle r="0.9" fill="#68139A" />
              <g className="px-wheel-spin origin-center">
                <line x1="0" y1="-1.8" x2="0" y2="1.8" stroke="#9CA3AF" strokeWidth="0.5" />
                <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#9CA3AF" strokeWidth="0.5" />
              </g>
            </g>

            {/* Rear Wheel 2 */}
            <g transform="translate(21, 25.5)">
              <circle r="3.6" fill="#111827" stroke="#374151" strokeWidth="0.5" />
              <circle r="2.1" fill="#E5E7EB" />
              <circle r="0.9" fill="#68139A" />
              <g className="px-wheel-spin origin-center">
                <line x1="0" y1="-1.8" x2="0" y2="1.8" stroke="#9CA3AF" strokeWidth="0.5" />
                <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#9CA3AF" strokeWidth="0.5" />
              </g>
            </g>

            {/* Front Wheel */}
            <g transform="translate(61.5, 25.5)">
              <circle r="3.6" fill="#111827" stroke="#374151" strokeWidth="0.5" />
              <circle r="2.1" fill="#E5E7EB" />
              <circle r="0.9" fill="#68139A" />
              <g className="px-wheel-spin origin-center">
                <line x1="0" y1="-1.8" x2="0" y2="1.8" stroke="#9CA3AF" strokeWidth="0.5" />
                <line x1="-1.8" y1="0" x2="1.8" y2="0" stroke="#9CA3AF" strokeWidth="0.5" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Embedded CSS Keyframes for High Performance 60FPS Hardware Acceleration */}
      <style>{`
        @keyframes px-truck-travel {
          0% {
            transform: translateX(-76px);
            opacity: 0;
          }
          6% {
            opacity: 1;
          }
          86% {
            opacity: 1;
          }
          96% {
            transform: translateX(190px);
            opacity: 0;
          }
          100% {
            transform: translateX(190px);
            opacity: 0;
          }
        }

        @keyframes px-wheel-rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .px-truck-wrapper {
          animation: px-truck-travel 5.2s linear infinite;
        }

        .px-wheel-spin {
          animation: px-wheel-rotation 0.65s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        /* Accessibility: Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .px-truck-wrapper {
            animation: none !important;
            transform: translateX(35px) !important;
            opacity: 1 !important;
          }
          .px-wheel-spin {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
