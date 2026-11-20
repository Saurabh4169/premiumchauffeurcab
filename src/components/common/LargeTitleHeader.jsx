// src/components/common/LargeTitleHeader.jsx
import React from 'react';

export default function LargeTitleHeader({
  title,
  subtitle,
  rightAction = null,
  className = ''
}) {
  return (
    <div className={`px-4 pt-3 pb-2 flex items-start justify-between gap-3 ${className}`}>
      <div className="min-w-0 flex-1">
        <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[var(--ink)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-[18px]">
            {subtitle}
          </p>
        )}
      </div>

      {rightAction && (
        <div className="shrink-0 pt-0.5">
          {rightAction}
        </div>
      )}
    </div>
  );
}
