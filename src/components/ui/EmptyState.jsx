import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

/**
 * EmptyState component for showing empty results or clean initialization states.
 *
 * @param {object} props
 * @param {React.ComponentType} [props.icon] - Lucide icon component
 * @param {string} props.title - Main header text
 * @param {string} props.description - Supporting details
 * @param {object} [props.action] - Optional button configurations
 * @param {string} [props.action.label]
 * @param {function} [props.action.onClick]
 * @param {React.ReactNode} [props.customAction] - Custom button / elements override
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  customAction,
  className = '',
  ...rest
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={[
        'flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-3xl border-surface-200 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] max-w-md mx-auto relative overflow-hidden',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/* Decorative ambient background */}
      <div className="absolute top-[-50%] right-[-50%] w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Icon Frame */}
      {Icon && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 shadow-sm border border-indigo-500/15"
        >
          <Icon size={24} />
        </motion.div>
      )}

      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
        {title}
      </h3>
      <p className="text-xs text-surface-500 dark:text-surface-400 mt-2 max-w-xs leading-relaxed">
        {description}
      </p>

      {/* Custom Action or Action Button */}
      {customAction ? (
        <div className="mt-6">{customAction}</div>
      ) : (
        action && (
          <Button
            variant="secondary"
            size="sm"
            className="mt-6 border-indigo-500/30 text-indigo-605 dark:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )
      )}
    </motion.div>
  );
}

export default EmptyState;
