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
  onBack,
  rightAction = null,
  transparent = false 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeCity, setActiveCityId, unreadNotificationsCount, user, companyInfo } = useApp();
  const [citySheetOpen, setCitySheetOpen] = useState(false);

  // Check if we are on the Home screen
  const isHome = location.pathname === '/home';
  const isMainTab = ['/home', '/fleet', '/services', '/trips', '/profile'].includes(location.pathname);
  const showTabHeader = isMainTab && !showBack;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-30 w-full h-[64px] ${
          transparent 
            ? 'bg-transparent' 
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs'
        } px-5 transition-all flex items-center`}
      >
        <div className="flex items-center justify-between gap-3 w-full max-w-[430px] mx-auto">
          {/* LEFT SIDE: Back button + Screen title (or City selector ONLY on Home) */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {showBack && (
              <button
                type="button"
                onClick={handleBack}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-800 transition-all cursor-pointer border border-slate-200 shadow-2xs shrink-0 active:scale-95"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4.5 h-4.5 stroke-[2.2]" />
              </button>
            )}

            {isHome ? (
              /* Location / City Selector Pill ONLY on Home */
              <button
                type="button"
                onClick={() => setCitySheetOpen(true)}
                className="h-9 px-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all group shrink-0 active:scale-95"
                aria-label="Select metropolitan city"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F43F43] shrink-0" />
                <span className="text-[13px] font-semibold text-slate-900 group-hover:text-[#F43F43] transition-colors">
                  {activeCity.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F43F43] transition-transform" />
              </button>
            ) : (
              /* Screen Title on all inner pages */
              <h1 className="text-[16px] font-bold text-slate-900 truncate">
                {title}
              </h1>
            )}
          </div>

          {/* RIGHT SIDE: Max two equal-size circular action buttons (call, notifications, or custom right action) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Custom right action if provided (e.g. Share, Step badge, Clear) */}
            {rightAction && (
              <div className="shrink-0 flex items-center">
                {rightAction}
              </div>
            )}

            {/* 1. 24/7 Dispatch Hotline Call */}
            {(!rightAction || isHome) && (
              <a
                href={`tel:${companyInfo.phone}`}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center border border-slate-200 shadow-2xs cursor-pointer transition-colors shrink-0 active:scale-95"
                title="24/7 Dispatch Hotline (+1 847-268-2323)"
                aria-label="Call 24/7 dispatch"
              >
                <Phone className="w-4 h-4 text-slate-800" />
              </a>
            )}

            {/* 2. Notification Bell */}
            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center relative border border-slate-200 shadow-2xs cursor-pointer transition-colors shrink-0 active:scale-95"
              title="Dispatch Alerts"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-slate-800" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F43F43] ring-1.5 ring-white" />
              )}
            </button>

            {/* 3. Avatar ONLY on Home */}
            {isHome && (
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="cursor-pointer focus:outline-none w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-2xs shrink-0 active:scale-95"
                aria-label="Open profile"
              >
                <Avatar name={user.name} size="sm" />
              </button>
            )}
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
                    ? 'bg-red-50/80 border-[#F43F43] ring-1 ring-[#F43F43]'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14.5px] text-slate-900">
                      {city.name}
                    </span>
                    {city.state && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                        {city.state}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-500 mt-0.5">{city.tag}</p>
                  <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                    Airports: {city.airports.join(', ')} · 24/7 Lombard Dispatch
                  </p>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#F43F43] text-white flex items-center justify-center shrink-0">
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
