// src/components/agent/widgets/VehicleRecommendation.jsx
import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import AnsweredWidgetLine from './AnsweredWidgetLine.jsx';

export default function VehicleRecommendationWidget({ widget, answered, answeredValue, onSelect, onEdit }) {
  const { bestMatch, alternative, reason } = widget;

  if (answered) {
    return (
      <AnsweredWidgetLine
        label="Vehicle Selected"
        value={answeredValue}
        onEdit={onEdit}
      />
    );
  }

  return (
    <div className="space-y-2.5 my-2">
      {/* 1. Best Match Card */}
      {bestMatch && (
        <div className="bg-white rounded-[18px] p-3.5 border-2 border-[#101417] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#101417] text-white text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#F43F43]" />
              <span>Recommended Match</span>
            </span>
            <span className="text-[11px] font-medium text-[#6B7075]">
              {bestMatch.categoryLabel}
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <img
              src={bestMatch.image}
              alt={bestMatch.name}
              className="w-24 h-16 object-cover rounded-[10px] bg-[#F5F5F7] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[14px] text-[#101417] truncate leading-tight">
                {bestMatch.name}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-[#6B7075] mt-0.5">
                <span>{bestMatch.passengers} pax</span>
                <span>·</span>
                <span>{bestMatch.luggage} bags</span>
              </div>
              <p className="text-[11px] text-[#6B7075] line-clamp-2 mt-1">
                {reason || bestMatch.headline}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8E8EC] flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#6B7075] block font-semibold">
                Sample estimate
              </span>
              <span className="text-[15px] font-bold text-[#101417]">
                ${bestMatch.sampleEstimate || '185'} <span className="text-[10px] font-normal text-[#6B7075]">all-in</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelect(widget.id, 'vehicle', bestMatch.id)}
              className="h-8.5 px-3 rounded-[10px] bg-[#101417] text-white hover:bg-[#F43F43] font-semibold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Select {bestMatch.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Alternative Card (if available) */}
      {alternative && (
        <div className="bg-[#F5F5F7] rounded-[16px] p-3 border border-[#E8E8EC] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-[#6B7075] tracking-wider block">
              Alternative Option
            </span>
            <h5 className="font-semibold text-[13px] text-[#101417] truncate">
              {alternative.name}
            </h5>
            <span className="text-[11px] text-[#6B7075]">
              {alternative.passengers} pax · {alternative.luggage} bags · ${alternative.sampleEstimate} est.
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(widget.id, 'vehicle', alternative.id)}
            className="h-7.5 px-2.5 rounded-[8px] bg-white border border-[#E8E8EC] text-[#101417] hover:border-[#101417] font-semibold text-[11px] shrink-0 cursor-pointer transition-colors shadow-xs"
          >
            Choose
          </button>
        </div>
      )}
    </div>
  );
}
