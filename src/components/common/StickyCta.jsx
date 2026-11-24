// src/components/common/StickyCta.jsx
import React from 'react';

export default function StickyCta({
  children,
  primaryAction,
  secondaryAction,
  className = ''
}) {
  return (
    <div 
      className={`absolute left-0 right-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E2E2] flex items-center gap-3 ${className}`}
      style={{
        padding: '12px 16px calc(12px + var(--safe-bottom))',
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)'
      }}
    >
      {children ? (
        children
      ) : (
        <>
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
              className="flex-[4] min-w-0 h-12 rounded-[14px] bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-[#101417] text-[14px] font-bold transition-all truncate cursor-pointer shadow-2xs"
            >
              <span className="truncate">{secondaryAction.label}</span>
            </button>
          )}

          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className={`${secondaryAction ? 'flex-[6]' : 'flex-1'} min-w-0 h-12 rounded-[14px] bg-gradient-to-r from-[#F43F43] to-[#DC2626] hover:brightness-105 active:scale-[0.98] text-white text-[14px] font-bold shadow-md shadow-red-500/25 flex items-center justify-center gap-2 transition-all truncate cursor-pointer`}
            >
              <span className="truncate">{primaryAction.label}</span>
              {primaryAction.icon && <span className="shrink-0">{primaryAction.icon}</span>}
            </button>
          )}
        </>
      )}
    </div>
  );
}
