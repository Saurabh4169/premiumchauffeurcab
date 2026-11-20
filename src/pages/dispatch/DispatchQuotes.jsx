// src/pages/dispatch/DispatchQuotes.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Check, 
  Send, 
  Edit3, 
  Clock, 
  User, 
  MapPin, 
  Car, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DISPATCH_QUOTES } from '../../data/dispatchData.js';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function DispatchQuotes() {
  const { showToast } = useApp();
  const [quotes, setQuotes] = useState(DISPATCH_QUOTES);
  const [selectedQuoteId, setSelectedQuoteId] = useState(quotes[0].id);
  const [isEditing, setIsEditing] = useState(false);

  const activeQuote = quotes.find(q => q.id === selectedQuoteId) || quotes[0];
  const [editedTotal, setEditedTotal] = useState(activeQuote.aiDraft.totalAllIn);
  const [editedResponse, setEditedResponse] = useState(activeQuote.aiDraft.proposedResponse);

  const handleApproveAndSend = () => {
    showToast(`Quote ${activeQuote.id} approved and dispatched to ${activeQuote.customerName}.`, 'success');
    // Remove approved quote from list
    setQuotes(prev => prev.filter(q => q.id !== activeQuote.id));
    if (quotes.length > 1) {
      setSelectedQuoteId(quotes.find(q => q.id !== activeQuote.id).id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <span className="text-[11px] font-sans tracking-wider uppercase text-[#F43F43] font-bold">
          Quote Dispatch Studio
        </span>
        <h2 className="font-sans text-2xl font-bold text-white">
          Incoming Inquiries & AI-Drafted Quotes
        </h2>
        <p className="text-[13px] text-white/50">
          Review, adjust, and approve written all-inclusive guarantees before emailing clients.
        </p>
      </div>

      {quotes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Quote Queue (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-sans font-bold uppercase text-white/40 block px-1">
              Pending Quote Queue ({quotes.length})
            </span>

            {quotes.map((q) => {
              const isSelected = q.id === activeQuote.id;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuoteId(q.id);
                    setEditedTotal(q.aiDraft.totalAllIn);
                    setEditedResponse(q.aiDraft.proposedResponse);
                    setIsEditing(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'glass-panel-gold border-[#F43F43] ring-1 ring-[#F43F43]'
                      : 'glass-panel border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-sans text-white/40">{q.id}</span>
                    <span className="text-white/50">{q.requestDate}</span>
                  </div>

                  <h4 className="font-sans font-bold text-[15px] text-white">
                    {q.customerName}
                  </h4>
                  <p className="text-[11px] text-[#FDEEEA] font-medium mt-0.5">
                    {q.serviceType}
                  </p>
                  <p className="text-[12px] text-white/60 line-clamp-1 mt-1">
                    {q.routing}
                  </p>

                  <div className="pt-2 border-t border-white/8 mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-sans">
                      AI Confidence: {q.aiDraft.aiConfidence}
                    </span>
                    <span className="font-sans font-bold text-[#FDEEEA]">
                      ${q.aiDraft.totalAllIn.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Split Workspace (8 cols) */}
          <div className="lg:col-span-8 glass-panel-elevated rounded-3xl p-6 border border-[#F43F43]/40 shadow-2xl space-y-5">
            {/* Split Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#F43F43] font-bold block">
                  Quote Workspace • {activeQuote.id}
                </span>
                <h3 className="font-sans text-xl font-bold text-white">
                  {activeQuote.customerName}
                </h3>
                <p className="text-[12px] text-white/50">{activeQuote.email} • {activeQuote.phone}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[12px] text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Done Editing' : 'Edit Rate'}</span>
                </button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleApproveAndSend}
                  icon={Send}
                >
                  Approve & Dispatch Quote
                </Button>
              </div>
            </div>

            {/* Inbound Customer Request Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-[13px]">
              <span className="text-[10px] uppercase font-sans tracking-wider text-white/40 font-bold block">
                Inbound Booking Request
              </span>
              <div className="grid grid-cols-2 gap-2 text-white/80">
                <p><span className="text-white/40">Routing:</span> {activeQuote.routing}</p>
                <p><span className="text-white/40">Requested Date:</span> {activeQuote.date}</p>
                <p><span className="text-white/40">Delegation:</span> {activeQuote.passengers} Pax, {activeQuote.luggage} Bags</p>
                <p><span className="text-white/40">Preferred Fleet:</span> {activeQuote.requestedVehicle}</p>
              </div>
            </div>

            {/* AI Calculation & Pricing Breakdown */}
            <div className="p-4 rounded-2xl bg-[#101417]/40 border border-[#F43F43]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#FDEEEA]">
                  <Sparkles className="w-4 h-4 text-[#F43F43]" />
                  <span>AI All-In Pricing Engine Analysis</span>
                </div>
                <Badge variant="success" size="sm">Confidence {activeQuote.aiDraft.aiConfidence}</Badge>
              </div>

              <p className="text-[12px] text-white/60 leading-relaxed italic">
                "{activeQuote.aiDraft.reasoning}"
              </p>

              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center">
                <div className="p-2 rounded-xl bg-black/40">
                  <span className="text-[10px] text-white/40 block">Base Fare</span>
                  <span className="font-sans text-[14px] font-bold text-white">
                    ${activeQuote.aiDraft.baseFare.toFixed(2)}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-black/40">
                  <span className="text-[10px] text-white/40 block">Tolls/Permits</span>
                  <span className="font-sans text-[14px] font-bold text-white">
                    ${(activeQuote.aiDraft.tolls + activeQuote.aiDraft.parking).toFixed(2)}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-black/40">
                  <span className="text-[10px] text-white/40 block">Driver Tip (20%)</span>
                  <span className="font-sans text-[14px] font-bold text-white">
                    ${activeQuote.aiDraft.gratuity.toFixed(2)}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-[#F43F43]/20 border border-[#F43F43]/40">
                  <span className="text-[10px] text-[#FDEEEA] block uppercase font-bold">Total Quote</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedTotal}
                      onChange={(e) => setEditedTotal(parseFloat(e.target.value) || 0)}
                      className="font-sans text-[14px] font-bold text-[#FDEEEA] bg-transparent text-center outline-none w-full"
                    />
                  ) : (
                    <span className="font-sans text-[15px] font-bold text-[#FDEEEA]">
                      ${editedTotal.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Proposed Client Response Email Preview */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#FDEEEA]">
                Drafted Client Written Guarantee Response
              </label>
              <textarea
                rows={5}
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/15 text-[13px] text-white font-sans leading-relaxed outline-none focus:border-[#F43F43]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border-white/10 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-[#3fa37a] mx-auto" />
          <h3 className="font-sans text-xl font-bold text-white">All Quotes Cleared</h3>
          <p className="text-[13px] text-white/50">Zero pending customer estimates awaiting dispatcher review.</p>
        </div>
      )}
    </div>
  );
}
