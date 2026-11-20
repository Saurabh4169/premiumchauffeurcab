// src/components/agent/widgets/QuoteCard.jsx
import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAgentStore } from '../../../store/agentStore.js';
import { useApp } from '../../../context/AppContext.jsx';

export default function QuoteCardWidget({ widget }) {
  const { quote, vehicle, draft } = widget;
  const { confirmBooking } = useAgentStore();
  const { finalizeBooking } = useApp();

  const handleConfirm = () => {
    confirmBooking((tripObj) => {
      // Also register into AppContext trips so it appears in /trips & dispatcher
      if (finalizeBooking) {
        finalizeBooking(quote);
      }
    });
  };

  return (
    <div className="bg-white rounded-[20px] p-4 border-2 border-[#101417] shadow-sm my-2 space-y-3">
      {/* Header with Guarantee */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC]">
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero-Surge Flat Quote</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#F43F43] border border-rose-200 text-[10px] font-bold uppercase tracking-wider">
          {quote.badge || 'Sample estimate'}
        </span>
      </div>

      {/* Vehicle Info */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-[15px] text-[#101417] leading-tight">
            {vehicle?.name || 'Cadillac Escalade ESV'}
          </h4>
          <span className="text-[12px] text-[#6B7075]">
            {draft?.pickup?.split(',')[0]} → {draft?.dropoff?.split(',')[0]}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#101417] px-2 py-1 bg-[#F5F5F7] rounded-[8px]">
          {draft?.passengers || 2} pax · {draft?.luggage || 2} bags
        </span>
      </div>

      {/* Itemized Line Items */}
      <div className="space-y-1.5 text-[12px] bg-[#F5F5F7] rounded-[14px] p-3 border border-[#E8E8EC]">
        <div className="flex justify-between text-[#6B7075]">
          <span>Base Chauffeur Rate</span>
          <span className="font-medium text-[#101417]">${quote.baseFare}</span>
        </div>
        <div className="flex justify-between text-[#6B7075]">
          <span>Highway Tolls & Airport Access</span>
          <span className="font-medium text-[#101417]">${quote.tolls}</span>
        </div>
        <div className="flex justify-between text-[#6B7075]">
          <span>Airport Wait Time Buffer</span>
          <span className="font-medium text-emerald-600 font-semibold">{quote.waitComp || '60m Free'}</span>
        </div>
        <div className="flex justify-between text-[#6B7075]">
          <span>Chauffeur Gratuity (20% Included)</span>
          <span className="font-medium text-[#101417]">${quote.gratuity}</span>
        </div>

        <div className="border-t border-[#E8E8EC] pt-2 mt-1 flex justify-between items-baseline">
          <span className="font-bold text-[13px] text-[#101417]">Total All-Inclusive Quote</span>
          <span className="font-bold text-[18px] text-[#101417]">
            ${quote.total}
          </span>
        </div>
      </div>

      {/* Footnote */}
      <p className="text-[11px] text-[#6B7075] italic leading-tight">
        {quote.footnote || 'Final written quote confirmed by 24/7 Lombard dispatch. Never any surge multipliers or metered charges.'}
      </p>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={handleConfirm}
        className="w-full h-10 rounded-[12px] bg-[#F43F43] hover:bg-rose-600 text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Confirm Reservation Request</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
