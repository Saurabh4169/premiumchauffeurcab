// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { 
  CircleHelp, 
  MessagesSquare, 
  FileText, 
  History, 
  Inbox, 
  CreditCard, 
  MapPin, 
  Users, 
  Building2, 
  Bell, 
  ShieldCheck, 
  Settings, 
  ScrollText, 
  LogOut, 
  ChevronRight, 
  Briefcase,
  ArrowRight,
  Heart
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import AppHeader from '../components/AppHeader.jsx';
import { useApp } from '../context/AppContext.jsx';
import { usePortalContainer } from '../hooks/usePortalContainer.js';

export default function ProfilePage() {
  const navigate = useNavigate();
  const portalContainer = usePortalContainer();
  const { user, setUser, unreadRequestsCount, unreadNotificationsCount, savedVehicles = [], savedServices = [], showToast } = useApp();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleConfirmSignOut = () => {
    setUser(prev => ({
      ...prev,
      isAuthenticated: true
    }));
    setShowSignOutConfirm(false);
    showToast('Signed out successfully', 'success');
    navigate('/home');
  };

  return (
    <Screen withTabBar className="bg-[var(--page)]">
      {/* Clean Header */}
      <AppHeader showBack={false} />

      {/* Page Title: "Profile" */}
      <div className="px-4 pt-3 pb-2">
        <h1 className="text-[22px] leading-[26px] font-bold text-slate-900 tracking-tight">
          Profile
        </h1>
      </div>

      <div className="px-4 space-y-4">
        {/* Identity Card */}
        {user.isAuthenticated ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Row 1: Circular avatar, name, phone, chevron */}
            <div 
              onClick={() => navigate('/profile/edit')}
              className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-11 h-11 rounded-full p-[2px] bg-slate-200 shrink-0 shadow-xs">
                  <div className="w-full h-full rounded-full bg-slate-900 text-white font-bold text-[14px] flex items-center justify-center overflow-hidden">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="text-[15px] font-bold text-slate-900 truncate group-hover:text-[#F43F43] transition-colors leading-tight">
                    {user.name}
                  </h2>
                  <p className="text-[12px] text-slate-500 font-normal truncate mt-0.5 leading-tight">
                    {user.phone}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Hairline Divider */}
            <div className="h-[1px] bg-slate-100 mx-3.5" />

            {/* Row 2: Account type */}
            <div 
              onClick={() => navigate('/trips')}
              className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[13px] font-semibold text-slate-800 block truncate leading-tight">
                    {user.isCorporate ? 'Corporate Executive Account' : 'Personal Account'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal block truncate mt-0.5">
                    12 completed chauffeur trips
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        ) : (
          /* Guest Not Signed In Card */
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <h2 className="text-[14px] font-bold text-slate-900 leading-tight">
                Sign in or create account
              </h2>
              <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
                Track live chauffeur radar and access receipts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="btn-primary shrink-0"
            >
              Sign In
            </button>
          </div>
        )}

        {/* SECTION 1: SUPPORT */}
        <div>
          <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
            Support
          </span>
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* 1. Help and support */}
            <div
              onClick={() => navigate('/support')}
              className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <CircleHelp className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                    Help and support
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                    FAQs, policies, and dispatch hotline
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-slate-100 mx-3.5" />

            {/* 2. Live chat support */}
            <div
              onClick={() => navigate('/support/chat')}
              className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <MessagesSquare className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                    Live chat with dispatch
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                    Direct real-person desk in Lombard, IL
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-slate-100 mx-3.5" />

            {/* 3. Request a custom quote */}
            <div
              onClick={() => navigate('/support/request')}
              className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                    Request custom quote
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                    Weddings, wine tours & corporate roadshows
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        </div>

        {/* SECTION 2: MY ACCOUNT */}
        {user.isAuthenticated && (
          <div>
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
              My Account
            </span>
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Saved items */}
              <div
                onClick={() => navigate('/saved')}
                className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                      Saved
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      {savedVehicles.length} vehicles · {savedServices.length} services
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#F43F43] font-bold text-[10.5px]">
                    {savedVehicles.length + savedServices.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 mx-3.5" />

              {/* 4. My trips */}
              <div
                onClick={() => navigate('/trips')}
                className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                    <History className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                      My trips
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      Upcoming and completed itineraries
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="h-[1px] bg-slate-100 mx-3.5" />

              {/* 5. My requests */}
              <div
                onClick={() => navigate('/support/requests')}
                className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                    <Inbox className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                      My requests
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      Quotes and queries
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadRequestsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#F43F43] text-white font-bold text-[10.5px]">
                      {unreadRequestsCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 mx-3.5" />

              {/* 6. Payment methods */}
              <div
                onClick={() => navigate('/profile/payment')}
                className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                      Payment methods
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      Corporate cards and billing
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="h-[1px] bg-slate-100 mx-3.5" />

              {/* 7. Corporate account */}
              <div
                onClick={() => navigate('/profile/corporate')}
                className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                      Corporate account
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      Monthly invoice, named chauffeurs
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="h-[1px] bg-slate-100 mx-3.5" />

              {/* 8. Notifications */}
              <div
                onClick={() => navigate('/notifications')}
                className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                      Notifications
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                      Dispatch alerts and flight briefs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadNotificationsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#F43F43]" />
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: TRUST AND SETTINGS */}
        <div>
          <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
            Trust & Settings
          </span>
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* 9. Safety and insurance */}
            <div
              onClick={() => navigate('/profile/safety')}
              className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                    Safety and insurance
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                    Licensed & insured, background-checked chauffeurs
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-slate-100 mx-3.5" />

            {/* 10. Settings */}
            <div
              onClick={() => navigate('/profile/settings')}
              className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                    Settings
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                    Language, notifications, preferences
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-slate-100 mx-3.5" />

            {/* 11. Terms and privacy */}
            <div
              onClick={() => navigate('/legal')}
              className="py-2.5 px-3.5 min-h-[50px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0">
                  <ScrollText className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13.5px] font-semibold text-slate-800 group-hover:text-[#F43F43] transition-colors leading-tight truncate">
                    Terms and privacy
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                    Operating authority, liability, privacy
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#F43F43] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        </div>

        {/* Corporate Banner: Compact & refined */}
        <div className="rounded-2xl bg-slate-900 text-white p-4 shadow-sm relative overflow-hidden flex items-center justify-between gap-3">
          {/* Subtle background image overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[50%] pointer-events-none overflow-hidden">
            <img
              src="/fleet/cadillac-escalade-esv.webp"
              alt="Corporate Chauffeur Fleet"
              onError={(e) => {
                e.currentTarget.src = '/fleet/mercedes-s-class.webp';
              }}
              className="w-full h-full object-cover opacity-35 object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[210px] space-y-1">
            <span className="px-2 py-0.5 rounded-full bg-white/12 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white inline-block leading-none">
              Corporate Program
            </span>
            <h3 className="text-[15px] font-bold text-white leading-tight">
              Travelling for business?
            </h3>
            <p className="text-[11.5px] text-slate-300 font-normal leading-snug line-clamp-2">
              Named chauffeurs, consolidated billing and monthly invoicing.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/profile/corporate')}
              className="w-8 h-8 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
              aria-label="Set up corporate account"
            >
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Sign Out Button */}
        {user.isAuthenticated && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowSignOutConfirm(true)}
              className="w-full h-11 rounded-full bg-white border border-red-200 hover:bg-red-50 flex items-center justify-center gap-2 text-red-600 font-bold text-[13px] transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
            <p className="text-center text-[10.5px] text-slate-400 mt-2.5">
              Premium Chauffeur Services · Version 2.4.0 · Lombard, IL
            </p>
          </div>
        )}
      </div>

      {/* Confirm Sign Out Modal (Rendered strictly inside #app-overlay-root) */}
      {showSignOutConfirm && portalContainer && createPortal(
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-5 max-w-[320px] w-full text-center space-y-3.5 shadow-2xl border border-[var(--border)]">
            <div className="w-12 h-12 rounded-full bg-[var(--danger-bg)] text-[var(--danger)] flex items-center justify-center mx-auto">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[var(--ink)]">
                Sign out of account?
              </h3>
              <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-snug">
                You will need to sign back in to access saved addresses and corporate invoices.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSignOut}
                className="flex-1 h-11 rounded-full bg-[var(--danger)] hover:opacity-95 text-white font-bold text-[13px] transition-colors cursor-pointer shadow-xs"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>,
        portalContainer
      )}
    </Screen>
  );
}
