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
      className={`absolute left-0 right-0 bottom-0 z-40 bg-white/94 backdrop-blur-md border-t border-[var(--border)] flex items-center gap-3 ${className}`}
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
              className="flex-[4] min-w-0 btn-secondary truncate"
            >
              <span className="truncate">{secondaryAction.label}</span>
            </button>
          )}

          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              className={`${secondaryAction ? 'flex-[6]' : 'flex-1'} min-w-0 btn-primary truncate`}
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
