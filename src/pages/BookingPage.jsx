// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Plus, 
  Minus,
  Trash2, 
  Baby, 
  Accessibility, 
  Check, 
  CreditCard,
  Plane,
  Briefcase,
  Navigation,
  Clock,
  Users
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import StickyCta from '../components/common/StickyCta.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Stepper from '../components/common/Stepper.jsx';
import AppHeader from '../components/AppHeader.jsx';
import Input from '../components/common/Input.jsx';
import DatePicker from '../components/common/DatePicker.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FLEET, getVehicleById } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';

const SERVICE_ICONS = {
  'airport-transportation': Plane,
  'corporate-executive': Briefcase,
  'suburb-long-distance': Navigation,
  'hourly-chauffeur': Clock
};

export default function BookingPage() {
  const navigate = useNavigate();
  const { 
    bookingDraft, 
    updateBookingDraft, 
    finalizeBooking, 
    activeCity,
    user,
    showToast 
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [stops, setStops] = useState(bookingDraft.stops || []);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const selectedVehicle = getVehicleById(bookingDraft.selectedVehicleId) || FLEET[0];

  const qualifiedVehicles = FLEET.filter(
    v => v.passengers >= bookingDraft.passengers && v.luggage >= bookingDraft.luggage
  );
  const displayVehicles = qualifiedVehicles.length > 0 ? qualifiedVehicles : FLEET;

  // Calculate quote
  const baseRate = selectedVehicle.sampleEstimate || 145;
  const stopsFee = stops.length * 35;
  const childSeatFee = bookingDraft.childSeat ? 15 : 0;
  const returnMultiplier = bookingDraft.returnTrip ? 2 : 1;

  const subtotal = (baseRate + stopsFee + childSeatFee) * returnMultiplier;
  const tollsFee = 12.50 * returnMultiplier;
  const gratuity = Math.round(subtotal * 0.20);
  const promoDiscount = promoApplied ? 25 : 0;
  const totalAllIn = subtotal + tollsFee + gratuity - promoDiscount;

  const calculatedQuote = {
    base: subtotal,
    tolls: tollsFee,
    parking: 0.00,
    waitTime: 0.00,
    gratuity: gratuity,
    discount: promoDiscount,
    total: totalAllIn
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      const scrollEl = document.getElementById('app-scroll');
      if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const newTripId = finalizeBooking(calculatedQuote);
      showToast('Booking confirmed! Written quote dispatched.', 'success');
      navigate('/book/success', { state: { tripId: newTripId, quote: calculatedQuote } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      const scrollEl = document.getElementById('app-scroll');
      if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(-1);
    }
  };

  const addStop = () => {
    if (stops.length < 3) {
      const nextStops = [...stops, ''];
      setStops(nextStops);
      updateBookingDraft({ stops: nextStops });
    } else {
      showToast('Maximum 3 additional stops per booking.', 'info');
    }
  };

  const updateStop = (index, value) => {
    const updated = [...stops];
    updated[index] = value;
    setStops(updated);
    updateBookingDraft({ stops: updated });
  };

  const removeStop = (index) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
    updateBookingDraft({ stops: updated });
  };

  const handleApplyPromo = () => {
    if (promoCodeInput.trim().toUpperCase() === 'LOMBARD' || promoCodeInput.trim().toUpperCase() === 'EXECUTIVE') {
      setPromoApplied(true);
      showToast('Corporate preferred partner code applied ($25 courtesy)', 'success');
    } else {
      showToast('Invalid promo code. Quotes remain fixed and all-in.', 'error');
    }
  };

  return (
    <Screen withCta className="bg-[var(--page)] px-0">
      {/* Top Universal App Header */}
      <AppHeader
        title="Reserve Chauffeur"
        showBack
        onBack={handleBack}
        rightAction={
          <span className="text-[11px] font-bold text-[#F43F43] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
            {currentStep}/5
          </span>
        }
      />

      {/* Stepper Navigation */}
      <div className="px-4 pt-3 pb-2 bg-[var(--surface)] border-b border-[var(--border)]">
        <Stepper
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />
      </div>

      <div className="px-4 pt-4 pb-6">
        {/* STEP 1: RIDE INFO */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Service Category */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#555555] mb-2 ml-0.5">
                Service Category
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {SERVICES.slice(0, 4).map((s) => {
                  const Icon = SERVICE_ICONS[s.id] || Navigation;
                  const isSelected = bookingDraft.serviceType === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateBookingDraft({ serviceType: s.id })}
                      className={`relative p-3.5 rounded-[18px] border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[82px] ${
                        isSelected
                          ? 'bg-[#FAF5ED]/60 border-[#BE8A44] ring-1.5 ring-[#BE8A44]/30 shadow-sm'
                          : 'bg-white border-[#E2E2E2] hover:border-[#D1D1D6] hover:bg-[#FAFAFA] shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className={`w-7 h-7 rounded-[10px] flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#BE8A44] text-white shadow-xs' : 'bg-[#FAF5ED] text-[#555555]'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#BE8A44] shadow-xs" />
                        )}
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#120F11] block leading-tight">
                          {s.shortTitle}
                        </span>
                        <span className="text-[10px] text-[#555555] block truncate font-medium mt-0.5">
                          {s.tagline}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Route Section */}
            <div className="bg-white rounded-[20px] p-4 border border-[#E2E2E2] shadow-xs space-y-3">
              {/* Pickup Location */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BE8A44] ring-4 ring-[#BE8A44]/20 shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                      Pickup Location
                    </span>
                  </div>
                </div>
                <div className="flex items-center h-11 rounded-[14px] px-3.5 bg-[#FAF5ED] border border-[#E2E2E2] focus-within:border-[#BE8A44] focus-within:bg-white transition-all">
                  <input
                    type="text"
                    value={bookingDraft.pickup}
                    onChange={(e) => updateBookingDraft({ pickup: e.target.value })}
                    placeholder="Address, airport or hotel..."
                    className="w-full bg-transparent text-[13.5px] text-[#120F11] placeholder:text-[#555555] outline-none font-medium"
                  />
                </div>

                {/* Quick Airport / Landmark Chips */}
                <div className="flex gap-1.5 mt-2 overflow-x-auto pb-0.5 no-scrollbar">
                  {activeCity.popularLocations.slice(0, 4).map((loc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => updateBookingDraft({ pickup: loc.name })}
                      className="px-2.5 py-1 rounded-[10px] bg-[#FAF5ED] hover:bg-[#E2E2E2] active:scale-95 border border-[#E2E2E2] text-[11px] text-[#120F11] font-semibold whitespace-nowrap cursor-pointer transition-all"
                    >
                      {loc.name.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intermediate Stops */}
              {stops.map((stop, index) => (
                <div key={index} className="pt-1 border-t border-[#FAF5ED]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100 shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                        Intermediate Stop #{index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStop(index)}
                      className="text-[11px] text-[#BE8A44] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="flex items-center h-11 rounded-[14px] px-3.5 bg-[#FAF5ED] border border-[#E2E2E2] focus-within:border-[#BE8A44] focus-within:bg-white transition-all">
                    <input
                      type="text"
                      value={stop}
                      onChange={(e) => updateStop(index, e.target.value)}
                      placeholder="Stop address or venue..."
                      className="w-full bg-transparent text-[13.5px] text-[#120F11] placeholder:text-[#555555] outline-none font-medium"
                    />
                  </div>
                </div>
              ))}

              {/* Add Stop Button */}
              {stops.length < 3 && (
                <div className="pt-0.5 flex justify-end">
                  <button
                    type="button"
                    onClick={addStop}
                    className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#BE8A44] hover:text-[#A97633] active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add intermediate stop (+$35)</span>
                  </button>
                </div>
              )}

              {/* Drop-off Location */}
              <div className="pt-1 border-t border-[#FAF5ED]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                      Drop-off Destination
                    </span>
                  </div>
                </div>
                <div className="flex items-center h-11 rounded-[14px] px-3.5 bg-[#FAF5ED] border border-[#E2E2E2] focus-within:border-[#BE8A44] focus-within:bg-white transition-all">
                  <input
                    type="text"
                    value={bookingDraft.dropoff}
                    onChange={(e) => updateBookingDraft({ dropoff: e.target.value })}
                    placeholder="Destination address, airport, or hotel..."
                    className="w-full bg-transparent text-[13.5px] text-[#120F11] placeholder:text-[#555555] outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time Picker */}
            <DatePicker
              date={bookingDraft.date}
              time={bookingDraft.time}
              onDateChange={(d) => updateBookingDraft({ date: d })}
              onTimeChange={(t) => updateBookingDraft({ time: t })}
            />

            {/* Stepper counts */}
            <div className="grid grid-cols-2 gap-3 pt-0.5">
              <div className="bg-white rounded-[18px] p-3.5 border border-[#E2E2E2] shadow-xs">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Users className="w-3.5 h-3.5 text-[#555555]" />
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#555555] block">
                    Passengers
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateBookingDraft({ passengers: Math.max(1, bookingDraft.passengers - 1) })}
                    className="w-9 h-9 rounded-full bg-[#FAF5ED] border border-[#E2E2E2] flex items-center justify-center text-[#120F11] hover:bg-[#E2E2E2] active:scale-95 transition-all cursor-pointer"
                    aria-label="Decrease passengers"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="text-[20px] font-bold text-[#120F11] font-mono">
                    {bookingDraft.passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateBookingDraft({ passengers: Math.min(56, bookingDraft.passengers + 1) })}
                    className="w-9 h-9 rounded-full bg-[#FAF5ED] border border-[#E2E2E2] flex items-center justify-center text-[#120F11] hover:bg-[#E2E2E2] active:scale-95 transition-all cursor-pointer"
                    aria-label="Increase passengers"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[18px] p-3.5 border border-[#E2E2E2] shadow-xs">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#555555]" />
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#555555] block">
                    Luggage Bags
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateBookingDraft({ luggage: Math.max(0, bookingDraft.luggage - 1) })}
                    className="w-9 h-9 rounded-full bg-[#FAF5ED] border border-[#E2E2E2] flex items-center justify-center text-[#120F11] hover:bg-[#E2E2E2] active:scale-95 transition-all cursor-pointer"
                    aria-label="Decrease luggage"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="text-[20px] font-bold text-[#120F11] font-mono">
                    {bookingDraft.luggage}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateBookingDraft({ luggage: Math.min(56, bookingDraft.luggage + 1) })}
                    className="w-9 h-9 rounded-full bg-[#FAF5ED] border border-[#E2E2E2] flex items-center justify-center text-[#120F11] hover:bg-[#E2E2E2] active:scale-95 transition-all cursor-pointer"
                    aria-label="Increase luggage"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Child seat & accessibility */}
            <div className="space-y-2.5 pt-0.5">
              <label className="flex items-center justify-between p-3.5 rounded-[18px] bg-white border border-[#E2E2E2] shadow-xs hover:border-[#D1D1D6] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[10px] bg-[#FAF5ED] text-[#BE8A44] flex items-center justify-center shrink-0">
                    <Baby className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#120F11] block">
                      Child Booster Seat
                    </span>
                    <span className="text-[11px] text-[#555555] font-medium">
                      Forward-facing premium seat
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-bold text-[#BE8A44] bg-[#FAF5ED] px-2 py-0.5 rounded-full">
                    +$15
                  </span>
                  <input
                    type="checkbox"
                    checked={bookingDraft.childSeat}
                    onChange={(e) => updateBookingDraft({ childSeat: e.target.checked })}
                    className="w-5 h-5 accent-[#BE8A44] rounded cursor-pointer"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-[18px] bg-white border border-[#E2E2E2] shadow-xs hover:border-[#D1D1D6] transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[10px] bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Accessibility className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[#120F11] block">
                      Wheelchair Accessible Required
                    </span>
                    <span className="text-[11px] text-[#555555] font-medium">
                      Hydraulic ramp & certified driver
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Complimentary
                  </span>
                  <input
                    type="checkbox"
                    checked={bookingDraft.accessible}
                    onChange={(e) => updateBookingDraft({ accessible: e.target.checked })}
                    className="w-5 h-5 accent-[#BE8A44] rounded cursor-pointer"
                  />
                </div>
              </label>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SELECT VEHICLE (Unified ProductCard list variant) */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between text-[12px] text-[var(--text-muted)] mb-2 font-medium">
              <span>Vehicles fitting {bookingDraft.passengers} guests & {bookingDraft.luggage} bags:</span>
              <span className="text-[var(--accent)] font-bold">{displayVehicles.length} matches</span>
            </div>

            {displayVehicles.map((v) => (
              <ProductCard
                key={v.id}
                item={v}
                type="vehicle"
                variant="list"
                isSelectable
                isSelected={bookingDraft.selectedVehicleId === v.id}
                onSelect={() => updateBookingDraft({ selectedVehicleId: v.id })}
              />
            ))}
          </motion.div>
        )}

        {/* STEP 3: PASSENGER DETAILS */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-[18px] font-bold text-[var(--ink)] mb-1">
                Passenger & Journey Details
              </h3>
              <p className="text-[12px] text-[var(--text-muted)] font-medium">
                Our chauffeur receives this dispatch brief directly.
              </p>
            </div>

            <Input
              label="Primary Passenger Full Name"
              required
              value={bookingDraft.passengerName}
              onChange={(e) => updateBookingDraft({ passengerName: e.target.value })}
              placeholder="Brayan Richard"
            />

            <Input
              label="Contact Mobile"
              required
              type="tel"
              value={bookingDraft.passengerPhone}
              onChange={(e) => updateBookingDraft({ passengerPhone: e.target.value })}
              placeholder="+1 (847) 000-0000"
            />

            <Input
              label="Confirmation & Receipt Email"
              required
              type="email"
              value={bookingDraft.passengerEmail}
              onChange={(e) => updateBookingDraft({ passengerEmail: e.target.value })}
              placeholder="name@company.com"
            />

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 ml-1">
                Special Requests / Chauffeur Instructions
              </label>
              <textarea
                rows={3}
                value={bookingDraft.specialRequests}
                onChange={(e) => updateBookingDraft({ specialRequests: e.target.value })}
                placeholder="e.g. Meet inside baggage claim with name sign, chilled still water preferred."
                className="w-full p-3.5 rounded-[16px] bg-[var(--surface)] border border-[var(--border)] text-[13px] text-[var(--ink)] placeholder:text-[var(--text-subtle)] outline-none focus:border-[var(--accent)] shadow-xs font-medium"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 4: REVIEW & FIXED QUOTE */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Itemized Guarantee
              </span>
              <h3 className="text-[20px] font-bold text-[var(--ink)]">
                Review & All-Inclusive Quote
              </h3>
            </div>

            {/* Routing Card */}
            <div className="bg-[var(--surface)] rounded-[20px] p-4 border border-[var(--border)] shadow-xs text-[13px] space-y-2">
              <div className="flex justify-between text-[var(--text-muted)] text-[11px] font-bold">
                <span>SCHEDULED TRIP</span>
                <span>{bookingDraft.date} · {bookingDraft.time}</span>
              </div>
              <p className="text-[var(--ink)] font-bold">
                <span className="text-[var(--accent)]">From:</span> {bookingDraft.pickup}
              </p>
              <p className="text-[var(--ink)] font-bold">
                <span className="text-[var(--success)]">To:</span> {bookingDraft.dropoff}
              </p>
              <div className="pt-2 border-t border-[var(--border)] flex justify-between text-[12px] text-[var(--text-muted)] font-medium">
                <span>Vehicle: {selectedVehicle.name}</span>
                <span>{bookingDraft.passengers} Pax • {bookingDraft.luggage} Bags</span>
              </div>
            </div>

            {/* Itemized Quote Breakdown */}
            <div className="bg-[var(--surface)] rounded-[20px] p-5 border border-[var(--border)] shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <span className="font-bold text-[16px] text-[var(--ink)]">
                  Fixed Written Quote
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-tint)] text-[10px] font-bold text-[var(--accent)]">
                  No Surge • No Meters
                </span>
              </div>

              <div className="space-y-2 text-[13px] text-[var(--text-muted)]">
                <div className="flex justify-between">
                  <span>Base Chauffeur Rate ({selectedVehicle.shortName})</span>
                  <span className="font-bold text-[var(--ink)]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Highway Tolls & Airport Access</span>
                  <span>${tollsFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Parking & Curbside Staging</span>
                  <span className="text-[var(--success)] font-semibold">$0.00 Included</span>
                </div>
                <div className="flex justify-between">
                  <span>60 Min Complimentary Airport Wait</span>
                  <span className="text-[var(--success)] font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Chauffeur Gratuity (20% All-In)</span>
                  <span>${gratuity.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-[var(--accent)] font-bold">
                    <span>Corporate Preferred Courtesy</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[var(--border)] flex items-baseline justify-between text-[22px] font-bold text-[var(--ink)]">
                  <span>Total All-Inclusive Quote</span>
                  <span className="text-[var(--accent)]">${totalAllIn.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
                placeholder="Partner code (try: LOMBARD)"
                className="flex-1 h-12 rounded-[14px] px-3.5 bg-[var(--surface)] border border-[var(--border)] text-[13px] text-[var(--ink)] uppercase font-medium outline-none focus:border-[var(--accent)] shadow-xs"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="btn-secondary px-4 h-12 rounded-[14px] text-[12px] font-bold cursor-pointer"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: PAYMENT & CONFIRM */}
        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-[20px] font-bold text-[var(--ink)] mb-1">
                Select Payment Method
              </h3>
              <p className="text-[12px] text-[var(--text-muted)] font-medium">
                Fixed quote of ${totalAllIn.toFixed(2)} is billed upon staging.
              </p>
            </div>

            <div className="space-y-2.5">
              {user.paymentMethods.map((pm) => {
                const isSelected = bookingDraft.paymentMethod === pm.id;
                return (
                  <div
                    key={pm.id}
                    onClick={() => updateBookingDraft({ paymentMethod: pm.id })}
                    className={`p-4 rounded-[16px] border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[var(--accent-tint)] border-[var(--accent)] ring-1 ring-[var(--accent)]'
                        : 'bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-muted)] shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[12px] bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink)]">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[var(--ink)] block">{pm.label}</span>
                        {pm.last4 && (
                          <span className="text-[11px] text-[var(--text-muted)] block font-sans">
                            •••• •••• •••• {pm.last4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                        : 'border-[var(--border)]'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom Bar (Absolute inside phone frame) */}
      <StickyCta>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold block">
            {currentStep >= 4 ? 'All-in fixed total' : 'Vehicle estimate'}
          </span>
          <span className="text-[22px] font-bold text-[var(--ink)] leading-none truncate block">
            ${totalAllIn.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="bg-gradient-to-r from-[#BE8A44] to-[#A97633] hover:from-[#BE8A44] hover:to-[#A97633] active:scale-[0.98] transition-all h-12 px-6 rounded-[14px] text-[15px] font-bold text-white flex items-center gap-2 cursor-pointer shadow-md shadow-[#BE8A44]/25 shrink-0"
        >
          <span>{currentStep === 5 ? 'Confirm Booking' : currentStep === 4 ? 'Pay & Book' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </StickyCta>
    </Screen>
  );
}
