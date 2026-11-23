// src/components/common/EmptyState.jsx
import React from 'react';
import { Car, ArrowRight } from 'lucide-react';

export default function EmptyState({
  title = 'No items found',
  description = 'There are currently no items matching your criteria.',
  icon: Icon = Car,
  actionText,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#FAF5ED] text-[#BE8A44] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-[13px] text-slate-500 max-w-[280px] mb-5 leading-relaxed font-medium">
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-coral-primary px-5 py-2.5 rounded-full text-[13px] font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
