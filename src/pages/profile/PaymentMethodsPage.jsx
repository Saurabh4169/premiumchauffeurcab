// src/pages/profile/PaymentMethodsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Plus, Check, ShieldCheck } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';
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
    showToast('Default payment method updated', 'success');
  };

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Payment Methods" showBack />

      <div className="px-4 pt-4 space-y-4">
        <div className="space-y-2.5">
          {user.paymentMethods.map((pm) => (
            <div
              key={pm.id}
              onClick={() => handleSetDefault(pm.id)}
              className={`p-3.5 rounded-2xl bg-white border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                pm.isDefault 
                  ? 'border-[#F43F43] ring-1 ring-[#F43F43]/30 shadow-sm' 
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[13.5px] text-slate-900">{pm.label}</h3>
                    {pm.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#F43F43] text-[10px] font-bold">
                        Default
                      </span>
                    )}
                  </div>
                  {pm.last4 && (
                    <p className="text-[11.5px] text-slate-400 font-sans mt-0.5">
                      •••• •••• •••• {pm.last4} · Exp {pm.expiry}
                    </p>
                  )}
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                pm.isDefault ? 'border-[#F43F43] bg-[#F43F43] text-white' : 'border-slate-300'
              }`}>
                {pm.isDefault && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => showToast('Credit card tokenization modal opened', 'info')}
          className="w-full h-11 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Payment Card</span>
        </button>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5 text-[11.5px] text-slate-500">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          <span>PCI-DSS Level 1 Encrypted Vault. Cards are never stored in plain text.</span>
        </div>
      </div>
    </div>
  );
}
