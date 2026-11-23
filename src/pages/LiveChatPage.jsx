// src/pages/LiveChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Sparkles, 
  Star, 
  CheckCheck, 
  Check, 
  Bot, 
  ShieldCheck, 
  Clock, 
  FileText,
  AlertCircle,
  Image as ImageIcon,
  X,
  Bell
} from 'lucide-react';
import { sendLiveChatMessage, getRandomDispatcher } from '../services/liveChat.js';
import { useApp } from '../context/AppContext.jsx';
import { usePortalContainer } from '../hooks/usePortalContainer.js';
import { useAgentStore } from '../store/agentStore.js';

const TOPIC_CHIPS = [
  'Airport pickup',
  'Booking change',
  'Quote',
  'Billing and invoice',
  'Lost item',
  'Something else'
];

export default function LiveChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get('ref');

  const { companyInfo, showToast, unreadNotificationsCount } = useApp();
  const { openAgent } = useAgentStore();
  const portalContainer = usePortalContainer();

  const [activeTopic, setActiveTopic] = useState(refParam ? `Inquiry regarding ${refParam}` : '');
  const [hasStarted, setHasStarted] = useState(!!refParam);
  const [activeDispatcher, setActiveDispatcher] = useState(getRandomDispatcher());
  const [messages, setMessages] = useState([
    {
      id: 'sys-1',
      sender: 'system',
      text: 'Dispatch coordinator joined the secure chat session.',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingChips, setRatingChips] = useState([]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Start chat with pre-selected topic or query reference
  useEffect(() => {
    if (refParam) {
      handleUserSend(`Hello dispatch, I would like to check on request ${refParam}.`);
    }
  }, [refParam]);

  const handleSelectTopic = (topic) => {
    setActiveTopic(topic);
    setHasStarted(true);
    handleUserSend(`Hi, I need assistance with: ${topic}`);
  };

  const handleUserSend = async (customText = null) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const newMsg = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setQuickReplies([]);

    // Update status to Delivered after 400ms
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMsgId ? { ...m, status: 'Delivered' } : m));
    }, 400);

    // Update status to Read after 800ms and show typing
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMsgId ? { ...m, status: 'Read' } : m));
      setIsTyping(true);
    }, 800);

    try {
      const response = await sendLiveChatMessage(
        'chat-session', 
        textToSend, 
        activeTopic, 
        { ref: refParam }
      );

      setIsTyping(false);

      const agentMsg = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agent: response.agent,
        text: response.replyText,
        card: response.card,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setActiveDispatcher(response.agent);
      setMessages(prev => [...prev, agentMsg]);
      if (response.quickReplies && response.quickReplies.length > 0) {
        setQuickReplies(response.quickReplies);
      }
    } catch {
      setIsTyping(false);
    }
  };

  const handleEndChat = () => {
    setShowMenu(false);
    setShowRatingModal(true);
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-white relative">
      {/* HEADER (Sticky 64px high) */}
      <div className="sticky top-0 z-30 h-[64px] px-4 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 transition-colors cursor-pointer shadow-xs active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Team avatar with green online dot */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
            <img
              src={activeDispatcher.avatar}
              alt="Dispatch Team"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold text-slate-900 leading-tight truncate">
              Dispatch team
            </h2>
            <p className="text-[11px] text-slate-500 truncate leading-tight">
              Online 24/7 · Lombard, IL
            </p>
          </div>
        </div>

        {/* Right Icons: Call, Notification, and More Menu */}
        <div className="flex items-center gap-1.5 shrink-0 relative">
          <a
            href={`tel:${companyInfo.phone}`}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs active:scale-95"
            title="Call Dispatch"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => navigate('/notifications')}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs relative active:scale-95"
            title="Dispatch Alerts"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F43F43] ring-1.5 ring-white" />
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer active:scale-95"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 text-[12px] z-50">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    showToast('Transcript will be emailed upon session close', 'success');
                  }}
                  className="w-full p-2.5 rounded-xl text-left hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                >
                  Email transcript
                </button>
                <button
                  type="button"
                  onClick={handleEndChat}
                  className="w-full p-2.5 rounded-xl text-left hover:bg-red-50 text-red-600 font-bold cursor-pointer"
                >
                  End chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slim Info Bar */}
      <div className="px-4 py-2 bg-[#101417] text-white text-[11px] flex items-center justify-between">
        <span>Urgent pickup in next 2 hours?</span>
        <div className="flex items-center gap-3">
          <a
            href="tel:+18472682323"
            className="text-white font-bold hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3 fill-current text-white" />
            <span>Call dispatch</span>
          </a>
          <span className="text-white/30">|</span>
          <button
            type="button"
            onClick={() => openAgent({ context: { route: '/support/chat' } })}
            className="text-white/80 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#F43F43]" />
            <span>AI Butler</span>
          </button>
        </div>
      </div>

      {/* Pre-chat Topic Picker (if not started) */}
      {!hasStarted && (
        <div className="p-5 my-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#F43F43] flex items-center justify-center mx-auto shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-[20px] text-slate-900">
              How can we help?
            </h3>
            <p className="text-[13px] text-slate-500 max-w-[280px] mx-auto mt-1 leading-relaxed">
              Select an inquiry topic below to connect directly with an active Lombard dispatcher.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 max-w-[320px] mx-auto pt-2">
            {TOPIC_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSelectTopic(chip)}
                className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#F43F43] hover:text-[#F43F43] text-[12px] font-bold text-slate-800 shadow-xs transition-all cursor-pointer text-center"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* THREAD CONTAINER */}
      {hasStarted && (
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3.5">
          {/* Date separator */}
          <div className="flex items-center justify-center my-2">
            <span className="px-3 py-1 rounded-full bg-slate-200/60 text-[10px] font-sans text-slate-500 uppercase tracking-wider">
              Today · Lombard Dispatch Live
            </span>
          </div>

          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="text-center my-1">
                  <span className="text-[11px] text-slate-400 font-medium">
                    — {msg.text} —
                  </span>
                </div>
              );
            }

            if (msg.sender === 'agent') {
              return (
                <div key={msg.id} className="flex gap-2.5 items-start max-w-[85%]">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-900 shrink-0 mt-4 border border-slate-200">
                    <img
                      src={msg.agent?.avatar || activeDispatcher.avatar}
                      alt={msg.agent?.name || 'Dispatch'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 ml-1 block mb-0.5">
                      {msg.agent?.name ? `${msg.agent.name.split(' ')[0]}, Dispatch` : 'Dispatch'}
                    </span>

                    <div className="p-3.5 rounded-2xl rounded-tl-sm bg-white border border-slate-200/90 shadow-sm text-[13px] text-slate-800 leading-relaxed">
                      <p>{msg.text}</p>
                    </div>

                    {msg.card && (
                      <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[12px] space-y-1">
                        <span className="font-bold text-emerald-800 block">
                          {msg.card.title}
                        </span>
                        <p className="text-emerald-700">{msg.card.details}</p>
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 ml-1 mt-0.5 block">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            }

            // User message
            return (
              <div key={msg.id} className="flex flex-col items-end max-w-[85%] ml-auto">
                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-[#120F11] text-white shadow-sm text-[13px] leading-relaxed">
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 mr-1 text-[10px] text-slate-400 font-sans">
                  <span>{msg.time}</span>
                  {msg.status === 'Read' ? (
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  ) : msg.status === 'Delivered' ? (
                    <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-[12px] p-2 bg-white rounded-2xl border border-slate-200 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#BE8A44] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#BE8A44] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#BE8A44] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-medium ml-1">Dispatch is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* SMART QUICK REPLIES */}
      {quickReplies.length > 0 && (
        <div className="px-4 py-2 bg-white/90 border-t border-slate-100">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleUserSend(reply)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#BE8A44]/20 border border-slate-200 text-[11px] font-bold text-slate-800 transition-colors whitespace-nowrap cursor-pointer shrink-0"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* COMPOSER (48px input, 40px send button) - Tab bar hidden */}
      <div className="p-3 bg-white border-t border-[#E2E2E2]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSend();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => showToast('Image attachment tool opened', 'success')}
            className="w-10 h-10 rounded-[12px] bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type message to Lombard dispatch..."
            className="flex-1 h-12 rounded-[14px] bg-slate-50 border border-slate-200 px-3.5 text-[14px] text-slate-900 outline-none focus:border-[#F43F43] focus:bg-white transition-all font-medium"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-[12px] bg-gradient-to-r from-[#F43F43] to-[#DC2626] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            aria-label="Send"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>

      {/* RATING & FEEDBACK MODAL (Rendered inside #app-overlay-root) */}
      {showRatingModal && portalContainer && createPortal(
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-[340px] w-full text-center space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-sans font-bold text-[18px] text-slate-900">
              Rate Dispatch Support
            </h3>
            <p className="text-[12.5px] text-slate-500 leading-relaxed">
              How did {activeDispatcher.name} handle your transportation request?
            </p>

            {/* Star Rating */}
            <div className="flex justify-center items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRatingStars(s)}
                  className="cursor-pointer"
                >
                  <Star className={`w-7 h-7 ${s <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>

            {/* Comment Chips */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['Helpful', 'Fast', 'Friendly', 'Not resolved'].map((chip) => {
                const isSelected = ratingChips.includes(chip);
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setRatingChips(prev => isSelected ? prev.filter(c => c !== chip) : [...prev, chip]);
                    }}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#120F11] text-white border-[#120F11]' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowRatingModal(false);
                  showToast('Thank you! Dispatch transcript has been emailed to you.', 'gold');
                  navigate('/profile');
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#BE8A44] via-[#BE8A44] to-[#A97633] text-slate-950 font-bold text-[13px] shadow-md shadow-[#BE8A44]/20 cursor-pointer"
              >
                Submit & Email Transcript
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRatingModal(false);
                  navigate('/profile');
                }}
                className="w-full py-2 text-[12px] text-slate-400 font-medium hover:text-slate-700 cursor-pointer"
              >
                Close without transcript
              </button>
            </div>
          </div>
        </div>,
        portalContainer
      )}
    </div>
  );
}
