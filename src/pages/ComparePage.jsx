// src/pages/ComparePage.jsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  X, 
  Plus, 
  Check, 
  Sparkles, 
  Scale, 
  ArrowRight,
  ShieldCheck,
  Users,
  Briefcase
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import StickyCta from '../components/common/StickyCta.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FLEET } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';

export default function ComparePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { compareList, removeFromCompare, clearCompare, toggleSave, isSaved, updateBookingDraft, showToast } = useApp();

  const [showDiffOnly, setShowDiffOnly] = useState(false);

  const type = searchParams.get('type') || compareList.type || 'vehicle';
  const isVehicle = type === 'vehicle';

  // Resolve compared items from state
  const items = compareList.ids.map(id => {
    if (isVehicle) {
      return FLEET.find(v => v.id === id);
    }
    return SERVICES.find(s => s.slug === id || s.id === id);
  }).filter(Boolean);

  // If fewer than 2 items
  if (items.length < 2) {
    return (
      <Screen withTabBar className="pt-3 pb-8">
        <header className="sticky top-0 z-30 w-full h-[52px] bg-[var(--page)]/95 backdrop-blur-md border-b border-[var(--border)] -mx-4 px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--ink)] shadow-xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-[16px] font-bold text-[var(--ink)]">
            Compare {isVehicle ? 'Vehicles' : 'Services'}
          </h2>
          <div className="w-10" />
        </header>

        <div className="bg-white rounded-[20px] p-8 text-center border border-[var(--border)] shadow-[var(--shadow-card)] my-12">
          <div className="w-16 h-16 rounded-full bg-[var(--surface-muted)] text-[var(--ink)] flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8 stroke-[1.75]" />
          </div>
          <h3 className="text-[18px] font-bold text-[var(--ink)] mb-1">
            Pick at least 2 {isVehicle ? 'vehicles' : 'services'} to compare
          </h3>
          <p className="text-[13px] text-[var(--text-muted)] max-w-xs mx-auto mb-5">
            Compare passenger seating, luggage capacities, airport specs and inclusions side-by-side.
          </p>
          <button
            type="button"
            onClick={() => navigate(isVehicle ? '/fleet' : '/services')}
            className="btn-primary"
          >
            Browse {isVehicle ? 'fleet' : 'services'}
          </button>
        </div>
      </Screen>
    );
  }

  // Calculate best values for vehicles
  const maxPax = isVehicle ? Math.max(...items.map(i => i.passengers || 0)) : 0;
  const maxBags = isVehicle ? Math.max(...items.map(i => i.luggage || 0)) : 0;

  // Attributes definition
  const vehicleAttributes = [
    {
      id: 'category',
      label: 'Category',
      getValue: (v) => v.categoryLabel || v.category,
      isNumeric: false
    },
    {
      id: 'passengers',
      label: 'Passengers',
      getValue: (v) => `${v.passengers} pax`,
      isNumeric: true,
      checkBest: (v) => v.passengers === maxPax && maxPax > 0,
      bestBadge: 'Most seats'
    },
    {
      id: 'luggage',
      label: 'Luggage Capacity',
      getValue: (v) => `${v.luggage} bags`,
      isNumeric: true,
      checkBest: (v) => v.luggage === maxBags && maxBags > 0,
      bestBadge: 'Most luggage'
    },
    {
      id: 'bestFor',
      label: 'Best For',
      getValue: (v) => v.bestFor || 'Airport & corporate transfers',
      isNumeric: false
    },
    {
      id: 'features',
      label: 'Highlights',
      getValue: (v) => (v.features || []).slice(0, 3).join(', ') || 'Chauffeur included, 60m wait',
      isNumeric: false
    },
    {
      id: 'pricing',
      label: 'Pricing Policy',
      getValue: () => 'Fixed written quote, 0 surge',
      isNumeric: false
    }
  ];

  const serviceAttributes = [
    {
      id: 'category',
      label: 'Category',
      getValue: (s) => s.category
    },
    {
      id: 'pricing',
      label: 'Pricing Note',
      getValue: (s) => s.pricing
    },
    {
      id: 'vehicles',
      label: 'Suggested Vehicles',
      getValue: (s) => s.vehicles
    },
    {
      id: 'highlights',
      label: "What's Included",
      getValue: (s) => (s.highlights || []).slice(0, 3).join(' • ')
    },
    {
      id: 'badge',
      label: 'Standard Guarantee',
      getValue: (s) => s.badge || 'Flight tracked & buffer dispatch'
    }
  ];

  const attributes = isVehicle ? vehicleAttributes : serviceAttributes;

  // Filter differences only if toggled
  const displayedAttributes = showDiffOnly
    ? attributes.filter(attr => {
        const values = items.map(attr.getValue);
        return new Set(values).size > 1;
      })
    : attributes;

  const handleSaveAll = () => {
    items.forEach(item => {
      const id = item.id || item.slug;
      if (!isSaved(type, id)) {
        toggleSave(type, id, item.name || item.title);
      }
    });
    showToast('All compared items saved', 'success');
  };

  const handleRequestQuote = () => {
    const names = items.map(i => i.name || i.title).join(', ');
    navigate(`/support/request?type=quote&details=${encodeURIComponent(`Comparing ${names} for upcoming luxury itinerary.`)}`);
  };

  const handleAskAi = () => {
    const names = items.map(i => i.name || i.title).join(' and ');
    navigate(`/ai?q=${encodeURIComponent(`Compare ${names} and recommend which vehicle best suits my group.`)}`);
  };

  return (
    <Screen withCta className="pt-0 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full h-[52px] bg-[var(--page)]/95 backdrop-blur-md border-b border-[var(--border)] -mx-4 px-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--ink)] shadow-xs"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[16px] font-bold text-[var(--ink)] truncate">
          Compare {isVehicle ? 'Vehicles' : 'Services'}
        </h1>

        <button
          type="button"
          onClick={clearCompare}
          className="text-[13px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
        >
          Clear
        </button>
      </header>

      {/* Differences toggle bar */}
      <div className="py-2.5 flex items-center justify-between border-b border-[var(--border)]">
        <span className="text-[13px] font-semibold text-[var(--text-muted)]">
          {items.length} items side-by-side
        </span>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showDiffOnly}
            onChange={(e) => setShowDiffOnly(e.target.checked)}
            className="w-4 h-4 accent-[var(--accent)] rounded cursor-pointer"
          />
          <span className="text-[13px] font-semibold text-[var(--ink)]">
            Differences only
          </span>
        </label>
      </div>

      {/* Comparison Matrix Table */}
      <div className="mt-3 overflow-x-auto no-scrollbar -mx-4 px-4">
        <div className="min-w-full inline-block align-middle">
          {/* Header Row with Items */}
          <div className="flex border-b border-[var(--border)] pb-3 items-end">
            {/* Sticky Label Column Placeholder */}
            <div className="w-[92px] shrink-0 pr-2 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                Specifications
              </span>
            </div>

            {/* Compared Item Columns */}
            {items.map((item) => {
              const itemId = item.id || item.slug;
              const title = item.name || item.title;
              const img = item.image || item.photo;
              const code = isVehicle ? (item.code || 'PCS-VEH') : (item.code || 'PCS-SRV');

              return (
                <div 
                  key={itemId}
                  className="min-w-[132px] flex-1 px-1.5 shrink-0 relative flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with remove button */}
                    <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-slate-900 mb-1.5">
                      <img 
                        src={img} 
                        alt={title}
                        className="w-full h-full object-cover" 
                      />
                      <button
                        type="button"
                        onClick={() => removeFromCompare(itemId)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[var(--ink)]/80 text-white flex items-center justify-center cursor-pointer shadow-xs hover:bg-[var(--accent)]"
                        aria-label={`Remove ${title}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[11px] font-bold text-[var(--accent)] block uppercase tracking-wider">
                      {code}
                    </span>
                    <h3 className="text-[13px] font-bold text-[var(--ink)] leading-snug line-clamp-2 min-h-[34px]">
                      {title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (isVehicle) {
                        updateBookingDraft({ selectedVehicleId: item.id });
                        navigate('/book');
                      } else {
                        navigate(`/services/${item.slug}`);
                      }
                    }}
                    className="mt-2 h-8 px-2.5 rounded-full btn-primary text-[11px] font-bold w-full"
                  >
                    Get quote
                  </button>
                </div>
              );
            })}

            {/* Add Item Slot if < 3 */}
            {items.length < 3 && (
              <div 
                onClick={() => navigate(isVehicle ? '/fleet' : '/services')}
                className="w-[120px] shrink-0 px-2 flex flex-col items-center justify-center text-center cursor-pointer group"
              >
                <div className="w-full aspect-[4/3] rounded-[14px] border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center text-[var(--text-subtle)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  <Plus className="w-5 h-5 mb-1" />
                  <span className="text-[11px] font-semibold">Add {isVehicle ? 'car' : 'service'}</span>
                </div>
                <span className="text-[11px] font-medium text-[var(--text-muted)]">
                  Up to 3 items
                </span>
              </div>
            )}
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-[var(--border)]">
            {displayedAttributes.map((attr, rowIdx) => (
              <div 
                key={attr.id}
                className={`flex items-center py-3 ${
                  rowIdx % 2 === 0 ? 'bg-transparent' : 'bg-white rounded-xl'
                }`}
              >
                {/* Row Label (Sticky 92px) */}
                <div className="w-[92px] shrink-0 pr-2">
                  <span className="text-[12px] font-bold text-[var(--text-muted)] block leading-snug">
                    {attr.label}
                  </span>
                </div>

                {/* Values for each item */}
                {items.map((item) => {
                  const val = attr.getValue(item);
                  const isBest = attr.checkBest?.(item);

                  return (
                    <div 
                      key={item.id || item.slug}
                      className="min-w-[132px] flex-1 px-1.5 shrink-0"
                    >
                      <div className={`p-1.5 rounded-[10px] ${isBest ? 'bg-[var(--accent-tint)]' : ''}`}>
                        <span className={`text-[13px] font-bold leading-snug block ${isBest ? 'text-[var(--accent)]' : 'text-[var(--ink)]'}`}>
                          {val}
                        </span>
                        {isBest && attr.bestBadge && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold">
                            {attr.bestBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {items.length < 3 && <div className="w-[120px] shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="mt-5 p-4 rounded-[20px] bg-white border border-[var(--border)] shadow-[var(--shadow-card)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[var(--accent)] mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-[12px] font-bold uppercase tracking-wider">Concierge Advice</span>
          </div>
          <h4 className="text-[14px] font-bold text-[var(--ink)] leading-snug">
            Not sure which option fits best?
          </h4>
          <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
            Ask our AI dispatcher to compare your group size, bags and occasion.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAskAi}
          className="h-10 px-3.5 rounded-full btn-secondary text-[12px] font-bold shrink-0"
        >
          Ask AI
        </button>
      </div>

      {/* Bottom Sticky CTA Bar */}
      <StickyCta
        secondaryAction={{
          label: 'Save all',
          onClick: handleSaveAll
        }}
        primaryAction={{
          label: 'Request quote',
          onClick: handleRequestQuote,
          icon: <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        }}
      />
    </Screen>
  );
}
