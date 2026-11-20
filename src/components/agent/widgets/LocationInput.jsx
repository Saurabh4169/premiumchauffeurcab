// src/components/agent/widgets/LocationInput.jsx
import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

const QUICK_AIRPORTS = [
  { code: 'ORD', name: "O'Hare (ORD)" },
  { code: 'MDW', name: 'Midway (MDW)' },
  { code: 'JFK', name: 'JFK New York' },
  { code: 'LGA', name: 'LaGuardia (LGA)' },
  { code: 'EWR', name: 'Newark (EWR)' },
  { code: 'MIA', name: 'Miami (MIA)' },
  { code: 'ATL', name: 'Atlanta (ATL)' },
  { code: 'LAX', name: 'Los Angeles (LAX)' }
];

export default function LocationInput({ widget, answered, answeredValue, onSelect, onEdit }) {
  const [val, setVal] = useState('');

  if (answered) {
    return (
      <AnsweredWidgetLine
        label={widget.id === 'pickup' ? 'Pickup' : 'Destination'}
        value={answeredValue}
        onEdit={onEdit}
      />
    );
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (val.trim()) {
      onSelect(widget.id, widget.id, val.trim());
      setVal('');
    }
  };

  const handleQuickSelect = (locName) => {
    onSelect(widget.id, widget.id, locName);
  };

  return (
    <div className="bg-white rounded-[16px] p-3 border border-[#E8E8EC] shadow-xs my-2 space-y-2">
      {/* Quick Airport / Landmark Chips */}
      <div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7075] block mb-1.5">
          Quick Select Airport / Hub
        </span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_AIRPORTS.map(air => (
            <button
              key={air.code}
              type="button"
              onClick={() => handleQuickSelect(air.name)}
              className="px-2.5 py-1 rounded-[8px] bg-[#F5F5F7] hover:bg-[#101417] hover:text-white text-[#101417] text-[11px] font-semibold transition-colors shrink-0 cursor-pointer"
            >
              {air.code}
            </button>
          ))}
        </div>
      </div>

      {/* Manual text input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F43F43]" />
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={widget.placeholder || "Enter street address, hotel, or code..."}
            className="w-full h-9.5 pl-8 pr-3 bg-[#F5F5F7] rounded-[10px] text-[13px] text-[#101417] placeholder:text-[#9EA3A8] focus:outline-none focus:ring-1 focus:ring-[#F43F43] border border-transparent focus:border-[#F43F43]"
          />
        </div>
        <button
          type="submit"
          disabled={!val.trim()}
          className="h-9.5 px-3 rounded-[10px] bg-[#101417] text-white hover:bg-[#F43F43] disabled:opacity-40 disabled:hover:bg-[#101417] text-[13px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
