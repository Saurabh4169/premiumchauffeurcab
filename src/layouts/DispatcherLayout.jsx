// src/layouts/DispatcherLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Car, 
  Users, 
  MessageSquare, 
  Phone, 
  Plane, 
  ShieldCheck, 
  Smartphone,
  Radio,
  Search,
  AlertCircle
} from 'lucide-react';
import ToastContainer from '../components/common/Toast.jsx';
import { DISPATCH_KPIS } from '../data/dispatchData.js';

export default function DispatcherLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: '/dispatch', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/dispatch/jobs', label: 'Live Jobs', icon: Briefcase, count: 4 },
    { to: '/dispatch/quotes', label: 'Quote Inbox', icon: FileText, count: DISPATCH_KPIS.pendingQuotes, alert: true },
    { to: '/dispatch/fleet', label: 'Fleet Status', icon: Car },
    { to: '/dispatch/drivers', label: 'Chauffeurs', icon: Users },
    { to: '/dispatch/messages', label: 'Client Messages', icon: MessageSquare, count: 1, alert: true },
  ];

  return (
    <div className="min-h-screen bg-[#120F11] text-[#faf6f0] flex flex-col xl:flex-row antialiased">
      <ToastContainer />

      {/* Sidebar */}
      <aside className="w-full xl:w-72 bg-[#120F11] border-b xl:border-b-0 xl:border-r border-white/10 flex flex-col shrink-0 z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fa37a] animate-pulse" />
              <span className="text-[11px] font-sans tracking-widest text-[#BE8A44] uppercase font-bold">
                24/7 Lombard Dispatch
              </span>
            </div>
            <h1 className="font-sans text-[18px] font-bold text-white mt-1">
              Premium Chauffeur
            </h1>
            <p className="text-[11px] text-white/50">HQ Control Room • IL 60148</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="xl:hidden px-3 py-1.5 rounded-xl bg-white/10 text-[12px] text-[#FAF5ED] flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App</span>
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="mx-4 my-3 p-3 rounded-xl bg-white/5 border border-white/10 text-[12px]">
          <div className="flex items-center justify-between text-white/70 mb-1">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#3fa37a]" />
              <span>ADS-B Radar</span>
            </span>
            <span className="text-[#3fa37a] font-sans font-semibold">Active</span>
          </div>
          <p className="text-[11px] text-white/45">
            Auto-tracking ORD, MDW, JFK, LGA, EWR, MIA, FLL, ATL, LAX, BUR
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.to 
              : location.pathname.startsWith(item.to);

            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#120F11] to-[#270B14] text-[#FAF5ED] border border-[#BE8A44]/40 shadow-lg'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#BE8A44]' : 'text-white/40'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-sans font-bold ${
                      item.alert
                        ? 'bg-[#BE8A44] text-white'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Dispatch Hotline */}
        <div className="p-4 border-t border-white/10 mt-auto bg-black/30">
          <div className="flex items-center gap-2 text-[12px] text-white/70 mb-2">
            <Phone className="w-3.5 h-3.5 text-[#BE8A44]" />
            <span>Emergency Dispatch Wire:</span>
          </div>
          <a
            href="tel:+18472682323"
            className="font-sans text-[14px] text-[#FAF5ED] font-bold hover:underline block"
          >
            +1 (847) 268-2323
          </a>
          <p className="text-[10px] text-white/40 mt-1">Real person answered 24/7/365</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Control Bar */}
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-[#120F11]/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/50">
              Operations Control
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[13px] text-[#FAF5ED] font-medium">
              Chicago • New York • Miami • Atlanta • Los Angeles
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[12px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>99.4% On-Time Buffer Target Active</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/home')}
              className="btn-primary px-3.5 py-1.5 rounded-xl text-[12px] flex items-center gap-1.5 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Preview Customer App</span>
            </button>
          </div>
        </header>

        {/* Routed Sub-page */}
        <div className="flex-1 p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
