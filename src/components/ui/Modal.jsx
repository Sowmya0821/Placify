import React from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 26 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

/**
 * An accessible modal dialog with Framer Motion animations and glassmorphism.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 */
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Centering wrapper */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              key="modal-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={[
                'w-full rounded-2xl',
                'bg-gray-900/80 backdrop-blur-2xl',
                'border border-white/10',
                'shadow-2xl shadow-black/40',
                'ring-1 ring-inset ring-white/[0.07]',
                'overflow-hidden',
                sizeStyles[size],
              ].join(' ')}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 pt-5 pb-0">
                  <DialogTitle className="text-lg font-semibold text-white">
                    {title}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={onClose}
                    className={[
                      'rounded-lg p-1.5',
                      'text-gray-400 hover:text-white',
                      'hover:bg-white/10',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                      'cursor-pointer',
                    ].join(' ')}
                    aria-label="Close dialog"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* If there is no title, render a standalone close button */}
              {!title && (
                <div className="flex justify-end px-6 pt-4 pb-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className={[
                      'rounded-lg p-1.5',
                      'text-gray-400 hover:text-white',
                      'hover:bg-white/10',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                      'cursor-pointer',
                    ].join(' ')}
                    aria-label="Close dialog"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Body */}
              <div className="px-6 py-5">{children}</div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

Modal.displayName = 'Modal';

export { Modal };
export default Modal;
