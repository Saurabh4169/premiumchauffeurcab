// src/pages/ServicesPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  ConciergeBell,
  LayoutGrid,
  List,
  ArrowUpDown,
  Heart
} from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import AppHeader from '../components/AppHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import BottomSheet from '../components/common/BottomSheet.jsx';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services.js';
import { useApp } from '../context/AppContext.jsx';

export default function ServicesPage() {
  const navigate = useNavigate();
  const { servicesFilter, setServicesFilter, isSaved } = useApp();

  const [activeGroup, setActiveGroup] = useState(servicesFilter.group || 'everyday'); // 'everyday' | 'events'
  const [activeChip, setActiveChip] = useState(servicesFilter.chip || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'title'
  const [savedOnly, setSavedOnly] = useState(false);

  // Advanced Filters State
  const [selectedGroupSize, setSelectedGroupSize] = useState('all'); // 'all', '1-3', '4-6', '7-14', '15+'
  const [selectedVehicleType, setSelectedVehicleType] = useState('all'); // 'all', 'sedan', 'suv', 'limo', 'sprinter', 'bus'
  const [selectedCity, setSelectedCity] = useState('all');

  const activeFilterCount = (selectedGroupSize !== 'all' ? 1 : 0) + 
                            (selectedVehicleType !== 'all' ? 1 : 0) + 
                            (selectedCity !== 'all' ? 1 : 0) +
                            (savedOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedGroupSize('all');
    setSelectedVehicleType('all');
    setSelectedCity('all');
    setSavedOnly(false);
    setSearchQuery('');
  };

  const handleGroupSwitch = (group) => {
    setActiveGroup(group);
    setActiveChip('All');
    setServicesFilter({ group, chip: 'All' });
  };

  const handleChipSelect = (chip) => {
    setActiveChip(chip);
    setServicesFilter(prev => ({ ...prev, chip }));
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    let result = SERVICES.filter((service) => {
      // Saved only filter
      if (savedOnly && !isSaved('service', service.slug)) {
        return false;
      }

      // If user is searching across all services, search everywhere; otherwise filter by active group
      if (!searchQuery.trim()) {
        if (service.group !== activeGroup) return false;
        if (activeChip !== 'All' && service.category !== activeChip) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          service.title.toLowerCase().includes(q) ||
          service.code.toLowerCase().includes(q) ||
          service.category.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q) ||
          service.vehicles.toLowerCase().includes(q) ||
          service.highlights.some(h => h.toLowerCase().includes(q));

        if (!matchesQuery) return false;
      }

      // Group size filter
      if (selectedGroupSize !== 'all') {
        const v = service.vehicles.toLowerCase();
        if (selectedGroupSize === '1-3' && !v.includes('sedan') && !v.includes('s-class') && !v.includes('i7')) return false;
        if (selectedGroupSize === '4-6' && !v.includes('suv') && !v.includes('suburban') && !v.includes('navigator') && !v.includes('escalade')) return false;
        if (selectedGroupSize === '7-14' && !v.includes('sprinter') && !v.includes('stretch') && !v.includes('mkt')) return false;
        if (selectedGroupSize === '15+' && !v.includes('bus') && !v.includes('coach') && !v.includes('hummer') && !v.includes('56')) return false;
      }

      // Vehicle type filter
      if (selectedVehicleType !== 'all') {
        const v = service.vehicles.toLowerCase();
        if (selectedVehicleType === 'sedan' && !v.includes('sedan') && !v.includes('s-class') && !v.includes('i7')) return false;
        if (selectedVehicleType === 'suv' && !v.includes('suv') && !v.includes('suburban') && !v.includes('escalade') && !v.includes('navigator')) return false;
        if (selectedVehicleType === 'limo' && !v.includes('stretch') && !v.includes('mkt') && !v.includes('hummer')) return false;
        if (selectedVehicleType === 'sprinter' && !v.includes('sprinter') && !v.includes('van')) return false;
        if (selectedVehicleType === 'bus' && !v.includes('bus') && !v.includes('coach')) return false;
      }

      return true;
    });

    if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeGroup, activeChip, searchQuery, selectedGroupSize, selectedVehicleType, selectedCity, sortBy, savedOnly, isSaved]);

  const currentChips = SERVICE_CATEGORIES[activeGroup] || ['All'];

  // Chip counts computation
  const getChipCount = (chip) => {
    if (chip === 'All') {
      return SERVICES.filter(s => s.group === activeGroup).length;
    }
    return SERVICES.filter(s => s.group === activeGroup && s.category === chip).length;
  };

  return (
    <Screen withTabBar className="bg-[var(--page)]">
      {/* App Header */}
      <AppHeader showBack={false} />

      {/* Header Section with Title, Subtitle, and View Mode Toggle [Grid / List] */}
      <div className="px-4 pt-3 pb-3 flex items-start justify-between">
        <div>
          <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[var(--ink)]">
            Our services
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-[18px]">
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} matching criteria
          </p>
        </div>

        {/* Grid / List View Toggle */}
        <div className="flex items-center p-1 rounded-[12px] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label="Grid View"
            className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-all cursor-pointer ${
              viewMode === 'grid' 
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
            className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-all cursor-pointer ${
              viewMode === 'list' 
                ? 'bg-[var(--ink)] text-white shadow-xs' 
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Bar (44px high, radius 14) with Filter Button */}
      <div className="px-4 mb-3">
        <div className="h-11 rounded-[14px] bg-[var(--surface)] border border-[var(--border)] shadow-xs px-3.5 flex items-center gap-2.5 focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20 transition-all">
          <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 10 services..."
            className="w-full bg-transparent text-[14px] text-[var(--ink)] placeholder:text-[var(--text-subtle)] outline-none font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="w-6 h-6 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Filter button 36px with badge */}
          <button
            type="button"
            onClick={() => setFilterSheetOpen(true)}
            className="relative w-9 h-9 rounded-[10px] bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--ink)] flex items-center justify-center transition-all cursor-pointer shrink-0 ml-0.5"
            aria-label="Filter services"
          >
            <SlidersHorizontal className="w-4 h-4 text-[var(--ink)]" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Segmented Toggle (track --surface-muted, active segment --ink with white text) */}
      <div className="px-4 mb-3">
        <div className="bg-[var(--surface-muted)] p-1 rounded-full flex items-center border border-[var(--border)] relative">
          <button
            type="button"
            onClick={() => handleGroupSwitch('everyday')}
            className={`flex-1 py-2 rounded-full text-[13px] font-semibold transition-all relative z-10 text-center cursor-pointer ${
              activeGroup === 'everyday'
                ? 'text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            {activeGroup === 'everyday' && (
              <motion.div
                layoutId="servicesSegmentIndicator"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 bg-[var(--ink)] rounded-full shadow-sm z-[-1]"
              />
            )}
            Everyday travel
          </button>
          <button
            type="button"
            onClick={() => handleGroupSwitch('events')}
            className={`flex-1 py-2 rounded-full text-[13px] font-semibold transition-all relative z-10 text-center cursor-pointer ${
              activeGroup === 'events'
                ? 'text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            {activeGroup === 'events' && (
              <motion.div
                layoutId="servicesSegmentIndicator"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 bg-[var(--ink)] rounded-full shadow-sm z-[-1]"
              />
            )}
            Events and groups
          </button>
        </div>
      </div>

      {/* Category Chips with Counts */}
      <div className="px-4 mb-3 overflow-x-auto no-scrollbar flex items-center gap-2">
        {currentChips.map((chip) => {
          const isSelected = activeChip === chip;
          const count = getChipCount(chip);
          return (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipSelect(chip)}
              className={`h-9 px-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-[var(--ink)] text-white shadow-xs'
                  : 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              <span>{chip}</span>
              <span className={isSelected ? 'text-white/70 text-[12px]' : 'text-[var(--text-muted)] text-[12px]'}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Row */}
      <div className="px-4 mb-3 flex items-center justify-between text-[13px] text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span className="font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[var(--ink)] font-bold outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="title">Alphabetical (A–Z)</option>
          </select>
        </div>
        <span className="text-[12px] text-[var(--text-muted)]">
          {filteredServices.length} {filteredServices.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      {/* Services Grid or List with Unified ProductCard */}
      <div className="px-4 pb-6">
        {filteredServices.length === 0 ? (
          <div className="bg-[var(--surface)] rounded-[20px] p-8 text-center border border-[var(--border)] mt-2 shadow-[var(--shadow-card)]">
            <ConciergeBell className="w-10 h-10 text-[var(--text-subtle)] mx-auto mb-3" />
            <h4 className="text-[16px] font-bold text-[var(--ink)] mb-1">
              No matching services
            </h4>
            <p className="text-[13px] text-[var(--text-muted)] max-w-xs mx-auto mb-4">
              Try adjusting your search query or reset the filter tags.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-secondary"
            >
              <RotateCcw className="w-4 h-4 mr-1.5 text-[var(--ink)]" />
              Reset all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredServices.map((service) => (
              <ProductCard 
                key={service.id} 
                item={service} 
                type="service"
                variant="grid"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredServices.map((service) => (
              <ProductCard 
                key={service.id} 
                item={service} 
                type="service"
                variant="list"
              />
            ))}
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet */}
      <BottomSheet
        isOpen={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        title="Filter Services"
      >
        <div className="space-y-5 pb-4">
          {/* Saved Only Filter */}
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

          {/* Group Size Filter */}
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Group Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All sizes' },
                { id: '1-3', label: '1 to 3 pax' },
                { id: '4-6', label: '4 to 6 pax' },
                { id: '7-14', label: '7 to 14 pax' },
                { id: '15+', label: '15+ pax' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedGroupSize(item.id)}
                  className={`py-2 px-3 rounded-[12px] text-[13px] font-semibold text-center transition-all cursor-pointer ${
                    selectedGroupSize === item.id
                      ? 'bg-[var(--ink)] text-white shadow-xs'
                      : 'bg-[var(--surface-muted)] text-[var(--ink)] hover:bg-[var(--border)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Type Filter */}
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Vehicle Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All types' },
                { id: 'sedan', label: 'Sedans' },
                { id: 'suv', label: 'SUVs' },
                { id: 'limo', label: 'Limousines' },
                { id: 'sprinter', label: 'Sprinter' },
                { id: 'bus', label: 'Buses' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedVehicleType(item.id)}
                  className={`py-2 px-3 rounded-[12px] text-[13px] font-semibold text-center transition-all cursor-pointer ${
                    selectedVehicleType === item.id
                      ? 'bg-[var(--ink)] text-white shadow-xs'
                      : 'bg-[var(--surface-muted)] text-[var(--ink)] hover:bg-[var(--border)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* City / Market Filter */}
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Market / City
            </label>
            <div className="flex flex-wrap gap-2">
              {['all', 'Chicago', 'New York', 'Miami', 'Atlanta', 'Los Angeles'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`py-2 px-3.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[var(--ink)] text-white shadow-xs'
                      : 'bg-[var(--surface-muted)] text-[var(--ink)] hover:bg-[var(--border)]'
                  }`}
                >
                  {city === 'all' ? 'All markets' : city}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex gap-3 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={resetFilters}
              className="flex-1 btn-secondary"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setFilterSheetOpen(false)}
              className="flex-1 btn-primary"
            >
              Show results ({filteredServices.length})
            </button>
          </div>
        </div>
      </BottomSheet>
    </Screen>
  );
}
