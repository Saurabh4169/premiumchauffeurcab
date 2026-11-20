// src/pages/dispatch/DispatchFleet.jsx
import React, { useState } from 'react';
import { 
  Car, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Gauge, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import { DISPATCH_FLEET_STATUS } from '../../data/dispatchData.js';
import Badge from '../../components/common/Badge.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function DispatchFleet() {
  const { showToast } = useApp();
  const [fleetList, setFleetList] = useState(DISPATCH_FLEET_STATUS);
  const [filter, setFilter] = useState('all'); // 'all' | 'available' | 'on_job' | 'in_service'

  const filteredFleet = filter === 'all' 
    ? fleetList 
    : fleetList.filter(v => v.status === filter);

  const handleToggleMaintenance = (vehicleId) => {
    setFleetList(prev => prev.map(v => {
      if (v.id === vehicleId) {
        const nextStatus = v.status === 'in_service' ? 'available' : 'in_service';
        showToast(`Vehicle ${v.name} status updated to: ${nextStatus}`, 'gold');
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-sans tracking-wider uppercase text-[#F43F43] font-bold">
            Asset Inventory & Telemetry
          </span>
          <h2 className="font-sans text-2xl font-bold text-white">
            Fleet Status & Maintenance
          </h2>
          <p className="text-[13px] text-white/50">
            Monitoring mileage-based preventative inspection triggers and active staging.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {['all', 'available', 'on_job', 'in_service'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filter === f
                  ? 'btn-primary text-white'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFleet.map((vehicle) => {
          const milesUntilService = vehicle.nextServiceMileage - vehicle.mileage;
          const isServiceDue = milesUntilService <= 500;

          return (
            <div
              key={vehicle.id}
              className={`glass-panel rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                vehicle.serviceFlag
                  ? 'border-[#c8102e]/40 ring-1 ring-[#c8102e]/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-sans text-[11px] px-2 py-0.5 rounded bg-black/40 text-[#FDEEEA] font-bold border border-white/10">
                      {vehicle.plate}
                    </span>
                    <h3 className="font-sans font-bold text-[16px] text-white mt-1">
                      {vehicle.name}
                    </h3>
                  </div>

                  <Badge
                    variant={
                      vehicle.status === 'available' ? 'success' : vehicle.status === 'on_job' ? 'gold' : 'crimson'
                    }
                    size="sm"
                  >
                    {vehicle.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Staging & Driver */}
                <div className="space-y-1.5 my-3 text-[12px] text-white/70 bg-white/5 rounded-2xl p-3 border border-white/5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F43F43] shrink-0" />
                    <span className="truncate">{vehicle.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <span>Driver: {vehicle.driver || 'None assigned'}</span>
                  </div>
                </div>

                {/* Mileage Tracker Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="text-white/50">Odometer: {vehicle.mileage.toLocaleString()} mi</span>
                    <span className={isServiceDue ? 'text-[#f87171] font-bold' : 'text-white/50'}>
                      Next Service: {vehicle.nextServiceMileage.toLocaleString()} mi
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isServiceDue ? 'bg-[#c8102e]' : 'bg-[#F43F43]'
                      }`}
                      style={{ width: `${Math.min(100, (vehicle.mileage / vehicle.nextServiceMileage) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Service warning tag */}
                {vehicle.serviceFlag && (
                  <div className="mt-3 p-2 rounded-xl bg-[#c8102e]/15 border border-[#c8102e]/30 text-[11px] text-[#f87171] flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Inspection or maintenance due immediately.</span>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-white/8 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-white/40 font-sans">
                  Lombard Commercial Bay
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleMaintenance(vehicle.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Wrench className="w-3 h-3 text-[#F43F43]" />
                  <span>{vehicle.status === 'in_service' ? 'Return to Service' : 'Flag Service'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
