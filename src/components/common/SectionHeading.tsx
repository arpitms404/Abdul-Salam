import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightWords?: string[];
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightWords = [],
  description,
  align = 'center',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  // Helper to highlight specific words
  const renderHighlightedTitle = () => {
    if (!highlightWords || highlightWords.length === 0) {
      return title;
    }

    // Split title by words and highlight matches
    const parts = title.split(new RegExp(`(${highlightWords.join('|')})`, 'gi'));
    return parts.map((part, idx) => {
      const isMatch = highlightWords.some(
        (word) => word.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span key={idx} className="text-[#E58A1F]">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase mb-3.5 border ${
            isDark
              ? 'bg-[#0B1B3D] text-[#E58A1F] border-[#1E3A5F]'
              : 'bg-[#E58A1F]/10 text-[#0B1B3D] border-[#E58A1F]/30'
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[#E58A1F] inline-block" />
          {badge}
        </div>
      )}

      <h2
        className={`font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
          isDark ? 'text-white' : 'text-[#0B1B3D]'
        }`}
      >
        {renderHighlightedTitle()}
      </h2>

      {description && (
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          } ${isCenter ? 'max-w-2xl mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
