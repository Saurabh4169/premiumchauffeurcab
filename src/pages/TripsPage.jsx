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
    <div className="min-h-full pb-[152px] bg-[#F5F5F7]">
      {/* Clean Header with single title & New Booking button */}
      <AppHeader
        title="My Trips"
        showBack={false}
        rightAction={
          <button
            type="button"
            onClick={() => navigate('/book')}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-[#F43F43] to-[#DC2626] hover:brightness-105 flex items-center justify-center text-white shadow-md shadow-red-500/25 cursor-pointer shrink-0 transition-all active:scale-95"
            title="New Booking"
            aria-label="New booking"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        }
      />

      {/* Luxury Segmented Tabs (20px screen padding) */}
      <div className="px-5 pt-3 pb-2">
        <div className="h-11 p-1 rounded-full bg-white border border-slate-200/80 shadow-xs grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-full text-[12.5px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-[#101417] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
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
                : 'text-slate-500 hover:text-slate-900'
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
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quotes ({quoteTrips.length})</span>
          </button>
        </div>
      </div>

      {/* Trips Stream (20px screen padding) */}
      <div className="px-5 pt-1">
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
