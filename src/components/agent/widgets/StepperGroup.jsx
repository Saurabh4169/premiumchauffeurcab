// src/components/agent/widgets/StepperGroup.jsx
import React, { useState } from 'react';
import { Users, Briefcase, Plus, Minus, Check } from 'lucide-react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

export default function StepperGroupWidget({ widget, answered, answeredValue, onSelect, onEdit }) {
  const [pax, setPax] = useState(widget.passengers || 2);
  const [bags, setBags] = useState(widget.luggage || 2);

  if (answered) {
    const valText = typeof answeredValue === 'object'
      ? `${answeredValue.passengers} passengers · ${answeredValue.luggage} bags`
      : answeredValue;
    return (
      <AnsweredWidgetLine
        label="Group Capacity"
        value={valText}
        onEdit={onEdit}
      />
    );
  }

  const handleConfirm = () => {
    onSelect(widget.id, 'capacity', { passengers: pax, luggage: bags });
  };

  return (
    <div className="bg-white rounded-[16px] p-3.5 border border-[#E8E8EC] shadow-xs my-2 space-y-3">
      {/* Passengers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-rose-50 flex items-center justify-center text-[#F43F43]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[13px] font-bold text-[#101417] block">Passengers</span>
            <span className="text-[11px] text-[#6B7075]">Seats required</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={pax <= 1}
            onClick={() => setPax(p => Math.max(1, p - 1))}
            className="w-7 h-7 rounded-full bg-[#F5F5F7] border border-[#E8E8EC] flex items-center justify-center text-[#101417] disabled:opacity-40 hover:bg-slate-200 cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[14px] font-bold text-[#101417] w-5 text-center">{pax}</span>
          <button
            type="button"
            disabled={pax >= 56}
            onClick={() => setPax(p => p + 1)}
            className="w-7 h-7 rounded-full bg-[#F5F5F7] border border-[#E8E8EC] flex items-center justify-center text-[#101417] disabled:opacity-40 hover:bg-slate-200 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="border-t border-[#E8E8EC]" />

      {/* Luggage */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-slate-100 flex items-center justify-center text-[#6B7075]">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[13px] font-bold text-[#101417] block">Luggage Bags</span>
            <span className="text-[11px] text-[#6B7075]">Large checked suitcases</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={bags <= 0}
            onClick={() => setBags(b => Math.max(0, b - 1))}
            className="w-7 h-7 rounded-full bg-[#F5F5F7] border border-[#E8E8EC] flex items-center justify-center text-[#101417] disabled:opacity-40 hover:bg-slate-200 cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[14px] font-bold text-[#101417] w-5 text-center">{bags}</span>
          <button
            type="button"
            disabled={bags >= 56}
            onClick={() => setBags(b => b + 1)}
            className="w-7 h-7 rounded-full bg-[#F5F5F7] border border-[#E8E8EC] flex items-center justify-center text-[#101417] disabled:opacity-40 hover:bg-slate-200 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="w-full h-9 rounded-[10px] bg-[#101417] text-white hover:bg-[#F43F43] font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs mt-1"
      >
        <Check className="w-4 h-4" />
        <span>Confirm Capacity ({pax} pax, {bags} bags)</span>
      </button>
    </div>
  );
}
