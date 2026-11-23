// src/components/common/Chip.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Chip({
  label,
  count,
  active = false,
  onClick,
  icon: Icon,
  className = ''
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`h-9 px-3.5 rounded-full text-[13px] font-semibold transition-all select-none cursor-pointer shrink-0 border inline-flex items-center gap-1.5 ${active
        ? 'bg-[#12100F] text-white border-[#12100F] shadow-xs'
        : 'bg-white text-slate-700 border-[#E2E2E2] hover:bg-slate-50 hover:border-slate-300 shadow-xs'
        } ${className}`}
    >
      {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-400'}`} />}
      <span className="leading-none whitespace-nowrap">{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.5 text-[11px] rounded-full font-bold leading-none ${active
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 text-slate-500'
            }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
