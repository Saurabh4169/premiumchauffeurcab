// src/pages/profile/SavedPassengersPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function SavedPassengersPage() {
  const navigate = useNavigate();
  const { user, showToast } = useApp();

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
          Saved Passengers
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-4">
        <div className="space-y-3">
          {(user.savedPassengers || []).map((pax) => (
            <div
              key={pax.id}
              className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#F43F43] flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[14px] text-slate-900">{pax.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                    {pax.notes}
                  </span>
                </div>
                <p className="text-[12px] text-slate-500 font-sans">
                  {pax.phone} · {pax.email}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => showToast('Add passenger form opened', 'gold')}
          className="w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Passenger</span>
        </button>
      </div>
    </div>
  );
}
