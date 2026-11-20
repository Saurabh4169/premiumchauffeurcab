// src/pages/ConciergePage.jsx
// Full-screen AI Concierge view (shares state with AgentSheet via useAgentStore)

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Phone, Bot, ArrowDown, Copy, ThumbsUp, ThumbsDown, Check, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';
import { useAgentStore } from '../store/agentStore.js';
import { useApp } from '../context/AppContext.jsx';

// Widgets
import ChoiceChips from '../components/agent/widgets/ChoiceChips.jsx';
import LocationInput from '../components/agent/widgets/LocationInput.jsx';
import DatePickerWidget from '../components/agent/widgets/DatePicker.jsx';
import TimePickerWidget from '../components/agent/widgets/TimePicker.jsx';
import StepperGroupWidget from '../components/agent/widgets/StepperGroup.jsx';
import FlightInputWidget from '../components/agent/widgets/FlightInput.jsx';
import VehicleRecommendationWidget from '../components/agent/widgets/VehicleRecommendation.jsx';
import SummaryCardWidget from '../components/agent/widgets/SummaryCard.jsx';
import QuoteCardWidget from '../components/agent/widgets/QuoteCard.jsx';
import ConfirmationCardWidget from '../components/agent/widgets/ConfirmationCard.jsx';
import TripListWidget from '../components/agent/widgets/TripList.jsx';
import HandoffCardWidget from '../components/agent/widgets/HandoffCard.jsx';

export default function ConciergePage() {
  const [searchParams] = useSearchParams();
  const { companyInfo, trips, showToast } = useApp();
  const {
    messages,
    sendMessage,
    isThinking,
    suggestedChips,
    draft,
    handleWidgetAnswer,
    reopenWidget,
    resetChat
  } = useAgentStore();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [feedback, setFeedback] = useState({});
  const messagesEndRef = useRef(null);

  // Check for prefill query param from URL (e.g. /ai?q=...)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      sendMessage(q, trips);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = (textToSend = null) => {
    const q = (textToSend || input).trim();
    if (!q) return;
    setInput('');
    sendMessage(q, trips);
  };

  const handleCopy = (msgId, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId, type) => {
    setFeedback(prev => ({ ...prev, [msgId]: type }));
    showToast(`Feedback noted. Thank you!`, 'info');
  };

  return (
    <div className="min-h-full flex flex-col justify-between pb-8 bg-[#F8F9FB]">
      {/* Header */}
      <AppHeader
        title="AI Concierge Butler"
        showBack
        rightElement={
          <button
            type="button"
            onClick={resetChat}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7075] hover:text-[#101417] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        }
      />

      {/* Brand Sub-header */}
      <div className="px-4 py-2 bg-white border-b border-[#E8E8EC] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] uppercase tracking-wider text-[#6B7075] font-semibold">
            24/7 Intelligent Booking Butler
          </span>
        </div>

        <a
          href={`tel:${companyInfo.phone}`}
          className="text-[11px] text-[#F43F43] font-semibold hover:underline flex items-center gap-1 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Dispatch</span>
        </a>
      </div>

      {/* Message Stream */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3.5">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
              <div className={`flex gap-2 max-w-[88%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                {isBot && (
                  <div className="w-8 h-8 rounded-full bg-[#101417] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#F43F43]" />
                  </div>
                )}

                <div className="flex flex-col">
                  <div
                    className={`p-3.5 rounded-[16px] text-[13.5px] leading-[20px] shadow-xs ${
                      isBot
                        ? 'bg-white text-[#101417] border border-[#E8E8EC] rounded-tl-xs'
                        : 'bg-[#101417] text-white rounded-tr-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Bot Message Action Bar */}
                  {isBot && (
                    <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-[#9EA3A8]">
                      <span>{msg.time}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-[#101417] transition-colors cursor-pointer"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(msg.id, 'up')}
                        className={`hover:text-[#101417] cursor-pointer ${feedback[msg.id] === 'up' ? 'text-emerald-600' : ''}`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(msg.id, 'down')}
                        className={`hover:text-[#101417] cursor-pointer ${feedback[msg.id] === 'down' ? 'text-rose-600' : ''}`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Embedded Widgets */}
              {msg.widget && (
                <div className="w-full max-w-[90%] mt-1 ml-10">
                  {msg.widget.type === 'choice-chips' && (
                    <ChoiceChips
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'location-input' && (
                    <LocationInput
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'date-picker' && (
                    <DatePickerWidget
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'time-picker' && (
                    <TimePickerWidget
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'stepper-group' && (
                    <StepperGroupWidget
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'flight-input' && (
                    <FlightInputWidget
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'vehicle-recommendation' && (
                    <VehicleRecommendationWidget
                      widget={msg.widget}
                      answered={msg.widgetAnswered}
                      answeredValue={msg.answeredValue}
                      onSelect={handleWidgetAnswer}
                      onEdit={() => reopenWidget(msg.widget.id)}
                    />
                  )}

                  {msg.widget.type === 'quote-card' && (
                    <>
                      <SummaryCardWidget
                        draft={draft}
                        onEditSlot={(slot) => handleSend(`Change the ${slot}`)}
                      />
                      <QuoteCardWidget widget={msg.widget} />
                    </>
                  )}

                  {msg.widget.type === 'confirmation-card' && (
                    <ConfirmationCardWidget widget={msg.widget} />
                  )}

                  {msg.widget.type === 'trip-list' && (
                    <TripListWidget widget={msg.widget} />
                  )}

                  {msg.widget.type === 'handoff' && (
                    <HandoffCardWidget />
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isThinking && (
          <div className="flex items-center gap-2 text-[#6B7075] text-[12px] p-2.5 bg-white border border-[#E8E8EC] rounded-[14px] w-fit shadow-xs ml-10">
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-bounce [animation-delay:0.4s]" />
            </div>
            <span className="text-[11px] font-medium italic">Butler is reviewing fleet schedules & rates...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggested Reply Chips */}
      <div className="px-4 py-2 border-t border-[#E8E8EC] bg-white/95 backdrop-blur-md">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {suggestedChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(chip)}
              className="h-[34px] px-3.5 rounded-full bg-white hover:bg-rose-50 hover:border-[#F43F43] border border-[#E8E8EC] text-[13px] text-[#101417] transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F43F43]" />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Box (48px high) */}
      <div className="px-4 py-2 bg-white border-t border-[#E8E8EC]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center h-12 rounded-[14px] px-3.5 bg-[#F5F5F7] border border-[#E8E8EC] focus-within:border-[#F43F43] focus-within:bg-white transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about airport runs, luggage fit, or quotes..."
            className="w-full bg-transparent text-[14px] text-[#101417] placeholder:text-[#6B7075] outline-none font-medium"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 rounded-[10px] bg-[#101417] hover:bg-[#F43F43] flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 ml-2 shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-[#9EA3A8] text-center mt-1 leading-tight">
          AI can make mistakes. Quotes are confirmed in writing by dispatch.
        </p>
      </div>
    </div>
  );
}
