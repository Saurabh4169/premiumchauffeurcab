// src/components/AppHeader.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Bell, Phone, ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { CITIES } from '../data/cities.js';
import Avatar from './common/Avatar.jsx';
import BottomSheet from './common/BottomSheet.jsx';

export default function AppHeader({ 
  title, 
  showBack = false, 
  rightAction = null,
  transparent = false 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeCity, setActiveCityId, unreadNotificationsCount, user, companyInfo } = useApp();
  const [citySheetOpen, setCitySheetOpen] = useState(false);

  const isHome = location.pathname === '/home';

  // Home Header (city selector 36px, call 40px, bell 40px, avatar 36px)
  if (isHome) {
    return (
      <>
        <header className="sticky top-0 z-30 w-full bg-[var(--page)]/95 backdrop-blur-md border-b border-[var(--border)] px-4 py-2.5 transition-all">
          <div className="flex items-center justify-between gap-2 max-w-[430px] mx-auto">
            {/* Left: City Selector Pill (36px high, text 13/600, pin icon 16) */}
            <button
              type="button"
              onClick={() => setCitySheetOpen(true)}
              className="h-9 px-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] border border-[var(--border)] shadow-[var(--shadow-card)] flex items-center gap-1.5 cursor-pointer transition-all group"
              aria-label="Select metropolitan city"
            >
              <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span className="text-[13px] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                {activeCity.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] ml-0.5 group-hover:text-[var(--accent)] transition-transform" />
            </button>

            {/* Right: 40px Call, 40px Bell, 36px Avatar */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Call 24/7 hotline (40px white circle with --shadow-card, --ink icons) */}
              <a
                href={`tel:${companyInfo.phone}`}
                className="w-10 h-10 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--ink)] flex items-center justify-center border border-[var(--border)] shadow-[var(--shadow-card)] cursor-pointer transition-colors"
                title="24/7 Dispatch Hotline"
                aria-label="Call 24/7 dispatch"
              >
                <Phone className="w-4 h-4 text-[var(--ink)]" />
              </a>

              {/* Notification Bell (40px white circle with --shadow-card, dot in --accent) */}
              <button
                type="button"
                onClick={() => navigate('/notifications')}
                className="w-10 h-10 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--ink)] flex items-center justify-center relative border border-[var(--border)] shadow-[var(--shadow-card)] cursor-pointer transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4 text-[var(--ink)]" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--accent)] ring-2 ring-white" />
                )}
              </button>

              {/* Avatar (36px circle) */}
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="cursor-pointer focus:outline-none w-9 h-9 rounded-full overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)] shrink-0"
                aria-label="Open profile"
              >
                <Avatar name={user.name} size="sm" />
              </button>
            </div>
          </div>
        </header>

        {/* City Switcher Bottom Sheet */}
        <BottomSheet
          isOpen={citySheetOpen}
          onClose={() => setCitySheetOpen(false)}
          title="Select Operating Market"
          subtitle="Fixed written quotes available across all 5 flagship hubs"
        >
          <div className="space-y-2 py-2">
            {CITIES.map((city) => {
              const isSelected = city.id === activeCity.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => {
                    setActiveCityId(city.id);
                    setCitySheetOpen(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-tint)] border-[var(--accent)] ring-1 ring-[var(--accent)]'
                      : 'bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-muted)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[15px] text-[var(--ink)]">
                        {city.name}
                      </span>
                      {city.state && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--surface-muted)] text-[var(--text-muted)] font-semibold">
                          {city.state}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{city.tag}</p>
                    <p className="text-[11px] text-[var(--success)] mt-1 font-medium">
                      Airports: {city.airports.join(', ')} · 24/7 Lombard Dispatch
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </BottomSheet>
      </>
    );
  }

  // Non-Home Header (Sticky 52px high, title left-aligned, at most ONE action on right)
  return (
    <header 
      className={`sticky top-0 z-30 w-full h-[52px] ${
        transparent 
          ? 'bg-transparent' 
          : 'bg-[var(--page)]/95 backdrop-blur-md border-b border-[var(--border)]'
      } px-4 transition-all flex items-center`}
    >
      <div className="flex items-center justify-between gap-3 w-full max-w-[430px] mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink)] transition-all cursor-pointer border border-[var(--border)] shadow-[var(--shadow-card)] shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {title && (
            <h1 className="text-[18px] font-bold text-[var(--ink)] truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Right side: At most ONE small action */}
        {rightAction ? (
          rightAction
        ) : (
          <a
            href={`tel:${companyInfo.phone}`}
            className="w-9 h-9 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--ink)] flex items-center justify-center border border-[var(--border)] shadow-[var(--shadow-card)] cursor-pointer transition-colors shrink-0"
            title="24/7 Dispatch Hotline"
            aria-label="Call dispatch"
          >
            <Phone className="w-4 h-4 text-[var(--ink)]" />
          </a>
        )}
      </div>
    </header>
  );
}
