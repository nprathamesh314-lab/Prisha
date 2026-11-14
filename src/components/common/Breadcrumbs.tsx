import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  theme?: 'dark' | 'light';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex items-center text-xs font-semibold py-1.5 px-3.5 rounded-full backdrop-blur-md border ${
        isDark
          ? 'bg-white/10 text-px-lavender border-white/20'
          : 'bg-px-lavender/80 text-px-primary border-px-border'
      } ${className}`}
    >
      <ol className="flex items-center space-x-1.5">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-1 transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-px-deep'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight
                className={`w-3.5 h-3.5 ${
                  isDark ? 'text-purple-300/60' : 'text-px-muted'
                }`}
              />
              {isLast || !item.href ? (
                <span
                  className={
                    isDark ? 'text-white font-bold' : 'text-px-dark font-bold'
                  }
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={`transition-colors ${
                    isDark ? 'hover:text-white' : 'hover:text-px-deep'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
