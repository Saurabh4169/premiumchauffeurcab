// src/components/common/SectionHeader.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({
  titlePrefix = '',
  accentWord = '',
  titleSuffix = '',
  subtitle = '',
  actionText = '',
  actionLink = '',
  onActionClick,
  className = ''
}) {
  const fullTitle = [titlePrefix, accentWord, titleSuffix].filter(Boolean).join(' ');

  return (
    <div className={`flex items-end justify-between gap-3 mb-3 ${className}`}>
      <div>
        <h2 className="text-[20px] font-bold text-[var(--ink)] leading-[26px]">
          {fullTitle}
        </h2>
        {subtitle && <p className="text-[13px] text-[var(--text-muted)] mt-0.5 leading-[18px]">{subtitle}</p>}
      </div>

      {(actionText || onActionClick) && (
        actionLink ? (
          <Link
            to={actionLink}
            className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] hover:underline transition-colors shrink-0 pb-0.5"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onActionClick}
            className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] hover:underline transition-colors shrink-0 pb-0.5 cursor-pointer"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )
      )}
    </div>
  );
}
