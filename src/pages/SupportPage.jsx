// src/pages/SupportPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MessagesSquare, 
  FileText, 
  ChevronDown, 
  Sparkles, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { FAQS } from '../data/faqs.js';
import { useApp } from '../context/AppContext.jsx';

export default function SupportPage() {
  const navigate = useNavigate();
  const { companyInfo } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-full pb-24 bg-[#F5F5F7]">
      {/* Top Header (52px sticky) */}
      <div className="sticky top-0 z-30 h-[52px] px-4 bg-white/95 backdrop-blur-md border-b border-[#E8E8EC] flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-[#101417] border border-[#E8E8EC] transition-all cursor-pointer shadow-xs"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h1 className="text-[16px] font-semibold text-[#101417] truncate">
          Help and Support
        </h1>

        <div className="w-9" />
      </div>

      <div className="px-4 pt-3.5 space-y-4">
        {/* Title Header */}
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#F43F43] font-semibold block mb-1">
            24/7 Lombard Dispatch
          </span>
          <h2 className="text-[28px] leading-[32px] font-display font-semibold text-[#101417]">
            Help and support
          </h2>
          <p className="text-[13px] text-[#6B7075] mt-1 leading-[18px]">
            We're here 24/7. Every inquiry is answered by a real logistics coordinator.
          </p>
        </div>

        {/* Contact Cards in a 2x2 Grid (12px gap) */}
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Live Chat */}
          <div
            onClick={() => navigate('/support/chat')}
            className="p-3.5 rounded-[16px] bg-white border border-[#E8E8EC] shadow-xs hover:border-[#F43F43]/50 transition-all cursor-pointer flex flex-col justify-between h-28 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessagesSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Online 24/7
              </span>
              <h3 className="font-semibold text-[14px] text-[#101417] group-hover:text-[var(--accent)] transition-colors mt-0.5 leading-tight">
                Live Chat
              </h3>
            </div>
          </div>

          {/* 2. Call Dispatcher */}
          <a
            href={`tel:${companyInfo.phone}`}
            className="p-3.5 rounded-[16px] bg-white border border-[#E8E8EC] shadow-xs hover:border-[#F43F43]/50 transition-all cursor-pointer flex flex-col justify-between h-28 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#6B7075] font-semibold uppercase tracking-wider block">
                Direct Hotline
              </span>
              <h3 className="font-semibold text-[13px] text-[#101417] group-hover:text-[var(--accent)] transition-colors mt-0.5 leading-tight">
                +1 847-268-2323
              </h3>
            </div>
          </a>

          {/* 3. Direct Email */}
          <a
            href={`mailto:${companyInfo.email}`}
            className="p-3.5 rounded-[16px] bg-white border border-[#E8E8EC] shadow-xs hover:border-[#F43F43]/50 transition-all cursor-pointer flex flex-col justify-between h-28 group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#101417] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#6B7075] font-semibold uppercase tracking-wider block">
                Dispatch Email
              </span>
              <h3 className="font-semibold text-[13px] text-[#101417] truncate group-hover:text-[var(--accent)] transition-colors mt-0.5 leading-tight">
                info@premium...
              </h3>
            </div>
          </a>

          {/* 4. Request a quote */}
          <div
            onClick={() => navigate('/support/request')}
            className="p-3.5 rounded-[16px] bg-white border border-[#E8E8EC] shadow-xs hover:border-[#F43F43]/50 transition-all cursor-pointer flex flex-col justify-between h-28 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#6B7075] font-semibold uppercase tracking-wider block">
                Fixed Quotes
              </span>
              <h3 className="font-semibold text-[14px] text-[#101417] group-hover:text-[var(--accent)] transition-colors mt-0.5 leading-tight">
                Request a quote
              </h3>
            </div>
          </div>
        </div>

        {/* "Ask AI Concierge" Card */}
        <div
          onClick={() => navigate('/ai')}
          className="p-3.5 rounded-[16px] bg-white border border-[#E8E8EC] shadow-xs hover:border-[#F43F43]/50 flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#101417] flex items-center justify-center text-[#F43F43] shadow-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[15px] text-[#101417] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                Ask AI Concierge
              </h3>
              <p className="text-[12px] text-[#6B7075] font-normal truncate mt-0.5">
                Instant vehicle recommendations, luggage fit & route guidance
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-2.5 pt-1">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#F43F43] font-semibold block">
              Policies & Answers
            </span>
            <h3 className="text-[18px] font-bold text-[#101417]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id || index}
                  className="rounded-[14px] bg-white border border-[#E8E8EC] overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2.5 cursor-pointer"
                  >
                    <span className="text-[14px] font-semibold text-[#101417] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#F43F43]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-[13px] text-[#6B7075] leading-[18px] border-t border-[#E8E8EC] bg-[#F5F5F7]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
