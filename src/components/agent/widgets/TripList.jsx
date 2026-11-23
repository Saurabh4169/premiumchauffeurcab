// src/components/agent/widgets/TripList.jsx
import React from 'react';
import { Calendar, MapPin, User, AlertCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAgentStore } from '../../../store/agentStore.js';
import { useApp } from '../../../context/AppContext.jsx';

export default function TripListWidget({ widget }) {
  const navigate = useNavigate();
  const { trips } = widget;
  const { closeAgent, sendMessage } = useAgentStore();
  const { setTrips, showToast } = useApp();

  const handleCancelTrip = (tripId) => {
    if (window.confirm(`Are you sure you want to cancel trip #${tripId}? Free cancellation applies up to 2 hours prior to scheduled pickup.`)) {
      setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'cancelled', statusLabel: 'Cancelled by Client' } : t));
      showToast(`Trip #${tripId} has been cancelled without penalty`, 'info');
      sendMessage(`I have cancelled trip #${tripId}.`);
    }
  };

  const handleChangeTrip = (tripId) => {
    sendMessage(`I would like to change the date or pickup time for trip #${tripId}.`);
  };

  if (!trips || trips.length === 0) {
    return (
      <div className="bg-[#FAF5ED] rounded-[14px] p-3 text-center text-[12px] text-[#555555] my-2">
        No active upcoming bookings found.
      </div>
    );
  }

  return (
    <div className="space-y-2.5 my-2">
      {trips.map(trip => (
        <div key={trip.id} className="bg-white rounded-[16px] p-3.5 border border-[#E2E2E2] shadow-xs space-y-2 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[13px] text-[#120F11]">Trip #{trip.id}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#120F11] text-[10px] font-bold uppercase tracking-wider">
              {trip.statusLabel}
            </span>
          </div>

          <div className="space-y-1 text-[#555555]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#BE8A44] shrink-0" />
              <span className="font-medium text-[#120F11]">{trip.date} · {trip.time}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#555555] shrink-0 mt-0.5" />
              <span className="truncate">{trip.pickup} → {trip.dropoff}</span>
            </div>
            {trip.chauffeur && (
              <div className="flex items-center gap-1.5 pt-0.5">
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Chauffeur: <strong className="text-[#120F11]">{trip.chauffeur.name}</strong></span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#E2E2E2] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleChangeTrip(trip.id)}
              className="px-2.5 py-1 rounded-[8px] bg-[#FAF5ED] hover:bg-slate-200 text-[#120F11] font-semibold text-[11px] cursor-pointer"
            >
              Change Details
            </button>
            <button
              type="button"
              onClick={() => handleCancelTrip(trip.id)}
              className="px-2.5 py-1 rounded-[8px] bg-[#FAF5ED] hover:bg-[#FAF5ED] text-[#BE8A44] font-semibold text-[11px] cursor-pointer"
            >
              Cancel Trip
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
