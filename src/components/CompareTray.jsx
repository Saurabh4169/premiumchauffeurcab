// src/components/CompareTray.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { FLEET } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';

export default function CompareTray() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compareList, removeFromCompare, clearCompare, showToast } = useApp();

  // Hide tray on /compare itself or /book success or dispatch
  if (location.pathname === '/compare' || location.pathname === '/book/success' || location.pathname.startsWith('/dispatch')) {
    return null;
  }

  const count = compareList.ids.length;
  if (count === 0) return null;

  const type = compareList.type; // 'vehicle' | 'service'

  // Resolve items
  const items = compareList.ids.map(id => {
    if (type === 'vehicle') {
      return FLEET.find(v => v.id === id);
    }
    return SERVICES.find(s => s.slug === id || s.id === id);
  }).filter(Boolean);

  const handleCompareClick = () => {
    if (count < 2) {
      showToast('Pick at least 2 to compare', 'warning');
      return;
    }
    navigate(`/compare?type=${type}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute left-3 right-3 z-45"
        style={{
          bottom: 'calc(var(--tabbar-h) + 12px + var(--safe-bottom))'
        }}
      >
        <div 
          className="h-15 rounded-[18px] bg-white/95 backdrop-blur-md border border-[#E8E8EC] px-3 flex items-center justify-between gap-2 shadow-xl shadow-black/8"
        >
          {/* Thumbnails + Counter */}
          <div className="flex items-center gap-2 min-w-0">
            {/* 3 Slots */}
            <div className="flex items-center gap-1.5 shrink-0">
              {[0, 1, 2].map((slotIdx) => {
                const item = items[slotIdx];
                if (item) {
                  const img = item.image || item.photo;
                  return (
                    <div 
                      key={slotIdx}
                      className="relative w-9 h-9 rounded-[9px] overflow-hidden bg-slate-900 border border-[#E8E8EC] shrink-0"
                    >
                      <img 
                        src={img} 
                        alt={item.name || item.title}
                        className="w-full h-full object-cover" 
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCompare(item.id || item.slug);
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#101417] text-white flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#F43F43] transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-2.5 h-2.5 stroke-[3]" />
                      </button>
                    </div>
                  );
                }

                return (
                  <div 
                    key={slotIdx}
                    className="w-9 h-9 rounded-[9px] border border-dashed border-[#D1D1D6] flex items-center justify-center text-[#9E9EA7] shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                );
              })}
            </div>

            {/* Non-overlapping text description */}
            <div className="min-w-0 pl-1">
              <span className="text-[12px] font-bold text-[#101417] block leading-tight truncate">
                {count} {type === 'vehicle' ? 'selected' : 'services'}
              </span>
              <span className="text-[10px] text-[#6B7075] font-medium block leading-tight truncate">
                {count === 1 ? 'Add 1 more' : 'Ready to compare'}
              </span>
            </div>
          </div>

          {/* Action buttons: Clear & Compare (RED button) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={clearCompare}
              className="text-[11.5px] font-semibold text-[#6B7075] hover:text-[#101417] px-1.5 py-1 cursor-pointer transition-colors"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleCompareClick}
              disabled={count < 2}
              className={`h-9 px-3.5 rounded-full text-[12.5px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                count >= 2
                  ? 'bg-gradient-to-r from-[#F43F43] to-[#DC2626] hover:from-[#E02E32] hover:to-[#C51F23] text-white shadow-rose-500/25 active:scale-95'
                  : 'bg-[#F5F5F7] text-[#9E9EA7] cursor-not-allowed opacity-75'
              }`}
            >
              <Scale className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Compare</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
