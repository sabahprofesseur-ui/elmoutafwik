import React from 'react';

interface ThaloobMascotProps {
  expression?: 'happy' | 'excited' | 'thinking' | 'wave';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const ThaloobMascot: React.FC<ThaloobMascotProps> = ({
  expression = 'excited',
  size = 'lg',
  className = '',
  showBadge = true,
}) => {
  const sizeMap = {
    sm: 'w-28 h-28',
    md: 'w-48 h-48',
    lg: 'w-64 h-64 sm:w-72 sm:h-72',
    xl: 'w-80 h-80 sm:w-96 sm:h-96',
  };

  return (
    <div className={`relative ${sizeMap[size]} ${className} select-none`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl animate-kid-bounce"
      >
        {/* Tail on right */}
        <path
          d="M160 140C180 120 190 90 180 70C170 50 140 60 130 80"
          stroke="#FF8A00"
          strokeWidth="22"
          strokeLinecap="round"
        />
        {/* Body */}
        <circle cx="100" cy="120" r="60" fill="#FF8A00" />
        {/* Tummy patch */}
        <circle cx="100" cy="130" r="40" fill="white" fillOpacity="0.32" />
        {/* Left Ear */}
        <path d="M60 70L40 20L90 60" fill="#FF8A00" stroke="#E67E00" strokeWidth="4" />
        {/* Right Ear */}
        <path d="M140 70L160 20L110 60" fill="#FF8A00" stroke="#E67E00" strokeWidth="4" />
        {/* Head */}
        <circle cx="100" cy="80" r="50" fill="#FF8A00" stroke="#E67E00" strokeWidth="4" />
        {/* Face white patch */}
        <path d="M60 90C60 90 80 110 100 110C120 110 140 90 140 90" fill="white" fillOpacity="0.25" />
        {/* Eyes */}
        <circle cx="80" cy="75" r="6.5" fill="#2D3436" />
        <circle cx="120" cy="75" r="6.5" fill="#2D3436" />
        {/* Cute eye sparkles */}
        <circle cx="82" cy="73" r="2" fill="white" />
        <circle cx="122" cy="73" r="2" fill="white" />
        {/* Nose */}
        <circle cx="100" cy="90" r="5.5" fill="#2D3436" />
        {/* Smile */}
        <path
          d="M90 100C90 100 95 106 100 106C105 106 110 100 110 100"
          stroke="#2D3436"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Badge at top right */}
      {showBadge && (
        <div className="absolute top-1 right-2 bg-[#FEE227] text-slate-900 text-xs font-black px-3.5 py-1 rounded-full shadow-lg border border-yellow-300">
          بطل! 🌟
        </div>
      )}
    </div>
  );
};
