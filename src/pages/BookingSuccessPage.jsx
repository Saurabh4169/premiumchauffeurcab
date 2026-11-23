// src/pages/BookingSuccessPage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, ShieldCheck, Home, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext.jsx';
import { getVehicleById } from '../data/fleet.js';

export default function BookingSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDraft, companyInfo, showToast } = useApp();

  const tripId = location.state?.tripId || 'PCS-89412';
  const quote = location.state?.quote || { total: 185.50 };
  const vehicle = getVehicleById(bookingDraft.selectedVehicleId);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff3b47', '#BE8A44', '#120F11', '#ffffff']
      });
    } catch {
      // ignore
    }
  }, []);

  const handleAddToCalendar = () => {
    const title = `Premium Chauffeur: ${bookingDraft.pickup} to ${bookingDraft.dropoff}`;
    const description = `Booking Ref: ${tripId}\\nVehicle: ${vehicle.name}\\nFixed All-In Quote: $${quote.total.toFixed(2)}\\n24/7 Lombard Dispatch: +1 847-268-2323`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${description}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${tripId}-chauffeured-ride.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Calendar invite downloaded (.ics)', 'success');
  };

  return (
    <div className="min-h-full px-6 py-8 flex flex-col justify-between text-center bg-white relative">
      <div className="my-auto py-6">
        {/* Animated Coral Checkmark Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="w-20 h-20 rounded-full btn-coral-primary mx-auto mb-5 flex items-center justify-center shadow-xl shadow-red-500/35 text-white"
        >
          <Check className="w-10 h-10 stroke-[3]" />
        </motion.div>

        <span className="text-[11px] font-semibold tracking-wider text-[#BE8A44] uppercase block mb-1">
          Confirmed & Buffer-Dispatched
        </span>
        <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[#120F11]">
          Your chauffeur <span className="text-[#BE8A44] italic">is reserved</span>
        </h1>
        <p className="text-[13px] text-slate-500 font-medium mt-1 max-w-[300px] mx-auto">
          "The car is there before you are." A written confirmation receipt has been sent to your email.
        </p>

        {/* Booking Reference Code Card */}
        <div className="my-6 bg-white rounded-3xl p-5 border border-slate-200 shadow-md text-left">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-sans tracking-wider font-bold block">
                Booking Reference
              </span>
              <span className="font-sans text-xl font-black text-slate-900">
                {tripId}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
              Fixed Quote Locked
            </span>
          </div>

          <div className="space-y-2 text-[13px] text-slate-600">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Vehicle</span>
              <span className="text-slate-900 font-bold">{vehicle.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pickup Date & Time</span>
              <span className="text-slate-900 font-medium">{bookingDraft.date} · {bookingDraft.time}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
              <span className="text-slate-900 font-medium line-clamp-1">{bookingDraft.pickup}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">To</span>
              <span className="text-slate-900 font-medium line-clamp-1">{bookingDraft.dropoff}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-slate-400 text-[12px] font-bold uppercase">All-Inclusive Total</span>
              <span className="text-2xl font-black text-slate-900">
                ${quote.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="btn-coral-primary w-full h-14 rounded-full flex items-center justify-center gap-2 text-[14px] font-bold text-white shadow-lg shadow-red-500/35 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Add to Calendar (.ics)</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/trips/${tripId}`)}
            className="btn-glass-secondary w-full h-12 rounded-full flex items-center justify-center gap-2 text-[13px] font-bold text-slate-800 cursor-pointer"
          >
            <span>Track in My Trips</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full text-center text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors pt-1 cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
