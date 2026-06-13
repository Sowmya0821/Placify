import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const toastIcons = {
  success: <CheckCircle2 size={16} className="text-success shrink-0" />,
  error: <AlertCircle size={16} className="text-danger shrink-0" />,
  warning: <AlertTriangle size={16} className="text-warning shrink-0" />,
  info: <Info size={16} className="text-indigo-500 shrink-0" />
};

const toastColors = {
  success: 'border-success/20 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-success/5 shadow-lg',
  error: 'border-danger/20 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-danger/5 shadow-lg',
  warning: 'border-warning/20 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-warning/5 shadow-lg',
  info: 'border-indigo-500/20 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-indigo-500/5 shadow-lg'
};

const glowAccents = {
  success: 'bg-success',
  error: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-indigo-500'
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed top-5 right-5 z-100 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`pointer-events-auto flex items-center justify-between border backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl overflow-hidden relative ${toastColors[t.type]}`}
            >
              {/* Left-edge color indicator bar */}
              <span className={`absolute left-0 top-0 bottom-0 w-1 ${glowAccents[t.type]}`} />
              
              <div className="flex items-center gap-3">
                {toastIcons[t.type]}
                <span className="text-xs font-semibold leading-normal">{t.message}</span>
              </div>
              
              <button
                onClick={() => removeToast(t.id)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-surface-400 hover:text-gray-900 dark:hover:text-white transition-colors ml-3 cursor-pointer"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
