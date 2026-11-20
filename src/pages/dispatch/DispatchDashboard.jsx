// src/pages/dispatch/DispatchDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  CheckCircle2, 
  FileText, 
  Plane, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  MapPin, 
  Car,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { DISPATCH_KPIS, DISPATCH_FLIGHT_ALERTS, DISPATCH_JOBS } from '../../data/dispatchData.js';
import Badge from '../../components/common/Badge.jsx';

export default function DispatchDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Welcome & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-sans tracking-wider uppercase text-[#F43F43] font-bold">
            Live Dispatch Telemetry
          </span>
          <h2 className="font-sans text-2xl font-bold text-white">
            Operations Dashboard
          </h2>
          <p className="text-[13px] text-white/50">
            55 West 22nd Street, Lombard, IL • Managing Chicago, NY, MIA, ATL & LAX
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/dispatch/quotes')}
            className="btn-primary px-4 py-2 rounded-xl text-[13px] flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Review {DISPATCH_KPIS.pendingQuotes} Pending Quotes</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-[12px] uppercase font-semibold">Today's Jobs</span>
            <Briefcase className="w-4 h-4 text-[#F43F43]" />
          </div>
          <div>
            <span className="font-sans text-2xl font-bold text-white">
              {DISPATCH_KPIS.todaysJobs}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1">
              +{DISPATCH_KPIS.inTransit} currently in transit
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-[12px] uppercase font-semibold">On-Time Staging Rate</span>
            <CheckCircle2 className="w-4 h-4 text-[#3fa37a]" />
          </div>
          <div>
            <span className="font-sans text-2xl font-bold text-emerald-400">
              {DISPATCH_KPIS.onTimeRate}%
            </span>
            <span className="text-[11px] text-white/50 block mt-1">
              Guaranteed buffer standard
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-[12px] uppercase font-semibold">Active Chauffeurs</span>
            <Users className="w-4 h-4 text-[#FDEEEA]" />
          </div>
          <div>
            <span className="font-sans text-2xl font-bold text-white">
              {DISPATCH_KPIS.activeChauffeurs}
            </span>
            <span className="text-[11px] text-white/50 block mt-1">
              14 vehicles deployed
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel rounded-2xl p-4 border border-[#c8102e]/30 flex flex-col justify-between bg-[#101417]/30">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-[12px] uppercase font-semibold">Pending Quotes</span>
            <FileText className="w-4 h-4 text-[#F43F43]" />
          </div>
          <div>
            <span className="font-sans text-2xl font-bold text-[#FDEEEA]">
              {DISPATCH_KPIS.pendingQuotes}
            </span>
            <span className="text-[11px] text-[#f87171] block mt-1">
              AI drafts waiting review
            </span>
          </div>
        </div>
      </div>

      {/* Flight Radar Delays & Adjustments Feed */}
      <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-tint)]0/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-[16px] text-white">
                Live Flight Radar Alerts (Automated Buffer Adjustments)
              </h3>
              <p className="text-[11px] text-white/50">Real-time incoming commercial flight radar sync</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-sans font-semibold">
            ADS-B Synchronized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DISPATCH_FLIGHT_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-[13px] font-bold text-white flex items-center gap-2">
                  <span>{alert.flightNumber}</span>
                  <span className="text-[11px] font-normal text-white/50 font-sans">({alert.origin})</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  alert.status.includes('Delayed') ? 'bg-[var(--accent-tint)]0/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {alert.status}
                </span>
              </div>

              <div className="text-[12px] text-white/70">
                <p><span className="text-white/40">Passenger:</span> {alert.passenger}</p>
                <p><span className="text-white/40">Assigned Chauffeur:</span> {alert.chauffeur}</p>
              </div>

              <div className="p-2 rounded-xl bg-black/40 text-[11px] text-[#FDEEEA] font-sans flex items-center gap-1.5 border border-white/5">
                <Clock className="w-3.5 h-3.5 text-[#3fa37a] shrink-0" />
                <span>{alert.actionTaken}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Section: Live Active Jobs Timeline & Dispatch Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Live Job Queue (2 cols) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-sans font-bold text-[17px] text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-[#F43F43]" />
              <span>Active Job Manifest</span>
            </h3>

            <button
              type="button"
              onClick={() => navigate('/dispatch/jobs')}
              className="text-[12px] text-[#FDEEEA] hover:underline flex items-center gap-1"
            >
              <span>View Full Kanban</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {DISPATCH_JOBS.slice(0, 4).map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/8 hover:border-[#F43F43]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[11px] text-white/50">{job.id}</span>
                    <Badge variant={job.status === 'en_route' ? 'gold' : job.status === 'assigned' ? 'warning' : 'glass'} size="sm">
                      {job.status === 'en_route' ? 'En Route' : job.status === 'assigned' ? 'Assigned' : 'Unassigned'}
                    </Badge>
                    <span className="text-[11px] text-[#F43F43] font-medium">{job.time}</span>
                  </div>

                  <h4 className="font-sans font-bold text-[15px] text-white">
                    {job.customer}
                  </h4>
                  <p className="text-[12px] text-white/60">
                    {job.pickup} &rarr; {job.dropoff}
                  </p>
                  <p className="text-[11px] text-white/45">
                    Vehicle: {job.vehicleName} • Driver: {job.chauffeurName}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-sans text-lg font-bold text-[#FDEEEA] block">
                    ${job.quoteTotal.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase block">Fixed Quote</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Regional Transit Radar Map */}
        <div className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-[17px] text-white mb-2">
              Regional Radar Grid
            </h3>
            <p className="text-[12px] text-white/50 mb-4">
              Real-time vehicle telemetry across Lombard HQ, O'Hare, Midway & Downtown Chicago.
            </p>

            <div className="h-60 w-full rounded-2xl bg-[#120a10] border border-white/10 relative overflow-hidden flex items-center justify-center p-4 text-center">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle, #F43F43 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />

              {/* Pulsing radar rings */}
              <div className="w-32 h-32 rounded-full border border-[#F43F43]/20 absolute animate-ping" />
              <div className="w-48 h-48 rounded-full border border-[#F43F43]/10 absolute" />

              <div className="relative z-10 space-y-2">
                <span className="w-3 h-3 rounded-full bg-[#3fa37a] inline-block animate-pulse" />
                <h4 className="font-sans text-[13px] text-white font-bold">Lombard HQ Staging Bay</h4>
                <p className="text-[11px] text-white/50 max-w-[180px]">
                  55 W 22nd St • 14 Fleet units online • Zero radar outages
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-[11px] text-white/60">
            <span>Interstate Transfers: Active</span>
            <span className="text-[#3fa37a]">Milwaukee • South Bend</span>
          </div>
        </div>
      </div>
    </div>
  );
}
