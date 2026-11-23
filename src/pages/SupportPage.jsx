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
  ArrowRight
} from 'lucide-react';
import AppHeader from '../components/AppHeader.jsx';
import { FAQS } from '../data/faqs.js';
import { useApp } from '../context/AppContext.jsx';
import { useAgentStore } from '../store/agentStore.js';

export default function SupportPage() {
  const navigate = useNavigate();
  const { companyInfo } = useApp();
  const { openAgent } = useAgentStore();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-full pb-[152px] bg-white">
      <AppHeader title="Help and Support" showBack />

      <div className="px-5 pt-4 space-y-4">
        {/* Header Eyebrow & Subtitle (No duplicate title) */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#BE8A44] font-semibold block">
            24/7 Lombard Dispatch Desk
          </span>
          <p className="text-[13px] text-[#555555] leading-[18px]">
            We're here 24 hours a day, 7 days a week. Every inquiry is handled directly by an active logistics coordinator.
          </p>
        </div>

        {/* 1. Featured "Live Chat with Dispatch" Card */}
        <div className="p-4 rounded-[20px] bg-white border border-[#E2E2E2] shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Online 24/7
            </span>
            <span className="text-[11.5px] font-semibold text-[#BE8A44]">
              Immediate Response
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-[16px] font-bold text-[#120F11]">
              Live Chat with Dispatch
            </h3>
            <p className="text-[13px] text-[#555555] leading-[18px]">
              Direct real-person desk in Lombard, IL for live flight tracking, airport gate updates, and instant bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/support/chat')}
            className="w-full h-11 rounded-[14px] bg-[#120F11] hover:bg-slate-800 text-white font-bold text-[13.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <MessagesSquare className="w-4 h-4 stroke-[2]" />
            <span>Start live chat</span>
          </button>
        </div>

        {/* 2. Structured Contact Channels (Equal 44px Icon Tiles) */}
        <div className="space-y-3">
          {/* Direct Hotline */}
          <a
            href={`tel:${companyInfo.phone}`}
            className="p-4 rounded-[20px] bg-white border border-[#E2E2E2] shadow-xs hover:border-[#BE8A44]/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10.5px] uppercase tracking-wider text-[#555555] font-semibold block">
                  Direct Dispatch Hotline
                </span>
                <h4 className="text-[14.5px] font-bold text-[#120F11] group-hover:text-[var(--accent)] transition-colors mt-0.5">
                  +1 847-268-2323
                </h4>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </a>

          {/* Dispatch Email - Full text, never truncated */}
          <a
            href={`mailto:${companyInfo.email || 'info@premiumchauffeurservices.com'}`}
            className="p-4 rounded-[20px] bg-white border border-[#E2E2E2] shadow-xs hover:border-[#BE8A44]/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-[12px] bg-slate-100 text-[#120F11] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10.5px] uppercase tracking-wider text-[#555555] font-semibold block">
                  Dispatch Email Desk
                </span>
                <h4 className="text-[13px] font-bold text-[#120F11] group-hover:text-[var(--accent)] transition-colors mt-0.5 break-all">
                  {companyInfo.email || 'info@premiumchauffeurservices.com'}
                </h4>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </a>

          {/* Request Custom Quote */}
          <div
            onClick={() => navigate('/support/request')}
            className="p-4 rounded-[20px] bg-white border border-[#E2E2E2] shadow-xs hover:border-[#BE8A44]/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-[12px] bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10.5px] uppercase tracking-wider text-[#555555] font-semibold block">
                  Written Guarantees
                </span>
                <h4 className="text-[14.5px] font-bold text-[#120F11] group-hover:text-[var(--accent)] transition-colors mt-0.5">
                  Request a Custom Quote
                </h4>
                <p className="text-[12px] text-[#555555] mt-0.5 leading-snug">
                  Fixed all-inclusive quotes for weddings, wine tours & roadshows
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </div>

          {/* Ask AI Concierge Card */}
          <div
            onClick={() => openAgent({ context: { route: '/support' } })}
            className="p-4 rounded-[20px] bg-white border border-[#E2E2E2] shadow-xs hover:border-[#BE8A44]/50 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-[12px] bg-[#120F11] text-[#BE8A44] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[14.5px] font-bold text-[#120F11] group-hover:text-[var(--accent)] transition-colors leading-tight">
                  Ask AI Concierge
                </h4>
                <p className="text-[12px] text-[#555555] font-normal mt-0.5 leading-snug">
                  Instant vehicle recommendations, luggage fit & route guidance
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </div>
        </div>

        {/* 3. FAQ Accordion Section */}
        <div className="space-y-3 pt-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#BE8A44] font-semibold block">
              Policies & Answers
            </span>
            <h3 className="text-[17px] font-bold text-[#120F11]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id || index}
                  className="rounded-[20px] bg-white border border-[#E2E2E2] overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="text-[14px] font-semibold text-[#120F11] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#BE8A44]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-[13px] text-[#555555] leading-[19px] border-t border-[#E2E2E2] bg-[#FAF5ED]/40">
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
