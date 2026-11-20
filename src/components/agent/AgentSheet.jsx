// src/components/agent/AgentSheet.jsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Maximize2,
  MoreVertical,
  Send,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ArrowDown,
  Phone,
  RotateCcw as ResetIcon,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAgentStore } from '../../store/agentStore.js';
import { useApp } from '../../context/AppContext.jsx';
import { usePortalContainer } from '../../hooks/usePortalContainer.js';

// Widgets
import ChoiceChips from './widgets/ChoiceChips.jsx';
import LocationInput from './widgets/LocationInput.jsx';
import DatePickerWidget from './widgets/DatePicker.jsx';
import TimePickerWidget from './widgets/TimePicker.jsx';
import StepperGroupWidget from './widgets/StepperGroup.jsx';
import FlightInputWidget from './widgets/FlightInput.jsx';
import VehicleRecommendationWidget from './widgets/VehicleRecommendation.jsx';
import SummaryCardWidget from './widgets/SummaryCard.jsx';
import QuoteCardWidget from './widgets/QuoteCard.jsx';
import ConfirmationCardWidget from './widgets/ConfirmationCard.jsx';
import TripListWidget from './widgets/TripList.jsx';
import HandoffCardWidget from './widgets/HandoffCard.jsx';

export default function AgentSheet() {
  const portalContainer = usePortalContainer();
  const navigate = useNavigate();
  const { trips, showToast } = useApp();

  const {
    isOpen,
    closeAgent,
    messages,
    sendMessage,
    isThinking,
    suggestedChips,
    draft,
    handleWidgetAnswer,
    reopenWidget,
    resetChat,
    resetFabPosition
  } = useAgentStore();

  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedback, setFeedback] = useState({});

  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Esc key closes sheet
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeAgent();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAgent]);

  // Autoscroll to bottom
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
    }
  }, [isOpen, messages, isThinking]);

  // Detect scroll position to show "scroll to bottom" button
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBottom(isUp);
  };

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

  const handleExpandToFullScreen = () => {
    closeAgent();
    navigate('/ai');
  };

  if (!portalContainer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[60] flex flex-col justify-end pointer-events-auto">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAgent}
            className="absolute inset-0 bg-[#101417]/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Bottom Sheet Container (92% height) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="relative w-full h-[92%] bg-white rounded-t-[24px] shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Sheet Handle */}
            <div className="w-full pt-2.5 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 rounded-full bg-[#D1D5DB]" />
            </div>

            {/* Header (52px) */}
            <div className="h-[52px] px-4 border-b border-[#E8E8EC] flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#F43F43] to-[#DC2626] flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#101417] leading-tight">
                    AI Concierge
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-[#6B7075] font-medium">Online 24/7</span>
                  </div>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1">
                {/* Reset / Fresh Chat */}
                <button
                  type="button"
                  onClick={() => {
                    resetChat();
                    showToast('Returned to Main Menu · Fresh Chat', 'info');
                  }}
                  aria-label="New chat / Main menu"
                  title="New chat / Main menu"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7075] hover:text-[#101417] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Expand to /ai */}
                <button
                  type="button"
                  onClick={handleExpandToFullScreen}
                  aria-label="Expand to full screen"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7075] hover:text-[#101417] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* More Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowMenu(m => !m)}
                    aria-label="More options"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7075] hover:text-[#101417] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 top-10 w-48 bg-white rounded-[14px] shadow-xl border border-[#E8E8EC] py-1 z-30">
                      <button
                        type="button"
                        onClick={() => {
                          resetChat();
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#101417] hover:bg-[#F5F5F7] flex items-center gap-2 cursor-pointer"
                      >
                        <ResetIcon className="w-3.5 h-3.5 text-[#6B7075]" />
                        <span>New chat</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleSend('Talk to a dispatcher');
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#101417] hover:bg-[#F5F5F7] flex items-center gap-2 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#6B7075]" />
                        <span>Talk to a dispatcher</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          resetFabPosition();
                          setShowMenu(false);
                          showToast('Assistant button position reset', 'info');
                        }}
                        className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#101417] hover:bg-[#F5F5F7] flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#6B7075]" />
                        <span>Reset assistant position</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeAgent}
                  aria-label="Close assistant"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7075] hover:text-[#101417] hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 px-4 py-3 overflow-y-auto space-y-3.5 bg-[#FAFAFC]"
            >
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                    <div className={`flex gap-2 max-w-[90%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Bot Avatar */}
                      {isBot && (
                        <div className="w-7 h-7 rounded-full bg-[#101417] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#F43F43]" />
                        </div>
                      )}

                      {/* Bubble Content */}
                      <div className="flex flex-col">
                        <div
                          className={`p-3 rounded-[16px] text-[13px] leading-[19px] shadow-xs ${
                            isBot
                              ? 'bg-white text-[#101417] border border-[#E8E8EC] rounded-tl-xs'
                              : 'bg-[#101417] text-white rounded-tr-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>
                        </div>

                        {/* Bot Message Action Bar (Copy, Thumbs, Timestamp) */}
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

                    {/* Interactive Embedded Widget (if attached to this message) */}
                    {msg.widget && (
                      <div className="w-full max-w-[92%] mt-1 ml-9">
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

                        {(msg.widget.type === 'vehicle-recommendation' || msg.widget.type === 'vehicle-card') && (
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
                              onEditSlot={(slot) => {
                                handleSend(`I want to change the ${slot}`);
                              }}
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

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex items-center gap-2 text-[#6B7075] text-[12px] p-2.5 bg-white border border-[#E8E8EC] rounded-[14px] w-fit shadow-xs ml-9">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F43] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] font-medium italic">Concierge is verifying fleet & rates...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom Floating Button */}
            {showScrollBottom && (
              <button
                type="button"
                onClick={() => scrollToBottom(true)}
                className="absolute right-4 bottom-28 w-8 h-8 rounded-full bg-white border border-[#E8E8EC] shadow-md flex items-center justify-center text-[#101417] hover:bg-[#F5F5F7] transition-all cursor-pointer z-20"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            )}

            {/* Context-Aware Suggested Chips Bar */}
            <div className="px-3 py-1.5 bg-white border-t border-[#E8E8EC] shrink-0">
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                {suggestedChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(chip)}
                    className="px-2.5 py-1 rounded-[10px] bg-[#F5F5F7] hover:bg-[#101417] hover:text-white text-[#101417] text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer border border-[#E8E8EC]"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Composer Area */}
            <div className="p-3 bg-white border-t border-[#E8E8EC] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything or enter ride details..."
                  className="flex-1 h-10 px-3.5 bg-[#F5F5F7] rounded-[12px] text-[13px] text-[#101417] placeholder:text-[#9EA3A8] focus:outline-none focus:ring-1 focus:ring-[#F43F43] border border-transparent focus:border-[#F43F43]"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-[12px] bg-[#101417] hover:bg-[#F43F43] disabled:opacity-40 disabled:hover:bg-[#101417] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Composer Helper Disclaimer */}
              <p className="text-[10px] text-[#9EA3A8] text-center mt-1.5 leading-tight">
                AI can make mistakes. Quotes are confirmed in writing by dispatch.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}
