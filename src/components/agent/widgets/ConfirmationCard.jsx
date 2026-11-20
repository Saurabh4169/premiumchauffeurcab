// src/components/agent/widgets/ConfirmationCard.jsx
import React from 'react';
import { CheckCircle, Calendar, ArrowRight, RotateCcw, Sparkles, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAgentStore } from '../../../store/agentStore.js';
import { useApp } from '../../../context/AppContext.jsx';

export default function ConfirmationCardWidget({ widget }) {
  const navigate = useNavigate();
  const { bookingRef, trip, quote } = widget;
  const { closeAgent, openAgent, resetChat } = useAgentStore();
  const { showToast } = useApp();

  const handleReturnToMainMenu = () => {
    resetChat();
    showToast("Returned to Main Menu · Fresh Chat Ready", "info");
  };

  const handleViewTrip = () => {
    closeAgent();
    navigate('/trips');
  };

  const handleCalendar = () => {
    showToast(`Trip ${bookingRef} exported to Apple / Google Calendar`, 'success');
  };

  const handleBookReturn = () => {
    // Reverse route in assistant
    openAgent({
      prefill: `I would like to book a return trip from ${trip.dropoff} back to ${trip.pickup}`
    });
  };

  const totalAmount = trip?.quote?.total || quote?.total || '115.00';

  return (
    <div className="bg-white rounded-[20px] p-4 border-2 border-emerald-500 shadow-sm my-2 space-y-3.5">
      {/* Success Badge */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
            Booking Confirmed · 24/7 Staging Locked
          </span>
          <h4 className="font-bold text-[17px] text-[#101417]">
            Reference #{bookingRef}
          </h4>
        </div>
      </div>

      {/* Trip Details Grid */}
      <div className="bg-[#F5F5F7] rounded-[14px] p-3 text-[12px] space-y-1.5 border border-[#E8E8EC]">
        <div className="flex justify-between">
          <span className="text-[#6B7075]">Vehicle Staging</span>
          <span className="font-semibold text-[#101417]">{trip.vehicleName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7075]">Route</span>
          <span className="font-semibold text-[#101417] truncate max-w-[200px]">
            {trip.pickup?.split(',')[0]} → {trip.dropoff?.split(',')[0]}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7075]">Schedule</span>
          <span className="font-semibold text-[#101417]">{trip.date} · {trip.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7075]">Total Fixed Rate</span>
          <span className="font-bold text-emerald-700">${totalAmount} all-in (Zero Surge)</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-[#E8E8EC]">
          <span className="text-[#6B7075]">Chauffeur</span>
          <span className="font-semibold text-[#101417]">Assigned with 30m Buffer (Lombard HQ)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {/* Prominent Return to Main Menu / Fresh Chat Button */}
        <button
          type="button"
          onClick={handleReturnToMainMenu}
          className="w-full h-10 rounded-[12px] bg-gradient-to-r from-[#F43F43] to-[#DC2626] hover:opacity-95 text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Return to Main Menu (Fresh Chat)</span>
        </button>

        <button
          type="button"
          onClick={handleViewTrip}
          className="w-full h-9 rounded-[10px] bg-[#101417] text-white hover:bg-[#F43F43] font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <span>View in My Trips</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCalendar}
            className="h-8.5 px-2 rounded-[8px] bg-[#F5F5F7] hover:bg-slate-200 border border-[#E8E8EC] text-[#101417] font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#6B7075]" />
            <span>Add to Calendar</span>
          </button>

          <button
            type="button"
            onClick={handleBookReturn}
            className="h-8.5 px-2 rounded-[8px] bg-[#F5F5F7] hover:bg-slate-200 border border-[#E8E8EC] text-[#101417] font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6B7075]" />
            <span>Book Return</span>
          </button>
        </div>
      </div>
    </div>
  );
}
