// src/components/common/Toast.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-[var(--danger)] shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-[var(--accent)] shrink-0" />;
    }
  };

  return (
    <div 
      className="absolute left-4 right-4 z-55 flex flex-col items-center gap-2 pointer-events-none select-none"
      style={{
        bottom: 'calc(var(--tabbar-h) + 12px + var(--safe-bottom))',
        maxWidth: 'calc(100% - 32px)'
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[380px] bg-[var(--ink)] text-white rounded-[16px] px-3.5 py-2.5 flex items-center justify-between gap-2.5 shadow-[var(--shadow-float)] border border-white/10 pointer-events-auto"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getIcon(toast.type)}
              <p className="text-[13px] font-semibold text-white tracking-tight truncate">
                {toast.message}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action.onClick?.();
                    dismissToast(toast.id);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[12px] font-bold text-white transition-colors cursor-pointer"
                >
                  {toast.action.label}
                </button>
              )}
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="w-5 h-5 rounded-full hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
