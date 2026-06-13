import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variantStyles = {
  primary: [
    'bg-gradient-to-r from-primary to-secondary',
    'text-white',
    'shadow-lg shadow-primary/20 dark:shadow-primary/30',
    'hover:shadow-primary/35 dark:hover:shadow-primary/50',
    'hover:brightness-105',
    'border border-white/10',
    'backdrop-blur-sm',
  ].join(' '),
  secondary: [
    'bg-surface-100/80 dark:bg-white/5',
    'text-primary',
    'border border-surface-200 dark:border-primary/35',
    'hover:bg-primary/5 dark:hover:bg-primary/10',
    'hover:border-primary/50 dark:hover:border-primary/50',
    'backdrop-blur-sm',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-surface-650 dark:text-gray-300',
    'hover:bg-surface-100 dark:hover:bg-white/5',
    'hover:text-surface-900 dark:hover:text-white',
    'border border-transparent',
    'hover:border-surface-200 dark:hover:border-white/10',
  ].join(' '),
  danger: [
    'bg-gradient-to-r from-danger to-rose-600',
    'text-white',
    'shadow-lg shadow-danger/25',
    'hover:shadow-danger/40',
    'hover:brightness-105',
    'border border-white/10',
    'backdrop-blur-sm',
  ].join(' '),
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-7 py-3.5 text-base gap-2.5 rounded-xl',
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

/**
 * A versatile, animated button component with multiple variants and sizes.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'ghost'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.isLoading=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.disabled=false]
 */
const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className = '',
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? {} : { scale: 1.03, y: -1 }}
        whileTap={isDisabled ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        disabled={isDisabled}
        className={[
          'relative inline-flex items-center justify-center font-semibold',
          'transition-all duration-300 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
          'cursor-pointer select-none',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && 'opacity-50 cursor-not-allowed saturate-50',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {/* Glassmorphism hover overlay */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/0 transition-all duration-300 group-hover:bg-white/5"
          aria-hidden="true"
        />

        {/* Loading spinner */}
        {isLoading && (
          <Loader2
            size={iconSizes[size]}
            className="animate-spin shrink-0"
            aria-hidden="true"
          />
        )}

        {/* Left icon */}
        {!isLoading && LeftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {React.isValidElement(LeftIcon)
              ? LeftIcon
              : React.createElement(LeftIcon, { size: iconSizes[size] })}
          </span>
        )}

        {/* Label */}
        <span className={isLoading ? 'opacity-80' : ''}>{children}</span>

        {/* Right icon */}
        {RightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {React.isValidElement(RightIcon)
              ? RightIcon
              : React.createElement(RightIcon, { size: iconSizes[size] })}
          </span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
export default Button;
