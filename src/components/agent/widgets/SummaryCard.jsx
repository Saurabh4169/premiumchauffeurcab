// src/components/agent/widgets/SummaryCard.jsx
import React from 'react';
import { Edit2, ShieldCheck, MapPin, Calendar, Users, Car } from 'lucide-react';

export default function SummaryCardWidget({ draft, onEditSlot }) {
  if (!draft) return null;

  return (
    <div className="bg-white rounded-[16px] p-3.5 border border-[#E2E2E2] shadow-xs my-2 space-y-2 text-[12px]">
      <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2">
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold uppercase tracking-wider text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Itinerary Summary</span>
        </div>
        <span className="text-[10px] text-[#555555]">Tap pencil to modify</span>
      </div>

      {/* Pickup */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex items-start gap-2 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#BE8A44] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#555555] block">Pickup</span>
            <span className="font-semibold text-[#120F11] break-words">{draft.pickup || 'Not set'}</span>
          </div>
        </div>
        {onEditSlot && (
          <button
            type="button"
            onClick={() => onEditSlot('pickup')}
            className="p-1 text-[#555555] hover:text-[#BE8A44] cursor-pointer shrink-0"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Dropoff */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#555555] block">Destination</span>
            <span className="font-semibold text-[#120F11] break-words">{draft.dropoff || 'Not set'}</span>
          </div>
        </div>
        {onEditSlot && (
          <button
            type="button"
            onClick={() => onEditSlot('dropoff')}
            className="p-1 text-[#555555] hover:text-[#BE8A44] cursor-pointer shrink-0"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Schedule */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <Calendar className="w-3.5 h-3.5 text-[#555555] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#555555] block">Schedule</span>
            <span className="font-semibold text-[#120F11]">
              {draft.date || 'Today'} · {draft.time || 'Immediate'}
            </span>
          </div>
        </div>
        {onEditSlot && (
          <button
            type="button"
            onClick={() => onEditSlot('date')}
            className="p-1 text-[#555555] hover:text-[#BE8A44] cursor-pointer shrink-0"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Capacity */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <Users className="w-3.5 h-3.5 text-[#555555] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#555555] block">Capacity</span>
            <span className="font-semibold text-[#120F11]">
              {draft.passengers || 2} passengers · {draft.luggage || 2} checked bags
            </span>
          </div>
        </div>
        {onEditSlot && (
          <button
            type="button"
            onClick={() => onEditSlot('passengers')}
            className="p-1 text-[#555555] hover:text-[#BE8A44] cursor-pointer shrink-0"
          >
            <Edit2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
