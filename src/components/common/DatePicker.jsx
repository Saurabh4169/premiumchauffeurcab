// src/components/common/DatePicker.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function DatePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  label = 'Pickup Date & Time',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const timeOptions = [
    '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'
  ];

  const setPreset = (daysOffset) => {
    const target = new Date();
    target.setDate(target.getDate() + daysOffset);
    onDateChange(target.toISOString().split('T')[0]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplay = () => {
    try {
      const parts = date ? date.split('-') : [];
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const dayStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        return `${dayStr} · ${time || '10:00 AM'}`;
      }
    } catch {
      // fallback
    }
    return `${date} · ${time}`;
  };

  return (
    <div className={`w-full relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[12px] font-semibold text-[#120F11] mb-1.5 ml-0.5">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 rounded-[14px] px-3.5 flex items-center justify-between border border-[#E2E2E2] bg-white shadow-xs hover:border-[#BE8A44] transition-all duration-200 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CalendarIcon className="w-4.5 h-4.5 text-[#BE8A44] shrink-0" />
          <div className="min-w-0">
            <span className="text-[14px] text-[#120F11] font-semibold block truncate leading-tight">
              {formatDisplay()}
            </span>
            <span className="text-[11px] text-emerald-600 block font-medium truncate mt-0.5">
              Flight tracking & 60m buffer included
            </span>
          </div>
        </div>
        <Clock className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-[16px] p-3.5 bg-white border border-[#E2E2E2] shadow-2xl">
          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 mb-3 pb-2.5 border-b border-[#E2E2E2] overflow-x-auto no-scrollbar">
            {['Today', 'Tomorrow', 'In 2 Days', 'Next Week'].map((lbl, idx) => (
              <button
                key={lbl}
                type="button"
                onClick={() => setPreset(idx === 0 ? 0 : idx === 1 ? 1 : idx === 2 ? 2 : 7)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[var(--accent-tint)] hover:text-[var(--accent)] text-[12px] text-slate-700 font-semibold transition-all cursor-pointer whitespace-nowrap"
              >
                {lbl}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <span className="block text-[11px] font-semibold text-[#555555] uppercase mb-1">Select Date</span>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] bg-slate-50 border border-[#E2E2E2] text-[#120F11] text-[13px] outline-none font-medium focus:border-[#BE8A44]"
              />
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-[#555555] uppercase mb-1">Select Time</span>
              <select
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="w-full h-10 px-3 rounded-[10px] bg-slate-50 border border-[#E2E2E2] text-[#120F11] text-[13px] outline-none font-medium focus:border-[#BE8A44]"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-primary h-9 px-4 rounded-[10px] text-[13px] font-semibold text-white cursor-pointer"
            >
              Set Date & Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
