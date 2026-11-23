// src/pages/profile/SavedPassengersPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Phone, Mail } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function SavedPassengersPage() {
  const navigate = useNavigate();
  const { user, showToast } = useApp();

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Saved Passengers" showBack />

      <div className="px-4 pt-4 space-y-4">
        <div className="space-y-2.5">
          {(user.savedPassengers || []).map((pax) => (
            <div
              key={pax.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3 hover:border-slate-300 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-red-50 text-[#F43F43] flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[13.5px] text-slate-900">{pax.name}</h3>
                  {pax.notes && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {pax.notes}
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-slate-500 font-sans">
                  {pax.phone} · {pax.email}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => showToast('Add passenger form opened', 'info')}
          className="w-full h-11 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Passenger</span>
        </button>
      </div>
    </div>
  );
}
