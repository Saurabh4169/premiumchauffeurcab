// src/components/common/Select.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function Select({
  label,
  options = [], // [{ value: 'id', label: 'Title', sublabel?: 'Subtitle', icon?: Icon }]
  value,
  onChange,
  placeholder = 'Select an option',
  icon: Icon,
  className = '',
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`w-full relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#FAF5ED] mb-1.5 ml-1">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 rounded-2xl px-4 flex items-center justify-between transition-all duration-200 border bg-white/5 backdrop-blur-md text-left cursor-pointer ${
          isOpen
            ? 'border-[#BE8A44] ring-2 ring-[#BE8A44]/25 bg-white/8'
            : 'border-white/12 hover:border-white/25'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-3 truncate">
          {Icon && <Icon className="w-5 h-5 text-[#BE8A44] shrink-0" />}
          <div className="truncate">
            {selectedOption ? (
              <div>
                <span className="text-[14px] text-[#faf6f0] font-medium block truncate">
                  {selectedOption.label}
                </span>
                {selectedOption.sublabel && (
                  <span className="text-[11px] text-white/50 block truncate">
                    {selectedOption.sublabel}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[14px] text-white/35 font-normal">{placeholder}</span>
            )}
          </div>
        </div>

        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#BE8A44]' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl p-1.5 glass-panel-elevated border border-[#BE8A44]/30 shadow-2xl max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left flex items-center justify-between text-[13px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#BE8A44]/20 text-[#FAF5ED] font-semibold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.icon && <opt.icon className="w-4 h-4 text-[#BE8A44] shrink-0" />}
                  <div>
                    <p className="font-medium truncate">{opt.label}</p>
                    {opt.sublabel && <p className="text-[11px] text-white/45 truncate">{opt.sublabel}</p>}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#BE8A44] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
