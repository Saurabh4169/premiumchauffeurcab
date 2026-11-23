// src/components/agent/widgets/HandoffCard.jsx
import React, { useState } from 'react';
import { Phone, Headset, Clock, Check } from 'lucide-react';
import { COMPANY_CONTACT } from '../../../data/knowledge.js';
import { useApp } from '../../../context/AppContext.jsx';

export default function HandoffCardWidget() {
  const { showToast } = useApp();
  const [requested, setRequested] = useState(false);
  const [phone, setPhone] = useState('');

  const handleCallback = (e) => {
    e?.preventDefault();
    if (phone.trim() || !requested) {
      setRequested(true);
      showToast("Callback requested! Lombard dispatch coordinator will dial your number within 5 minutes.", "success");
    }
  };

  return (
    <div className="bg-white rounded-[18px] p-4 border border-[#E2E2E2] shadow-xs my-2 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#FAF5ED] flex items-center justify-center text-[#BE8A44]">
          <Headset className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-[14px] text-[#120F11]">
            24/7 Live Human Dispatch
          </h4>
          <span className="text-[11px] text-[#555555]">
            Lombard, IL Operations Center
          </span>
        </div>
      </div>

      <p className="text-[12px] text-[#555555] leading-relaxed">
        Speak with a senior dispatcher for custom itineraries, multi-vehicle motorcades, or immediate updates.
      </p>

      {/* Direct Call Button */}
      <a
        href={`tel:${COMPANY_CONTACT.phoneRaw}`}
        className="w-full h-10 rounded-[12px] bg-[#120F11] hover:bg-[#BE8A44] text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
      >
        <Phone className="w-4 h-4" />
        <span>Call Dispatch {COMPANY_CONTACT.phone}</span>
      </a>

      {/* Request Callback */}
      <div className="pt-2 border-t border-[#E2E2E2]">
        {requested ? (
          <div className="flex items-center gap-2 text-emerald-600 text-[12px] font-semibold py-1">
            <Check className="w-4 h-4" />
            <span>Coordinator alerted. Expect a call in under 5 minutes.</span>
          </div>
        ) : (
          <form onSubmit={handleCallback} className="flex gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your callback phone..."
              className="flex-1 h-8.5 px-2.5 bg-[#FAF5ED] rounded-[8px] text-[12px] text-[#120F11] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#BE8A44]"
            />
            <button
              type="submit"
              className="h-8.5 px-3 rounded-[8px] bg-[#FAF5ED] hover:bg-slate-200 text-[#120F11] text-[12px] font-semibold cursor-pointer shrink-0"
            >
              Request Call
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
