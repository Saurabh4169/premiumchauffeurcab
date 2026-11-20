// src/pages/dispatch/DispatchMessages.jsx
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  User, 
  Phone, 
  Check, 
  CheckCheck, 
  Car,
  Clock
} from 'lucide-react';
import { DISPATCH_MESSAGES } from '../../data/dispatchData.js';
import Avatar from '../../components/common/Avatar.jsx';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function DispatchMessages() {
  const { showToast } = useApp();
  const [threads, setThreads] = useState(DISPATCH_MESSAGES);
  const [activeThreadId, setActiveThreadId] = useState(threads[0].id);
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newReply = {
      sender: 'dispatch',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          unread: false,
          lastMessage: text,
          lastTime: newReply.time,
          history: [...t.history, newReply]
        };
      }
      return t;
    }));

    setInputText('');
    showToast('Message sent to client device & chauffeur cockpit.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[11px] font-sans tracking-wider uppercase text-[#F43F43] font-bold">
          Unified Client Communications
        </span>
        <h2 className="font-sans text-2xl font-bold text-white">
          Client Messaging & AI Reply Assist
        </h2>
        <p className="text-[13px] text-white/50">
          Direct SMS/In-App chat between clients, Lombard 24/7 dispatch, and en-route chauffeurs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[72vh]">
        {/* Left: Message Threads List (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-4 border border-white/10 flex flex-col overflow-hidden">
          <span className="text-[11px] font-sans font-bold uppercase text-white/40 mb-3 px-1 block">
            Conversations ({threads.length})
          </span>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {threads.map((thread) => {
              const isSelected = thread.id === activeThread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unread: false } : t));
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'glass-panel-gold border-[#F43F43] ring-1 ring-[#F43F43]'
                      : 'bg-white/5 border-white/8 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-sans font-bold text-[14px] text-white truncate">
                      {thread.clientName}
                    </h4>
                    <span className="text-[10px] font-sans text-white/40">{thread.lastTime}</span>
                  </div>

                  <p className="text-[12px] text-white/60 line-clamp-1">
                    {thread.lastMessage}
                  </p>

                  <div className="pt-2 border-t border-white/8 mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-sans text-white/40">{thread.tripId}</span>
                    {thread.unread && (
                      <span className="px-2 py-0.5 rounded-full bg-[#c8102e] text-white text-[10px] font-bold">
                        Unread
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Conversation & AI Quick Replies (8 cols) */}
        <div className="lg:col-span-8 glass-panel-elevated rounded-3xl p-5 border border-[#F43F43]/40 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Thread Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-sans text-lg font-bold text-white">
                  {activeThread.clientName}
                </h3>
                <Badge variant="gold" size="sm">{activeThread.tripId}</Badge>
              </div>
              <p className="text-[12px] text-white/50">{activeThread.clientPhone}</p>
            </div>

            <a
              href={`tel:${activeThread.clientPhone}`}
              className="btn-glass-secondary px-3 py-1.5 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 text-white"
            >
              <Phone className="w-3.5 h-3.5 text-[#F43F43]" />
              <span>Call Client</span>
            </a>
          </div>

          {/* Messages History */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 px-1">
            {activeThread.history.map((msg, idx) => {
              const isDispatch = msg.sender === 'dispatch';
              return (
                <div key={idx} className={`flex ${isDispatch ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-lg ${
                    isDispatch
                      ? 'bg-gradient-to-r from-[#4a1624] to-[#101417] text-white border border-[#F43F43]/40 rounded-tr-sm'
                      : 'bg-white/10 text-[#faf6f0] border border-white/10 rounded-tl-sm'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[10px] text-white/40 mt-1 block text-right font-sans">
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI-Suggested Quick Reply Chips */}
          {activeThread.suggestedAiReplies && activeThread.suggestedAiReplies.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#F43F43] mb-1.5 px-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Dispatch Suggested Responses (One-Click)</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {activeThread.suggestedAiReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-1.5 rounded-xl bg-[#F43F43]/15 hover:bg-[#F43F43]/25 border border-[#F43F43]/30 text-[11px] text-[#FDEEEA] text-left transition-all cursor-pointer shrink-0 max-w-[280px] truncate"
                    title={reply}
                  >
                    "{reply}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reply Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="pt-3 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type dispatcher reply or instructions..."
              className="flex-1 h-12 rounded-2xl px-4 bg-white/5 border border-white/15 text-[13px] text-white placeholder:text-white/35 outline-none focus:border-[#F43F43]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="btn-primary px-5 h-12 rounded-full flex items-center justify-center text-white font-semibold disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
