// src/components/common/ChatBubble.jsx
import React from 'react';
import { Bot, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

export default function ChatBubble({ message }) {
  const navigate = useNavigate();
  const { updateBookingDraft } = useApp();
  const isBot = message.sender === 'bot';

  const handleBookVehicle = (vehicle) => {
    updateBookingDraft({ selectedVehicleId: vehicle.id });
    navigate('/book');
  };

  return (
    <div className={`flex gap-2.5 mb-3.5 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-[#120F11] p-0.5 shrink-0 shadow-xs flex items-center justify-center text-white">
          <Bot className="w-4 h-4 text-[#BE8A44]" />
        </div>
      )}

      <div className={`max-w-[85%] ${isBot ? '' : 'items-end'}`}>
        {/* Main Text Bubble (14/20) */}
        <div
          className={`p-3.5 rounded-[16px] text-[14px] leading-[20px] font-medium shadow-xs ${
            isBot
              ? 'bg-white text-[#120F11] border border-[#E2E2E2] rounded-tl-sm'
              : 'bg-[#120F11] text-white rounded-tr-sm ml-auto'
          }`}
        >
          <p>{message.text}</p>
        </div>

        {/* Embedded Rich Card (if present) */}
        {message.card && (
          <div className="mt-2">
            {/* 1. Vehicle Recommendation Card */}
            {message.card.type === 'vehicle' && message.card.data && (
              <div className="bg-white rounded-[16px] p-3.5 border border-[#E2E2E2] shadow-xs">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#BE8A44] block">
                      Recommended Match
                    </span>
                    <h4 className="font-semibold text-[15px] text-[#120F11] mt-0.5">
                      {message.card.data.name}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#120F11] text-[11px] font-medium">
                    {message.card.data.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[12px] text-[#555555] my-2 py-1.5 border-y border-[#E2E2E2] font-medium">
                  <span>Up to {message.card.data.passengers} pax</span>
                  <span>·</span>
                  <span>{message.card.data.luggage} bags</span>
                </div>

                <p className="text-[12px] text-[#555555] line-clamp-2 mb-2.5">
                  {message.card.data.headline}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#555555] block font-semibold">Sample estimate</span>
                    <span className="text-[16px] font-bold text-[#120F11]">
                      ${message.card.data.sampleEstimate} <span className="text-[11px] font-normal text-[#555555]">all-in</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBookVehicle(message.card.data)}
                    className="btn-primary h-9 px-3.5 rounded-[10px] text-[13px] font-semibold text-[#120F11] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Select & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. All-Inclusive Quote Preview Card */}
            {message.card.type === 'quote' && message.card.data && (
              <div className="bg-white rounded-[16px] p-3.5 border border-[#E2E2E2] shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-semibold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Fixed Written Quote Guarantee</span>
                </div>
                <h4 className="font-semibold text-[15px] text-[#120F11] mb-2">
                  {message.card.data.title}
                </h4>

                <div className="space-y-1.5 text-[12px] text-[#555555] bg-[#FAF5ED] rounded-[12px] p-2.5 my-2 border border-[#E2E2E2]">
                  <div className="flex justify-between">
                    <span>Base Chauffeur Rate</span>
                    <span className="font-semibold text-[#120F11]">${message.card.data.base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tolls & Gate Fees</span>
                    <span className="font-semibold text-[#120F11]">${message.card.data.tolls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Airport Wait Time (60m)</span>
                    <span className="text-emerald-600 font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chauffeur Gratuity</span>
                    <span className="font-semibold text-[#120F11]">${message.card.data.gratuity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E2E2E2]">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#555555] block">Written Total</span>
                    <span className="text-[18px] font-bold text-[#120F11]">
                      ${message.card.data.total}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/book')}
                    className="btn-primary h-9 px-3.5 rounded-[10px] text-[13px] font-semibold text-[#120F11] flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
