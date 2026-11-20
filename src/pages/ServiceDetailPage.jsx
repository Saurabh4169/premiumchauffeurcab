// src/pages/ServiceDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  ArrowRight
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import HeroHeader from '../components/common/HeroHeader.jsx';
import StickyCta from '../components/common/StickyCta.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { SERVICES, getServiceBySlug } from '../data/services.js';
import { FLEET } from '../data/fleet.js';
import { useApp } from '../context/AppContext.jsx';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { updateBookingDraft } = useApp();

  const service = getServiceBySlug(slug) || SERVICES[0];

  // Suggested vehicles from fleet data
  const suggestedVehicles = (service.suggestedVehicleIds || [])
    .map(id => FLEET.find(v => v.id === id))
    .filter(Boolean);

  // Other services (excluding current)
  const otherServices = SERVICES.filter(s => (s.slug || s.id) !== (service.slug || service.id)).slice(0, 4);

  const handleGetFixedQuote = () => {
    updateBookingDraft({ serviceType: service.slug });
    navigate(`/book?service=${service.slug}`);
  };

  const handleRequestQuote = () => {
    navigate(`/support/request?type=quote&service=${service.slug}`);
  };

  return (
    <Screen withCta className="bg-[var(--page)] px-0">
      {/* Hero Header with 40px glass circular buttons (Back, Share, Compare, Save) */}
      <HeroHeader
        item={service}
        type="service"
        image={service.image}
        title={service.title}
        badges={[service.category, service.badge].filter(Boolean)}
      />

      <div className="px-4 pt-4 space-y-4">
        {/* Description Card */}
        <div className="bg-[var(--surface)] rounded-[20px] p-4 border border-[var(--border)] shadow-[var(--shadow-card)]">
          <h2 className="text-[16px] font-bold text-[var(--ink)] leading-[22px] mb-1.5">
            Service Overview
          </h2>
          <p className="text-[14px] text-[var(--text)] leading-[20px] font-medium">
            {service.description}
          </p>
          <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center gap-2 text-[12px] text-[var(--text-muted)] font-medium">
            <span className="font-bold text-[var(--ink)]">Dedicated Fleet:</span>
            <span>{service.vehicles}</span>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-[var(--surface)] rounded-[20px] p-4 border border-[var(--border)] shadow-[var(--shadow-card)] space-y-2.5">
          <h3 className="text-[16px] font-bold text-[var(--ink)] leading-[22px]">
            What's Included
          </h3>
          <ul className="space-y-2">
            {service.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[13px] text-[var(--ink)] font-medium leading-[18px]">
                <span className="w-5 h-5 rounded-full bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggested Vehicles Scroller */}
        {suggestedVehicles.length > 0 && (
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-[var(--ink)]">
                Suggested Vehicles
              </h3>
              <button
                type="button"
                onClick={() => navigate('/fleet')}
                className="text-[13px] text-[var(--accent)] font-semibold hover:underline cursor-pointer"
              >
                View all fleet &gt;
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {suggestedVehicles.map((vehicle) => (
                <ProductCard
                  key={vehicle.id}
                  item={vehicle}
                  type="vehicle"
                  variant="scroll"
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Chauffeur Services */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[var(--ink)]">
              Other Services
            </h3>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="text-[13px] text-[var(--accent)] font-semibold hover:underline cursor-pointer"
            >
              All services &gt;
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {otherServices.map((srv) => (
              <ProductCard
                key={srv.id}
                item={srv}
                type="service"
                variant="scroll"
              />
            ))}
          </div>
        </div>

        {/* Info Strip */}
        <div className="bg-[var(--surface)] rounded-[20px] p-3 border border-[var(--border)] shadow-xs flex items-center gap-2.5 text-[12px] font-medium text-[var(--ink)]">
          <ShieldCheck className="w-4 h-4 text-[var(--success)] shrink-0" />
          <span className="leading-snug">
            Fixed, written, all-in quote · Licensed & insured · 24/7 dispatch
          </span>
        </div>

        {/* Quick Action Chips */}
        <div className="flex items-center gap-2 pt-1 pb-4">
          <button
            type="button"
            onClick={() => navigate(`/ai?q=Tell me details about ${encodeURIComponent(service.title)}`)}
            className="flex-1 h-11 px-3 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/40 shadow-xs text-[13px] font-semibold text-[var(--ink)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Ask AI</span>
          </button>

          <a
            href="tel:+18472682323"
            className="h-11 px-4 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-slate-300 shadow-xs text-[13px] font-semibold text-[var(--ink)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--ink)]" />
            <span>Call dispatch</span>
          </a>
        </div>
      </div>

      {/* Sticky Bottom Bar (40/60 split, absolute inside frame) */}
      <StickyCta
        secondaryAction={{
          label: 'Request quote',
          onClick: handleRequestQuote
        }}
        primaryAction={{
          label: 'Get fixed quote',
          icon: <ArrowRight className="w-4 h-4 stroke-[2.2]" />,
          onClick: handleGetFixedQuote
        }}
      />
    </Screen>
  );
}
