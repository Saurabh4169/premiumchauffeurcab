// src/pages/TripDetailPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Calendar, 
  Plane, 
  ShieldCheck, 
  Check, 
  Receipt, 
  FileText,
  Car,
  Navigation
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import Avatar from '../components/common/Avatar.jsx';
import BottomSheet from '../components/common/BottomSheet.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function TripDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, showToast } = useApp();
  const [receiptOpen, setReceiptOpen] = useState(false);

  const trip = trips.find(t => t.id === id) || trips[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Live Chauffeur Status: ${trip.id}`,
        text: `Track my ride with Premium Chauffeur Services: ${trip.pickup} to ${trip.dropoff}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Live tracking link copied to clipboard!', 'gold');
    }
  };

  return (
    <div className="min-h-full pb-24 relative bg-[#f8f9fb]">
      {/* Top Header */}
      <div className="sticky top-0 z-30 h-[52px] px-4 bg-white/95 backdrop-blur-md border-b border-[#E8E8EC] flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/trips')}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="font-sans text-[10px] text-slate-400 block uppercase font-bold">Tracking ID</span>
          <span className="text-[14px] font-bold text-slate-900">{trip.id}</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
          aria-label="Share trip"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Stylized Interactive Map Placeholder (Light luxury theme) */}
      <div className="h-52 w-full bg-gradient-to-b from-slate-100 via-slate-50 to-white border-b border-slate-200/80 relative overflow-hidden flex items-center justify-center">
        {/* Map grid lines & roads simulation */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }} />

        {/* Stylized Route Arc */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path
            d="M 60 140 Q 200 40 340 120"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeDasharray="6 4"
          />
          <defs>
            <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F43F43" />
              <stop offset="50%" stopColor="#ff4d5a" />
              <stop offset="100%" stopColor="#3fa37a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Origin Pin */}
        <div className="absolute left-12 bottom-12 flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg ring-4 ring-black/10">
            <MapPin className="w-4 h-4 fill-current" />
          </div>
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-white mt-1 font-semibold">Pickup</span>
        </div>

        {/* Live Chauffeur Vehicle Coordinate */}
        <div className="absolute left-[45%] top-[30%] -translate-x-1/2 flex flex-col items-center z-10">
          <div className="w-10 h-10 rounded-full btn-primary flex items-center justify-center shadow-xl ring-4 ring-red-500/25 animate-bounce">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold bg-[#111114] border border-white/20 px-2 py-0.5 rounded-full text-white mt-1 shadow-md">
            {trip.chauffeur?.etaMinutes ? `ETA ${trip.chauffeur.etaMinutes}m` : 'Buffer Staged'}
          </span>
        </div>

        {/* Destination Pin */}
        <div className="absolute right-12 bottom-16 flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-600/20">
            <MapPin className="w-4 h-4 fill-current" />
          </div>
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-white mt-1 font-semibold">Drop-off</span>
        </div>

        {/* Real-time status pill */}
        <div className="absolute top-3 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] text-emerald-700 flex items-center gap-1.5 font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time GPS Dispatch</span>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Chauffeur Card */}
        {trip.chauffeur ? (
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-sans uppercase tracking-wider text-slate-400 font-bold">
                Your Assigned Chauffeur
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                {trip.chauffeur.badge || 'Executive Chauffeur'}
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-4">
              <Avatar
                src={trip.chauffeur.photo}
                name={trip.chauffeur.name}
                size="lg"
                status="online"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[18px] text-slate-900 truncate">
                  {trip.chauffeur.name}
                </h3>
                <p className="text-[12px] text-slate-500 truncate">
                  {trip.vehicleName}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-sans text-slate-600 mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-semibold">
                    {trip.vehiclePlate}
                  </span>
                  <span className="font-bold text-[var(--accent)]">★ {trip.chauffeur.rating}</span>
                </div>
              </div>
            </div>

            {/* Direct Call & Message Chauffeur Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <a
                href={`tel:${trip.chauffeur.phone}`}
                className="btn-primary h-11 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold text-white shadow-md shadow-red-500/25"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Chauffeur</span>
              </a>

              <button
                type="button"
                onClick={() => navigate('/ai')}
                className="bg-slate-100 hover:bg-slate-200 h-11 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold text-slate-800 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Dispatch Chat</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
            <Car className="w-6 h-6 text-[#F43F43]" />
            <div>
              <h4 className="text-[14px] font-bold text-slate-900">Chauffeur Allocation Pending</h4>
              <p className="text-[11px] text-slate-500">Dispatched with a 30-minute pre-arrival buffer.</p>
            </div>
          </div>
        )}

        {/* Flight Status Chip with Delay Adjustment Note */}
        {trip.flightNumber && (
          <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900">
                <Plane className="w-4 h-4 text-emerald-600" />
                <span>Flight {trip.flightNumber}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                {trip.flightStatus || 'On Schedule'}
              </span>
            </div>
            <p className="text-[12px] text-slate-600 leading-snug">
              Our 24/7 Lombard team tracks incoming radar. 60 min complimentary wait domestic (90 min intl) starts upon touchdown.
            </p>
          </div>
        )}

        {/* Live Trip Timeline */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight">
            Dispatch Progression
          </h3>

          <div className="relative pl-6 space-y-5">
            {/* Vertical timeline line */}
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200" />

            {(trip.timeline || [
              { step: 'Reservation Confirmed', time: '11:00 AM', completed: true, note: 'Written flat quote locked' },
              { step: 'Chauffeur Dispatched', time: '3:15 PM', completed: true, note: 'Assigned with buffer time' },
              { step: 'En Route to Pickup', time: '3:32 PM', completed: true, note: 'Passing River North' },
              { step: 'Arrived at Staging', time: '3:42 PM', completed: false, note: 'Main portico staging' },
              { step: 'Trip Completed', time: '4:30 PM', completed: false, note: 'Curbside arrival' }
            ]).map((step, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-6 top-1 w-3 h-3 rounded-full flex items-center justify-center ${
                    step.completed
                      ? 'bg-[#F43F43] ring-4 ring-red-500/20'
                      : 'bg-slate-300 ring-4 ring-slate-100'
                  }`}
                />
                <div className="flex items-baseline justify-between">
                  <h4 className={`text-[13px] font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.step}
                  </h4>
                  <span className="text-[11px] font-sans text-slate-500 font-semibold">
                    {step.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {step.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* All-In Written Quote & Receipt Button */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-wider text-slate-400 font-bold block">
              Written Fixed Total
            </span>
            <span className="text-[22px] font-black text-slate-900">
              ${trip.quote?.total?.toFixed(2) || '185.50'}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold block">All tolls & gratuity included</span>
          </div>

          <button
            type="button"
            onClick={() => setReceiptOpen(true)}
            className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-[12px] font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
          >
            <Receipt className="w-4 h-4" />
            <span>View Receipt</span>
          </button>
        </div>
      </div>

      {/* Itemized Receipt Bottom Sheet */}
      <BottomSheet
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        title="Official Written Trip Receipt"
        subtitle={`Booking Reference: ${trip.id}`}
      >
        <div className="space-y-3 py-2 text-[13px]">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-slate-900 font-bold">Pickup: {trip.pickup}</p>
            <p className="text-slate-900 font-bold">Drop-off: {trip.dropoff}</p>
            <p className="text-slate-500 text-[11px]">{trip.date} at {trip.time}</p>
          </div>

          <div className="space-y-2 border-y border-slate-150 py-3 text-slate-700">
            <div className="flex justify-between">
              <span>Base Fare ({trip.vehicleName})</span>
              <span className="font-semibold">${trip.quote?.base?.toFixed(2) || '145.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Highway Tolls & Airport Fees</span>
              <span className="font-semibold">${trip.quote?.tolls?.toFixed(2) || '8.50'}</span>
            </div>
            <div className="flex justify-between">
              <span>Parking & Wait Buffer</span>
              <span className="text-emerald-600 font-semibold">Included</span>
            </div>
            <div className="flex justify-between">
              <span>Chauffeur Gratuity (20%)</span>
              <span className="font-semibold">${trip.quote?.gratuity?.toFixed(2) || '32.00'}</span>
            </div>
            <div className="flex justify-between text-[18px] font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Paid</span>
              <span className="text-[#F43F43]">${trip.quote?.total?.toFixed(2) || '185.50'}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Premium Chauffeur Services • 55 West 22nd Street STE 140, Lombard, IL 60148 • 24/7 Dispatch
          </p>
        </div>
      </BottomSheet>
    </div>
  );
}
