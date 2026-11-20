// src/pages/ConciergePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Phone, Bot, ArrowRight, CornerDownLeft } from 'lucide-react';
import AppHeader from '../components/AppHeader.jsx';
import ChatBubble from '../components/common/ChatBubble.jsx';
import { sendConciergeMessage } from '../services/concierge.js';
import { useApp } from '../context/AppContext.jsx';

export default function ConciergePage() {
  const { companyInfo } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Good day. I am your Premium Chauffeur AI Butler. How may I orchestrate your chauffeured journey today? Ask me about airport flight tracking, vehicle capacity for your delegation, or request an all-inclusive fixed written quote.",
      time: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedChips, setSuggestedChips] = useState([
    'Airport pickup (ORD / MDW)',
    'Which vehicle fits 5 people and 6 bags?',
    'Wedding quote',
    'Talk to a dispatcher'
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (messageText = null) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendConciergeMessage(textToSend, messages);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.replyText,
        card: response.card,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      if (response.suggestedChips && response.suggestedChips.length > 0) {
        setSuggestedChips(response.suggestedChips);
      }
    } catch {
      // fallback
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between pb-28 bg-[#f8f9fb]">
      {/* Header */}
      <AppHeader title="AI Concierge Butler" showBack />

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
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-[#6B7075] text-[12px] p-2.5 bg-white border border-[#E8E8EC] rounded-[14px] w-fit shadow-xs">
            <Bot className="w-4 h-4 text-[#F43F43] animate-spin" />
            <span className="italic">Butler is reviewing fleet schedules & rates...</span>
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
              className="h-[34px] px-3.5 rounded-full bg-white hover:bg-[var(--accent-tint)] hover:border-[#F43F43] border border-[#E8E8EC] text-[13px] text-[#101417] transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 font-semibold shadow-xs"
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
          className="relative flex items-center h-12 rounded-[14px] px-3.5 bg-[#F5F5F7] border border-[#E8E8EC] focus-within:border-[var(--accent)] focus-within:bg-white transition-all"
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
            className="w-9 h-9 rounded-[10px] btn-primary flex items-center justify-center text-[#101417] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 ml-2 shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
