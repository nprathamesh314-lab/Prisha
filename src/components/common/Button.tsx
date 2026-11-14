import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  isExternal = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-px-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2.5',
    lg: 'text-base px-8 py-3.5 gap-3 shadow-md',
  };

  const variantStyles = {
    primary:
      'bg-px-primary hover:bg-px-violet text-white shadow-soft-purple hover:shadow-glow-purple border border-px-primary/30',
    secondary:
      'bg-px-deep hover:bg-px-primary text-white border border-px-deep/30 shadow-md',
    outline:
      'bg-transparent hover:bg-px-lavender/50 text-px-primary border-2 border-px-primary/40 hover:border-px-primary',
    white:
      'bg-white hover:bg-px-lavender text-px-deep hover:text-px-primary shadow-lg border border-white/50 font-bold',
    ghost:
      'bg-transparent hover:bg-px-lavender/40 text-px-dark hover:text-px-primary',
    glass:
      'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 shadow-lg',
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 1 }}
      className={combinedClasses}
      disabled={disabled}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};
