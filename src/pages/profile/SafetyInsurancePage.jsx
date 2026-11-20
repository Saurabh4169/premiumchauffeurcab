// src/pages/profile/SafetyInsurancePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Check, Plane, Users, FileText, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function SafetyInsurancePage() {
  const navigate = useNavigate();
  const { companyInfo, showToast } = useApp();

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
          Safety & Insurance
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Verification Banner */}
        <div className="bg-[#111114] text-white rounded-3xl p-5 border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-sans uppercase tracking-wider font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>USDOT & ICC Licensed Authority</span>
          </div>
          <h2 className="font-sans text-[20px] font-bold text-white">
            Uncompromising Passenger Safety
          </h2>
          <p className="text-[12.5px] text-slate-300 font-normal leading-relaxed">
            Our chauffeurs are career professionals subject to mandatory federal fingerprinting, recurring drug testing, and defensive driving certification.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="space-y-2.5">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-1">
            <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F43F43]" />
              <span>FBI Fingerprint & Background Vetting</span>
            </h3>
            <p className="text-[12px] text-slate-500 leading-snug">
              Every chauffeur is verified across local, state, and federal criminal databases prior to hire.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-1">
            <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F43F43]" />
              <span>$5,000,000 Commercial Liability</span>
            </h3>
            <p className="text-[12px] text-slate-500 leading-snug">
              Comprehensive passenger coverage with official ACORD 25 certificates provided to corporate risk teams.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-1">
            <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#F43F43]" />
              <span>Real-Time Flight Radar Dispatch</span>
            </h3>
            <p className="text-[12px] text-slate-500 leading-snug">
              Chauffeurs are staged 15 minutes before touchdown. 60 min domestic and 90 min international grace period included.
            </p>
          </div>
        </div>

        {/* COI Request Button */}
        <button
          type="button"
          onClick={() => {
            showToast('Certificate of Insurance request submitted to Lombard dispatch desk', 'gold');
          }}
          className="w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Request Certificate of Insurance (COI)</span>
        </button>
      </div>
    </div>
  );
}
