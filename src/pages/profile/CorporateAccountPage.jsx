// src/pages/profile/CorporateAccountPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, ShieldCheck, FileText, Check } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function CorporateAccountPage() {
  const navigate = useNavigate();
  const { user, setUser, showToast } = useApp();

  const [company, setCompany] = useState(user.corporateCompany || 'Meridian Capital Chicago');
  const [billingCode, setBillingCode] = useState(user.billingCode || 'MCC-EXEC-701');
  const [taxId, setTaxId] = useState('36-9842109');
  const [billingEmail, setBillingEmail] = useState('ap@meridiancap.com');

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      isCorporate: true,
      corporateCompany: company,
      billingCode: billingCode
    }));
    showToast('Corporate direct billing updated', 'success');
  };

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Corporate Account" showBack />

      <div className="px-4 pt-4 space-y-4">
        {/* Value Proposition Hero Card */}
        <div className="bg-[#101417] text-white rounded-2xl p-4.5 border border-white/10 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-red-400 text-[11px] font-sans uppercase tracking-wider font-bold">
            <Building2 className="w-4 h-4 text-[#F43F43]" />
            <span>Dedicated Business Program</span>
          </div>
          <h2 className="font-sans text-[18px] font-bold text-white leading-tight">
            Named Chauffeurs & Net-30 Invoicing
          </h2>
          <p className="text-[12px] text-slate-300 font-normal leading-relaxed">
            Consolidate corporate roadshows, C-suite airport transfers, and team conference shuttles into a single monthly written invoice.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5 text-[12.5px] text-slate-700">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Named recurring chauffeurs who know your team's schedule</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Itemized travel receipts with employee cost centers</span>
          </div>
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Commercial $5M liability COI sent to your risk desk on request</span>
          </div>
        </div>

        {/* Corporate Profile Settings Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3.5">
          <h3 className="font-sans font-bold text-[15px] text-slate-900 border-b border-slate-100 pb-2">
            Company Billing Details
          </h3>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
              Company Legal Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 font-medium outline-none focus:border-[#F43F43] focus:bg-white transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
                Account Code
              </label>
              <input
                type="text"
                value={billingCode}
                onChange={(e) => setBillingCode(e.target.value)}
                className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-sans outline-none focus:border-[#F43F43] focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
                Tax ID / EIN
              </label>
              <input
                type="text"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-sans outline-none focus:border-[#F43F43] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
              Accounts Payable Email
            </label>
            <input
              type="email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 font-sans outline-none focus:border-[#F43F43] focus:bg-white transition-all"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-full bg-gradient-to-r from-[#F43F43] to-[#DC2626] text-white font-bold text-[13.5px] flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Update Corporate Billing</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
