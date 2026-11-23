// src/components/agent/widgets/DatePicker.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

export default function DatePickerWidget({ widget, answered, answeredValue, onSelect, onEdit }) {
  if (answered) {
    return (
      <AnsweredWidgetLine
        label="Date"
        value={answeredValue}
        onEdit={onEdit}
      />
    );
  }

  // Generate 7 upcoming days
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getTime() + i * 86400000);
    const iso = d.toISOString().split('T')[0];
    const weekday = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    days.push({ iso, weekday, monthDay });
  }

  return (
    <div className="bg-white rounded-[16px] p-3 border border-[#E2E2E2] shadow-xs my-2">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#555555] uppercase tracking-wider mb-2">
        <Calendar className="w-3.5 h-3.5 text-[#BE8A44]" />
        <span>Select Travel Date</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {days.map(d => (
          <button
            key={d.iso}
            type="button"
            onClick={() => onSelect(widget.id, 'date', `${d.weekday}, ${d.monthDay} (${d.iso})`)}
            className="flex flex-col items-center justify-center min-w-[70px] py-2 px-1.5 rounded-[12px] bg-[#FAF5ED] hover:bg-[#120F11] hover:text-white text-[#120F11] transition-all cursor-pointer border border-[#E2E2E2] group"
          >
            <span className="text-[11px] font-medium text-[#555555] group-hover:text-slate-300">
              {d.weekday}
            </span>
            <span className="text-[13px] font-bold mt-0.5">
              {d.monthDay}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
