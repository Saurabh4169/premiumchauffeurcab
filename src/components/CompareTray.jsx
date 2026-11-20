// src/components/CompareTray.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Scale, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { FLEET } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';

export default function CompareTray() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compareList, removeFromCompare, clearCompare, showToast } = useApp();

  // Hide tray on /compare itself or /book success
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
        className="absolute left-4 right-4 z-45"
        style={{
          bottom: 'calc(var(--tabbar-h) + 16px + var(--safe-bottom))'
        }}
      >
        <div 
          className="h-16 rounded-[20px] bg-white/95 backdrop-blur-md border border-[var(--border)] px-3.5 flex items-center justify-between gap-3 shadow-[var(--shadow-float)]"
        >
          {/* Thumbnails + count */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* 3 Slots */}
            <div className="flex items-center gap-1.5 shrink-0">
              {[0, 1, 2].map((slotIdx) => {
                const item = items[slotIdx];
                if (item) {
                  const img = item.image || item.photo;
                  return (
                    <div 
                      key={slotIdx}
                      className="relative w-10 h-10 rounded-[10px] overflow-hidden bg-slate-900 border border-[var(--border)] shrink-0"
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
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--ink)] text-white flex items-center justify-center cursor-pointer shadow-xs hover:bg-[var(--accent)] transition-colors"
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
                    className="w-10 h-10 rounded-[10px] border border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-subtle)] shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                );
              })}
            </div>

            <div className="min-w-0">
              <span className="text-[13px] font-bold text-[var(--ink)] block leading-tight truncate">
                {count} {type === 'vehicle' ? 'vehicles' : 'services'}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] block leading-tight">
                {count === 1 ? 'Pick 1 more' : 'Ready to compare'}
              </span>
            </div>
          </div>

          {/* Action buttons: Clear & Compare */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={clearCompare}
              className="text-[12px] font-semibold text-[var(--text-muted)] hover:text-[var(--ink)] px-2 py-1 cursor-pointer transition-colors"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleCompareClick}
              className={`h-10 px-4 rounded-full text-[13px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                count >= 2
                  ? 'btn-primary'
                  : 'bg-[var(--surface-muted)] text-[var(--text-muted)] cursor-not-allowed opacity-75'
              }`}
            >
              <Scale className="w-4 h-4 stroke-[2]" />
              <span>Compare</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
