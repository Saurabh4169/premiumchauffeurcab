// src/pages/SavedPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Car, ConciergeBell, ArrowRight } from 'lucide-react';
import Screen from '../components/common/Screen.jsx';
import LargeTitleHeader from '../components/common/LargeTitleHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FLEET } from '../data/fleet.js';
import { SERVICES } from '../data/services.js';

export default function SavedPage() {
  const navigate = useNavigate();
  const { savedVehicles, savedServices } = useApp();
  const [activeSegment, setActiveSegment] = useState('vehicles'); // 'vehicles' | 'services'

  const vehiclesList = savedVehicles.map(id => FLEET.find(v => v.id === id)).filter(Boolean);
  const servicesList = savedServices.map(slug => SERVICES.find(s => s.slug === slug || s.id === slug)).filter(Boolean);

  const totalCount = vehiclesList.length + servicesList.length;

  return (
    <Screen withTabBar className="pt-3 pb-8">
      {/* Header */}
      <LargeTitleHeader
        title="Saved"
        subtitle={`${totalCount} ${totalCount === 1 ? 'item' : 'items'} saved in your collection`}
      />

      {/* Segmented Control */}
      <div className="my-3">
        <div className="h-11 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-xs grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setActiveSegment('vehicles')}
            className={`rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSegment === 'vehicles'
                ? 'bg-[var(--ink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Vehicles ({vehiclesList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSegment('services')}
            className={`rounded-full text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSegment === 'services'
                ? 'bg-[var(--ink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <ConciergeBell className="w-3.5 h-3.5" />
            <span>Services ({servicesList.length})</span>
          </button>
        </div>
      </div>

      {/* Content Stream */}
      {activeSegment === 'vehicles' ? (
        vehiclesList.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {vehiclesList.map(vehicle => (
              <ProductCard
                key={vehicle.id}
                item={vehicle}
                type="vehicle"
                variant="grid"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[20px] p-8 text-center border border-[var(--border)] shadow-[var(--shadow-card)] my-6">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-[17px] font-bold text-[var(--ink)] mb-1">
              No saved vehicles yet
            </h3>
            <p className="text-[13px] text-[var(--text-muted)] max-w-xs mx-auto mb-4">
              Tap the heart on any vehicle card in our fleet to save it for quick access.
            </p>
            <button
              type="button"
              onClick={() => navigate('/fleet')}
              className="btn-primary"
            >
              Browse fleet
            </button>
          </div>
        )
      ) : (
        servicesList.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {servicesList.map(service => (
              <ProductCard
                key={service.id}
                item={service}
                type="service"
                variant="grid"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[20px] p-8 text-center border border-[var(--border)] shadow-[var(--shadow-card)] my-6">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-[17px] font-bold text-[var(--ink)] mb-1">
              No saved services yet
            </h3>
            <p className="text-[13px] text-[var(--text-muted)] max-w-xs mx-auto mb-4">
              Save airport, wedding, corporate or group transportation packages to your list.
            </p>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="btn-primary"
            >
              Browse services
            </button>
          </div>
        )
      )}
    </Screen>
  );
}
