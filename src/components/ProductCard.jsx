// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Heart, ArrowRight, Check, Car } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const VEHICLE_CODES = {
  'cadillac-xts': 'PCS-VEH-01',
  'mercedes-s-class': 'PCS-VEH-02',
  'bmw-i7': 'PCS-VEH-03',
  'cadillac-escalade-esv': 'PCS-VEH-04',
  'chevrolet-suburban': 'PCS-VEH-05',
  'lincoln-navigator-l': 'PCS-VEH-06',
  'lincoln-mkt-stretch': 'PCS-VEH-07',
  'hummer-h2-stretch': 'PCS-VEH-08',
  'mercedes-jet-sprinter': 'PCS-VEH-09',
  'party-bus-20': 'PCS-VEH-10',
  'limo-bus-24': 'PCS-VEH-11',
  'party-bus-28': 'PCS-VEH-12',
  'executive-bus-36': 'PCS-VEH-13',
  'luxury-coach-56': 'PCS-VEH-14'
};

const VEHICLE_CATEGORY_LABELS = {
  sedans: 'Sedan',
  suvs: 'SUV',
  limousines: 'Limousine',
  sprinter: 'Sprinter',
  buses: 'Bus or coach'
};

export default function ProductCard({
  item,
  type = 'vehicle', // 'vehicle' | 'service'
  variant = 'grid', // 'grid' | 'scroll' | 'list' | 'skeleton'
  isSelectable = false,
  isSelected = false,
  onSelect = null,
  className = ''
}) {
  const navigate = useNavigate();
  const { isSaved, toggleSave, isInCompare, toggleCompare, updateBookingDraft } = useApp();
  const [imgError, setImgError] = useState(false);

  // SKELETON VARIANT
  if (variant === 'skeleton') {
    return (
      <div className={`bg-white rounded-[16px] overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)] animate-pulse flex flex-col justify-between ${variant === 'scroll' ? 'w-[155px] shrink-0' : 'w-full'} ${className}`}>
        <div>
          <div className="aspect-[16/10] w-full bg-[var(--surface-muted)]" />
          <div className="p-2.5 space-y-1">
            <div className="flex justify-between">
              <div className="h-2.5 w-14 bg-[var(--surface-muted)] rounded" />
              <div className="h-2.5 w-8 bg-[var(--surface-muted)] rounded" />
            </div>
            <div className="h-3.5 w-full bg-[var(--surface-muted)] rounded mt-1" />
            <div className="h-3.5 w-3/4 bg-[var(--surface-muted)] rounded" />
          </div>
        </div>
        <div className="px-2.5 pb-2.5">
          <div className="h-[1px] w-full bg-[var(--border)] my-1" />
          <div className="flex justify-between items-center">
            <div className="h-2.5 w-10 bg-[var(--surface-muted)] rounded" />
            <div className="h-2.5 w-8 bg-[var(--surface-muted)] rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const itemId = item.id || item.slug;
  const title = item.name || item.title;
  const image = item.image || item.photo;

  // Code & Spec Mapping
  const code = type === 'vehicle'
    ? (VEHICLE_CODES[item.id] || item.code || 'PCS-VEH-01')
    : (item.code || 'PCS-SRV-01');

  const keySpec = type === 'vehicle'
    ? `${item.passengers || 3} pax`
    : (item.pricing || 'Fixed quote');

  const category = type === 'vehicle'
    ? (VEHICLE_CATEGORY_LABELS[item.category] || item.categoryLabel || 'Chauffeur')
    : (item.category || 'Chauffeur');

  const badge = item.badge || (type === 'vehicle' && item.bestFor ? 'Flight tracked' : null);

  const saved = isSaved(type, itemId);
  const inCompare = isInCompare(itemId);

  const handleCardClick = () => {
    if (isSelectable && onSelect) {
      onSelect(item);
      return;
    }
    if (type === 'vehicle') {
      navigate(`/fleet/${itemId}`);
    } else {
      navigate(`/services/${itemId}`);
    }
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    toggleCompare(type, itemId, title);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    toggleSave(type, itemId, title);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    if (type === 'vehicle') {
      updateBookingDraft({ selectedVehicleId: itemId });
    } else {
      updateBookingDraft({ serviceType: item.slug || itemId });
    }
    navigate('/book');
  };

  // LIST VARIANT (Flush image on left, content on right)
  if (variant === 'list') {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={handleCardClick}
        className={`bg-white rounded-[16px] overflow-hidden border shadow-[var(--shadow-card)] flex items-stretch cursor-pointer select-none group transition-all ${
          inCompare ? 'border-[1.5px] border-[var(--ink)]' : isSelected ? 'border-[1.5px] border-[var(--accent)] ring-1 ring-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--accent)]/40'
        } ${className}`}
      >
        {/* Left Flush Image (No white gutter around image) */}
        <div className="relative w-[102px] min-h-[102px] bg-slate-900 shrink-0 overflow-hidden">
          {!imgError ? (
            <img
              src={image}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white/40">
              <Car className="w-8 h-8" />
            </div>
          )}

          {/* Save & Compare buttons in list thumbnail */}
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={handleCompareClick}
              aria-pressed={inCompare}
              aria-label={`Add ${title} to compare`}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                inCompare
                  ? 'bg-[var(--ink)] text-white'
                  : 'bg-white/80 backdrop-blur-xs text-[var(--ink)] hover:bg-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              aria-pressed={saved}
              aria-label={`Save ${title}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                saved
                  ? 'bg-[var(--accent)] text-white fill-white'
                  : 'bg-white/80 backdrop-blur-xs text-[var(--ink)] hover:bg-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-white text-white' : 'text-[var(--ink)]'}`} />
            </button>
          </div>

          {badge && (
            <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[var(--ink)]/65 backdrop-blur-xs text-[10px] font-semibold text-white truncate max-w-[85%]">
              {badge}
            </span>
          )}
        </div>

        {/* Right Details Container */}
        <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-0.5">
              <span className="font-bold uppercase tracking-[0.04em] text-[var(--accent)] tabular-nums truncate">
                {code}
              </span>
              <span className="font-bold text-[var(--ink)] shrink-0">
                {keySpec}
              </span>
            </div>
            <h3 className="text-[14px] font-bold text-[var(--ink)] leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
              {title}
            </h3>
          </div>

          <div>
            <div className="h-[1px] w-full bg-[var(--border)] my-1.5" />
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-medium text-[var(--text-muted)] truncate max-w-[100px]">
                {category}
              </span>
              <button
                type="button"
                onClick={handleBookClick}
                className="h-7 px-3 rounded-[8px] bg-[var(--ink)] hover:bg-[var(--accent)] text-white text-[12px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <span>Book</span>
                <ArrowRight className="w-3 h-3 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // GRID & SCROLL VARIANTS (Compact Mobile Edition - Proportional Height)
  const isScroll = variant === 'scroll';

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`bg-white rounded-[16px] overflow-hidden border shadow-[var(--shadow-card)] flex flex-col justify-between cursor-pointer select-none group transition-all ${
        isScroll ? 'w-[155px] shrink-0' : 'w-full'
      } ${
        inCompare ? 'border-[1.5px] border-[var(--ink)]' : 'border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-md'
      } ${className}`}
    >
      <div>
        {/* Flush Edge-to-Edge Image (Natural 16:10 automotive proportion) */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          {!imgError ? (
            <img
              src={image}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white/40">
              <Car className="w-7 h-7" />
            </div>
          )}

          {/* Top-Right Overlay: Compact circular icon buttons (Compare + Save) */}
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1.5 z-10">
            {/* Compare Button */}
            <button
              type="button"
              onClick={handleCompareClick}
              aria-pressed={inCompare}
              aria-label={`Add ${title} to compare`}
              className={`relative w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                inCompare
                  ? 'bg-[var(--ink)] text-white shadow-sm'
                  : 'bg-white/85 backdrop-blur-xs text-[var(--ink)] border border-white/40 hover:bg-white'
              }`}
            >
              <Scale className="w-3 h-3 stroke-[1.75]" />
              {inCompare && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--accent)] text-white flex items-center justify-center">
                  <Check className="w-2 h-2 stroke-[3]" />
                </span>
              )}
            </button>

            {/* Save Button */}
            <motion.button
              type="button"
              onClick={handleSaveClick}
              aria-pressed={saved}
              aria-label={`Save ${title}`}
              animate={saved ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                saved
                  ? 'bg-[var(--accent)] text-white fill-white shadow-sm'
                  : 'bg-white/85 backdrop-blur-xs text-[var(--ink)] border border-white/40 hover:bg-white'
              }`}
            >
              <Heart className={`w-3 h-3 ${saved ? 'fill-white text-white' : 'text-[var(--ink)]'}`} />
            </motion.button>
          </div>

          {/* Bottom-Left Verified Badge (optional) */}
          {badge && (
            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-[var(--ink)]/65 backdrop-blur-xs text-[9.5px] font-semibold text-white tracking-tight truncate max-w-[80%] leading-none">
              {badge}
            </div>
          )}
        </div>

        {/* Content Rows with compact inner padding */}
        <div className="px-2.5 pt-2 pb-0">
          {/* Row 1: Code and Key Spec */}
          <div className="flex items-center justify-between gap-1 text-[10px] mb-0.5">
            <span className="font-bold uppercase tracking-[0.04em] text-[var(--accent)] tabular-nums font-sans truncate max-w-[85px]">
              {code}
            </span>
            <span className="font-bold text-[var(--ink)] text-right shrink-0">
              {keySpec}
            </span>
          </div>

          {/* Row 2: Title (13px, max 2 lines, tight 32px height for alignment) */}
          <h3 className="text-[13px] font-bold text-[var(--ink)] leading-[16px] line-clamp-2 min-h-[32px] group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Footer Area with compact inner padding */}
      <div className="px-2.5 pb-2 pt-0">
        {/* Hairline Divider */}
        <div className="h-[1px] w-full bg-[var(--border)] my-1" />

        {/* Footer row: Category left, "Book" button right */}
        <div className="flex items-center justify-between text-[11px] gap-1">
          <span className="font-medium text-[var(--text-muted)] truncate max-w-[70px]">
            {category}
          </span>
          <button
            type="button"
            onClick={handleBookClick}
            className="h-6 px-2.5 rounded-[7px] bg-[var(--ink)] hover:bg-[var(--accent)] text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <span>Book</span>
            <ArrowRight className="w-2.5 h-2.5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
