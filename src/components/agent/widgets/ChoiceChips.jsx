// src/components/agent/widgets/ChoiceChips.jsx
import React from 'react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

export default function ChoiceChips({ widget, answered, answeredValue, onSelect, onEdit }) {
  if (answered) {
    const selectedOption = widget.options.find(o => o.value === answeredValue);
    return (
      <AnsweredWidgetLine
        label="Service selected"
        value={selectedOption ? selectedOption.label : answeredValue}
        onEdit={onEdit}
      />
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5 my-2">
      {widget.options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(widget.id, widget.id, option.value)}
          className="px-3 py-2 rounded-[12px] text-[13px] font-medium bg-white border border-[#E2E2E2] text-[#120F11] hover:border-[#BE8A44] hover:text-[#BE8A44] hover:bg-[#FAF5ED]/50 active:scale-95 transition-all text-left shadow-xs cursor-pointer"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
