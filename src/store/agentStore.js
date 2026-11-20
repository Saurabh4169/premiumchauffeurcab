// src/store/agentStore.js
// Global Zustand store for Floating AI Assistant & full-screen Concierge.

import { create } from 'zustand';
import { INITIAL_GREETING, getContextChips, processAgentMessage } from '../services/ai/agent.js';
import { generateBookingReference } from '../services/ai/bookingFlow.js';
import { FLEET } from '../data/fleet.js';

const INITIAL_DRAFT = {
  service: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  passengers: 2,
  luggage: 2,
  flightNumber: '',
  flightLater: false,
  selectedVehicleId: '',
  inProgress: false,
  calculatedQuote: null,
  bookingId: null
};

export const useAgentStore = create((set, get) => ({
  isOpen: false,
  isThinking: false,
  unreadRepliesCount: 0,
  activeContext: { route: '/', item: null },
  suggestedChips: INITIAL_GREETING.suggestedChips,
  draft: { ...INITIAL_DRAFT },
  messages: [INITIAL_GREETING],

  // Persisted FAB position
  fabPosition: (() => {
    try {
      const saved = localStorage.getItem('pcs_agent_fab_position');
      return saved ? JSON.parse(saved) : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  })(),

  // Open count for first-3-opens tooltip & pulse
  fabOpenCount: (() => {
    try {
      const count = parseInt(localStorage.getItem('pcs_agent_open_count') || '0', 10);
      return isNaN(count) ? 0 : count;
    } catch {
      return 0;
    }
  })(),

  incrementOpenCount: () => {
    const current = get().fabOpenCount;
    const next = current + 1;
    try {
      localStorage.setItem('pcs_agent_open_count', String(next));
    } catch {}
    set({ fabOpenCount: next });
  },

  setFabPosition: (pos) => {
    try {
      localStorage.setItem('pcs_agent_fab_position', JSON.stringify(pos));
    } catch {}
    set({ fabPosition: pos });
  },

  resetFabPosition: () => {
    try {
      localStorage.removeItem('pcs_agent_fab_position');
    } catch {}
    set({ fabPosition: { x: 0, y: 0 } });
  },

  openAgent: ({ prefill = '', context = null, initialMessage = null } = {}) => {
    get().incrementOpenCount();
    const updates = { isOpen: true, unreadRepliesCount: 0 };

    if (context) {
      updates.activeContext = context;
      updates.suggestedChips = getContextChips(context);
    }

    set(updates);

    if (prefill) {
      get().sendMessage(prefill);
    } else if (initialMessage) {
      set(prev => ({ messages: [...prev.messages, initialMessage] }));
    }
  },

  closeAgent: () => {
    set({ isOpen: false });
  },

  toggleAgent: () => {
    const { isOpen } = get();
    if (isOpen) {
      get().closeAgent();
    } else {
      get().openAgent();
    }
  },

  resetChat: () => {
    set({
      messages: [{ ...INITIAL_GREETING, id: 'msg-' + Date.now() }],
      draft: { ...INITIAL_DRAFT },
      suggestedChips: INITIAL_GREETING.suggestedChips,
      isThinking: false
    });
  },

  applyDraftPatch: (patch) => {
    set(state => ({
      draft: { ...state.draft, ...patch }
    }));
  },

  sendMessage: async (text, tripsContext = []) => {
    if (!text || !text.trim()) return;

    const userText = text.trim();
    const lower = userText.toLowerCase();

    // Check for explicit fresh chat / return to main menu command
    if (
      lower.includes('main menu') ||
      lower.includes('fresh chat') ||
      lower.includes('new chat') ||
      lower.includes('start fresh') ||
      lower.includes('restart') ||
      lower.includes('start over')
    ) {
      get().resetChat();
      return;
    }

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set(state => ({
      messages: [...state.messages, userMsg],
      isThinking: true
    }));

    try {
      // Realistic typing / thinking delay (600ms)
      await new Promise(r => setTimeout(r, 600));

      const currentState = get();
      const response = await processAgentMessage({
        text: userText,
        draft: currentState.draft,
        context: currentState.activeContext,
        trips: tripsContext
      });

      if (response.isReset) {
        get().resetChat();
        return;
      }

      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: response.reply,
        widget: response.widget || null,
        widgetAnswered: false,
        answeredValue: null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      set(state => ({
        messages: [...state.messages, botMsg],
        isThinking: false,
        draft: response.draftPatch ? { ...state.draft, ...response.draftPatch } : state.draft,
        suggestedChips: response.suggestedChips || state.suggestedChips,
        unreadRepliesCount: !state.isOpen ? state.unreadRepliesCount + 1 : 0
      }));
    } catch (err) {
      console.error('Agent message processing error:', err);
      set(state => ({
        isThinking: false,
        messages: [
          ...state.messages,
          {
            id: 'bot-err-' + Date.now(),
            sender: 'bot',
            text: "I am ready with your vehicle recommendation. Please select your preferred luxury model below or choose an option:",
            widget: null,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
    } finally {
      set({ isThinking: false });
    }
  },

  handleWidgetAnswer: async (widgetId, slotKey, value, tripsContext = []) => {
    // 1. Prepare draft patch
    const draftPatch = { [slotKey]: value, inProgress: true };
    if (slotKey === 'vehicle') {
      draftPatch.selectedVehicleId = value;
      draftPatch.vehicle = value;
    } else if (slotKey === 'capacity' && typeof value === 'object') {
      draftPatch.passengers = value.passengers;
      draftPatch.luggage = value.luggage;
    }

    // 2. Mark widget as answered in message history and update draft
    set(state => ({
      messages: state.messages.map(msg => {
        if (msg.widget && msg.widget.id === widgetId) {
          return { ...msg, widgetAnswered: true, answeredValue: value };
        }
        return msg;
      }),
      draft: { ...state.draft, ...draftPatch }
    }));

    // 3. Synthesize follow-up user confirmation
    let userText = String(value);
    if (slotKey === 'service') {
      const labels = {
        'airport-transportation': 'Airport Transportation',
        'hourly-chauffeur': 'Hourly Chauffeur',
        'corporate-executive': 'Corporate & Executive',
        'suburb-long-distance': 'Suburb & Long Distance',
        'wedding-limo-rental': 'Wedding Limo',
        'concert-sporting-events': 'Concert & Sporting'
      };
      userText = labels[value] || value;
    } else if (slotKey === 'vehicle') {
      const v = FLEET.find(f => f.id === value);
      userText = v ? `Selected ${v.name}` : value;
    } else if (typeof value === 'object' && value.passengers !== undefined) {
      userText = `${value.passengers} passengers, ${value.luggage} bags`;
    }

    // 4. Process turn with updated draft
    await get().sendMessage(userText, tripsContext);
  },

  reopenWidget: (widgetId) => {
    set(state => ({
      messages: state.messages.map(msg => {
        if (msg.widget && msg.widget.id === widgetId) {
          return { ...msg, widgetAnswered: false };
        }
        return msg;
      })
    }));
  },

  confirmBooking: (finalizeTripCallback) => {
    const bookingRef = generateBookingReference();
    const { draft } = get();
    const veh = FLEET.find(v => v.id === draft.selectedVehicleId) || FLEET[0];

    const confirmedTrip = {
      id: bookingRef,
      status: 'confirmed',
      statusLabel: 'Requested · Written Quote on Way',
      type: 'upcoming',
      service: draft.service === 'airport-transportation' ? 'Airport Transportation' : 'Chauffeured Transfer',
      pickup: draft.pickup || 'To be specified',
      dropoff: draft.dropoff || 'To be specified',
      date: draft.date || 'Upcoming',
      time: draft.time || 'Scheduled',
      passengers: draft.passengers || 2,
      luggage: draft.luggage || 2,
      flightNumber: draft.flightNumber || null,
      vehicleId: veh.id,
      vehicleName: veh.name,
      vehicleCategory: veh.categoryLabel,
      vehiclePlate: 'IL • DISPATCH STAGED',
      source: 'AI Assistant',
      chauffeur: {
        name: 'Assigned 2 hours prior',
        rating: 4.99,
        badge: 'Executive Chauffeur',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        phone: '+1 847-268-2323'
      },
      quote: draft.calculatedQuote || { total: '185.00' }
    };

    if (finalizeTripCallback) {
      finalizeTripCallback(confirmedTrip);
    }

    set(state => ({
      draft: { ...state.draft, bookingId: bookingRef },
      suggestedChips: ['Return to Main Menu', 'View in My Trips', 'Book a return trip', 'Talk to a dispatcher'],
      messages: [
        ...state.messages,
        {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: `Your booking is confirmed! Reference #${bookingRef} is locked with 24/7 Lombard dispatch. Chauffeur staging is confirmed for your ${veh.name}.`,
          widget: {
            type: 'confirmation-card',
            id: 'confirm-' + Date.now(),
            bookingRef,
            trip: confirmedTrip
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  }
}));
