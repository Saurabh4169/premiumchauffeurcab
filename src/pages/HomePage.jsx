// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sun,
  MapPin, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  ArrowUpDown,
  Sparkles, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  Plane, 
  Briefcase 
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import AppHeader from '../components/AppHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import BottomSheet from '../components/common/BottomSheet.jsx';
import { FLEET } from '../data/fleet.js';
import { useApp } from '../context/AppContext.jsx';
import { DRIVE_TABS, DRIVE_LOCATIONS } from '../data/driveLocations.js';

export default function HomePage() {
  const navigate = useNavigate();
  const { 
    user, 
    bookingDraft, 
    updateBookingDraft, 
    setActiveCityId 
  } = useApp();

  const [pickupInput, setPickupInput] = useState(bookingDraft.pickup || '');
  const [dropoffInput, setDropoffInput] = useState(bookingDraft.dropoff || '');

  // Where We Drive Tabs & Selected Location for Detail Modal
  const [activeLocationTab, setActiveLocationTab] = useState('cities');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAllLocations, setShowAllLocations] = useState(false);

  // Synchronize local input state with booking draft
  const handlePickupChange = (val) => {
    setPickupInput(val);
    updateBookingDraft({ pickup: val });
  };

  const handleDropoffChange = (val) => {
    setDropoffInput(val);
    updateBookingDraft({ dropoff: val });
  };

  const handleDirectBooking = () => {
    updateBookingDraft({
      pickup: pickupInput,
      dropoff: dropoffInput
    });
    navigate('/book');
  };

  const handleBookLocation = (loc) => {
    if (loc.marketId) {
      setActiveCityId(loc.marketId);
    }
    updateBookingDraft({
      pickup: loc.name.includes('ORD') || loc.name.includes('MDW') || loc.name.includes('JFK') 
        ? `${loc.name} Arrivals` 
        : `${loc.name}, Downtown Center`
    });
    setSelectedLocation(null);
    navigate('/book');
  };

  // Format schedule date cleanly in natural English (e.g. "Nov 21 · 10:30 AM")
  const formatSchedule = (dateStr, timeStr) => {
    if (!dateStr) return 'Schedule ride';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const mIdx = parseInt(parts[1], 10) - 1;
        const mName = monthNames[mIdx] || parts[1];
        return `${mName} ${parseInt(parts[2], 10)} · ${timeStr || '10:30 AM'}`;
      }
      return `${dateStr} · ${timeStr}`;
    } catch {
      return `${dateStr} · ${timeStr}`;
    }
  };

  // 4 Featured flagship vehicles for the 2x2 grid (matches reference image 2)
  const featuredVehicleIds = ['mercedes-s-class', 'cadillac-escalade-esv', 'bmw-i7', 'mercedes-jet-sprinter'];
  const featuredVehicles = featuredVehicleIds
    .map(id => FLEET.find(v => v.id === id))
    .filter(Boolean);

  const currentLocations = DRIVE_LOCATIONS[activeLocationTab] || DRIVE_LOCATIONS.cities;

  return (
    <Screen withTabBar className="bg-[var(--page)] px-0">
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <AppHeader />

      {/* 2. TOP GREETING HEADER */}
      <div className="px-4 pt-3 pb-2 flex items-start justify-between">
        <div>
          {/* Greeting Badge: ☀️ GOOD AFTERNOON */}
          <div className="flex items-center gap-1.5 mb-1">
            <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
              GOOD AFTERNOON
            </span>
          </div>

          {/* User Name & Tagline */}
          <h1 className="text-[24px] leading-[28px] font-bold text-[var(--ink)] tracking-tight">
            {user?.name || 'Alex Morgan'}
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] font-medium mt-1 leading-[18px]">
            Quiet luxury, precision staging & 24/7 Lombard dispatch.
          </p>
        </div>
      </div>

      {/* 3. HERO FEATURE BANNER (Clean Luxury Edition - Crystal Clear Vehicle Imagery) */}
      <div className="px-4 mb-4">
        <div className="relative rounded-[22px] p-5 bg-gradient-to-br from-[#12161A] via-[#101417] to-[#0A0C0E] border border-white/10 text-white shadow-md overflow-hidden flex flex-col justify-between min-h-[160px]">
          {/* Crystal Clear Vehicle Photo on Right */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden">
            <img
              src="/fleet/mercedes-s-class.webp"
              alt="Flagship Mercedes-Benz S-Class"
              className="w-full h-full object-cover object-right select-none"
            />
            {/* Subtle feathering strictly on the left transition edge to keep text legible while the car remains 100% clear */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#12161A] via-[#12161A]/60 to-transparent pointer-events-none" />
          </div>

          {/* Left Content: Clean, uncluttered, premium copy */}
          <div className="relative z-10 space-y-1.5 max-w-[210px]">
            <h2 className="text-[20px] font-bold text-white leading-[25px] tracking-tight">
              First-Class Chauffeur Service
            </h2>
            <p className="text-[12px] text-white/75 font-medium leading-[17px]">
              Flat rates · Zero surge · 24/7 Lombard dispatch
            </p>
          </div>

          {/* Single High-End Action Button */}
          <div className="relative z-10 pt-3">
            <button
              type="button"
              onClick={handleDirectBooking}
              className="h-10 px-5 rounded-full bg-gradient-to-r from-[var(--accent-top)] to-[var(--accent-bottom)] text-white text-[13px] font-bold flex items-center gap-1.5 shadow-md shadow-[var(--accent)]/30 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. DIRECT PICKUP & DESTINATION BOOKING CARD (Clean Luxury Edition) */}
      <div className="px-4 mb-4">
        <div className="bg-[var(--surface)] rounded-[18px] p-3 border border-[var(--border)] shadow-[var(--shadow-card)] space-y-2.5">
          {/* Header */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[12px] font-bold text-[var(--ink)] tracking-tight">
                Reserve a Chauffeur
              </span>
            </div>
            <span className="text-[11px] font-medium text-[var(--text-muted)]">
              All-inclusive flat rates
            </span>
          </div>

          {/* Clean Dual Route Capsule (No redundant stacked labels) */}
          <div className="relative bg-[var(--page)] rounded-[14px] border border-[var(--border)] overflow-hidden">
            {/* Visual connector line between Pickup and Destination dots */}
            <div className="absolute left-[15px] top-[18px] bottom-[18px] w-[1.5px] bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-[var(--success)] pointer-events-none" />

            {/* Pickup Row */}
            <div className="flex items-center px-3 h-10 gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] ring-3 ring-[var(--accent)]/20 shrink-0 z-10" />
              <input
                type="text"
                value={pickupInput}
                onChange={(e) => handlePickupChange(e.target.value)}
                placeholder="Enter pickup location"
                className="w-full bg-transparent text-[13px] font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--text-subtle)] truncate"
              />
            </div>

            {/* Hairline Divider */}
            <div className="h-[1px] bg-[var(--border)] ml-7 mr-3" />

            {/* Destination Row */}
            <div className="flex items-center px-3 h-10 gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] ring-3 ring-[var(--success)]/20 shrink-0 z-10" />
              <input
                type="text"
                value={dropoffInput}
                onChange={(e) => handleDropoffChange(e.target.value)}
                placeholder="Enter destination"
                className="w-full bg-transparent text-[13px] font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--text-subtle)] truncate"
              />
              {/* Swap Route Button */}
              <button
                type="button"
                onClick={() => {
                  const temp = pickupInput;
                  handlePickupChange(dropoffInput);
                  handleDropoffChange(temp);
                }}
                title="Swap pickup and destination"
                aria-label="Swap pickup and destination"
                className="w-6 h-6 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--accent-tint)] hover:text-[var(--accent)] text-[var(--text-muted)] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3 h-3 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Schedule & Direct CTA Row */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div 
              onClick={handleDirectBooking}
              className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-[var(--page)] border border-[var(--border)] text-[var(--ink)] cursor-pointer hover:border-[var(--accent)] transition-colors min-w-0 flex-1 group"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span className="text-[11.5px] font-semibold truncate group-hover:text-[var(--accent)] transition-colors">
                {formatSchedule(bookingDraft.date, bookingDraft.time)}
              </span>
            </div>

            {/* Direct Booking Button */}
            <button
              type="button"
              onClick={handleDirectBooking}
              className="h-9 px-4 rounded-full bg-gradient-to-r from-[var(--accent-top)] to-[var(--accent-bottom)] text-white text-[12.5px] font-bold flex items-center gap-1.5 shadow-sm shadow-[var(--accent)]/25 hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label="Book now"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. WHERE WE DRIVE SECTION (Above Featured Vehicles - At least 4 locations shown properly) */}
      <div className="mb-6">
        {/* Section Header */}
        <div className="px-4 mb-3 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-[22px] leading-[26px] font-display font-semibold text-[var(--ink)]">
                Where we drive
              </h2>
              <span className="text-[12px] font-display italic text-[#C9A24B] font-medium">
                Five cities, one standard
              </span>
            </div>
            <p className="text-[12px] text-[var(--text-muted)] font-medium mt-0.5 leading-snug">
              Same chauffeurs, cars and flat pricing in every city.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAllLocations(true)}
            className="text-[12px] font-semibold text-[#C9A24B] hover:underline cursor-pointer shrink-0"
          >
            View all &gt;
          </button>
        </div>

        {/* Location Tabs (Small pill chips: Cities · Airports · Chicago Suburbs) */}
        <div className="flex items-center gap-1.5 px-4 mb-3 overflow-x-auto no-scrollbar">
          {DRIVE_TABS.map((tab) => {
            const isActive = activeLocationTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveLocationTab(tab.id)}
                className={`h-8 px-3.5 rounded-full text-[12px] font-bold transition-all cursor-pointer whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-[var(--ink)] text-white shadow-xs'
                    : 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--surface-muted)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Exactly 4 Cards Grid - No partially visible 5th card */}
        <div className="grid grid-cols-4 gap-2 px-4">
          {currentLocations.slice(0, 4).map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <motion.div
                key={loc.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedLocation(loc)}
                className={`relative h-[134px] rounded-[18px] overflow-hidden cursor-pointer shadow-xs group select-none transition-all ${
                  isSelected
                    ? 'ring-1.5 ring-[#C9A24B] border-[#C9A24B] shadow-md'
                    : 'border border-[var(--border)] hover:border-[#C9A24B]/50'
                }`}
              >
                {/* Full-bleed photo with fallback */}
                <img
                  src={loc.image}
                  alt={loc.name}
                  onError={(e) => {
                    if (loc.fallback) e.currentTarget.src = loc.fallback;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark-to-transparent gradient at bottom for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Bottom text */}
                <div className="absolute bottom-2 left-1.5 right-1.5 z-10 text-left">
                  <h4 className="text-[11.5px] font-bold text-white leading-[13.5px] line-clamp-2">
                    {loc.name}
                  </h4>
                  <p className="text-[9px] text-white/80 font-medium leading-tight mt-0.5 truncate">
                    {loc.sublabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 6. FEATURED VEHICLES (2x2 Grid) */}
      <div className="px-4 mb-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--text-muted)] block leading-none mb-1">
              FLAGSHIP FLEET
            </span>
            <h2 className="text-[20px] font-bold text-[var(--ink)] leading-[24px]">
              Featured Vehicles
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/fleet')}
            className="text-[13px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            All Models &gt;
          </button>
        </div>

        {/* 2x2 Unified ProductCard Grid */}
        <div className="grid grid-cols-2 gap-3">
          {featuredVehicles.map((vehicle) => (
            <ProductCard
              key={vehicle.id}
              item={vehicle}
              type="vehicle"
              variant="grid"
            />
          ))}
        </div>
      </div>

      {/* 7. TAILORED CHAUFFEUR SERVICES */}
      <div className="px-4 mb-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--text-muted)] block leading-none mb-1">
              CHAUFFEUR ARCHITECTURES
            </span>
            <h2 className="text-[20px] font-bold text-[var(--ink)] leading-[24px]">
              Tailored Chauffeur Services
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="text-[13px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            Explore All &gt;
          </button>
        </div>

        {/* Architectural Service Cards */}
        <div className="space-y-4">
          {/* Architecture Card 1: Airport Transportation */}
          <div 
            onClick={() => navigate('/services/airport-transportation')}
            className="bg-[var(--surface)] rounded-[22px] overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)] cursor-pointer group transition-all hover:border-[var(--accent)]/40"
          >
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img
                src="/services/airport-transportation.webp"
                alt="Airport Transportation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-black/40 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--ink)]/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
                  <Plane className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Flight Tracked</span>
                </span>
              </div>
              <h3 className="absolute bottom-3 left-3 right-3 text-[18px] font-bold text-white leading-tight">
                Airport Flight-Tracked Transfers
              </h3>
            </div>
            <div className="p-3.5">
              <p className="text-[13px] text-[var(--text)] font-medium leading-[18px]">
                Real-time commercial flight tracking with 60 min complimentary wait. Chauffeur staged before flight touchdown.
              </p>
              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[12px]">
                <span className="text-[var(--text-muted)] font-medium">All-Inclusive Quote</span>
                <span className="text-[var(--accent)] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Architecture Card 2: Corporate & Executive Travel */}
          <div 
            onClick={() => navigate('/services/corporate-executive')}
            className="bg-[var(--surface)] rounded-[22px] overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)] cursor-pointer group transition-all hover:border-[var(--accent)]/40"
          >
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img
                src="/services/corporate-executive.webp"
                alt="Corporate & Executive"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-black/40 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--ink)]/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Roadshows & Board Meetings</span>
                </span>
              </div>
              <h3 className="absolute bottom-3 left-3 right-3 text-[18px] font-bold text-white leading-tight">
                Corporate Executive Chauffeur Service
              </h3>
            </div>
            <div className="p-3.5">
              <p className="text-[13px] text-[var(--text)] font-medium leading-[18px]">
                Confidential executive transport with route contingency buffers, named drivers and itemized monthly billing.
              </p>
              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[12px]">
                <span className="text-[var(--text-muted)] font-medium">Written Flat Rates</span>
                <span className="text-[var(--accent)] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. VERIFIED STAGING / Case Study */}
      <div className="px-4 mb-6">
        <div 
          onClick={() => navigate('/profile/corporate')}
          className="bg-[var(--surface)] rounded-[22px] overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)] cursor-pointer group transition-all hover:border-[var(--accent)]/40"
        >
          <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
            <img
              src="/fleet/promo-highway.webp"
              alt="Corporate Staging"
              onError={(e) => {
                e.currentTarget.src = '/fleet/cadillac-escalade-esv.webp';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold">
                Commercial Account
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--ink)] text-white text-[11px] font-bold">
                2024
              </span>
            </div>
            <h3 className="absolute bottom-3 left-3 right-3 text-[18px] font-bold text-white leading-tight">
              Executive Corporate Fleet Staging
            </h3>
          </div>

          <div className="p-3.5">
            <div className="flex items-center justify-between text-[12px] font-bold text-[var(--ink)] mb-1">
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Chicago Loop, O'Hare & Suburbs</span>
              </span>
              <span className="text-[var(--accent)]">Zero Surge Guarantee</span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[12px]">
              <span className="text-[var(--text-muted)] font-medium">Commercial Insurance & FBI Checked</span>
              <span className="text-[var(--accent)] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Corporate Staging</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 9. BOTTOM CUSTOM QUOTE BANNER */}
      <div className="px-4 mb-6">
        <div className="rounded-[22px] p-5 bg-[var(--ink)] text-white shadow-lg flex items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--accent)] block">
              NEED CUSTOM DISPATCH OR BUS CHARTER?
            </span>
            <h3 className="text-[17px] font-bold text-white leading-tight">
              Request a Custom Quote
            </h3>
            <p className="text-[12px] text-white/70 leading-snug line-clamp-2">
              Commercial proposals, weddings & motorcoaches prepared within 24 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/support/request?type=quote')}
            className="h-11 px-5 rounded-full bg-gradient-to-r from-[var(--accent-top)] to-[var(--accent-bottom)] text-white text-[13px] font-bold shadow-md shadow-[var(--accent)]/30 hover:opacity-95 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            Get Quote
          </button>
        </div>
      </div>

      {/* LOCATION DETAIL BOTTOM SHEET */}
      <BottomSheet
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        title={selectedLocation?.name || 'Location Details'}
      >
        {selectedLocation && (
          <div className="space-y-4 pb-4">
            {/* Location Image */}
            <div className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden bg-slate-900 shadow-sm">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                onError={(e) => {
                  if (selectedLocation.fallback) e.currentTarget.src = selectedLocation.fallback;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                  {selectedLocation.sublabel}
                </span>
                <h3 className="text-[18px] font-bold leading-tight">
                  {selectedLocation.name} Service Hub
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-[13.5px] text-[var(--text)] font-medium leading-[20px]">
              {selectedLocation.description}
            </p>

            {/* Airports Served */}
            {selectedLocation.airports && (
              <div className="p-3 rounded-[14px] bg-[var(--surface-muted)] border border-[var(--border)]">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  <Plane className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Airports & Transit Corridors</span>
                </div>
                <p className="text-[13px] font-bold text-[var(--ink)]">
                  {selectedLocation.airports}
                </p>
              </div>
            )}

            {/* Services Available Checklist */}
            {selectedLocation.services && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Available Services
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedLocation.services.map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--ink)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0" />
                      <span className="truncate">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleBookLocation(selectedLocation)}
                className="btn-primary w-full h-12 rounded-[14px] text-[14px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Book a ride here</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>

              <a
                href="tel:+18472682323"
                className="w-full h-11 rounded-[14px] bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--ink)] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[var(--ink)]" />
                <span>Call 24/7 Dispatch Hotline (+1 847-268-2323)</span>
              </a>
            </div>
          </div>
        )}
      </BottomSheet>

      {/* ALL DESTINATIONS EXPLORER BOTTOM SHEET */}
      <BottomSheet
        isOpen={showAllLocations}
        onClose={() => setShowAllLocations(false)}
        title={`All ${DRIVE_TABS.find(t => t.id === activeLocationTab)?.label || 'Locations'}`}
      >
        <div className="space-y-3 pb-4">
          <p className="text-[12.5px] text-[var(--text-muted)] font-medium">
            Explore all {currentLocations.length} locations in this region with guaranteed flat pricing and luxury chauffeur staging.
          </p>
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {currentLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => {
                  setShowAllLocations(false);
                  setSelectedLocation(loc);
                }}
                className="relative h-28 rounded-[16px] overflow-hidden cursor-pointer border border-[var(--border)] group select-none shadow-xs"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  onError={(e) => {
                    if (loc.fallback) e.currentTarget.src = loc.fallback;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white z-10 text-left">
                  <h4 className="text-[12.5px] font-bold leading-tight truncate">
                    {loc.name}
                  </h4>
                  <p className="text-[9.5px] text-white/80 font-medium truncate mt-0.5">
                    {loc.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BottomSheet>
    </Screen>
  );
}
