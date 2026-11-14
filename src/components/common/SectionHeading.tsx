import React from 'react';
import { cn } from '../../utils/cn';
import { FadeIn } from '../animations/FadeIn';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  theme?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={cn('flex flex-col mb-12 md:mb-16', alignClass, className)}>
      {badge && (
        <FadeIn direction="down" duration={0.4}>
          <span
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border transition-colors',
              isDark
                ? 'bg-white/10 text-px-lavender border-white/20'
                : 'bg-px-lavender/80 text-px-primary border-px-border shadow-sm'
            )}
          >
            <span
              className={cn(
                'w-2 h-2 rounded-full animate-ping',
                isDark ? 'bg-purple-300' : 'bg-px-primary'
              )}
            />
            {badge}
          </span>
        </FadeIn>
      )}

      <FadeIn direction="up" delay={0.1} duration={0.5}>
        <h2
          className={cn(
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-4xl',
            isDark ? 'text-white' : 'text-px-dark'
          )}
        >
          {title}
        </h2>
      </FadeIn>

      {subtitle && (
        <FadeIn direction="up" delay={0.2} duration={0.5}>
          <p
            className={cn(
              'mt-3.5 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed',
              isDark ? 'text-gray-100 font-medium' : 'text-gray-700 font-normal'
            )}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
