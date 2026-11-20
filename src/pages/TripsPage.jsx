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
    <div className="min-h-full pb-28 bg-[var(--page)]">
      {/* Clean Header */}
      <AppHeader showBack={false} />

      {/* Page Title: "My trips" (display 28) + subtitle */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[var(--ink)]">
            My trips
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-[18px]">
            Chauffeur-driven journeys & quotes
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/book')}
          className="w-10 h-10 rounded-full btn-primary flex items-center justify-center text-white shadow-xs cursor-pointer shrink-0"
          title="New Booking"
          aria-label="New booking"
        >
          <Plus className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Tabs (44px high track) */}
      <div className="px-4 my-3.5">
        <div className="h-11 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-xs grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-[var(--ink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming ({upcomingTrips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'past'
                ? 'bg-[var(--ink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Past ({pastTrips.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'quotes'
                ? 'bg-[var(--ink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quotes ({quoteTrips.length})</span>
          </button>
        </div>
      </div>

      {/* Trips Stream (Cards with padding 14, route lines 14/600) */}
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
                ? 'You have no scheduled chauffeur rides. All bookings include flight tracking and 60m free wait.'
                : activeTab === 'past'
                ? 'Your completed journeys and invoices will appear here.'
                : 'Any written quote requests under review will show here.'
            }
            actionLabel="Book a Chauffeur"
            onAction={() => navigate('/book')}
          />
        )}
      </div>
    </div>
  );
}
