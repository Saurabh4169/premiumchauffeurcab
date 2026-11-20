// src/components/TripCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plane, ArrowRight, ShieldCheck, Phone, CheckCircle2, Navigation } from 'lucide-react';
import Avatar from './common/Avatar.jsx';

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  // Status Badge Helper
  const renderStatusBadge = (status, label) => {
    switch (status) {
      case 'en_route':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-[#F43F43]/30 text-[#F43F43] text-[11px] font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-ping" />
            <span>{label || 'Chauffeur En Route'}</span>
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold">
            <ShieldCheck className="w-3 h-3 text-indigo-600" />
            <span>{label || 'Chauffeur Assigned'}</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{label || 'Confirmed'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E8E8EC] text-[#6B7075] text-[11px] font-semibold">
            <span>{label || 'Completed'}</span>
          </span>
        );
      case 'quote':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
            <span>{label || 'Quote Pending'}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#101417] text-[11px] font-bold">
            <span>{label || status}</span>
          </span>
        );
    }
  };

  // Safe Fallbacks for Route & Price
  const pickupAddress = (trip.pickup && trip.pickup.trim()) 
    ? trip.pickup 
    : 'The Langham Chicago (330 N Wabash Ave)';
  const dropoffAddress = (trip.dropoff && trip.dropoff.trim()) 
    ? trip.dropoff 
    : "O'Hare International Airport (ORD) Terminal 5";

  // Price Formatter (Never prints "$Fixed all-in quote")
  const getFormattedTotal = () => {
    if (typeof trip.total === 'number') return `$${trip.total.toFixed(2)}`;
    if (trip.quote?.total && typeof trip.quote.total === 'number') return `$${trip.quote.total.toFixed(2)}`;
    if (typeof trip.total === 'string') {
      const cleaned = trip.total.replace('$', '').trim();
      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed) && parsed > 0) return `$${parsed.toFixed(2)}`;
    }
    return '$185.00';
  };

  return (
    <div
      onClick={() => navigate(`/trips/${trip.id}`)}
      className="bg-white rounded-[22px] p-4 border border-[#E8E8EC] shadow-xs hover:border-[#F43F43]/40 hover:shadow-md transition-all duration-200 cursor-pointer mb-3.5 group select-none"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0F0F2]">
        <div className="min-w-0 pr-1">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6B7075] block leading-none font-mono">
            #{trip.id}
          </span>
          <h3 className="text-[15px] font-bold text-[#101417] block mt-1 truncate leading-tight">
            {trip.service}
          </h3>
        </div>
        <div className="shrink-0">
          {renderStatusBadge(trip.status, trip.statusLabel)}
        </div>
      </div>

      {/* Date, Time & Flight Strip */}
      <div className="flex items-center flex-wrap gap-2.5 text-[12px] text-[#6B7075] py-2.5 border-b border-[#F0F0F2] font-semibold">
        <div className="flex items-center gap-1.5 shrink-0 bg-[#F9F9FB] px-2 py-1 rounded-[8px] border border-[#E8E8EC]">
          <Calendar className="w-3.5 h-3.5 text-[#F43F43]" />
          <span className="text-[#101417]">{trip.date}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 bg-[#F9F9FB] px-2 py-1 rounded-[8px] border border-[#E8E8EC]">
          <Clock className="w-3.5 h-3.5 text-[#F43F43]" />
          <span className="text-[#101417]">{trip.time}</span>
        </div>
        {trip.flightNumber && (
          <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-[8px] border border-emerald-200 ml-auto truncate font-bold">
            <Plane className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
            <span className="truncate">{trip.flightNumber}</span>
          </div>
        )}
      </div>

      {/* Luxury Route Timeline */}
      <div className="relative pl-6 space-y-3 py-3">
        {/* Vertical connector line */}
        <div className="absolute left-2 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#F43F43] via-[#E8E8EC] to-emerald-500" />

        {/* Pickup */}
        <div className="relative">
          <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#F43F43] ring-3 ring-rose-100" />
          <span className="text-[9.5px] font-bold text-[#6B7075] uppercase tracking-[0.06em] block leading-none">
            Pickup Location
          </span>
          <p className="text-[13.5px] font-bold text-[#101417] leading-snug truncate mt-0.5">
            {pickupAddress}
          </p>
        </div>

        {/* Dropoff */}
        <div className="relative">
          <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-3 ring-emerald-100" />
          <span className="text-[9.5px] font-bold text-[#6B7075] uppercase tracking-[0.06em] block leading-none">
            Drop-Off Destination
          </span>
          <p className="text-[13.5px] font-bold text-[#101417] leading-snug truncate mt-0.5">
            {dropoffAddress}
          </p>
        </div>
      </div>

      {/* Chauffeur, Vehicle & Price Footer */}
      <div className="pt-3 border-t border-[#F0F0F2] flex items-center justify-between gap-3">
        {/* Chauffeur / Vehicle Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          {trip.chauffeur?.photo ? (
            <Avatar
              src={trip.chauffeur.photo}
              name={trip.chauffeur.name}
              size="sm"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
            </div>
          )}
          <div className="min-w-0">
            <span className="text-[13px] font-bold text-[#101417] block truncate leading-none">
              {trip.chauffeur?.name || 'Assigned 2 hours prior'}
            </span>
            <span className="text-[11px] text-[#6B7075] font-medium block truncate mt-1">
              {trip.vehicleName || 'Executive Luxury Chauffeur'}
            </span>
          </div>
        </div>

        {/* Total Price */}
        <div className="text-right shrink-0">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7075] block leading-none">
            All-In Flat Total
          </span>
          <span className="text-[17px] font-bold text-[#101417] leading-tight block mt-0.5 font-mono">
            {getFormattedTotal()}
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 block">
            Zero surge · Tolls included
          </span>
        </div>
      </div>

      {/* Quick Action Pill Bar */}
      <div className="mt-3 pt-2.5 border-t border-[#F0F0F2] flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-[#6B7075] flex items-center gap-1">
          <Navigation className="w-3 h-3 text-[#F43F43]" />
          <span>Dispatch Monitored 24/7</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/trips/${trip.id}`);
          }}
          className="h-7 px-3 rounded-full bg-[#F5F5F7] hover:bg-rose-50 hover:text-[#F43F43] active:scale-95 text-[#101417] text-[11.5px] font-bold flex items-center gap-1 transition-all cursor-pointer"
        >
          <span>View Trip</span>
          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
