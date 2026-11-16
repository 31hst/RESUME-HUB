import React from 'react';

interface ResumeHubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const ResumeHubLogo: React.FC<ResumeHubLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* Professional Resume Hub SVG Emblem */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#BC0202] via-[#830000] to-black border border-[#FF0000]/50 shadow-red-glow transition-all duration-300 group-hover:scale-105 group-hover:border-[#FF0000]`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6 p-0.5"
        >
          {/* Document Base */}
          <path
            d="M7 6C7 4.89543 7.89543 4 9 4H18L25 11V26C25 27.1046 24.1046 28 23 28H9C7.89543 28 7 27.1046 7 26V6Z"
            fill="black"
            fillOpacity="0.6"
            stroke="#830000"
            strokeWidth="1.5"
          />
          {/* Folded Corner */}
          <path
            d="M18 4V11H25"
            stroke="#BC0202"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Hub Orbital Ring */}
          <circle
            cx="16"
            cy="17"
            r="6"
            stroke="#BC0202"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
          {/* Glowing Center Hub Node */}
          <circle
            cx="16"
            cy="17"
            r="2.8"
            fill="#FF0000"
            style={{ filter: 'drop-shadow(0 0 4px #FF0000)' }}
          />
          {/* Satellite Data Nodes */}
          <circle cx="11.5" cy="14" r="1.3" fill="#FFFFFF" />
          <circle cx="20.5" cy="14" r="1.3" fill="#FFFFFF" />
          <circle cx="16" cy="23" r="1.3" fill="#FFA8A8" />
          {/* Connecting Vectors */}
          <line x1="16" y1="17" x2="11.5" y2="14" stroke="#FFA8A8" strokeWidth="0.8" />
          <line x1="16" y1="17" x2="20.5" y2="14" stroke="#FFA8A8" strokeWidth="0.8" />
          <line x1="16" y1="17" x2="16" y2="23" stroke="#FFA8A8" strokeWidth="0.8" />
        </svg>

        {/* Ambient Glow Aura */}
        <div className="absolute inset-0 rounded-xl bg-[#FF0000] opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
      </div>

      {/* Styled Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={`font-extrabold tracking-tight text-white font-display ${textSizes[size]}`}>
              Resume<span className="text-gradient-red drop-shadow-[0_0_12px_rgba(255,0,0,0.5)]">Hub</span>
            </span>
            <span className="ml-2 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-[#FFA8A8] bg-[#830000]/40 border border-[#BC0202]/60 rounded">
              AI
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
