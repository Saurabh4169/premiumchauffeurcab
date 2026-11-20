// src/pages/profile/CorporateAccountPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CheckCircle2, ShieldCheck, FileText, Phone, Mail, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function CorporateAccountPage() {
  const navigate = useNavigate();
  const { user, setUser, showToast } = useApp();

  const [company, setCompany] = useState(user.corporateCompany || 'Meridian Capital Chicago');
  const [billingCode, setBillingCode] = useState(user.billingCode || 'MCC-EXEC-701');
  const [taxId, setTaxId] = useState('36-9842109');
  const [billingEmail, setBillingEmail] = useState('ap@meridiancap.com');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      isCorporate: true,
      corporateCompany: company,
      billingCode: billingCode
    }));
    setIsSaved(true);
    showToast('Corporate direct billing updated', 'gold');
  };

  return (
    <div className="min-h-full pb-28 bg-[#f8f9fb]">
      {/* Top Header */}
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
          Corporate Executive Account
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Value Proposition Hero Card */}
        <div className="bg-[#111114] text-white rounded-3xl p-5 border border-white/10 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-[#FDEEEA] text-[11px] font-sans uppercase tracking-wider font-bold">
            <Building2 className="w-4 h-4" />
            <span>Dedicated Business Program</span>
          </div>
          <h2 className="font-sans text-[20px] font-bold text-white">
            Named Chauffeurs & Net-30 Invoicing
          </h2>
          <p className="text-[12.5px] text-slate-300 font-normal leading-relaxed">
            Consolidate corporate roadshows, C-suite airport transfers, and team conference shuttles into a single monthly written invoice.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2.5 text-[12.5px] text-slate-700">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#F43F43] shrink-0" />
            <span>Named recurring chauffeurs who know your team's schedule</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#F43F43] shrink-0" />
            <span>Itemized travel receipts with employee cost centers</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#F43F43] shrink-0" />
            <span>Commercial $5M liability COI sent to your risk desk on request</span>
          </div>
        </div>

        {/* Corporate Profile Settings Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4">
          <h3 className="font-sans font-bold text-[16px] text-slate-900 border-b border-slate-100 pb-2">
            Company Billing Details
          </h3>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Company Legal Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                Account Code
              </label>
              <input
                type="text"
                value={billingCode}
                onChange={(e) => setBillingCode(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-sans outline-none focus:border-[#F43F43]"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                Tax ID / EIN
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-sans outline-none focus:border-[#F43F43]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Accounts Payable Email
            </label>
            <input
              type="email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#F84146] via-[#F43F43] to-[#EC3A40] text-slate-950 font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-md shadow-[#F43F43]/20 cursor-pointer pt-0.5"
          >
            <span>Save Corporate Account</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>

        {/* Request COI Certificate */}
        <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-[13px] text-slate-900">Certificate of Insurance</h4>
              <p className="text-[11px] text-slate-500">Request formal ACORD 25 for risk team</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              showToast('Certificate of Insurance request sent to Dispatch', 'gold');
            }}
            className="px-3 py-1.5 rounded-xl bg-white text-slate-800 text-[11px] font-bold border border-slate-200 hover:border-slate-300 cursor-pointer"
          >
            Request COI
          </button>
        </div>
      </div>
    </div>
  );
}
