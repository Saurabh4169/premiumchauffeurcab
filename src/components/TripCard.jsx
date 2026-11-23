// src/components/TripCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Plane, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Avatar from './common/Avatar.jsx';

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  // Status Badge Helper
  const renderStatusBadge = (status, label) => {
    switch (status) {
      case 'en_route':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200/80 text-[#F43F43] text-[11px] font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-ping" />
            <span>{label || 'En Route'}</span>
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#101417] text-white text-[11px] font-bold shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-red-400" />
            <span>{label || 'Assigned'}</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{label || 'Confirmed'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-medium">
            <span>{label || 'Completed'}</span>
          </span>
        );
      case 'quote':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
            <span>{label || 'Quote'}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">
            <span>{label || status}</span>
          </span>
        );
    }
  };

  // Safe Fallbacks for Route & Price
  const pickupAddress = (trip.pickup && trip.pickup.trim()) 
    ? trip.pickup 
    : 'The Langham Chicago, 330 N Wabash Ave';
  const dropoffAddress = (trip.dropoff && trip.dropoff.trim()) 
    ? trip.dropoff 
    : "O'Hare International Airport (ORD) Terminal 5";

  // Price Formatter
  const getFormattedTotal = () => {
    if (typeof trip.total === 'number') return `$${trip.total.toFixed(2)}`;
    if (trip.quote?.total && typeof trip.quote.total === 'number') return `$${trip.quote.total.toFixed(2)}`;
    if (typeof trip.total === 'string') {
      const cleaned = trip.total.replace('$', '').trim();
      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed) && parsed > 0) return `$${parsed.toFixed(2)}`;
    }
    return '$185.50';
  };

  return (
    <div
      onClick={() => navigate(`/trips/${trip.id}`)}
      className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-[0_4px_16px_rgba(16,20,23,0.05)] hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer mb-4 group select-none space-y-3"
    >
      {/* 1. Header Row: Service + ID + Status */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10.5px] font-mono font-bold tracking-tight shrink-0">
            #{trip.id}
          </span>
          <h3 className="text-[14.5px] font-bold text-slate-900 leading-snug break-words line-clamp-2">
            {trip.service}
          </h3>
        </div>
        <div className="shrink-0">
          {renderStatusBadge(trip.status, trip.statusLabel)}
        </div>
      </div>

      {/* 2. Timing & Flight Bar */}
      <div className="bg-slate-50 border border-slate-100/90 rounded-xl px-3 py-1.5 flex items-center justify-between text-[12px] gap-2">
        <div className="flex items-center gap-2 font-semibold text-slate-700 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#F43F43]" />
            <span>{trip.date}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 shrink-0 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{trip.time}</span>
          </div>
        </div>

        {trip.flightNumber && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-white border border-emerald-200/80 px-2 py-0.5 rounded-full shrink-0 shadow-2xs">
            <Plane className="w-3 h-3 text-emerald-600" />
            <span className="truncate max-w-[120px]">{trip.flightNumber}</span>
          </div>
        )}
      </div>

      {/* 3. Streamlined Route Itinerary (Allows 2 lines for full addresses) */}
      <div className="relative pl-5 space-y-2.5 py-1">
        <div className="absolute left-1.5 top-2.5 bottom-2.5 w-[1.5px] bg-slate-200" />
        
        {/* Pickup */}
        <div className="relative flex items-start gap-2">
          <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-slate-900 ring-2 ring-slate-100" />
          <p className="text-[13px] font-semibold text-slate-900 leading-snug break-words line-clamp-2">
            {pickupAddress}
          </p>
        </div>

        {/* Drop-off */}
        <div className="relative flex items-start gap-2">
          <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-emerald-50" />
          <p className="text-[13px] font-semibold text-slate-900 leading-snug break-words line-clamp-2">
            {dropoffAddress}
          </p>
        </div>
      </div>

      {/* 4. Chauffeur Info & Price + CTA */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Chauffeur info */}
        <div className="flex items-center gap-2.5 min-w-0">
          {trip.chauffeur?.photo ? (
            <Avatar
              src={trip.chauffeur.photo}
              name={trip.chauffeur.name}
              size="sm"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            </div>
          )}
          <div className="min-w-0">
            <span className="text-[12px] font-bold text-slate-900 block truncate leading-tight">
              {trip.chauffeur?.name || 'Assigned 2h prior'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block truncate mt-0.5">
              {trip.vehicleName || 'Executive Chauffeur'}
            </span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[16px] font-extrabold text-slate-900 block leading-none">
              {getFormattedTotal()}
            </span>
            <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">
              All-inclusive
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trips/${trip.id}`);
            }}
            className="h-7.5 px-3 rounded-full bg-gradient-to-r from-[#F43F43] to-[#DC2626] text-white hover:brightness-105 active:scale-95 text-[11.5px] font-bold flex items-center gap-1 shadow-sm shadow-red-500/20 transition-all cursor-pointer"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
