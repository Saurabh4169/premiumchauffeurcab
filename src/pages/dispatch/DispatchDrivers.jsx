// src/pages/dispatch/DispatchDrivers.jsx
import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Phone, 
  Star, 
  Clock, 
  Car, 
  Award,
  Search
} from 'lucide-react';
import { DISPATCH_DRIVERS } from '../../data/dispatchData.js';
import Avatar from '../../components/common/Avatar.jsx';
import Badge from '../../components/common/Badge.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function DispatchDrivers() {
  const { showToast } = useApp();
  const [drivers, setDrivers] = useState(DISPATCH_DRIVERS);
  const [search, setSearch] = useState('');

  const filtered = drivers.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.assignedVehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-sans tracking-wider uppercase text-[#BE8A44] font-bold">
            Chauffeur Roster & Logistics
          </span>
          <h2 className="font-sans text-2xl font-bold text-white">
            Professional Chauffeur Roster
          </h2>
          <p className="text-[13px] text-white/50">
            FBI fingerprint-verified, commercial passenger licensed, and formal dark-suit attired.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-64 h-11 px-3.5 rounded-xl bg-white/5 border border-white/12 flex items-center focus-within:border-[var(--accent)]">
          <Search className="w-4 h-4 text-white/40 mr-2 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chauffeurs..."
            className="w-full bg-transparent text-[13px] text-white placeholder:text-white/35 outline-none"
          />
        </div>
      </div>

      {/* Chauffeur Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((driver) => (
          <div
            key={driver.id}
            className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar
                  src={driver.photo}
                  name={driver.name}
                  size="lg"
                  status={driver.status === 'On Job' ? 'busy' : 'online'}
                />
                <div>
                  <h3 className="font-sans font-bold text-[16px] text-white">
                    {driver.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{driver.rating}</span>
                    <span className="text-white/40">• {driver.hoursToday} on shift</span>
                  </div>
                </div>
              </div>

              <Badge variant={driver.status === 'On Job' ? 'warning' : 'success'} size="sm">
                {driver.status}
              </Badge>
            </div>

            <div className="space-y-1.5 text-[12px] text-white/70 bg-white/5 rounded-2xl p-3 border border-white/5">
              <p className="truncate">
                <span className="text-white/40">Vehicle:</span> {driver.assignedVehicle}
              </p>
              <p className="text-[11px] text-[#FAF5ED]">
                <span className="text-white/40">License:</span> {driver.licenseType}
              </p>
            </div>

            <div className="pt-2 border-t border-white/8 flex items-center justify-between text-[12px]">
              <span className="text-white/50 font-sans text-[11px]">
                {driver.phone}
              </span>
              <a
                href={`tel:${driver.phone}`}
                className="btn-glass-secondary px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 text-white"
              >
                <Phone className="w-3 h-3 text-[#BE8A44]" />
                <span>Call Dispatch Line</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
