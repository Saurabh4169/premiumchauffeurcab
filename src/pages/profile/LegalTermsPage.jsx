// src/pages/profile/LegalTermsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plane, Clock, Award } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';

export default function LegalTermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Terms & Authority" showBack />

      <div className="px-4 pt-4 space-y-3.5">
        {/* Policy 1: Price Guarantee */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Written Flat-Rate Guarantee</span>
          </div>
          <h2 className="font-sans font-bold text-[15px] text-slate-900">
            No Surge Pricing & No Hidden Fees
          </h2>
          <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
            Premium Chauffeur Services guarantees that the total amount specified on your written quote is final and all-inclusive. This rate includes applicable highway tolls, airport gate pickup fees, portico staging buffer time, and a 20% chauffeur gratuity.
          </p>
        </div>

        {/* Policy 2: Airport Buffer */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px] uppercase tracking-wider">
            <Plane className="w-4 h-4 text-blue-600" />
            <span>Flight Tracking & Grace Period</span>
          </div>
          <h2 className="font-sans font-bold text-[15px] text-slate-900">
            60 Min Domestic / 90 Min International Buffer
          </h2>
          <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
            Domestic commercial arrivals receive 60 minutes of complimentary wait time beginning at aircraft wheels-down (radar verified). International commercial arrivals receive 90 minutes. Excess wait time thereafter is billed in 15-minute intervals.
          </p>
        </div>

        {/* Policy 3: Cancellation Terms */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Cancellation & Modifications</span>
          </div>
          <h2 className="font-sans font-bold text-[15px] text-slate-900">
            Flexible Advance Notice
          </h2>
          <p className="text-[12.5px] text-slate-600 leading-relaxed font-normal">
            Sedan and SUV transfers may be modified or cancelled without penalty up to 2 hours prior to scheduled staging. Stretch limousines, Sprinter vans, and executive coaches require 24 hours written notice to release dispatch staging.
          </p>
        </div>

        {/* Regulatory Badge */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 text-[11.5px] text-slate-500">
          <Award className="w-5 h-5 text-[#F43F43] shrink-0" />
          <span>USDOT Authority #3849102 · ICC Operating Certificate · Lombard, IL Dispatch Headquarters</span>
        </div>
      </div>
    </div>
  );
}
