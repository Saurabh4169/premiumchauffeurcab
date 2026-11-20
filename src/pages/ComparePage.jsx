// src/pages/ComparePage.jsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  X, 
  Plus, 
  Sparkles, 
  Scale, 
  ArrowRight,
  ShieldCheck,
  Check,
  Users,
  Briefcase,
  Navigation
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import StickyCta from '../components/common/StickyCta.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FLEET } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';
import { useAgentStore } from '../store/agentStore.js';

export default function ComparePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { compareList, removeFromCompare, clearCompare, toggleSave, isSaved, updateBookingDraft, showToast } = useApp();
  const { openAgent } = useAgentStore();

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
      <Screen withTabBar className="pb-8">
        {/* Header with safe breathing room */}
        <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E8E8EC] px-4 pt-3 pb-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8EC] active:scale-95 border border-[#E8E8EC] flex items-center justify-center text-[#101417] shadow-xs cursor-pointer transition-all"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <h2 className="text-[16px] font-bold text-[#101417]">
            Compare {isVehicle ? 'Vehicles' : 'Services'}
          </h2>
          <div className="w-9" />
        </header>

        <div className="bg-white rounded-[24px] p-8 text-center border border-[#E8E8EC] shadow-sm my-12 mx-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-[#F43F43] flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8 stroke-[1.75]" />
          </div>
          <h3 className="text-[18px] font-bold text-[#101417] mb-1">
            Pick at least 2 {isVehicle ? 'vehicles' : 'services'} to compare
          </h3>
          <p className="text-[13px] text-[#6B7075] max-w-xs mx-auto mb-5 leading-relaxed">
            Compare passenger seating, luggage capacities, airport specs and inclusions side-by-side.
          </p>
          <button
            type="button"
            onClick={() => navigate(isVehicle ? '/fleet' : '/services')}
            className="h-11 px-6 rounded-[14px] bg-gradient-to-r from-[#F43F43] to-[#DC2626] text-white font-bold text-[14px] shadow-md shadow-rose-500/25 cursor-pointer active:scale-95 transition-all"
          >
            Browse {isVehicle ? 'fleet' : 'services'}
          </button>
        </div>
      </Screen>
    );
  }

  // Calculate best values strictly (Only highlight if ONE vehicle has strictly more than others)
  const isStrictlyBestPax = (item) => {
    if (!isVehicle) return false;
    const itemPax = item.passengers || 0;
    const others = items.filter(i => i.id !== item.id).map(i => i.passengers || 0);
    return itemPax > Math.max(...others, 0);
  };

  const isStrictlyBestLuggage = (item) => {
    if (!isVehicle) return false;
    const itemBags = item.luggage || 0;
    const others = items.filter(i => i.id !== item.id).map(i => i.luggage || 0);
    return itemBags > Math.max(...others, 0);
  };

  const handleSaveAll = () => {
    items.forEach(item => {
      const id = item.id || item.slug;
      if (!isSaved(type, id)) {
        toggleSave(type, id, item.name || item.title);
      }
    });
    showToast('All compared items saved to your favorites', 'success');
  };

  const handleBookPrimary = () => {
    if (isVehicle) {
      updateBookingDraft({ selectedVehicleId: items[0].id });
      navigate('/book');
    } else {
      updateBookingDraft({ serviceType: items[0].slug || items[0].id });
      navigate('/book');
    }
  };

  const handleAskAi = () => {
    const names = items.map(i => i.name || i.title).join(' and ');
    openAgent({
      prefill: `Which option fits best between ${names}?`,
      context: { route: '/compare', item: items[0] }
    });
  };

  return (
    <Screen withCta className="pb-24 bg-[#FAFAFC]">
      {/* 1. Header with safe inset from device curved edges */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E8E8EC] px-4 pt-3.5 pb-2.5 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8EC] active:scale-95 border border-[#E8E8EC] flex items-center justify-center text-[#101417] shadow-xs cursor-pointer transition-all shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </button>

        <h1 className="text-[16px] font-bold text-[#101417] truncate px-2">
          Compare {isVehicle ? 'Vehicles' : 'Services'}
        </h1>

        <button
          type="button"
          onClick={clearCompare}
          className="text-[12.5px] font-bold text-[#F43F43] hover:underline cursor-pointer px-1 py-0.5"
        >
          Clear
        </button>
      </header>

      {/* 2. Sub-bar with Differences Only Toggle */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-[#E8E8EC] bg-white">
        <span className="text-[12px] font-bold text-[#6B7075]">
          {items.length} {isVehicle ? 'vehicles' : 'services'} side-by-side
        </span>

        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showDiffOnly}
            onChange={(e) => setShowDiffOnly(e.target.checked)}
            className="w-4 h-4 accent-[#F43F43] rounded cursor-pointer"
          />
          <span className="text-[12px] font-bold text-[#101417]">
            Differences only
          </span>
        </label>
      </div>

      {/* 3. Hero Cards: Side-by-Side 50/50 Grid (No cramped 84px left column!) */}
      <div className="px-4 pt-3.5 pb-2">
        <div className={`grid ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2.5`}>
          {items.map((item) => {
            const itemId = item.id || item.slug;
            const title = item.name || item.title;
            const img = item.image || item.photo;
            const code = isVehicle ? (item.code || 'PCS-VEH') : (item.code || 'PCS-SRV');
            const category = item.categoryLabel || item.category || 'Executive';

            return (
              <div 
                key={itemId}
                className="p-3 rounded-[18px] bg-white border border-[#E8E8EC] shadow-xs flex flex-col justify-between relative group"
              >
                <div>
                  {/* Vehicle / Service Image */}
                  <div className="relative aspect-[16/10] w-full rounded-[12px] overflow-hidden bg-slate-900 mb-2">
                    <img 
                      src={img} 
                      alt={title}
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => removeFromCompare(itemId)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#101417]/80 hover:bg-[#F43F43] text-white flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                      aria-label={`Remove ${title}`}
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Micro Category Code */}
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9.5px] font-bold text-[#F43F43] uppercase tracking-wider font-mono">
                      {code}
                    </span>
                    <span className="text-[9.5px] font-medium text-[#6B7075] truncate max-w-[80px]">
                      {category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[13px] font-bold text-[#101417] leading-tight line-clamp-2 min-h-[34px]">
                    {title}
                  </h3>
                </div>

                {/* RED BOOK BUTTON */}
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
                  className="mt-2.5 h-8.5 px-2 rounded-full bg-gradient-to-r from-[#F43F43] to-[#DC2626] hover:from-[#E02E32] hover:to-[#C51F23] active:scale-95 text-white text-[12px] font-bold shadow-sm shadow-rose-500/25 flex items-center justify-center gap-1 w-full cursor-pointer transition-all"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add 3rd item chip if only 2 selected */}
        {items.length === 2 && (
          <div className="mt-2.5 flex justify-center">
            <button
              type="button"
              onClick={() => navigate(isVehicle ? '/fleet' : '/services')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-dashed border-[#D1D1D6] hover:border-[#F43F43] text-[11.5px] font-bold text-[#6B7075] hover:text-[#F43F43] cursor-pointer transition-all shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add a 3rd {isVehicle ? 'car' : 'service'} to compare</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Structured Specification Sections */}
      <div className="px-4 space-y-3 pt-2">
        {/* SECTION A: CAPACITY & SEATING (Vehicle Only) */}
        {isVehicle && (
          <div className="bg-white rounded-[20px] p-3.5 border border-[#E8E8EC] shadow-xs">
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#F0F0F2]">
              <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-[#F43F43]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7075]">
                Passenger & Luggage Capacity
              </span>
            </div>

            <div className={`grid ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2.5`}>
              {items.map((v) => {
                const bestPax = isStrictlyBestPax(v);
                const bestLug = isStrictlyBestLuggage(v);

                return (
                  <div key={v.id} className="p-2.5 rounded-[14px] bg-[#F9F9FB] border border-[#E8E8EC] space-y-2">
                    {/* Passengers */}
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#6B7075] block leading-none">
                        Passengers
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[15px] font-bold text-[#101417]">
                          {v.passengers} pax
                        </span>
                        {bestPax && (
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                            Most seats
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Luggage */}
                    <div className="pt-1.5 border-t border-[#E8E8EC]">
                      <span className="text-[10px] font-bold uppercase text-[#6B7075] block leading-none">
                        Luggage
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[15px] font-bold text-[#101417]">
                          {v.luggage} bags
                        </span>
                        {bestLug && (
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                            Most luggage
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION B: BEST SUITED FOR */}
        <div className="bg-white rounded-[20px] p-3.5 border border-[#E8E8EC] shadow-xs">
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#F0F0F2]">
            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-[#F43F43]">
              <Navigation className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7075]">
              Best Suited For
            </span>
          </div>

          <div className={`grid ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2.5`}>
            {items.map((item) => (
              <div key={item.id || item.slug} className="p-2.5 rounded-[14px] bg-[#F9F9FB] border border-[#E8E8EC]">
                <p className="text-[12px] font-medium text-[#101417] leading-relaxed">
                  {item.bestFor || item.highlights?.slice(0, 2).join(' · ') || 'Airport & corporate transfers'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION C: KEY INCLUSIONS & AMENITIES */}
        <div className="bg-white rounded-[20px] p-3.5 border border-[#E8E8EC] shadow-xs">
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#F0F0F2]">
            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-[#F43F43]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7075]">
              Key Inclusions & Highlights
            </span>
          </div>

          <div className={`grid ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2.5`}>
            {items.map((item) => {
              const features = isVehicle 
                ? (item.features || ['Chauffeur included', 'Flight tracked', '60m free wait'])
                : (item.highlights || ['Real-time flight tracking', 'Fixed flat rate', '24/7 Lombard dispatch']);

              return (
                <div key={item.id || item.slug} className="p-2.5 rounded-[14px] bg-[#F9F9FB] border border-[#E8E8EC] space-y-1.5">
                  {features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11.5px] font-medium text-[#101417] leading-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION D: PRICING & STANDARDS */}
        <div className="bg-white rounded-[20px] p-3.5 border border-[#E8E8EC] shadow-xs">
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#F0F0F2]">
            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-[#F43F43]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7075]">
              Zero Surge & Standards Guarantee
            </span>
          </div>

          <div className={`grid ${items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2.5`}>
            {items.map((item) => (
              <div key={item.id || item.slug} className="p-2.5 rounded-[14px] bg-[#F9F9FB] border border-[#E8E8EC] space-y-1">
                <span className="text-[12px] font-bold text-[#101417] block">
                  Fixed Written Quote
                </span>
                <p className="text-[10.5px] text-[#6B7075] leading-snug">
                  Zero surge · Tolls, airport fees & 20% chauffeur gratuity 100% included.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. AI Concierge Consultation Card */}
      <div className="mx-4 mt-3.5 p-3.5 rounded-[20px] bg-white border border-[#E8E8EC] shadow-xs flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[#F43F43] mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10.5px] font-bold uppercase tracking-wider">AI Chauffeur Concierge</span>
          </div>
          <h4 className="text-[13px] font-bold text-[#101417] leading-snug">
            Need advice on which fits best?
          </h4>
          <p className="text-[11px] text-[#6B7075] mt-0.5 leading-tight">
            Ask our AI assistant to recommend based on your group & itinerary.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAskAi}
          className="h-8.5 px-3 rounded-full bg-[#F5F5F7] hover:bg-[#EAEAEA] active:scale-95 text-[#101417] text-[12px] font-bold shrink-0 border border-[#E8E8EC] cursor-pointer transition-all"
        >
          Ask AI
        </button>
      </div>

      {/* 6. Bottom Sticky CTA Bar */}
      <StickyCta
        secondaryAction={{
          label: 'Save all',
          onClick: handleSaveAll
        }}
        primaryAction={{
          label: isVehicle ? 'Book Selected Car' : 'Book Selected Service',
          onClick: handleBookPrimary,
          icon: <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        }}
      />
    </Screen>
  );
}
