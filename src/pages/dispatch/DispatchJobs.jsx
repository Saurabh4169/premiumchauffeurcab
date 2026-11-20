// src/pages/dispatch/DispatchJobs.jsx
import React, { useState } from 'react';
import { 
  Briefcase, 
  User, 
  Car, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Plus, 
  SlidersHorizontal,
  Table,
  Kanban
} from 'lucide-react';
import { DISPATCH_JOBS, DISPATCH_DRIVERS, DISPATCH_FLEET_STATUS } from '../../data/dispatchData.js';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function DispatchJobs() {
  const { showToast } = useApp();
  const [jobs, setJobs] = useState(DISPATCH_JOBS);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [selectedJob, setSelectedJob] = useState(null);
  const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');

  const columns = [
    { id: 'unassigned', label: 'Unassigned', count: jobs.filter(j => j.status === 'unassigned').length, color: 'text-amber-400' },
    { id: 'assigned', label: 'Assigned', count: jobs.filter(j => j.status === 'assigned').length, color: 'text-blue-400' },
    { id: 'en_route', label: 'En Route', count: jobs.filter(j => j.status === 'en_route').length, color: 'text-[#F43F43]' },
    { id: 'completed', label: 'Completed', count: jobs.filter(j => j.status === 'completed').length, color: 'text-emerald-400' }
  ];

  const handleOpenAssign = (job) => {
    setSelectedJob(job);
    setSelectedDriverId(job.chauffeurId || '');
    setSelectedVehicleId(job.vehicleId || '');
    setAssignDrawerOpen(true);
  };

  const handleConfirmAssignment = () => {
    if (!selectedDriverId || !selectedVehicleId) {
      showToast('Please select both a chauffeur and a vehicle.', 'error');
      return;
    }

    const driver = DISPATCH_DRIVERS.find(d => d.id === selectedDriverId);
    const vehicle = DISPATCH_FLEET_STATUS.find(v => v.id === selectedVehicleId);

    // Update job
    setJobs(prev => prev.map(j => {
      if (j.id === selectedJob.id) {
        return {
          ...j,
          status: 'assigned',
          chauffeurId: driver.id,
          chauffeurName: driver.name,
          vehicleId: vehicle.id,
          vehicleName: `${vehicle.name} (${vehicle.plate})`
        };
      }
      return j;
    }));

    showToast(`Assigned ${driver.name} to ${selectedJob.id} with 30m staging buffer.`, 'success');
    setAssignDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-sans tracking-wider uppercase text-[#F43F43] font-bold">
            Job Scheduling & Allocation
          </span>
          <h2 className="font-sans text-2xl font-bold text-white">
            Live Jobs Manifest
          </h2>
          <p className="text-[13px] text-white/50">
            Drag or assign vetted chauffeurs to incoming reservations with guaranteed buffer.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'kanban' ? 'bg-[#F43F43] text-[#101417]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table' ? 'bg-[#F43F43] text-[#101417]' : 'text-white/60 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colJobs = jobs.filter(j => j.status === col.id);

            return (
              <div key={col.id} className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col">
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className={`text-[13px] font-bold ${col.color}`}>
                    {col.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-sans text-white/60">
                    {col.count}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh]">
                  {colJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleOpenAssign(job)}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/8 hover:border-[#F43F43]/50 hover:bg-white/10 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-sans text-white/40">{job.id}</span>
                        <span className="text-[#FDEEEA] font-sans font-semibold">{job.time}</span>
                      </div>

                      <h4 className="font-sans font-bold text-[14px] text-white leading-snug group-hover:text-[#FDEEEA] transition-colors">
                        {job.customer}
                      </h4>

                      <div className="text-[11px] text-white/60 space-y-0.5">
                        <p className="truncate"><span className="text-white/40">From:</span> {job.pickup}</p>
                        <p className="truncate"><span className="text-white/40">To:</span> {job.dropoff}</p>
                      </div>

                      <div className="pt-2 border-t border-white/8 flex items-center justify-between text-[11px]">
                        <span className="text-[#3fa37a] truncate max-w-[140px]">
                          {job.chauffeurName}
                        </span>
                        <span className="font-sans font-bold text-white">
                          ${job.quoteTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {colJobs.length === 0 && (
                    <div className="py-8 text-center text-[12px] text-white/30 border border-dashed border-white/10 rounded-xl">
                      No jobs in {col.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-white/5 border-b border-white/10 text-[11px] font-sans uppercase text-white/50">
              <tr>
                <th className="p-4">Job ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Time</th>
                <th className="p-4">Routing</th>
                <th className="p-4">Assigned Driver</th>
                <th className="p-4">Status</th>
                <th className="p-4">Quote</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-sans font-bold text-white/70">{job.id}</td>
                  <td className="p-4 font-semibold text-white">{job.customer}</td>
                  <td className="p-4 font-sans text-[#FDEEEA]">{job.time}</td>
                  <td className="p-4 text-white/60 max-w-[220px] truncate">{job.pickup} &rarr; {job.dropoff}</td>
                  <td className="p-4 text-white/80">{job.chauffeurName}</td>
                  <td className="p-4">
                    <Badge variant={job.status === 'en_route' ? 'gold' : job.status === 'assigned' ? 'warning' : 'glass'} size="sm">
                      {job.status}
                    </Badge>
                  </td>
                  <td className="p-4 font-sans font-bold text-[#FDEEEA]">${job.quoteTotal.toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenAssign(job)}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#F43F43] hover:text-[#101417] text-[12px] font-semibold transition-all cursor-pointer"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assignment Drawer / Modal with Conflict Warnings */}
      {assignDrawerOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel-elevated rounded-3xl p-6 border border-[#F43F43]/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#F43F43] font-bold">
                  Chauffeur Allocation
                </span>
                <h3 className="font-sans text-lg font-bold text-white">
                  Assign Job {selectedJob.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAssignDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Job Summary */}
            <div className="p-3.5 rounded-xl bg-white/5 text-[12px] space-y-1">
              <p className="text-white font-medium">Customer: {selectedJob.customer}</p>
              <p className="text-white/60">Time: {selectedJob.time} ({selectedJob.passengers} Pax, {selectedJob.bags} Bags)</p>
              <p className="text-white/60 truncate">Route: {selectedJob.pickup} &rarr; {selectedJob.dropoff}</p>
              {selectedJob.flight && (
                <p className="text-[#3fa37a] font-semibold">Aviation: Flight {selectedJob.flight}</p>
              )}
            </div>

            {/* Conflict Warning Simulation */}
            <div className="p-3 rounded-xl bg-[var(--accent-tint)]0/10 border border-amber-500/30 text-amber-300 text-[12px] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Dispatch Rule: Always assign a chauffeur with minimum 30-minute buffer time between airport jobs.
              </span>
            </div>

            {/* Chauffeur Selector */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#FDEEEA] mb-1.5">
                Select Available Chauffeur
              </label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full h-12 rounded-xl px-3 bg-[#180a11] border border-white/20 text-white text-[13px] outline-none focus:border-[#F43F43]"
              >
                <option value="">-- Choose Chauffeur --</option>
                {DISPATCH_DRIVERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.status} • {d.assignedVehicle.split('(')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Selector */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#FDEEEA] mb-1.5">
                Select Fleet Vehicle
              </label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full h-12 rounded-xl px-3 bg-[#180a11] border border-white/20 text-white text-[13px] outline-none focus:border-[#F43F43]"
              >
                <option value="">-- Choose Vehicle --</option>
                {DISPATCH_FLEET_STATUS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.plate}) • {v.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAssignDrawerOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-[13px] font-semibold hover:bg-white/15"
              >
                Cancel
              </button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmAssignment}
              >
                Confirm Allocation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
