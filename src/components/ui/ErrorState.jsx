import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from './Button';

/**
 * ErrorState component for displaying error responses and execution failures.
 * 
 * @param {object} props
 * @param {string} props.title - Error title
 * @param {string} props.message - Error message
 * @param {function} [props.onRetry] - Triggered on retry action
 * @param {string} [props.technicalDetails] - Hidden diagnostic details
 */
export function ErrorState({
  title,
  message,
  onRetry,
  technicalDetails,
  className = '',
  ...rest
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={[
        'flex flex-col items-center text-center p-8 border border-danger/15 rounded-3xl bg-danger/5 text-gray-900 dark:text-white max-w-md mx-auto relative overflow-hidden',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/* Icon Frame */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="h-14 w-14 rounded-2xl bg-danger/10 border border-danger/20 text-danger flex items-center justify-center mb-5 shadow-sm"
      >
        <AlertTriangle size={24} />
      </motion.div>

      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
        {title}
      </h3>
      <p className="text-xs text-surface-555 dark:text-surface-400 mt-2 max-w-xs leading-relaxed">
        {message}
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-6 w-full items-center">
        {onRetry && (
          <Button
            variant="danger"
            size="sm"
            className="w-fit"
            leftIcon={RotateCcw}
            onClick={onRetry}
          >
            Retry Operation
          </Button>
        )}

        {technicalDetails && (
          <div className="w-full mt-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-[10px] font-bold text-surface-450 dark:text-surface-500 uppercase hover:text-gray-900 dark:hover:text-white flex items-center gap-1 mx-auto cursor-pointer focus:outline-none"
            >
              <span>{showDetails ? 'Hide Diagnostics' : 'Show Diagnostics'}</span>
              <motion.span animate={{ rotate: showDetails ? 180 : 0 }}>
                <ChevronDown size={12} />
              </motion.span>
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <pre className="text-left bg-black/5 dark:bg-black/30 text-[9px] font-mono p-3 rounded-xl border border-danger/10 max-h-[140px] overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                    {technicalDetails}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ErrorState;
