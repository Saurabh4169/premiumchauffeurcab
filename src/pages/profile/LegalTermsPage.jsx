// src/pages/profile/LegalTermsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScrollText, ShieldCheck } from 'lucide-react';

export default function LegalTermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full pb-28 bg-[#f8f9fb]">
      <div className="sticky top-0 z-30 px-4 h-[52px] bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-sans font-bold text-[16px] text-slate-900">
          Terms & Privacy
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3 text-[13px] text-slate-600 leading-relaxed">
          <h2 className="font-sans font-bold text-[16px] text-slate-900">
            Written Quote Price Guarantee
          </h2>
          <p>
            Premium Chauffeur Services guarantees that the total amount specified on your written quote is final and all-inclusive. This rate includes applicable highway tolls, airport gate pickup fees, portico staging buffer time, and a 20% chauffeur gratuity.
          </p>

          <h2 className="font-sans font-bold text-[16px] text-slate-900 pt-2 border-t border-slate-100">
            Aviation Grace Period Policy
          </h2>
          <p>
            Domestic commercial arrivals receive 60 minutes of complimentary wait time beginning at aircraft wheels-down (radar verified). International commercial arrivals receive 90 minutes. Excess wait time thereafter is billed in 15-minute intervals.
          </p>

          <h2 className="font-sans font-bold text-[16px] text-slate-900 pt-2 border-t border-slate-100">
            Cancellation & Modification Policy
          </h2>
          <p>
            Sedan and SUV transfers may be modified or cancelled without penalty up to 2 hours prior to scheduled staging. Stretch limousines, Sprinter vans, and executive coaches require 24 hours written notice to release dispatch staging.
          </p>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            USDOT Authority #3849102 · ICC Operating Certificate · Lombard, IL Headquarters
          </div>
        </div>
      </div>
    </div>
  );
}
