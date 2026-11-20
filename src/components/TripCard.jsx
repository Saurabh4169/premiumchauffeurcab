// src/components/TripCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Plane, ArrowRight } from 'lucide-react';
import Badge from './common/Badge.jsx';
import Avatar from './common/Avatar.jsx';

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_route':
        return <Badge variant="danger" size="sm">Chauffeur En Route</Badge>;
      case 'assigned':
        return <Badge variant="accent" size="sm">Chauffeur Assigned</Badge>;
      case 'confirmed':
        return <Badge variant="success" size="sm">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="neutral" size="sm">Completed</Badge>;
      case 'quote':
        return <Badge variant="warning" size="sm">Quote Pending</Badge>;
      default:
        return <Badge variant="dark" size="sm">{status}</Badge>;
    }
  };

  return (
    <div
      onClick={() => navigate(`/trips/${trip.id}`)}
      className="bg-white rounded-[20px] p-3.5 border border-[var(--border)] shadow-[var(--shadow-card)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all duration-200 cursor-pointer mb-3 group select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[var(--border)]">
        <div className="min-w-0 pr-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--text-muted)] block leading-none">
            {trip.id}
          </span>
          <span className="text-[14px] font-bold text-[var(--ink)] block mt-0.5 truncate">
            {trip.service}
          </span>
        </div>
        {getStatusBadge(trip.status)}
      </div>

      {/* Date & Time Strip */}
      <div className="flex items-center gap-3 text-[12px] text-[var(--text-muted)] py-2 font-medium">
        <div className="flex items-center gap-1.5 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
          <span>{trip.date}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Clock className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
          <span>{trip.time}</span>
        </div>
        {trip.flightNumber && (
          <div className="flex items-center gap-1 text-[var(--success)] ml-auto truncate font-semibold">
            <Plane className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{trip.flightNumber}</span>
          </div>
        )}
      </div>

      {/* Routing Display */}
      <div className="relative pl-5 space-y-2.5 my-1.5">
        {/* Vertical connector line */}
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[var(--accent)] to-[var(--success)]" />

        {/* Pickup */}
        <div className="relative">
          <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-[var(--accent)] ring-2 ring-white" />
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.04em] block leading-none">Pickup</span>
          <p className="text-[14px] font-semibold text-[var(--ink)] leading-snug truncate mt-0.5">
            {trip.pickup}
          </p>
        </div>

        {/* Dropoff */}
        <div className="relative">
          <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-[var(--success)] ring-2 ring-white" />
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.04em] block leading-none">Drop-off</span>
          <p className="text-[14px] font-semibold text-[var(--ink)] leading-snug truncate mt-0.5">
            {trip.dropoff}
          </p>
        </div>
      </div>

      {/* Bottom Footer: Chauffeur & Price */}
      <div className="pt-2.5 border-t border-[var(--border)] flex items-center justify-between gap-3 mt-2.5">
        {trip.chauffeur ? (
          <div className="flex items-center gap-2 min-w-0">
            <Avatar
              src={trip.chauffeur.photo}
              name={trip.chauffeur.name}
              size="sm"
            />
            <div className="min-w-0">
              <span className="text-[13px] font-bold text-[var(--ink)] block truncate leading-none">
                {trip.chauffeur.name}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] block truncate mt-0.5">
                {trip.vehicleName || 'Executive Chauffeur'}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-[12px] text-[var(--text-muted)] font-medium">
            Chauffeur dispatched with buffer
          </div>
        )}

        <div className="text-right shrink-0">
          <span className="text-[11px] text-[var(--text-muted)] block leading-none">All-in total</span>
          <span className="text-[15px] font-bold text-[var(--ink)] leading-tight">
            ${trip.total}
          </span>
        </div>
      </div>
    </div>
  );
}
