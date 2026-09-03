import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  arrowDirection?: 'right' | 'up-right';
  isLoading?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<HTMLMotionProps<'button'>, keyof ButtonBaseProps | 'children'>;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  isLoading = false,
  href,
  className = '',
  children,
  onClick,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-heading font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none group overflow-hidden';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs uppercase tracking-wider',
    md: 'px-5 py-2.5 text-xs sm:text-sm uppercase tracking-wider',
    lg: 'px-7 py-3.5 text-sm sm:text-base uppercase tracking-wider'
  };

  const variantStyles = {
    primary:
      'bg-[#E58A1F] hover:bg-[#C87514] text-white border border-[#E58A1F] focus:ring-[#E58A1F] shadow-sm hover:shadow-md hover:shadow-[#E58A1F]/20',
    secondary:
      'bg-[#0B1B3D] hover:bg-[#07132B] text-white border border-[#0B1B3D] focus:ring-[#0B1B3D] shadow-sm hover:shadow-md hover:shadow-[#0B1B3D]/30',
    outline:
      'border-2 border-[#0B1B3D] text-[#0B1B3D] bg-transparent hover:bg-[#0B1B3D] hover:text-white focus:ring-[#0B1B3D] shadow-sm',
    white:
      'bg-white text-[#0B1B3D] hover:bg-[#F8FAFC] border border-gray-200 focus:ring-white shadow-sm hover:shadow-md',
    dark:
      'bg-[#070F1E] hover:bg-[#0B1B3D] text-white border border-[#1E3A5F] hover:border-[#E58A1F] focus:ring-[#E58A1F] shadow-sm',
    ghost:
      'text-[#0B1B3D] hover:text-[#E58A1F] hover:bg-[#E58A1F]/10'
  };

  const content = (
    <>
      {/* Subtle glossy sheen sweep on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin relative z-10" />
      ) : null}
      
      <span className="relative z-10">{children}</span>
      
      {showArrow && !isLoading && (
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1.5 relative z-10" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.025, y: -1 }}
        whileTap={{ scale: 0.975, y: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.025, y: -1 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.975, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  );
};
