import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showIcon = true,
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: {
      wrap: 'text-sm tracking-tight',
      brand: 'text-base font-black tracking-tighter uppercase italic',
      by: 'text-[10px] uppercase tracking-[0.25em] text-white/40 px-1',
      author: 'text-sm font-bold tracking-tight',
      iconSize: 'w-5 h-5 text-xs'
    },
    md: {
      wrap: 'text-base sm:text-lg tracking-tight',
      brand: 'text-xl sm:text-2xl font-black tracking-tighter uppercase italic',
      by: 'text-xs uppercase tracking-[0.3em] text-white/40 px-1.5',
      author: 'text-base sm:text-lg font-bold tracking-tight',
      iconSize: 'w-7 h-7 text-sm'
    },
    lg: {
      wrap: 'text-xl sm:text-2xl tracking-tight',
      brand: 'text-2xl sm:text-3xl font-black tracking-tighter uppercase italic',
      by: 'text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 px-2',
      author: 'text-xl sm:text-2xl font-bold tracking-tight',
      iconSize: 'w-8 h-8 text-base'
    },
    xl: {
      wrap: 'text-2xl sm:text-4xl tracking-tight',
      brand: 'text-3xl sm:text-5xl font-black tracking-tighter uppercase italic',
      by: 'text-sm uppercase tracking-[0.3em] text-white/40 px-2.5',
      author: 'text-2xl sm:text-4xl font-bold tracking-tight',
      iconSize: 'w-10 h-10 text-lg'
    },
    hero: {
      wrap: 'text-3xl sm:text-5xl md:text-6xl tracking-tighter',
      brand: 'text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]',
      by: 'text-xs sm:text-sm md:text-base uppercase tracking-[0.4em] text-white/40 px-3 font-semibold',
      author: 'text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight',
      iconSize: 'w-12 h-12 sm:w-16 sm:h-16 text-xl'
    }
  }[size];

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-baseline gap-2.5 sm:gap-3 cursor-pointer select-none group transition-all duration-300 ${className}`}
      title="Syntrix by nialekaeti - High-End Web Design Agency"
    >
      {showIcon && (
        <div
          className={`relative self-center flex items-center justify-center bg-black border border-white/20 group-hover:border-[#FFD700] transition-all duration-300 ${sizeClasses.iconSize}`}
        >
          {/* Stylized Minimal S with yellow & red accent */}
          <svg viewBox="0 0 40 40" className="w-3/5 h-3/5" fill="none">
            <path
              d="M28 13C26.5 10.5 23.5 9 19.5 9C14.5 9 11 12.5 11 16.5C11 21.5 16 23 21 24.5C25.5 26 27.5 27.5 27.5 30.5C27.5 34 24 36.5 19.5 36.5C14 36.5 11 33 9.5 29"
              stroke="#FFD700"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="29" cy="31" r="2.5" fill="#FF0000" />
          </svg>
        </div>
      )}

      <div className={`flex items-baseline space-x-2 sm:space-x-3 leading-none ${sizeClasses.wrap}`}>
        {/* Brand: syntrix in prominent bright gold/yellow uppercase italic */}
        <span
          className={`text-[#FFD700] ${sizeClasses.brand}`}
        >
          Syntrix
        </span>

        {/* Separator "by" */}
        <span className={sizeClasses.by}>
          by
        </span>

        {/* Split-Color Founder Name: "niale" in crisp white, "kaeti" in sharp vibrant red */}
        <span className={`inline-flex items-baseline ${sizeClasses.author}`}>
          <span className="text-white">
            niale
          </span>
          <span className="text-[#FF0000] group-hover:opacity-90 transition-opacity inline-block">
            kaeti
          </span>
        </span>
      </div>
    </div>
  );
};
