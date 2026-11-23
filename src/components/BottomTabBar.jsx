// src/components/BottomTabBar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { House, Car, ConciergeBell, CalendarClock, User } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';

export default function BottomTabBar() {
  const location = useLocation();
  const { trips } = useApp();
  const shouldReduceMotion = useReducedMotion();
  const activeUpcomingCount = trips.filter(t => t.type === 'upcoming').length;

  // Hide the tab bar on /ai, /book steps, /compare, /legal, and any screen with a sticky bottom CTA (service detail, vehicle detail, request form, live chat, dispatch)
  const isHidden = 
    location.pathname === '/' ||
    location.pathname === '/auth' ||
    location.pathname.startsWith('/book') ||
    location.pathname === '/ai' ||
    location.pathname === '/compare' ||
    location.pathname === '/legal' ||
    (location.pathname.startsWith('/fleet/') && location.pathname !== '/fleet') ||
    (location.pathname.startsWith('/services/') && location.pathname !== '/services') ||
    location.pathname.startsWith('/support/request') ||
    location.pathname.startsWith('/support/chat') ||
    location.pathname.startsWith('/dispatch');

  if (isHidden) {
    return null;
  }

  const tabs = [
    { to: '/home', label: 'Home', icon: House },
    { to: '/fleet', label: 'Fleet', icon: Car },
    { to: '/services', label: 'Services', icon: ConciergeBell },
    {
      to: '/trips',
      label: 'Trips',
      icon: CalendarClock,
      hasDot: activeUpcomingCount > 0
    },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div 
      className="absolute left-4 right-4 z-40 pointer-events-auto select-none"
      style={{
        bottom: 'calc(12px + var(--safe-bottom))',
        height: 'var(--tabbar-h)'
      }}
    >
      <nav 
        className="h-16 rounded-[32px] px-1.5 flex items-center justify-between border border-white/30 shadow-[var(--shadow-float)] relative overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(60, 64, 68, 0.70)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: '0 10px 30px rgba(18, 15, 17, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
        }}
        role="navigation"
        aria-label="Main Navigation"
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to || (tab.to !== '/home' && location.pathname.startsWith(tab.to));
          const Icon = tab.icon;

          if (isActive) {
            return (
              <div 
                key={tab.to}
                className="flex-1 flex items-center justify-center relative z-10"
              >
                <motion.div
                  layoutId="activeBottomTabPill"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 500, damping: 38 }
                  }
                  className="h-11 px-3.5 sm:px-4 rounded-[22px] flex items-center justify-center gap-1.5 text-white shadow-[0_6px_16px_rgba(190, 138, 68,0.30)]"
                  style={{
                    background: 'linear-gradient(180deg, var(--accent-top), var(--accent-bottom))'
                  }}
                >
                  <Icon className="w-5 h-5 text-white stroke-[2.2] shrink-0" />
                  <span className="text-[13px] font-bold leading-none tracking-tight whitespace-nowrap">
                    {tab.label}
                  </span>
                </motion.div>
              </div>
            );
          }

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="flex-1 h-12 flex flex-col items-center justify-center gap-0.5 text-white/90 hover:text-white transition-opacity group relative cursor-pointer active:scale-96"
              aria-label={tab.label}
            >
              <div className="relative flex items-center justify-center shrink-0">
                <Icon 
                  className="w-[22px] h-[22px] stroke-[1.75]" 
                  style={{ color: 'rgba(255, 255, 255, 0.88)' }}
                />
                {tab.hasDot && (
                  <span 
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-white" 
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                )}
              </div>
              <span 
                className="text-[10px] font-semibold leading-none tracking-tight whitespace-nowrap"
                style={{ color: 'rgba(255, 255, 255, 0.78)' }}
              >
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
