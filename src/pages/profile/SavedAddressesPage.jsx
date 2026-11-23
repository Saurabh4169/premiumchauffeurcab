// src/pages/profile/SavedAddressesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Check } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function SavedAddressesPage() {
  const navigate = useNavigate();
  const { user, setUser, showToast } = useApp();

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Saved Addresses" showBack />

      <div className="px-4 pt-4 space-y-4">
        <div className="space-y-2.5">
          {user.savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3 hover:border-slate-300 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-[13.5px] text-slate-900">{addr.label}</h3>
                  {addr.isDefault && (
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#F43F43] text-[10px] font-bold">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-slate-600 leading-snug font-normal">
                  {addr.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => showToast('Address search picker opened', 'info')}
          className="w-full h-11 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>
    </div>
  );
}
