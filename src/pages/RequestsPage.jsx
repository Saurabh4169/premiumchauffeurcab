// src/pages/RequestsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Inbox, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  FileText, 
  ChevronRight, 
  MessagesSquare, 
  CheckCircle2,
  X
} from 'lucide-react';
import BottomSheet from '../components/common/BottomSheet.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function RequestsPage() {
  const navigate = useNavigate();
  const { requests } = useApp();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Quote sent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In review':
        return 'bg-[var(--accent-tint)] text-[var(--accent)] border-amber-200';
      case 'Received':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-full pb-28 bg-[#f8f9fb]">
      {/* Top Header */}
      <div className="sticky top-0 z-30 h-[52px] px-4 bg-white/95 backdrop-blur-md border-b border-[#E8E8EC] flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="font-sans font-bold text-[16px] text-slate-900 truncate">
          My Requests & Quotes
        </h1>

        <button
          type="button"
          onClick={() => navigate('/support/request')}
          className="w-10 h-10 rounded-full bg-[#111114] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="New Request"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequest(req)}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all cursor-pointer group space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[11px] font-bold text-[#F43F43] uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                    {req.id}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {req.createdAt}
                  </span>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${getStatusBadge(req.status)}`}>
                  {req.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-[15px] text-slate-900 leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {req.routeOrTopic || req.serviceTitle}
                </h3>
                {req.quotedAmount && (
                  <p className="font-sans text-[14px] font-bold text-emerald-600 mt-0.5">
                    Written Quote: {req.quotedAmount}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[12px]">
                <span className="text-slate-400 font-medium">{req.typeLabel}</span>
                <span className="text-slate-800 font-bold group-hover:text-[var(--accent)] flex items-center gap-1">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="No requests yet"
            description="You haven't submitted any quote requests or service queries yet. Get an all-inclusive written quote in minutes."
            actionLabel="Request a quote"
            onAction={() => navigate('/support/request')}
            icon={Inbox}
          />
        )}
      </div>

      {/* Detail Bottom Sheet with Timeline */}
      {selectedRequest && (
        <BottomSheet
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          title={`Request ${selectedRequest.id}`}
          subtitle={selectedRequest.typeLabel}
        >
          <div className="space-y-4 py-2 text-[13px]">
            {/* Header Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-[14px]">
                  {selectedRequest.routeOrTopic}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </span>
              </div>
              {selectedRequest.pickup && (
                <p className="text-slate-600 text-[12px] pt-1">
                  <strong>Pickup:</strong> {selectedRequest.pickup}
                </p>
              )}
              {selectedRequest.dropoff && (
                <p className="text-slate-600 text-[12px]">
                  <strong>Drop-off:</strong> {selectedRequest.dropoff}
                </p>
              )}
              {selectedRequest.date && (
                <p className="text-slate-400 text-[11px]">
                  Scheduled: {selectedRequest.date} at {selectedRequest.time}
                </p>
              )}
            </div>

            {/* Notes */}
            {selectedRequest.notes && (
              <div className="p-3 bg-white rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Client Notes / Request Body
                </span>
                <p className="text-[12.5px] text-slate-700 leading-relaxed font-normal">
                  {selectedRequest.notes}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
                Logistics Progression
              </span>
              <div className="relative pl-5 space-y-3 border-l-2 border-slate-200">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F43F43] absolute -left-[25px] top-1" />
                  <p className="font-bold text-slate-900 text-[12px]">Request Received & Logged</p>
                  <p className="text-[11px] text-slate-400">Transmitted to Lombard dispatch center</p>
                </div>
                <div className="relative">
                  <span className={`w-2.5 h-2.5 rounded-full absolute -left-[25px] top-1 ${
                    selectedRequest.status !== 'Received' ? 'bg-[#F43F43]' : 'bg-slate-300'
                  }`} />
                  <p className="font-bold text-slate-900 text-[12px]">Dispatcher Review & Route Staging</p>
                  <p className="text-[11px] text-slate-400">Reviewing traffic corridors and vehicle buffer</p>
                </div>
                <div className="relative">
                  <span className={`w-2.5 h-2.5 rounded-full absolute -left-[25px] top-1 ${
                    selectedRequest.status === 'Quote sent' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                  <p className="font-bold text-slate-900 text-[12px]">All-In Written Quote Delivered</p>
                  <p className="text-[11px] text-slate-400">Locked flat quote delivered with 100% guarantee</p>
                </div>
              </div>
            </div>

            {/* Action: "Chat about this request" */}
            <button
              type="button"
              onClick={() => {
                navigate(`/support/chat?ref=${selectedRequest.id}`);
              }}
              className="w-full py-3.5 rounded-full bg-[#111114] text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-md cursor-pointer hover:bg-black transition-colors"
            >
              <MessagesSquare className="w-4 h-4 text-[#F43F43]" />
              <span>Chat with Dispatcher about this request</span>
            </button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
