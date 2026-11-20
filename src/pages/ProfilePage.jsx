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

      {/* Page Title: "Profile" (display 28) */}
      <div className="px-4 pt-3 pb-3">
        <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[var(--ink)]">
          Profile
        </h1>
      </div>

      <div className="px-4 space-y-5">
        {/* Identity Card (Padding 16px, avatar 56px, name 16/600, phone 13 muted) */}
        {user.isAuthenticated ? (
          <div className="bg-white rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden">
            {/* Row 1: 56px circular avatar, name, phone, chevron */}
            <div 
              onClick={() => navigate('/profile/edit')}
              className="p-4 flex items-center justify-between gap-3 hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-14 h-14 rounded-full p-[2px] bg-[var(--border)] shrink-0 shadow-xs">
                  <div className="w-full h-full rounded-full bg-[var(--ink)] text-white font-bold text-[18px] flex items-center justify-center overflow-hidden">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="text-[16px] font-bold text-[var(--ink)] truncate group-hover:text-[var(--accent)] transition-colors leading-[22px]">
                    {user.name}
                  </h2>
                  <p className="text-[13px] text-[var(--text-muted)] font-normal truncate mt-0.5 leading-[18px]">
                    {user.phone}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Hairline Divider */}
            <div className="h-[1px] bg-[var(--border)] mx-4" />

            {/* Row 2: Account type */}
            <div 
              onClick={() => navigate('/trips')}
              className="p-4 flex items-center justify-between gap-3 hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4.5 h-4.5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[14px] font-bold text-[var(--ink)] block truncate leading-tight">
                    {user.isCorporate ? 'Corporate Executive Account' : 'Personal Account'}
                  </span>
                  <span className="text-[12px] text-[var(--text-muted)] font-normal block truncate mt-0.5">
                    12 completed chauffeur trips
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        ) : (
          /* Guest Not Signed In Card */
          <div className="bg-white rounded-[20px] p-4 border border-[var(--border)] shadow-[var(--shadow-card)] flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <h2 className="text-[16px] font-bold text-[var(--ink)] leading-tight">
                Sign in or create account
              </h2>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5 leading-snug">
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
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.04em] block mb-1.5 px-1">
            Support
          </span>
          <div className="bg-white rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden">
            {/* 1. Help and support */}
            <div
              onClick={() => navigate('/support')}
              className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <CircleHelp className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    Help and support
                  </h3>
                  <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                    FAQs, policies, and dispatch hotline
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-[var(--border)] mx-4" />

            {/* 2. Live chat support */}
            <div
              onClick={() => navigate('/support/chat')}
              className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <MessagesSquare className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    Live chat with dispatch
                  </h3>
                  <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                    Direct real-person desk in Lombard, IL
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-[var(--border)] mx-4" />

            {/* 3. Request a custom quote */}
            <div
              onClick={() => navigate('/support/request')}
              className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    Request custom quote
                  </h3>
                  <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                    Weddings, wine tours & corporate roadshows
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        </div>

        {/* SECTION 2: MY ACCOUNT */}
        {user.isAuthenticated && (
          <div>
            <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.04em] block mb-1.5 px-1">
              My Account
            </span>
            <div className="bg-white rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden">
              {/* Saved items */}
              <div
                onClick={() => navigate('/saved')}
                className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                      Saved
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                      {savedVehicles.length} vehicles · {savedServices.length} services
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--accent-tint)] text-[var(--accent)] font-bold text-[11px]">
                    {savedVehicles.length + savedServices.length}
                  </span>
                  <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>

              <div className="h-[1px] bg-[var(--border)] mx-4" />

              {/* 4. My trips */}
              <div
                onClick={() => navigate('/trips')}
                className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <History className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                      My trips
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                      Upcoming and completed itineraries
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="h-[1px] bg-[var(--border)] mx-4" />

              {/* 5. My requests */}
              <div
                onClick={() => navigate('/support/requests')}
                className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Inbox className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                      My requests
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                      Quotes and queries
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadRequestsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-white font-bold text-[11px]">
                      {unreadRequestsCount}
                    </span>
                  )}
                  <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>

              <div className="h-[1px] bg-[var(--border)] mx-4" />

              {/* 6. Payment methods */}
              <div
                onClick={() => navigate('/profile/payment')}
                className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                      Payment methods
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                      Corporate cards and billing
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="h-[1px] bg-[var(--border)] mx-4" />

              {/* 7. Corporate account */}
              <div
                onClick={() => navigate('/profile/corporate')}
                className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                      Corporate account
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                      Monthly invoice, named chauffeurs
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="h-[1px] bg-[var(--border)] mx-4" />

              {/* 8. Notifications */}
              <div
                onClick={() => navigate('/notifications')}
                className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                      Notifications
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                      Dispatch alerts and flight briefs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {unreadNotificationsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  )}
                  <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: TRUST AND SETTINGS */}
        <div>
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.04em] block mb-1.5 px-1">
            Trust & Settings
          </span>
          <div className="bg-white rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden">
            {/* 9. Safety and insurance */}
            <div
              onClick={() => navigate('/profile/safety')}
              className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    Safety and insurance
                  </h3>
                  <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                    Licensed & insured, background-checked chauffeurs
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-[var(--border)] mx-4" />

            {/* 10. Settings */}
            <div
              onClick={() => navigate('/profile/settings')}
              className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    Settings
                  </h3>
                  <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                    Language, notifications, preferences
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <div className="h-[1px] bg-[var(--border)] mx-4" />

            {/* 11. Terms and privacy */}
            <div
              onClick={() => navigate('/legal')}
              className="h-[60px] px-4 flex items-center justify-between hover:bg-[var(--surface-muted)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <ScrollText className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    Terms and privacy
                  </h3>
                  <p className="text-[12px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                    Operating authority, liability, privacy
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-[var(--text-subtle)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        </div>

        {/* Corporate Banner: Height 148, radius 20, --ink background, round white button with ink arrow */}
        <div className="h-[148px] rounded-[20px] bg-[var(--ink)] text-white p-4 shadow-[var(--shadow-card)] relative overflow-hidden flex items-center justify-between gap-3">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[210px] space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/12 border border-white/20 text-[11px] font-bold uppercase tracking-wider text-white inline-block leading-none">
              Corporate Program
            </span>
            <h3 className="text-[18px] font-bold text-white leading-tight">
              Travelling for business?
            </h3>
            <p className="text-[12px] text-[var(--text-subtle)] font-normal leading-snug line-clamp-2">
              Named chauffeurs, consolidated billing and monthly invoicing.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/profile/corporate')}
              className="w-9 h-9 rounded-full bg-white text-[var(--ink)] hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Set up corporate account"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Sign Out Button */}
        {user.isAuthenticated && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowSignOutConfirm(true)}
              className="w-full h-12 rounded-full bg-white border border-[var(--danger)]/30 hover:bg-[var(--danger-bg)] flex items-center justify-center gap-2 text-[var(--danger)] font-bold text-[14px] transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
            <p className="text-center text-[11px] text-[var(--text-muted)] mt-3">
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
