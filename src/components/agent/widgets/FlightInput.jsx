// src/components/agent/widgets/FlightInput.jsx
import React, { useState } from 'react';
import { Plane, ArrowRight } from 'lucide-react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

export default function FlightInputWidget({ widget, answered, answeredValue, onSelect, onEdit }) {
  const [flight, setFlight] = useState('');

  if (answered) {
    return (
      <AnsweredWidgetLine
        label="Flight Info"
        value={answeredValue}
        onEdit={onEdit}
      />
    );
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (flight.trim()) {
      onSelect(widget.id, 'flightNumber', flight.trim());
    }
  };

  const handleSkip = () => {
    onSelect(widget.id, 'flightNumber', 'Flight details to be provided later');
  };

  return (
    <div className="bg-white rounded-[16px] p-3 border border-[#E8E8EC] shadow-xs my-2 space-y-2">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6B7075] uppercase tracking-wider">
        <Plane className="w-3.5 h-3.5 text-[#F43F43]" />
        <span>Airline & Flight Number</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={flight}
          onChange={(e) => setFlight(e.target.value.toUpperCase())}
          placeholder="e.g. UA 1422 or AA 841"
          className="flex-1 h-9.5 px-3 bg-[#F5F5F7] rounded-[10px] text-[13px] font-semibold uppercase text-[#101417] placeholder:normal-case placeholder:font-normal placeholder:text-[#9EA3A8] focus:outline-none focus:ring-1 focus:ring-[#F43F43] border border-transparent focus:border-[#F43F43]"
        />
        <button
          type="submit"
          disabled={!flight.trim()}
          className="h-9.5 px-3 rounded-[10px] bg-[#101417] text-white hover:bg-[#F43F43] disabled:opacity-40 disabled:hover:bg-[#101417] text-[13px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <button
        type="button"
        onClick={handleSkip}
        className="text-[11px] text-[#6B7075] hover:text-[#101417] hover:underline cursor-pointer block text-center w-full pt-1"
      >
        I do not have my flight number yet (skip)
      </button>
    </div>
  );
}
