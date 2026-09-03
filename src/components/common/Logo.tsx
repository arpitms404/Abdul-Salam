import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer' | 'full' | 'emblem' | 'header';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showText = true,
  size = 'md'
}) => {
  const isDark = variant === 'dark' || variant === 'footer';
  const isFull = variant === 'full';
  const isEmblemOnly = variant === 'emblem';
  const isHeader = variant === 'header';

  // High-visibility, prominent sizing configurations
  const emblemSizes = {
    sm: 'w-12 h-10 sm:w-14 sm:h-12',
    md: 'w-16 h-13 sm:w-20 sm:h-16 md:w-22 md:h-17',
    lg: 'w-24 h-20 sm:w-28 sm:h-22 md:w-32 md:h-26',
    xl: 'w-36 h-30 sm:w-44 sm:h-36 md:w-52 md:h-42'
  };

  const textSizes = {
    sm: {
      title: 'text-base sm:text-lg font-black tracking-tight',
      sub: 'text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em]',
      tag: 'text-[8px] sm:text-[9px] font-bold tracking-[0.16em]'
    },
    md: {
      title: 'text-lg sm:text-xl md:text-2xl font-black tracking-tight',
      sub: 'text-xs sm:text-[13px] md:text-sm font-extrabold tracking-[0.22em]',
      tag: 'text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.18em]'
    },
    lg: {
      title: 'text-2xl sm:text-3xl md:text-4xl font-black tracking-tight',
      sub: 'text-sm sm:text-base md:text-lg font-extrabold tracking-[0.25em]',
      tag: 'text-xs sm:text-sm font-bold tracking-[0.2em]'
    },
    xl: {
      title: 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight',
      sub: 'text-base sm:text-xl font-extrabold tracking-[0.25em]',
      tag: 'text-sm sm:text-base font-bold tracking-[0.22em]'
    }
  };

  /* The High-Precision Construction Scene Architectural Emblem SVG */
  const ArchitecturalEmblemSVG = (
    <svg
      viewBox="0 0 200 160"
      className="w-full h-full drop-shadow-md overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sun Arc Radiant Gradient */}
        <linearGradient id="ascSunGrad" x1="20" y1="20" x2="180" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Concrete Slab Gradient */}
        <linearGradient id="ascConcreteGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Brick Pattern Fill */}
        <linearGradient id="ascBrickGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        {/* Steel Scaffolding Pipe */}
        <linearGradient id="ascSteelPipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* 1. Backdrop: Rising Sun Golden Arc with double radiant halo */}
      <path
        d="M 24 130 A 76 76 0 1 1 176 130"
        stroke="url(#ascSunGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      <path
        d="M 32 130 A 68 68 0 1 1 168 130"
        stroke="#FDE68A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* 2. City Skyline Silhouettes in Distant Horizon */}
      <rect x="92" y="30" width="14" height="62" fill={isDark ? '#1E293B' : '#94A3B8'} opacity="0.6" />
      <rect x="108" y="22" width="16" height="70" fill={isDark ? '#334155' : '#64748B'} opacity="0.65" />
      <rect x="126" y="38" width="12" height="54" fill={isDark ? '#1E293B' : '#94A3B8'} opacity="0.6" />
      <rect x="140" y="50" width="16" height="42" fill={isDark ? '#334155' : '#CBD5E1'} opacity="0.55" />

      {/* Soaring Birds */}
      <path d="M 148 24 Q 152 20 156 24 Q 160 20 164 24" stroke={isDark ? '#CBD5E1' : '#475569'} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 158 32 Q 161 28 164 32 Q 167 28 170 32" stroke={isDark ? '#CBD5E1' : '#475569'} strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* 3. Main Modern Building under Construction */}
      {/* Ground Floor Concrete Base & Plinth */}
      <rect x="42" y="86" width="116" height="44" fill="#F1F5F9" stroke="#334155" strokeWidth="2.4" />
      
      {/* Brick Masonry Infill Panels on Ground Floor */}
      <rect x="46" y="90" width="32" height="36" fill="url(#ascBrickGrad)" stroke="#7C2D12" strokeWidth="1" />
      <line x1="46" y1="99" x2="78" y2="99" stroke="#7C2D12" strokeWidth="1.2" />
      <line x1="46" y1="108" x2="78" y2="108" stroke="#7C2D12" strokeWidth="1.2" />
      <line x1="46" y1="117" x2="78" y2="117" stroke="#7C2D12" strokeWidth="1.2" />

      {/* Main Structural RCC Columns & Openings */}
      <rect x="82" y="90" width="38" height="36" fill={isDark ? '#070F1E' : '#0B1B3D'} stroke="#334155" strokeWidth="1" />
      <rect x="122" y="90" width="32" height="36" fill="url(#ascBrickGrad)" stroke="#7C2D12" strokeWidth="1" />
      <line x1="122" y1="99" x2="154" y2="99" stroke="#7C2D12" strokeWidth="1.2" />
      <line x1="122" y1="108" x2="154" y2="108" stroke="#7C2D12" strokeWidth="1.2" />
      <line x1="122" y1="117" x2="154" y2="117" stroke="#7C2D12" strokeWidth="1.2" />

      {/* Mid-Floor Slab Overhang */}
      <rect x="38" y="80" width="124" height="8" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.8" />

      {/* First Floor Construction Frame */}
      <rect x="50" y="50" width="100" height="32" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
      <rect x="54" y="54" width="28" height="25" fill={isDark ? '#070F1E' : '#0B1B3D'} />
      <rect x="86" y="54" width="28" height="25" fill="url(#ascBrickGrad)" />
      <rect x="118" y="54" width="28" height="25" fill={isDark ? '#070F1E' : '#0B1B3D'} />

      {/* Pitched Roof Trusses & Timber/Steel Rafters */}
      <polygon points="100,24 40,50 160,50" fill="#D97706" opacity="0.9" />
      <polygon points="100,26 46,48 154,48" fill={isDark ? '#0A1628' : '#F8FAFC'} />
      
      {/* Timber/Steel Roof Rafter Beams */}
      <line x1="100" y1="24" x2="40" y2="50" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="24" x2="160" y2="50" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <line x1="64" y1="40" x2="64" y2="50" stroke="#B45309" strokeWidth="2" />
      <line x1="82" y1="32" x2="82" y2="50" stroke="#B45309" strokeWidth="2" />
      <line x1="100" y1="24" x2="100" y2="50" stroke="#B45309" strokeWidth="2.5" />
      <line x1="118" y1="32" x2="118" y2="50" stroke="#B45309" strokeWidth="2" />
      <line x1="136" y1="40" x2="136" y2="50" stroke="#B45309" strokeWidth="2" />

      {/* 4. Steel Scaffolding System */}
      {/* Left Scaffolding */}
      <line x1="32" y1="36" x2="32" y2="130" stroke="url(#ascSteelPipe)" strokeWidth="2.4" />
      <line x1="46" y1="30" x2="46" y2="130" stroke="url(#ascSteelPipe)" strokeWidth="2.4" />
      <line x1="28" y1="50" x2="50" y2="50" stroke="url(#ascSteelPipe)" strokeWidth="2" />
      <line x1="28" y1="82" x2="50" y2="82" stroke="url(#ascSteelPipe)" strokeWidth="2" />
      <line x1="28" y1="114" x2="50" y2="114" stroke="url(#ascSteelPipe)" strokeWidth="2" />
      <line x1="32" y1="50" x2="46" y2="82" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2,1" />
      <line x1="46" y1="50" x2="32" y2="82" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2,1" />

      {/* Right Scaffolding */}
      <line x1="154" y1="34" x2="154" y2="130" stroke="url(#ascSteelPipe)" strokeWidth="2.4" />
      <line x1="168" y1="42" x2="168" y2="130" stroke="url(#ascSteelPipe)" strokeWidth="2.4" />
      <line x1="150" y1="50" x2="172" y2="50" stroke="url(#ascSteelPipe)" strokeWidth="2" />
      <line x1="150" y1="82" x2="172" y2="82" stroke="url(#ascSteelPipe)" strokeWidth="2" />
      <line x1="150" y1="114" x2="172" y2="114" stroke="url(#ascSteelPipe)" strokeWidth="2" />
      <line x1="154" y1="82" x2="168" y2="114" stroke="#64748B" strokeWidth="1.5" strokeDasharray="2,1" />

      {/* 5. Construction Workers in Safety Helmets & High-Vis */}
      {/* Worker on Roof (Hammering Rafter) */}
      <circle cx="108" cy="18" r="4.2" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" /> {/* Yellow Helmet */}
      <rect x="104" y="22" width="8" height="10" rx="2" fill="#EA580C" /> {/* High-vis vest */}
      <line x1="106" y1="32" x2="103" y2="39" stroke="#0F172A" strokeWidth="2.4" /> {/* Legs */}
      <line x1="110" y1="32" x2="114" y2="38" stroke="#0F172A" strokeWidth="2.4" />

      {/* Worker 2 on Right Roof slope */}
      <circle cx="132" cy="27" r="3.8" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />
      <rect x="128" y="31" width="8" height="9" rx="2" fill="#EA580C" />
      <line x1="130" y1="40" x2="127" y2="47" stroke="#0F172A" strokeWidth="2.4" />
      <line x1="134" y1="40" x2="138" y2="46" stroke="#0F172A" strokeWidth="2.4" />

      {/* Worker on 1st Floor Scaffolding */}
      <circle cx="39" cy="43" r="3.8" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />
      <rect x="35" y="47" width="8" height="9" rx="2" fill="#EA580C" />
      <line x1="37" y1="56" x2="36" y2="64" stroke="#0F172A" strokeWidth="2.4" />
      <line x1="41" y1="56" x2="42" y2="64" stroke="#0F172A" strokeWidth="2.4" />

      {/* 6. Foreground Construction Materials & Machinery */}
      {/* Ground Foundation Line */}
      <line x1="12" y1="130" x2="188" y2="130" stroke={isDark ? '#475569' : '#0F172A'} strokeWidth="4" strokeLinecap="round" />

      {/* Concrete Blocks Stack (Left) */}
      <g>
        <rect x="18" y="116" width="12" height="7" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
        <rect x="30" y="116" width="12" height="7" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />
        <rect x="24" y="109" width="12" height="7" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
        <rect x="18" y="123" width="12" height="7" fill="#64748B" stroke="#334155" strokeWidth="1" />
        <rect x="30" y="123" width="12" height="7" fill="#94A3B8" stroke="#334155" strokeWidth="1" />
      </g>

      {/* Sand Mound */}
      <path d="M 36 130 Q 50 112 64 130 Z" fill="#D4A373" stroke="#B08968" strokeWidth="1.2" />

      {/* Red Brick Stack */}
      <g>
        <rect x="68" y="114" width="22" height="5.5" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
        <rect x="68" y="119.5" width="22" height="5.5" fill="#B91C1C" stroke="#991B1B" strokeWidth="0.8" />
        <rect x="68" y="125" width="22" height="5" fill="#991B1B" stroke="#7F1D1D" strokeWidth="0.8" />
      </g>

      {/* Heavy Wheelbarrow */}
      <g>
        <path d="M 124 118 L 142 118 L 147 125 L 126 125 Z" fill="#475569" stroke="#0F172A" strokeWidth="1.2" />
        <circle cx="146" cy="126" r="3.8" fill="#0F172A" stroke="#CBD5E1" strokeWidth="0.8" />
        <line x1="122" y1="120" x2="117" y2="125" stroke="#0F172A" strokeWidth="1.8" />
        <line x1="128" y1="125" x2="128" y2="130" stroke="#0F172A" strokeWidth="1.8" />
      </g>

      {/* Golden Yellow Concrete Mixer Machine (Right) */}
      <g>
        {/* Stand / Frame */}
        <line x1="168" y1="120" x2="163" y2="130" stroke="#0F172A" strokeWidth="2.4" />
        <line x1="176" y1="120" x2="181" y2="130" stroke="#0F172A" strokeWidth="2.4" />
        <circle cx="164" cy="128" r="3.2" fill="#0F172A" />
        <circle cx="180" cy="128" r="3.2" fill="#0F172A" />

        {/* Engine box */}
        <rect x="160" y="111" width="9" height="10" fill="#D97706" stroke="#78350F" strokeWidth="1.2" />

        {/* Rotating Drum / Barrel (Tilted Golden Mixer) */}
        <path
          d="M 168 109 L 182 101 L 178 119 L 169 121 Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="1.4"
        />
        {/* Mixer Opening Mouth */}
        <ellipse cx="182" cy="105" rx="3.5" ry="6.5" fill="#78350F" stroke="#F59E0B" strokeWidth="1.2" transform="rotate(-15 182 105)" />
      </g>
    </svg>
  );

  /* Stylized 'A' Letter with Solid Golden Triangle as seen in the official logo */
  const StylizedA: React.FC<{ textColorClass: string; isSmall?: boolean }> = ({ textColorClass, isSmall }) => (
    <span className="relative inline-flex items-center justify-center font-heading font-black">
      {/* Outer Triangle/A shape */}
      <span className={textColorClass}>A</span>
      {/* Inner Solid Golden Triangle Accent */}
      <span
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3.5px] border-r-[3.5px] border-b-[6.5px] border-l-transparent border-r-transparent border-b-[#E58A1F] pointer-events-none"
        style={{
          borderBottomColor: '#E58A1F',
          marginBottom: isSmall ? '1px' : '2px'
        }}
      />
    </span>
  );

  /* Full Centered Stacked Logo (for Hero, About, Invoices, Modals) */
  if (isFull) {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Large Architectural Construction Emblem */}
        <div className="w-56 sm:w-64 md:w-80 h-auto mb-3 drop-shadow-lg">
          {ArchitecturalEmblemSVG}
        </div>

        {/* ABDUL SALAM with Triangular Golden 'A's */}
        <div className="flex items-center justify-center tracking-tight leading-none mt-1 font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          <StylizedA textColorClass={isDark ? 'text-white' : 'text-[#0B1B3D]'} />
          <span className={isDark ? 'text-white' : 'text-[#0B1B3D]'}>BDUL S</span>
          <StylizedA textColorClass={isDark ? 'text-white' : 'text-[#0B1B3D]'} />
          <span className={isDark ? 'text-white' : 'text-[#0B1B3D]'}>L</span>
          <StylizedA textColorClass={isDark ? 'text-white' : 'text-[#0B1B3D]'} />
          <span className={isDark ? 'text-white' : 'text-[#0B1B3D]'}>M</span>
        </div>

        {/* CONSTRUCTION COMPANY in Warm Amber / Gold */}
        <div className="text-xs sm:text-sm md:text-lg font-extrabold tracking-[0.25em] text-[#E58A1F] uppercase mt-1.5">
          CONSTRUCTION COMPANY
        </div>

        {/* WE BUILD YOUR VISION. with Flanking Rule Lines */}
        <div className="w-full max-w-xs sm:max-w-md flex items-center justify-center gap-3 mt-3">
          <div className={`flex-1 h-[2px] ${isDark ? 'bg-white/40' : 'bg-[#0B1B3D]/40'}`} />
          <span className={`text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] uppercase ${isDark ? 'text-slate-200' : 'text-[#0B1B3D]'}`}>
            WE BUILD YOUR VISION.
          </span>
          <div className={`flex-1 h-[2px] ${isDark ? 'bg-white/40' : 'bg-[#0B1B3D]/40'}`} />
        </div>
      </div>
    );
  }

  /* Emblem Only Variant */
  if (isEmblemOnly) {
    return (
      <div className={`${emblemSizes[size]} flex-shrink-0 ${className}`}>
        {ArchitecturalEmblemSVG}
      </div>
    );
  }

  /* Standard Horizontal Brand Logo (for Header, Sticky Bars, Cards) */
  return (
    <div className={`flex items-center gap-3 sm:gap-4 select-none ${className}`}>
      {/* Precision Construction Scene Emblem Icon - Crystal Clear & Prominent */}
      <div className={`${emblemSizes[size]} flex-shrink-0 flex items-center justify-center drop-shadow-sm`}>
        {ArchitecturalEmblemSVG}
      </div>

      {/* Typographic Identity */}
      {showText && (
        <div className="flex flex-col leading-none">
          {/* ABDUL SALAM with Triangular Golden 'A's */}
          <div className={`font-heading font-black tracking-tight flex items-baseline ${textSizes[size].title}`}>
            <StylizedA isSmall={size === 'sm'} textColorClass={isDark ? 'text-white' : 'text-[#0B1B3D]'} />
            <span className={isDark ? 'text-white' : 'text-[#0B1B3D]'}>BDUL S</span>
            <StylizedA isSmall={size === 'sm'} textColorClass={isDark ? 'text-white' : 'text-[#0B1B3D]'} />
            <span className={isDark ? 'text-white' : 'text-[#0B1B3D]'}>L</span>
            <StylizedA isSmall={size === 'sm'} textColorClass={isDark ? 'text-white' : 'text-[#0B1B3D]'} />
            <span className={isDark ? 'text-white' : 'text-[#0B1B3D]'}>M</span>
          </div>

          {/* CONSTRUCTION COMPANY */}
          <span className={`text-[#E58A1F] uppercase mt-1 ${textSizes[size].sub}`}>
            CONSTRUCTION COMPANY
          </span>

          {/* WE BUILD YOUR VISION Tagline */}
          <span className={`uppercase mt-1 ${textSizes[size].tag} ${
            isDark ? 'text-slate-300' : 'text-[#0B1B3D]'
          }`}>
            WE BUILD YOUR VISION.
          </span>
        </div>
      )}
    </div>
  );
};
