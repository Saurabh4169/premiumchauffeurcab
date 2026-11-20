// src/components/common/BottomSheet.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePortalContainer } from '../../hooks/usePortalContainer.js';

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = 'max-h-[88%]'
}) {
  const container = usePortalContainer();

  if (!container) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Sheet (Anchors to bottom: 0, radius 24 top corners, max-height 88% of frame) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 400 }}
            className={`absolute bottom-0 left-0 right-0 z-50 rounded-t-[24px] bg-white border-t border-[var(--border)] shadow-2xl overflow-hidden flex flex-col ${maxHeight}`}
            style={{
              paddingBottom: 'calc(16px + var(--safe-bottom))'
            }}
          >
            {/* Drag handle */}
            <div className="pt-2.5 pb-1.5 flex justify-center cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>

            {/* Header (Subtitle 16/22/600 in Manrope) */}
            <div className="px-4 pb-3 flex items-center justify-between border-b border-[var(--border)] shrink-0">
              <div className="min-w-0 pr-2">
                <h3 className="text-[16px] font-bold text-[var(--ink)] leading-[22px] truncate">{title}</h3>
                {subtitle && <p className="text-[12px] text-[var(--text-muted)] leading-[16px] truncate mt-0.5">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--ink)] transition-all cursor-pointer shrink-0"
                aria-label="Close sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content (overflow-y-auto within sheet) */}
            <div className="px-4 py-3 overflow-y-auto flex-1 overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    container
  );
}
