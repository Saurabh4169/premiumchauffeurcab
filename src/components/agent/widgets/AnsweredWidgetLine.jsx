// src/components/agent/widgets/AnsweredWidgetLine.jsx
import React from 'react';
import { Check, Edit2 } from 'lucide-react';

export default function AnsweredWidgetLine({ label, value, onEdit }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-3 bg-[#F5F5F7] border border-[#E8E8EC] rounded-[10px] text-[12px] text-[#6B7075] my-1">
      <div className="flex items-center gap-1.5 truncate">
        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="font-medium text-[#101417] truncate">{value || label}</span>
      </div>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#F43F43] hover:underline cursor-pointer shrink-0 ml-2"
        >
          <Edit2 className="w-3 h-3" />
          <span>Edit</span>
        </button>
      )}
    </div>
  );
}
