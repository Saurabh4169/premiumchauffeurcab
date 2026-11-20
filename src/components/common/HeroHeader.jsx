// src/components/common/HeroHeader.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Scale, Check, Car } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function HeroHeader({
  item,
  type = 'vehicle', // 'vehicle' | 'service'
  image,
  code,
  title,
  badges = [],
  className = ''
}) {
  const navigate = useNavigate();
  const { isSaved, toggleSave, isInCompare, toggleCompare, showToast } = useApp();
  const [imgError, setImgError] = useState(false);

  const itemId = item?.id || item?.slug;
  const itemTitle = item?.name || item?.title || title;

  const saved = isSaved(type, itemId);
  const inCompare = isInCompare(itemId);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${itemTitle} - Premium Chauffeur Services`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  return (
    <div className={`relative w-full h-[260px] bg-slate-900 overflow-hidden ${className}`}>
      {/* Background Image */}
      {!imgError ? (
        <img
          src={image}
          alt={itemTitle}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white/40">
          <Car className="w-16 h-16" />
        </div>
      )}

      {/* Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-black/40 to-black/30 pointer-events-none" />

      {/* Top Controls Bar: 40px glass circles */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-center text-[var(--ink)] transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-center text-[var(--ink)] transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Compare */}
          <button
            type="button"
            onClick={() => toggleCompare(type, itemId, itemTitle)}
            aria-pressed={inCompare}
            aria-label={`Add ${itemTitle} to compare`}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 ${
              inCompare
                ? 'bg-[var(--ink)] text-white shadow-sm'
                : 'bg-white/80 backdrop-blur-md text-[var(--ink)] border border-white/40 hover:bg-white'
            }`}
          >
            <Scale className="w-4 h-4 stroke-[1.75]" />
            {inCompare && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent)] text-white flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </button>

          {/* Save */}
          <button
            type="button"
            onClick={() => toggleSave(type, itemId, itemTitle)}
            aria-pressed={saved}
            aria-label={`Save ${itemTitle}`}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 ${
              saved
                ? 'bg-[var(--accent)] text-white fill-white shadow-sm'
                : 'bg-white/80 backdrop-blur-md text-[var(--ink)] border border-white/40 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-white text-white' : 'text-[var(--ink)]'}`} />
          </button>
        </div>
      </div>

      {/* Bottom Overlaid Title and Meta */}
      <div className="absolute bottom-3 left-4 right-4 z-20 space-y-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          {code && (
            <span className="px-2 py-0.5 rounded-md bg-[var(--ink)]/85 text-[var(--accent)] font-bold text-[11px] uppercase tracking-wider font-sans border border-white/10">
              {code}
            </span>
          )}
          {badges.map((b, i) => (
            <span 
              key={i} 
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white ${
                i === 0 ? 'bg-[var(--accent)]' : 'bg-white/20 backdrop-blur-xs'
              }`}
            >
              {b}
            </span>
          ))}
        </div>

        <h1 className="text-[26px] leading-[30px] font-display font-semibold text-white tracking-tight">
          {itemTitle}
        </h1>
      </div>
    </div>
  );
}
