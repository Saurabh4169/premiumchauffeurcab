// src/components/common/CompactHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CompactHeader({
  title,
  showBack = true,
  onBack = null,
  rightAction = null,
  className = ''
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <header 
      className={`sticky top-0 z-30 w-full h-[52px] bg-[var(--page)]/95 backdrop-blur-md border-b border-[var(--border)] px-4 flex items-center justify-between gap-3 ${className}`}
    >
      <div className="w-10 flex items-center shrink-0">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink)] transition-all cursor-pointer border border-[var(--border)] shadow-[var(--shadow-card)]"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex-1 text-center min-w-0">
        {title && (
          <h2 className="text-[16px] font-bold text-[var(--ink)] truncate">
            {title}
          </h2>
        )}
      </div>

      <div className="w-10 flex items-center justify-end shrink-0">
        {rightAction}
      </div>
    </header>
  );
}
