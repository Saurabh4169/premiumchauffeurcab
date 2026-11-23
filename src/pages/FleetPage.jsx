// src/pages/FleetPage.jsx
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, LayoutGrid, List, Heart } from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import AppHeader from '../components/AppHeader.jsx';
import Chip from '../components/common/Chip.jsx';
import ProductCard from '../components/ProductCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { CATEGORIES, FLEET } from '../data/fleet.js';
import { useApp } from '../context/AppContext.jsx';

export default function FleetPage() {
  const { isSaved } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPassengers, setMinPassengers] = useState(0);
  const [minLuggage, setMinLuggage] = useState(0);
  const [savedOnly, setSavedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter vehicles
  const filteredVehicles = FLEET.filter((vehicle) => {
    // Saved only filter
    if (savedOnly && !isSaved('vehicle', vehicle.id)) {
      return false;
    }
    // Category match
    if (selectedCategory !== 'all' && vehicle.category !== selectedCategory) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = vehicle.name.toLowerCase().includes(q);
      const matchBrand = vehicle.brand.toLowerCase().includes(q);
      const matchBestFor = vehicle.bestFor.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchBestFor) return false;
    }
    // Capacity filter
    if (minPassengers > 0 && vehicle.passengers < minPassengers) return false;
    if (minLuggage > 0 && vehicle.luggage < minLuggage) return false;

    return true;
  });

  return (
    <Screen withTabBar className="bg-[var(--page)]">
      {/* Clean Header */}
      <AppHeader showBack={false} />

      {/* Page Title: "Our fleet" + subtitle + View Toggle [Grid / List] */}
      <div className="px-4 pt-3 pb-2 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[var(--ink)]">
            Our fleet
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-[18px]">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} · sedans to 56-seat coaches
          </p>
        </div>

        {/* Grid / List View Toggle */}
        <div className="flex items-center p-1 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label="Grid View"
            className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-all cursor-pointer ${viewMode === 'grid'
              ? 'bg-[var(--ink)] text-white shadow-xs'
              : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-label="List View"
            className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-all cursor-pointer ${viewMode === 'list'
              ? 'bg-[var(--ink)] text-white shadow-xs'
              : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (44px high) */}
      <div className="px-4 my-3">
        <div className="flex items-center gap-2">
          {/* Search Input 44px */}
          <div className="flex-1 relative flex items-center h-11 rounded-[14px] px-3.5 bg-white border border-[#E2E2E2] shadow-xs focus-within:border-[#BE8A44] transition-all">
            <Search className="w-4 h-4 text-[#555555] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Escalade, S-Class, Sprinter..."
              className="w-full bg-transparent text-[14px] text-[#12100F] placeholder:text-[#555555] outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button 44px */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`w-11 h-11 rounded-[14px] flex items-center justify-center border transition-all cursor-pointer shadow-xs ${minPassengers > 0 || minLuggage > 0 || savedOnly || showFilters
              ? 'bg-[var(--accent-tint)] border-[var(--accent)] text-[var(--accent)]'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface-muted)]'
              }`}
            title="Filter by capacity"
            aria-label="Filter fleet capacity"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Capacity Quick Filter Drawer */}
        {showFilters && (
          <div className="mt-2.5 p-3.5 rounded-[16px] bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-[12px] border-b border-[var(--border)] pb-2">
              <span className="font-semibold text-[var(--ink)]">Filter Options</span>
              <button
                type="button"
                onClick={() => { setMinPassengers(0); setMinLuggage(0); setSavedOnly(false); }}
                className="text-[#BE8A44] hover:underline font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Saved Only Toggle */}
            <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[13px] font-semibold text-[var(--ink)]">Saved only</span>
              </div>
              <input
                type="checkbox"
                checked={savedOnly}
                onChange={(e) => setSavedOnly(e.target.checked)}
                className="w-5 h-5 accent-[var(--accent)] rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">Min Passengers</label>
                <div className="flex items-center gap-1">
                  {[0, 3, 6, 14, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMinPassengers(num)}
                      className={`flex-1 py-1 rounded-[8px] text-[11px] font-semibold border transition-all cursor-pointer ${minPassengers === num
                        ? 'bg-[#12100F] text-white border-[#12100F]'
                        : 'bg-slate-50 text-slate-700 border-[#E2E2E2]'
                        }`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555555] mb-1">Min Bags</label>
                <div className="flex items-center gap-1">
                  {[0, 3, 6, 14].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMinLuggage(num)}
                      className={`flex-1 py-1 rounded-[8px] text-[11px] font-semibold border transition-all cursor-pointer ${minLuggage === num
                        ? 'bg-[#12100F] text-white border-[#12100F]'
                        : 'bg-slate-50 text-slate-700 border-[#E2E2E2]'
                        }`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Chips with Counts (36px high) */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              count={cat.count}
              active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Vehicles Grid / List / Empty State */}
      <div className="px-4 pb-6">
        {filteredVehicles.length === 0 ? (
          <EmptyState
            title="No vehicles match your filters"
            description="Try clearing your search query or adjusting your passenger/luggage requirements."
            actionText="Reset Filters"
            onAction={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setMinPassengers(0);
              setMinLuggage(0);
              setSavedOnly(false);
            }}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredVehicles.map((vehicle) => (
              <ProductCard
                key={vehicle.id}
                item={vehicle}
                type="vehicle"
                variant="grid"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredVehicles.map((vehicle) => (
              <ProductCard
                key={vehicle.id}
                item={vehicle}
                type="vehicle"
                variant="list"
              />
            ))}
          </div>
        )}
      </div>
    </Screen>
  );
}
