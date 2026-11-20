// src/pages/TripsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, History, FileText, Plus } from 'lucide-react';
import AppHeader from '../components/AppHeader.jsx';
import TripCard from '../components/TripCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function TripsPage() {
  const navigate = useNavigate();
  const { trips } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'quotes'

  const upcomingTrips = trips.filter(t => t.type === 'upcoming');
  const pastTrips = trips.filter(t => t.type === 'past');
  const quoteTrips = trips.filter(t => t.type === 'quotes');

  const displayedTrips = activeTab === 'upcoming' 
    ? upcomingTrips 
    : activeTab === 'past' 
    ? pastTrips 
    : quoteTrips;

  return (
    <div className="min-h-full pb-28 bg-[#FAFAFC]">
      {/* Clean Header */}
      <AppHeader showBack={false} />

      {/* Page Title: "My trips" + New Booking RED Button */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[26px] leading-[30px] font-bold text-[#101417] tracking-tight">
            My Trips
          </h1>
          <p className="text-[12.5px] text-[#6B7075] mt-0.5 font-medium leading-[16px]">
            Chauffeur-driven journeys & written quotes
          </p>
        </div>

        {/* RED NEW BOOKING BUTTON */}
        <button
          type="button"
          onClick={() => navigate('/book')}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F43F43] to-[#DC2626] hover:from-[#E02E32] hover:to-[#C51F23] flex items-center justify-center text-white shadow-md shadow-rose-500/25 cursor-pointer shrink-0 transition-all active:scale-95"
          title="New Booking"
          aria-label="New booking"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Luxury Segmented Tabs */}
      <div className="px-4 my-3.5">
        <div className="h-11 p-1 rounded-full bg-white border border-[#E8E8EC] shadow-xs grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-full text-[12.5px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-[#101417] text-white shadow-sm'
                : 'text-[#6B7075] hover:text-[#101417]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming ({upcomingTrips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`rounded-full text-[12.5px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'past'
                ? 'bg-[#101417] text-white shadow-sm'
                : 'text-[#6B7075] hover:text-[#101417]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Past ({pastTrips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`rounded-full text-[12.5px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'quotes'
                ? 'bg-[#101417] text-white shadow-sm'
                : 'text-[#6B7075] hover:text-[#101417]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quotes ({quoteTrips.length})</span>
          </button>
        </div>
      </div>

      {/* Trips Stream */}
      <div className="px-4">
        {displayedTrips.length > 0 ? (
          <div>
            {displayedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`No ${activeTab} trips found`}
            description={
              activeTab === 'upcoming'
                ? "You do not have any upcoming chauffeured reservations scheduled."
                : activeTab === 'past'
                ? "Your completed journeys and digital receipts will appear here."
                : "You don't have any pending written quotes waiting for review."
            }
            actionLabel="Book a Ride"
            onAction={() => navigate('/book')}
          />
        )}
      </div>
    </div>
  );
}
