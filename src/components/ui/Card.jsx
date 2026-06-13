import React from 'react';
import { motion } from 'framer-motion';

const variantStyles = {
  default: [
    'bg-card-bg',
    'border border-card-border',
    'backdrop-blur-xl',
    'shadow-xl shadow-slate-200/20 dark:shadow-black/45',
  ].join(' '),
  solid: [
    'bg-surface-100 dark:bg-slate-900',
    'border border-surface-200 dark:border-slate-800',
    'shadow-xl shadow-slate-200/10 dark:shadow-black/50',
  ].join(' '),
  outlined: [
    'bg-transparent',
    'border border-card-border',
    'hover:border-slate-300 dark:hover:border-white/20',
  ].join(' '),
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * A glassmorphism card component with hover animations.
 *
 * @param {object} props
 * @param {'default'|'solid'|'outlined'} [props.variant='default']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.hoverable=false] – Adds a subtle lift + shadow on hover.
 * @param {string} [props.glowColor] – Tailwind color for a top-edge glow, e.g. 'indigo'.
 * @param {'none'|'sm'|'md'|'lg'} [props.padding='md']
 */
function Card({
  variant = 'default',
  className = '',
  children,
  hoverable = false,
  glowColor,
  padding = 'md',
  ...rest
}) {
  const hoverAnimation = hoverable
    ? {
        y: -4,
        scale: 1.01,
        boxShadow: '0 20px 40px -12px rgba(0,0,0,0.35)',
      }
    : {};

  // Map friendly color names to Tailwind-compatible gradient stops
  const glowGradient = glowColor
    ? `bg-gradient-to-r from-${glowColor}-500/60 via-${glowColor}-400/40 to-${glowColor}-500/60`
    : '';

  return (
    <motion.div
      whileHover={hoverAnimation}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={[
        'relative rounded-2xl overflow-hidden',
        'transition-colors duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        hoverable && 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/* Top-edge glow accent */}
      {glowColor && (
        <span
          className={[
            'pointer-events-none absolute inset-x-0 top-0 h-px',
            glowGradient,
          ].join(' ')}
          aria-hidden="true"
        />
      )}

      {/* Gradient border shimmer (default variant only) */}
      {variant === 'default' && (
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/[0.04] dark:ring-white/[0.07]"
          aria-hidden="true"
        />
      )}

      {children}
    </motion.div>
  );
}

Card.displayName = 'Card';

export { Card };
export default Card;
