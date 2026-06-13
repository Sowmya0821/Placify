import React, { forwardRef, useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A styled text input with label, error handling, and icon support.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.helperText]
 * @param {React.ElementType} [props.leftIcon]
 * @param {React.ElementType} [props.rightIcon]
 * @param {string} [props.className]
 */
const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = '',
      id: externalId,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = externalId || autoId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const [isFocused, setIsFocused] = useState(false);

    const hasError = Boolean(error);

    return (
      <div className={['flex flex-col gap-1.5', className].join(' ')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={[
              'text-sm font-medium transition-colors duration-200',
              hasError ? 'text-red-500 dark:text-red-400' : isFocused ? 'text-indigo-600 dark:text-indigo-400' : 'text-surface-600 dark:text-surface-400',
            ].join(' ')}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Animated focus ring */}
          <motion.div
            className={[
              'pointer-events-none absolute -inset-px rounded-xl',
              hasError
                ? 'ring-2 ring-red-500/50'
                : 'ring-2 ring-indigo-500/50',
            ].join(' ')}
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Left icon */}
          {LeftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 dark:text-gray-500">
              {React.isValidElement(LeftIcon) ? (
                LeftIcon
              ) : (
                <LeftIcon size={18} />
              )}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError || undefined}
            aria-describedby={
              [hasError && errorId, helperText && helperId]
                .filter(Boolean)
                .join(' ') || undefined
            }
            onFocus={(e) => {
              setIsFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              rest.onBlur?.(e);
            }}
            className={[
              'w-full rounded-xl bg-surface-100/50 dark:bg-white/5 backdrop-blur-sm',
              'border text-surface-900 dark:text-white placeholder-surface-400 dark:placeholder-surface-500',
              'text-sm leading-6 py-2.5',
              'outline-none transition-all duration-200',
              'focus:bg-white dark:focus:bg-white/[0.08]',
              LeftIcon ? 'pl-10' : 'pl-4',
              RightIcon ? 'pr-10' : 'pr-4',
              hasError
                ? 'border-red-500 text-red-905 dark:border-red-500/60 dark:text-red-100'
                : 'border-surface-200 hover:border-surface-300 focus:border-primary dark:border-white/10 dark:hover:border-white/20 dark:focus:border-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            ].join(' ')}
            {...rest}
          />

          {/* Right icon */}
          {RightIcon && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {React.isValidElement(RightIcon) ? (
                RightIcon
              ) : (
                <RightIcon size={18} />
              )}
            </span>
          )}
        </div>

        {/* Error / helper text */}
        <AnimatePresence mode="wait">
          {hasError ? (
            <motion.p
              key="error"
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-red-400 flex items-center gap-1"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </motion.p>
          ) : helperText ? (
            <motion.p
              key="helper"
              id={helperId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-gray-500"
            >
              {helperText}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export default Input;
