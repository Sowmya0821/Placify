import React from 'react';
import { motion } from 'framer-motion';

/**
 * A beautiful loading component. Supports inline spinner and full-page glassmorphic loaders.
 *
 * @param {object} props
 * @param {boolean} [props.fullPage=false] - If true, fills the entire viewport with a glass overlay.
 * @param {string} [props.label] - Custom message text to display under loader.
 */
export function Loading({ fullPage = false, label = 'Loading...', className = '', ...rest }) {
  const loaderEl = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Premium Rotating Spinner */}
      <div className="relative h-12 w-12 flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-indigo-500/10 border-t-indigo-600 dark:border-t-indigo-400"
        />
        
        {/* Inner reverse-rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute h-8 w-8 rounded-full border border-violet-500/10 border-b-violet-500"
        />
        
        {/* Dot Core */}
        <span className="h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 animate-pulse" />
      </div>

      {label && (
        <span className="text-[10px] font-bold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-widest mt-4 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className={[
          'fixed inset-0 z-100 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-md',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loaderEl}
      </div>
    );
  }

  return (
    <div className={['flex justify-center items-center', className].join(' ')} {...rest}>
      {loaderEl}
    </div>
  );
}

export default Loading;
