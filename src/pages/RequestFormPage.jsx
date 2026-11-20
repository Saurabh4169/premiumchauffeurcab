// src/pages/RequestFormPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Paperclip, 
  Car, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon, 
  Send,
  Plane,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const REQUEST_TYPES = [
  { id: 'quote', label: 'Get a quote' },
  { id: 'question', label: 'Ask a question' },
  { id: 'change', label: 'Change a booking' },
  { id: 'corporate', label: 'Corporate account' },
  { id: 'feedback', label: 'Feedback' },
];

const VEHICLE_TYPE_CARDS = [
  { id: 'sedan', label: 'Sedan', capacity: 'Up to 3 pax', desc: 'Cadillac XTS, Mercedes S-Class, BMW i7' },
  { id: 'suv', label: 'SUV', capacity: 'Up to 6 pax', desc: 'Cadillac Escalade ESV, Lincoln Navigator L' },
  { id: 'sprinter', label: 'Sprinter', capacity: 'Up to 14 pax', desc: 'Mercedes Jet Sprinter Executive Van' },
  { id: 'luxury', label: 'Luxury & Buses', capacity: '10 to 56 pax', desc: 'Stretch Limousines & Executive Motor Coaches' },
  { id: 'recommend', label: 'Not sure', capacity: 'Best match', desc: 'Dispatcher will recommend optimal vehicle' },
];

export default function RequestFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, addRequest, showToast } = useApp();

  const typeParam = searchParams.get('type') || 'quote';
  const serviceParam = searchParams.get('service') || 'airport-transportation';
  const vehicleParam = searchParams.get('vehicle') || '';

  const [activeType, setActiveType] = useState(typeParam);

  // Form State
  const [formData, setFormData] = useState({
    // Quote fields
    service: serviceParam,
    pickup: "",
    dropoff: "",
    extraStops: [],
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '11:00 AM',
    passengers: 2,
    luggage: 2,
    vehicleType: vehicleParam || 'sedan',
    flightNumber: '',
    flightLater: false,
    returnTrip: false,
    returnDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    returnTime: '5:00 PM',
    childSeat: false,
    accessible: false,
    additionalDetails: '',

    // Non-quote fields
    topic: 'General Inquiry',
    bookingRef: '',
    message: '',
    attachmentName: '',

    // Contact block
    name: user.name || 'Brayan Richard',
    email: user.email || 'brayanrichard@gmai.com',
    phone: user.phone || '+1 (312) 555-0144',
    countryCode: '+1 (US)',
    preferredContact: 'Phone' // 'Phone' | 'Email' | 'SMS'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  // Handle Quick Airport Chip Clicks
  const handleQuickAirport = (code) => {
    if (code === 'ORD') {
      setFormData(prev => ({ ...prev, dropoff: "O'Hare International Airport (ORD) Terminal 5" }));
    } else if (code === 'MDW') {
      setFormData(prev => ({ ...prev, dropoff: "Midway International Airport (MDW)" }));
    }
  };

  const handleAddStop = () => {
    setFormData(prev => ({
      ...prev,
      extraStops: [...prev.extraStops, '']
    }));
  };

  const handleRemoveStop = (idx) => {
    setFormData(prev => ({
      ...prev,
      extraStops: prev.extraStops.filter((_, i) => i !== idx)
    }));
  };

  const handleStopChange = (idx, val) => {
    setFormData(prev => {
      const copy = [...prev.extraStops];
      copy[idx] = val;
      return { ...prev, extraStops: copy };
    });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    if (activeType === 'quote') {
      if (!formData.pickup.trim()) newErrors.pickup = 'Pickup location is required';
      if (!formData.dropoff.trim()) newErrors.dropoff = 'Drop-off location is required';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
      if (!formData.vehicleType) newErrors.vehicleType = 'Please select a vehicle type';
    } else {
      if (!formData.message.trim()) newErrors.message = 'Please provide details for your inquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newRef = `QR-${Math.floor(20000 + Math.random() * 9000)}`;
      setSubmittedRef(newRef);

      const newRequestItem = {
        id: newRef,
        type: activeType,
        typeLabel: REQUEST_TYPES.find(t => t.id === activeType)?.label || 'Quote Request',
        service: formData.service,
        serviceTitle: formData.service.replace(/-/g, ' ').toUpperCase(),
        routeOrTopic: activeType === 'quote' ? `${formData.pickup} → ${formData.dropoff}` : formData.topic,
        pickup: formData.pickup,
        dropoff: formData.dropoff,
        date: formData.date,
        time: formData.time,
        passengers: formData.passengers,
        luggage: formData.luggage,
        vehicleType: formData.vehicleType,
        status: 'Received',
        statusColor: 'warning',
        createdAt: 'Just now',
        notes: activeType === 'quote' ? formData.additionalDetails : formData.message,
        contactName: formData.name,
        contactEmail: formData.email,
        contactPhone: formData.phone
      };

      addRequest(newRequestItem);
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Request submitted to Lombard Dispatch', 'gold');
    }, 1100);
  };

  // SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="min-h-full p-6 bg-[#f8f9fb] flex flex-col justify-between">
        <div className="my-auto text-center space-y-4 py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-md border border-emerald-200"
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </motion.div>

          <div>
            <span className="font-sans text-[12px] font-bold text-[#F43F43] uppercase tracking-wider block">
              Reference Code
            </span>
            <h2 className="font-sans text-[26px] font-bold text-slate-900 mt-1">
              {submittedRef}
            </h2>
            <p className="text-[13px] text-slate-500 max-w-[280px] mx-auto mt-1 leading-relaxed">
              Your request has been delivered directly to our 24/7 Lombard dispatch control room.
            </p>
          </div>

          {/* What happens next */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm text-left space-y-3 my-6">
            <h3 className="font-sans font-bold text-[15px] text-slate-900">
              What Happens Next
            </h3>
            <div className="space-y-2.5 text-[12.5px] text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span><strong>Received:</strong> Logged into dispatch scheduling with high priority.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span><strong>Reviewed:</strong> Route, gate staging, and optimal vehicle allocated.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span><strong>Written quote:</strong> All-inclusive quote sent to {formData.email}.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-4">
          <button
            type="button"
            onClick={() => navigate('/support/requests')}
            className="w-full h-12 rounded-[14px] bg-gradient-to-r from-[#F84146] via-[#F43F43] to-[#EC3A40] text-slate-950 font-bold text-[14px] flex items-center justify-center shadow-lg shadow-[#F43F43]/30 cursor-pointer"
          >
            View my requests
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[13px] flex items-center justify-center cursor-pointer transition-colors"
          >
            Back to profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-36 bg-[#f8f9fb]">
      {/* Top Header */}
      <div className="sticky top-0 z-30 h-[52px] px-4 bg-white/95 backdrop-blur-md border-b border-[#E8E8EC] flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="font-sans font-bold text-[16px] text-slate-900 truncate max-w-[240px]">
          Request a quote or query
        </h1>

        <div className="w-10" />
      </div>

      <form onSubmit={handleSubmit} className="px-4 pt-4 space-y-5">
        {/* Step 1: "What do you need?" Segmented Chips */}
        <div>
          <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
            What do you need?
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {REQUEST_TYPES.map((type) => {
              const isSelected = activeType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setActiveType(type.id)}
                  className={`px-3.5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#111114] text-white border-[#111114] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONDITIONAL FORM FIELDS */}
        <AnimatePresence mode="wait">
          {activeType === 'quote' ? (
            /* GET A QUOTE FIELDS */
            <motion.div
              key="quote-fields"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Service Select */}
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">
                  Chauffeur Service
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-4 text-[14px] text-slate-900 font-medium outline-none appearance-none focus:border-[#F43F43] focus:ring-2 focus:ring-[#F43F43]/20"
                  >
                    <option value="airport-transportation">Airport Transportation (ORD / MDW / Regional)</option>
                    <option value="corporate-executive">Corporate and Executive Roadshow</option>
                    <option value="wedding-limo-rental">Wedding Limo Rental</option>
                    <option value="bachelor-bachelorette">Bachelor and Bachelorette Night</option>
                    <option value="bus-rental">Bus Rental & Group Shuttles</option>
                    <option value="chicago-wine-tour">Chicago & Michigan Wine Tour</option>
                    <option value="game-day-transfers">Game Day Transfers (Soldier Field / United Center)</option>
                    <option value="graduation-limo-rental">Graduation and Prom Limo</option>
                    <option value="suburb-long-distance">Suburb and Long Distance Transfer</option>
                    <option value="hourly-chauffeur">Hourly As-Directed Chauffeur</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Pickup location with ORD/MDW quick chips */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[12px] font-bold text-slate-700">
                    Pickup Location *
                  </label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleQuickAirport('ORD')}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                    >
                      + ORD
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAirport('MDW')}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                    >
                      + MDW
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.pickup}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickup: e.target.value }))}
                    placeholder="Enter hotel, residence or airport gate"
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-4 pl-10 text-[13.5px] text-slate-900 font-medium outline-none focus:border-[#F43F43] focus:ring-2 focus:ring-[#F43F43]/20"
                  />
                  <MapPin className="w-4 h-4 text-[#F43F43] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                {errors.pickup && <p className="text-[11px] text-red-500 mt-1">{errors.pickup}</p>}
              </div>

              {/* Extra stops */}
              {formData.extraStops.map((stop, idx) => (
                <div key={idx} className="relative">
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Intermediate Stop #{idx + 1}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={stop}
                      onChange={(e) => handleStopChange(idx, e.target.value)}
                      placeholder="Intermediate stop address"
                      className="w-full h-12 rounded-xl bg-white border border-slate-200 px-3 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStop(idx)}
                      className="text-red-500 p-2 text-[12px] font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="text-[12px] text-[#F43F43] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add intermediate stop</span>
                </button>
              </div>

              {/* Drop-off location */}
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">
                  Drop-off Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.dropoff}
                    onChange={(e) => setFormData(prev => ({ ...prev, dropoff: e.target.value }))}
                    placeholder="Destination address or airport"
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-4 pl-10 text-[13.5px] text-slate-900 font-medium outline-none focus:border-[#F43F43] focus:ring-2 focus:ring-[#F43F43]/20"
                  />
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                {errors.dropoff && <p className="text-[11px] text-red-500 mt-1">{errors.dropoff}</p>}
              </div>

              {/* Pickup Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-3 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">
                    Pickup Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-3 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
                  />
                </div>
              </div>

              {/* Passengers & Luggage Steppers (44px min height) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Guests</span>
                    <span className="text-[15px] font-bold text-slate-900">{formData.passengers} Pax</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, passengers: Math.max(1, p.passengers - 1) }))}
                      className="w-10 h-10 rounded-[12px] bg-slate-100 flex items-center justify-center text-[#101417] hover:bg-slate-200 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, passengers: p.passengers + 1 }))}
                      className="w-10 h-10 rounded-[12px] bg-slate-100 flex items-center justify-center text-[#101417] hover:bg-slate-200 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Luggage</span>
                    <span className="text-[15px] font-bold text-slate-900">{formData.luggage} Bags</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, luggage: Math.max(0, p.luggage - 1) }))}
                      className="w-10 h-10 rounded-[12px] bg-slate-100 flex items-center justify-center text-[#101417] hover:bg-slate-200 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, luggage: p.luggage + 1 }))}
                      className="w-10 h-10 rounded-[12px] bg-slate-100 flex items-center justify-center text-[#101417] hover:bg-slate-200 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Vehicle Type as 4 Selectable Cards */}
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-2">
                  Vehicle Type *
                </label>
                <div className="space-y-2">
                  {VEHICLE_TYPE_CARDS.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setFormData(prev => ({ ...prev, vehicleType: v.id }))}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        formData.vehicleType === v.id
                          ? 'bg-[#111114] text-white border-[#111114] shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[14px] leading-tight">{v.label}</h4>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                            formData.vehicleType === v.id ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {v.capacity}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${formData.vehicleType === v.id ? 'text-white/60' : 'text-slate-400'}`}>
                          {v.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        formData.vehicleType === v.id ? 'border-[#F43F43] bg-[#F43F43] text-slate-950' : 'border-slate-300'
                      }`}>
                        {formData.vehicleType === v.id && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Flight Number & Checkbox */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-[12px] font-bold text-slate-800">
                  <Plane className="w-4 h-4 text-[#F43F43]" />
                  <span>Aviation Radar Tracking (Optional)</span>
                </div>
                <input
                  type="text"
                  disabled={formData.flightLater}
                  value={formData.flightNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, flightNumber: e.target.value.toUpperCase() }))}
                  placeholder="e.g. UA 1422 / LH 431"
                  className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3 text-[13px] text-slate-900 font-sans disabled:opacity-50 outline-none"
                />
                <label className="flex items-center gap-2 text-[12px] text-slate-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={formData.flightLater}
                    onChange={(e) => setFormData(prev => ({ ...prev, flightLater: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#F43F43]"
                  />
                  <span>I don't have flight number yet (will provide prior)</span>
                </label>
              </div>

              {/* Toggles: Return trip, child seat, accessible */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 text-[13px] font-medium text-slate-800 cursor-pointer">
                  <span>Include Return Trip (Pre-fills reversed route)</span>
                  <input
                    type="checkbox"
                    checked={formData.returnTrip}
                    onChange={(e) => setFormData(prev => ({ ...prev, returnTrip: e.target.checked }))}
                    className="w-5 h-5 rounded text-[#F43F43]"
                  />
                </label>

                {formData.returnTrip && (
                  <div className="p-3 bg-slate-100 rounded-2xl grid grid-cols-2 gap-2 text-[12px]">
                    <div>
                      <span className="block text-slate-400 font-bold mb-1">Return Date</span>
                      <input
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, returnDate: e.target.value }))}
                        className="w-full h-10 rounded-lg bg-white px-2"
                      />
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold mb-1">Return Time</span>
                      <input
                        type="time"
                        value={formData.returnTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, returnTime: e.target.value }))}
                        className="w-full h-10 rounded-lg bg-white px-2"
                      />
                    </div>
                  </div>
                )}

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 text-[13px] font-medium text-slate-800 cursor-pointer">
                  <span>Child Safety Seat Required</span>
                  <input
                    type="checkbox"
                    checked={formData.childSeat}
                    onChange={(e) => setFormData(prev => ({ ...prev, childSeat: e.target.checked }))}
                    className="w-5 h-5 rounded text-[#F43F43]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 text-[13px] font-medium text-slate-800 cursor-pointer">
                  <span>Wheelchair / Accessible Vehicle</span>
                  <input
                    type="checkbox"
                    checked={formData.accessible}
                    onChange={(e) => setFormData(prev => ({ ...prev, accessible: e.target.checked }))}
                    className="w-5 h-5 rounded text-[#F43F43]"
                  />
                </label>
              </div>

              {/* Additional details */}
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">
                  Additional Details & Special Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                  placeholder="Luggage specs, gate instructions, preferred chauffeur protocols..."
                  className="w-full rounded-2xl bg-white border border-slate-200 p-3.5 text-[13px] text-slate-900 outline-none focus:border-[#F43F43]"
                />
              </div>
            </motion.div>
          ) : (
            /* ASK A QUESTION / CHANGE A BOOKING / CORPORATE / FEEDBACK FIELDS */
            <motion.div
              key="non-quote-fields"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Topic select */}
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">
                  Inquiry Topic
                </label>
                <div className="relative">
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-4 text-[14px] text-slate-900 font-medium outline-none appearance-none focus:border-[#F43F43]"
                  >
                    {activeType === 'change' ? (
                      <>
                        <option value="Change pickup time">Change pickup time</option>
                        <option value="Add or modify stop">Add or modify stop</option>
                        <option value="Upgrade vehicle class">Upgrade vehicle class</option>
                        <option value="Update passenger name">Update passenger name</option>
                        <option value="Cancel reservation">Cancel reservation</option>
                      </>
                    ) : activeType === 'corporate' ? (
                      <>
                        <option value="Monthly Net-30 Invoicing setup">Monthly Net-30 Invoicing setup</option>
                        <option value="Dedicated recurring chauffeur team">Dedicated recurring chauffeur team</option>
                        <option value="Multi-city account executive">Multi-city account executive</option>
                        <option value="Insurance certificate (COI) request">Insurance certificate (COI) request</option>
                      </>
                    ) : (
                      <>
                        <option value="General Question">General Question</option>
                        <option value="Airport Wait Policy">Airport Wait Policy</option>
                        <option value="Long Distance / Interstate Quote">Long Distance / Interstate Quote</option>
                        <option value="Lost Property Report">Lost Property Report</option>
                        <option value="Service Feedback">Service Feedback</option>
                      </>
                    )}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Booking Reference (shown for change booking) */}
              {(activeType === 'change' || activeType === 'feedback') && (
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">
                    Booking Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bookingRef}
                    onChange={(e) => setFormData(prev => ({ ...prev, bookingRef: e.target.value.toUpperCase() }))}
                    placeholder="e.g. PCS-10492"
                    className="w-full h-12 rounded-[14px] bg-white border border-slate-200 px-4 text-[14px] font-sans text-slate-900 outline-none focus:border-[#F43F43]"
                  />
                </div>
              )}

              {/* Message Textarea (0/1000 counter) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[12px] font-bold text-slate-700">
                    Message Details *
                  </label>
                  <span className="text-[11px] text-slate-400 font-sans">
                    {formData.message.length}/1000
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your inquiry, requested changes or questions in detail..."
                  className="w-full rounded-2xl bg-white border border-slate-200 p-3.5 text-[13.5px] text-slate-900 outline-none focus:border-[#F43F43]"
                />
                {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
              </div>

              {/* Attachment UI (Mock) */}
              <div className="p-3 bg-white rounded-2xl border border-dashed border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 text-[12px]">
                  <Paperclip className="w-4 h-4 text-slate-400" />
                  <span>{formData.attachmentName || 'Attach flight itinerary or PDF document'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, attachmentName: 'Itinerary_ORD_Trip.pdf' }));
                    showToast('Attachment uploaded: Itinerary_ORD_Trip.pdf', 'gold');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer"
                >
                  Upload File
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTACT BLOCK (All types, prefilled & editable) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3.5">
          <h3 className="font-sans font-bold text-[16px] text-slate-900 border-b border-slate-100 pb-2">
            Your Contact Information
          </h3>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 outline-none focus:border-[#F43F43]"
            />
            {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 outline-none focus:border-[#F43F43]"
              />
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 outline-none focus:border-[#F43F43]"
              />
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Preferred Contact Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Phone', 'Email', 'SMS'].map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, preferredContact: ch }))}
                  className={`py-2 rounded-xl text-[12px] font-bold border transition-colors cursor-pointer ${
                    formData.preferredContact === ch
                      ? 'bg-[#111114] text-white border-[#111114]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* STICKY BOTTOM ACTION BAR (Containment: absolute inside frame) */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#E8E8EC] shadow-lg space-y-1">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-12 rounded-[14px] bg-gradient-to-r from-[#FDEEEA] via-[#F43F43] to-[#EC3A40] text-slate-950 font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#F43F43]/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Transmitting to Dispatch...</span>
          ) : (
            <>
              <span>Send request</span>
              <Send className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>

        {activeType === 'quote' && (
          <p className="text-center text-[11px] text-slate-400 font-medium">
            No payment now. You'll get a written quote first.
          </p>
        )}
      </div>
    </div>
  );
}
