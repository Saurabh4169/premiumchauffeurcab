// src/pages/profile/PaymentMethodsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Check, Trash2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function PaymentMethodsPage() {
  const navigate = useNavigate();
  const { user, setUser, showToast } = useApp();

  const handleSetDefault = (id) => {
    setUser(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(pm => ({
        ...pm,
        isDefault: pm.id === id
      }))
    }));
    showToast('Default payment method updated', 'gold');
  };

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
          Payment Methods
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="space-y-3">
          {user.paymentMethods.map((pm) => (
            <div
              key={pm.id}
              onClick={() => handleSetDefault(pm.id)}
              className={`p-4 rounded-3xl bg-white border transition-all cursor-pointer flex items-center justify-between ${
                pm.isDefault ? 'border-[#F43F43] shadow-md ring-1 ring-[#F43F43]/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-[#FDEEEA] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[14px] text-slate-900">{pm.label}</h3>
                    {pm.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F43F43]/15 text-[#F43F43] text-[10px] font-bold">
                        Default
                      </span>
                    )}
                  </div>
                  {pm.last4 && (
                    <p className="text-[12px] text-slate-400 font-sans mt-0.5">
                      •••• •••• •••• {pm.last4} · Exp {pm.expiry}
                    </p>
                  )}
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                pm.isDefault ? 'border-[#F43F43] bg-[#F43F43] text-slate-950' : 'border-slate-300'
              }`}>
                {pm.isDefault && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => showToast('Credit card tokenization modal opened', 'gold')}
          className="w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Payment Card</span>
        </button>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 text-[12px] text-slate-500">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>PCI-DSS Level 1 Encrypted Vault. Cards are never stored in plain text.</span>
        </div>
      </div>
    </div>
  );
}
