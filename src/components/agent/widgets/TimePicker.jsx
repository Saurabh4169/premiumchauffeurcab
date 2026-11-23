// src/components/agent/widgets/TimePicker.jsx
import React from 'react';
import { Clock } from 'lucide-react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

const POPULAR_TIMES = [
  '5:00 AM', '6:30 AM', '8:00 AM', '9:30 AM',
  '11:00 AM', '1:30 PM', '3:00 PM', '5:30 PM',
  '7:00 PM', '9:00 PM'
];

export default function TimePickerWidget({ widget, answered, answeredValue, onSelect, onEdit }) {
  if (answered) {
    return (
      <AnsweredWidgetLine
        label="Pickup Time"
        value={answeredValue}
        onEdit={onEdit}
      />
    );
  }

  return (
    <div className="bg-white rounded-[16px] p-3 border border-[#E2E2E2] shadow-xs my-2">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#555555] uppercase tracking-wider mb-2">
        <Clock className="w-3.5 h-3.5 text-[#BE8A44]" />
        <span>Select Chauffeur Staging Time</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {POPULAR_TIMES.map(timeStr => (
          <button
            key={timeStr}
            type="button"
            onClick={() => onSelect(widget.id, 'time', timeStr)}
            className="py-1.5 px-2 rounded-[10px] text-center text-[12px] font-semibold bg-[#FAF5ED] hover:bg-[#120F11] hover:text-white text-[#120F11] transition-colors border border-[#E2E2E2] cursor-pointer"
          >
            {timeStr}
          </button>
        ))}
      </div>
    </div>
  );
}
