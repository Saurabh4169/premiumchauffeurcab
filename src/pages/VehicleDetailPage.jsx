// src/pages/VehicleDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Check,
  Sparkles,
  Phone
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import AppHeader from '../components/AppHeader.jsx';
import HeroHeader from '../components/common/HeroHeader.jsx';
import StickyCta from '../components/common/StickyCta.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { FLEET, getVehicleById } from '../data/fleet.js';
import { useApp } from '../context/AppContext.jsx';
import { useAgentStore } from '../store/agentStore.js';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBookingDraft } = useApp();
  const { openAgent } = useAgentStore();

  const vehicle = getVehicleById(id) || FLEET[0];

  const handleGetFixedQuote = () => {
    updateBookingDraft({ selectedVehicleId: vehicle.id });
    navigate('/book');
  };

  // Similar vehicles in same or related category (excluding current)
  const similarVehicles = FLEET.filter(v => v.id !== vehicle.id).slice(0, 4);

  return (
    <Screen withCta className="bg-[var(--page)] px-0">
      <AppHeader title={vehicle.name} showBack />
      {/* Hero Header with 40px glass circular buttons */}
      <HeroHeader
        item={vehicle}
        type="vehicle"
        image={vehicle.image}
        title={vehicle.name}
        badges={[vehicle.categoryLabel, `${vehicle.year} Model`]}
      />

      {/* Vehicle Info Container */}
      <div className="px-4 pt-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--accent)] font-sans">
              {vehicle.brand}
            </span>
            <span className="text-[12px] text-[var(--text-muted)]">·</span>
            <span className="text-[12px] font-medium text-[var(--text-muted)]">
              {vehicle.categoryLabel}
            </span>
          </div>
          <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[var(--ink)]">
            {vehicle.name}
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-[18px]">
            {vehicle.bestFor}
          </p>
        </div>

        {/* Specifications Grid (2 columns, gap 12) */}
        <div>
          <h2 className="text-[16px] font-bold text-[var(--ink)] leading-[22px] mb-2.5">
            Vehicle Specifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Box 1: Capacity */}
            <div className="bg-[var(--surface)] rounded-[16px] p-3 border border-[var(--border)] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center mb-1.5">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.04em] block leading-none">
                Passenger Seats
              </span>
              <p className="text-[14px] font-bold text-[var(--ink)] mt-0.5">
                Up to {vehicle.passengers}
              </p>
            </div>

            {/* Box 2: Luggage */}
            <div className="bg-[var(--surface)] rounded-[16px] p-3 border border-[var(--border)] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center mb-1.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.04em] block leading-none">
                Luggage Capacity
              </span>
              <p className="text-[14px] font-bold text-[var(--ink)] mt-0.5">
                {vehicle.luggage} Standard Bags
              </p>
            </div>

            {/* Box 3: Driver */}
            <div className="bg-[var(--surface)] rounded-[16px] p-3 border border-[var(--border)] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--success-bg)] text-[var(--success)] flex items-center justify-center mb-1.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.04em] block leading-none">
                Chauffeur
              </span>
              <p className="text-[14px] font-bold text-[var(--ink)] mt-0.5">
                Always Included
              </p>
            </div>

            {/* Box 4: Wait time */}
            <div className="bg-[var(--surface)] rounded-[16px] p-3 border border-[var(--border)] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center mb-1.5">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.04em] block leading-none">
                Airport Wait
              </span>
              <p className="text-[14px] font-bold text-[var(--ink)] mt-0.5">
                60 Min Free
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle Overview */}
        <div className="bg-[var(--surface)] rounded-[20px] p-4 border border-[var(--border)] shadow-xs">
          <h3 className="text-[16px] font-bold text-[var(--ink)] leading-[22px] mb-1">
            Vehicle Overview
          </h3>
          <p className="text-[14px] text-[var(--text)] leading-[20px] font-medium">
            {vehicle.description}
          </p>
        </div>

        {/* Included in Written Quote */}
        <div className="bg-[var(--surface)] rounded-[20px] p-4 border border-[var(--border)] shadow-xs">
          <h4 className="text-[15px] font-bold text-[var(--ink)] mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
            <span>Included in Your Fixed Written Quote</span>
          </h4>
          <ul className="space-y-1.5 text-[13px] text-[var(--ink)] font-medium">
            {vehicle.included.map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[var(--success)] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Action Bar: Ask AI Concierge / Call */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => openAgent({
              prefill: `Is the ${vehicle.name} right for 5 people and 6 bags?`,
              context: { route: `/fleet/${id}`, item: vehicle }
            })}
            className="flex-1 h-11 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/40 shadow-xs text-[13px] font-semibold text-[var(--ink)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Ask AI about {vehicle.name.split(' ')[0]}</span>
          </button>

          <a
            href="tel:+18472682323"
            className="h-11 px-4 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-slate-300 shadow-xs text-[13px] font-semibold text-[var(--ink)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--ink)]" />
            <span>Call</span>
          </a>
        </div>
        <div className="pt-2 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-bold text-[var(--ink)]">
              Similar Vehicles
            </h3>
            <button
              type="button"
              onClick={() => navigate('/fleet')}
              className="text-[13px] text-[var(--accent)] font-semibold hover:underline cursor-pointer"
            >
              View fleet &gt;
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {similarVehicles.map((simVeh) => (
              <ProductCard
                key={simVeh.id}
                item={simVeh}
                type="vehicle"
                variant="scroll"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar (Containment: absolute inside frame) */}
      <StickyCta>
        <div className="flex-1">
          <span className="text-[11px] uppercase tracking-[0.04em] text-[var(--text-muted)] font-semibold block leading-none">
            Sample estimate
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-[22px] font-bold text-[var(--ink)] leading-none">
              ${vehicle.sampleEstimate}
            </span>
            <span className="text-[12px] font-medium text-[var(--text-muted)]">all-in</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGetFixedQuote}
          className="btn-primary h-12 px-6 rounded-[14px] text-[15px] font-semibold text-white flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </StickyCta>
    </Screen>
  );
}
