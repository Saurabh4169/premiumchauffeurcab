// src/services/ai/agent.js
// Conversational AI logic engine, intent routing, knowledge base search, and booking flow simulator.

import { parseNaturalLanguageInput, getNextMissingSlot, getVehicleRecommendation, generateBookingReference } from './bookingFlow.js';
import { searchKnowledgeBase, COMPANY_CONTACT, KNOWLEDGE_TOPICS } from '../../data/knowledge.js';
import { buildSampleQuote } from '../../data/sampleRates.js';
import { FLEET } from '../../data/fleet.js';

export const INITIAL_GREETING = {
  id: 'msg-init-1',
  sender: 'bot',
  text: "Good day. I am your Premium Chauffeur Concierge. How may I assist you today? You can ask me anything about our fleet, luggage capacities, airport flight-tracking policies, or let me book a fixed all-inclusive ride for you.",
  time: 'Just now',
  suggestedChips: [
    'Book a ride',
    'Which vehicle fits 5 people and 6 bags?',
    'Airport pickup (ORD / MDW)',
    'Wedding or event quote',
    'Do you cover Naperville?',
    'Talk to a dispatcher'
  ]
};

/**
 * Context-aware chip generator based on the active screen / item
 */
export function getContextChips(context = {}) {
  const { route = '', item = null } = context;

  if (route.startsWith('/fleet/') && item) {
    return [
      `Book the ${item.name}`,
      `Is the ${item.name} right for 5 people and 6 bags?`,
      `What is included with ${item.name}?`,
      'Talk to a dispatcher'
    ];
  }

  if (route.startsWith('/services/') && item) {
    return [
      `Book ${item.title || 'this service'}`,
      'What is included in the flat rate?',
      'Airport flight tracking policy',
      'Talk to a dispatcher'
    ];
  }

  if (route.startsWith('/trips')) {
    return [
      'Change my booking',
      'Where is my chauffeur?',
      'Cancel an upcoming trip',
      'Book a return trip',
      'Talk to a dispatcher'
    ];
  }

  return [
    'Book a ride',
    'Which vehicle fits 5 people and 6 bags?',
    'Airport pickup (ORD / MDW)',
    'Wedding or event quote',
    'Do you cover Naperville?',
    'Talk to a dispatcher'
  ];
}

/**
 * Checks if a user message is an informational question rather than an immediate booking instruction.
 */
function isInformationalQuestion(text = '', lower = '') {
  // Common question starters
  if (
    lower.startsWith('which') ||
    lower.startsWith('what') ||
    lower.startsWith('how') ||
    lower.startsWith('why') ||
    lower.startsWith('where') ||
    lower.startsWith('who') ||
    lower.startsWith('when') ||
    lower.startsWith('do you') ||
    lower.startsWith('can you') ||
    lower.startsWith('is there') ||
    lower.startsWith('are there') ||
    lower.startsWith('is the') ||
    lower.startsWith('tell me') ||
    lower.startsWith('explain')
  ) {
    return true;
  }

  // Question mark anywhere
  if (text.includes('?')) return true;

  // Well-known FAQ prompt chips
  if (
    lower.includes('which vehicle fits') ||
    lower.includes('do you cover') ||
    lower.includes('airport pickup (ord / mdw)') ||
    lower.includes('wedding or event quote') ||
    lower.includes('how does') ||
    lower.includes('flight tracking') ||
    lower.includes('wait time') ||
    lower.includes('luggage capacity') ||
    lower.includes('cancellation policy') ||
    lower.includes('flat rate') ||
    lower.includes('zero surge') ||
    lower.includes('surge pricing')
  ) {
    return true;
  }

  return false;
}

/**
 * Process an incoming user message and return an accurate response.
 */
export async function processAgentMessage({ text = '', draft = {}, context = {}, trips = [] }) {
  const lower = text.toLowerCase().trim();

  // 0. Check for Return to Main Menu / Fresh Chat
  if (
    lower.includes('main menu') ||
    lower.includes('fresh chat') ||
    lower.includes('new chat') ||
    lower.includes('start fresh') ||
    lower.includes('restart') ||
    lower.includes('start over')
  ) {
    return {
      isReset: true,
      reply: INITIAL_GREETING.text,
      widget: null,
      draftPatch: { inProgress: false },
      suggestedChips: INITIAL_GREETING.suggestedChips
    };
  }

  // 1. Check for human handoff request
  if (
    lower.includes('dispatcher') ||
    lower.includes('human') ||
    lower.includes('call dispatch') ||
    lower.includes('talk to a person') ||
    lower.includes('phone') ||
    lower.includes('contact support')
  ) {
    return {
      reply: `Our Lombard dispatch operations team is available 24/7/365 at ${COMPANY_CONTACT.phone}. You may call directly or request an immediate callback below.`,
      widget: {
        type: 'handoff',
        id: 'handoff-' + Date.now()
      },
      suggestedChips: ['Book a ride', 'View fleet models', 'Pricing questions']
    };
  }

  // 2. Check for trips / change / cancel / where is my chauffeur
  if (
    lower.includes('change my booking') ||
    lower.includes('change booking') ||
    lower.includes('cancel') ||
    lower.includes('where is my chauffeur') ||
    lower.includes('my trip') ||
    lower.includes('my booking')
  ) {
    if (lower.includes('where is my chauffeur')) {
      const activeTrip = trips.find(t => t.status === 'en_route' || t.status === 'assigned') || trips[0];
      if (activeTrip && activeTrip.chauffeur) {
        return {
          reply: `Chauffeur ${activeTrip.chauffeur.name} is assigned to trip #${activeTrip.id}. Current status: ${activeTrip.statusLabel} (${activeTrip.chauffeur.currentLocation || 'En route'}). ETA is approximately ${activeTrip.chauffeur.etaMinutes || 10} minutes.`,
          widget: {
            type: 'trip-list',
            id: 'trips-' + Date.now(),
            trips: [activeTrip]
          },
          suggestedChips: ['Call chauffeur', 'Book a return trip', 'Talk to a dispatcher']
        };
      }
    }

    return {
      reply: "Here are your current bookings. You can view chauffeur assignment, adjust details, or cancel (free up to 2 hours prior to scheduled pickup):",
      widget: {
        type: 'trip-list',
        id: 'trips-' + Date.now(),
        trips: trips.slice(0, 3)
      },
      suggestedChips: ['Book a new ride', 'Talk to a dispatcher']
    };
  }

  // 3. PRIORITY: Handle Informational Questions FIRST (Do NOT hijack into booking!)
  const isQuestion = isInformationalQuestion(text, lower);

  if (isQuestion && !draft.inProgress) {
    // A) Vehicle capacity question (e.g. "Which vehicle fits 5 people and 6 bags?")
    if (lower.includes('5 people') || lower.includes('6 bags') || (lower.includes('fit') && (lower.includes('people') || lower.includes('bag')))) {
      return {
        reply: "For **5 passengers and 6 checked bags**, our **Cadillac Escalade ESV Platinum** or **Chevrolet Suburban Premier** is the ideal choice!\n\n• **Cadillac Escalade ESV Platinum**: Extended wheelbase, comfortably seats up to 6 adults with expansive cargo room for 6+ large suitcases. Features rear executive controls, Wi-Fi, and complimentary bottled water.\n• **Chevrolet Suburban Premier**: Extended wheelbase, seats up to 6 with 6 bags, perfect for families and corporate roadshows.\n• **For 7–14 guests**: Our Mercedes Jet Sprinter accommodates up to 14 passengers and 14 bags.\n\nWould you like to reserve an Escalade ESV or see other fleet options?",
        widget: null,
        suggestedChips: ['Book the Escalade ESV', 'Book the Suburban', 'View Fleet Models', 'Talk to a dispatcher']
      };
    }

    // B) Naperville / Suburbs coverage question
    if (lower.includes('naperville') || lower.includes('suburb') || lower.includes('schaumburg') || lower.includes('oak brook')) {
      return {
        reply: "Yes, absolutely! We provide full door-to-door luxury chauffeur service to and from **Naperville** and throughout all Greater Chicago suburbs (including Schaumburg, Oak Brook, Hinsdale, Evanston, Elmhurst, Highland Park, and Lake Forest).\n\nWhether you need an early-morning airport transfer to O'Hare (ORD) or Midway (MDW), a Loop executive charter, or an evening return, our chauffeurs arrive staged with a 15-minute buffer. Every quote is fixed all-inclusive with zero surge.",
        widget: null,
        suggestedChips: ['Book a ride to/from Naperville', 'Airport pickup (ORD / MDW)', 'Talk to a dispatcher']
      };
    }

    // C) Airport pickup procedures (ORD / MDW / flight tracking / wait time)
    if (lower.includes('airport pickup') || lower.includes('flight tracking') || lower.includes('wait time') || (lower.includes('how') && lower.includes('airport'))) {
      return {
        reply: "Our airport transportation is designed for seamless, stress-free travel:\n\n• **Real-Time Flight Tracking**: We track commercial flights directly. Whether your flight touches down early or delayed, chauffeur staging automatically adjusts.\n• **Complimentary Wait Time**: 60 minutes free wait time on all domestic arrivals; 90 minutes free wait on international flights (post-touchdown).\n• **Curbside or Meet-and-Greet**: Choose curbside pickup at your terminal exit or meet-and-greet in baggage claim with luggage assistance.\n• **Fixed Flat Rates**: Tolls, airport access fees, and chauffeur gratuity are 100% included with zero surge.",
        widget: null,
        suggestedChips: ['Book Airport Ride', 'Which vehicle fits 5 people and 6 bags?', 'Talk to a dispatcher']
      };
    }

    // D) Wedding / Special Event Quote
    if (lower.includes('wedding') || lower.includes('event quote') || lower.includes('bachelor') || lower.includes('prom')) {
      return {
        reply: "Our formal wedding and special event packages include:\n\n• **Fleet Selection**: Lincoln MKT Stretch Limousines (up to 10 guests), Hummer H2 Stretch Lounges (up to 18 guests), and Mercedes Jet Sprinters.\n• **Executive Service**: Formally attired black-tie chauffeurs, red carpet rollout, and chilled champagne flutes.\n• **Coordinated Staging**: Multi-stop itineraries for hotel, church/ceremony, photography, and reception.\n• **All-Inclusive Flat Pricing**: Fixed written quotes with zero overtime or gratuity surprises.",
        widget: null,
        suggestedChips: ['Book Wedding Transportation', 'Compare Fleet Models', 'Talk to a dispatcher']
      };
    }

    // E) Pricing / Flat Rate / Zero Surge / Meter questions
    if (lower.includes('flat rate') || lower.includes('zero surge') || lower.includes('price') || lower.includes('pricing') || lower.includes('meter') || lower.includes('hidden')) {
      return {
        reply: "We operate exclusively on **fixed, written, all-inclusive flat quotes**:\n\n• **Zero Surge Multipliers**: We never apply surge pricing or demand spikes.\n• **No Meters**: You know the exact price before you travel.\n• **All-Inclusive**: Every quote covers highway tolls, airport fees, parking, wait buffers, and a 20% chauffeur gratuity.\n• **Written Guarantee**: All quotes are confirmed in writing by 24/7 Lombard dispatch.",
        widget: null,
        suggestedChips: ['Book a ride', 'Which vehicle fits 5 people and 6 bags?', 'Talk to a dispatcher']
      };
    }

    // F) General Knowledge Base Search
    const kbHit = searchKnowledgeBase(text);
    if (kbHit) {
      return {
        reply: kbHit.answer,
        widget: null,
        suggestedChips: [kbHit.actionChip || 'Book a ride', 'Talk to a dispatcher', 'View Fleet']
      };
    }

    // G) Specific vehicle query (e.g. "Cadillac XTS", "S-Class", "BMW i7")
    const matchedVeh = FLEET.find(v => lower.includes(v.name.toLowerCase()) || lower.includes(v.id.toLowerCase()));
    if (matchedVeh) {
      return {
        reply: `**${matchedVeh.name}** (${matchedVeh.categoryLabel}):\n\n• **Capacity**: ${matchedVeh.passengers} passengers, ${matchedVeh.luggage} bags\n• **Highlights**: ${(matchedVeh.features || []).slice(0, 3).join(', ')}\n• **Best For**: ${matchedVeh.bestFor || 'Executive and airport transfers'}\n\nAll rides include a commercially licensed chauffeur, flight tracking, and complimentary bottled water.`,
        widget: null,
        suggestedChips: [`Book the ${matchedVeh.name}`, 'Compare Fleet', 'Talk to a dispatcher']
      };
    }
  }

  // 4. Extract natural language slots for booking
  const extracted = parseNaturalLanguageInput(text);
  const updatedDraft = { ...draft, ...extracted };

  // Explicit booking triggers only
  const isExplicitBookingIntent =
    lower.startsWith('book') ||
    lower.startsWith('reserve') ||
    lower.startsWith('select ') ||
    lower.includes('i want to book') ||
    lower.includes('need to book') ||
    lower.includes('schedule a ride') ||
    lower.includes('arrange a ride') ||
    Boolean(draft.inProgress) ||
    Boolean(updatedDraft.selectedVehicleId);

  // 5. If booking flow is explicitly triggered or in progress
  if (isExplicitBookingIntent) {
    updatedDraft.inProgress = true;

    // Check next missing slot
    const nextSlot = getNextMissingSlot(updatedDraft);

    if (nextSlot === 'service') {
      return {
        reply: "I would be delighted to arrange your chauffeured journey. Which service best fits your travel plans?",
        widget: {
          type: 'choice-chips',
          id: 'service',
          options: [
            { label: 'Airport Transportation', value: 'airport-transportation' },
            { label: 'Hourly Chauffeur (As-Directed)', value: 'hourly-chauffeur' },
            { label: 'Corporate & Executive', value: 'corporate-executive' },
            { label: 'Suburb & Long Distance', value: 'suburb-long-distance' },
            { label: 'Wedding & Special Occasion', value: 'wedding-limo-rental' },
            { label: 'Concert & Sporting Event', value: 'concert-sporting-events' }
          ]
        },
        draftPatch: updatedDraft,
        suggestedChips: ['Airport Transportation', 'Hourly Chauffeur', 'Corporate & Executive']
      };
    }

    if (nextSlot === 'pickup') {
      return {
        reply: "Where should the chauffeur stage and pick you up?",
        widget: {
          type: 'location-input',
          id: 'pickup',
          placeholder: 'Enter pickup address, hotel, or airport code...'
        },
        draftPatch: updatedDraft,
        suggestedChips: ["O'Hare (ORD)", "Midway (MDW)", "The Langham Chicago", "PCS Lombard HQ"]
      };
    }

    if (nextSlot === 'dropoff') {
      return {
        reply: "Thank you. What is your destination?",
        widget: {
          type: 'location-input',
          id: 'dropoff',
          placeholder: 'Enter destination address, airport terminal, or venue...'
        },
        draftPatch: updatedDraft,
        suggestedChips: ["Downtown Loop, Chicago", "O'Hare (ORD)", "McCormick Place", "Oak Brook"]
      };
    }

    if (nextSlot === 'date') {
      return {
        reply: "What date will you be traveling?",
        widget: {
          type: 'date-picker',
          id: 'date'
        },
        draftPatch: updatedDraft,
        suggestedChips: ['Today', 'Tomorrow', 'This Friday', 'This Saturday']
      };
    }

    if (nextSlot === 'time') {
      return {
        reply: "What time should your chauffeur arrive?",
        widget: {
          type: 'time-picker',
          id: 'time'
        },
        draftPatch: updatedDraft,
        suggestedChips: ['6:00 AM', '9:30 AM', '2:00 PM', '6:30 PM']
      };
    }

    if (nextSlot === 'passengers' || nextSlot === 'luggage') {
      return {
        reply: "How many passengers and luggage items will be traveling?",
        widget: {
          type: 'passenger-stepper',
          id: 'pax-luggage',
          passengers: updatedDraft.passengers || 2,
          luggage: updatedDraft.luggage || 2
        },
        draftPatch: updatedDraft,
        suggestedChips: ['2 guests, 2 bags', '4 guests, 4 bags', '6 guests, 6 bags']
      };
    }

    if (nextSlot === 'vehicle') {
      const recommendation = getVehicleRecommendation(updatedDraft);
      const best = recommendation.bestMatch || recommendation.recommended || FLEET[0];
      const alt = recommendation.alternative || FLEET[1];
      const reasonText = recommendation.reason || `Perfect luxury match for ${updatedDraft.passengers || 2} passengers and ${updatedDraft.luggage || 2} bags.`;

      return {
        reply: `Based on ${updatedDraft.passengers || 2} passengers and ${updatedDraft.luggage || 2} bags, I recommend our **${best.name}**. ${reasonText}`,
        widget: {
          type: 'vehicle-recommendation',
          id: 'vehicle-rec',
          bestMatch: best,
          recommended: best,
          alternative: alt,
          reason: reasonText
        },
        draftPatch: updatedDraft,
        suggestedChips: [
          `Select ${best.name}`,
          `Select ${alt.name}`,
          'View All Fleet'
        ]
      };
    }

    // Vehicle is selected -> present confirmed booking card
    const vehObj = FLEET.find(v => v.id === updatedDraft.selectedVehicleId) || FLEET[0];
    const sampleQuote = buildSampleQuote(vehObj.id, updatedDraft.service);
    const bookingRef = generateBookingReference();

    updatedDraft.inProgress = false;
    updatedDraft.bookingId = bookingRef;
    updatedDraft.calculatedQuote = sampleQuote;

    const confirmedTrip = {
      id: bookingRef,
      status: 'confirmed',
      statusLabel: 'Confirmed · 24/7 Staging Locked',
      type: 'upcoming',
      service: updatedDraft.service === 'airport-transportation' ? 'Airport Transportation' : 'Chauffeured Transfer',
      pickup: updatedDraft.pickup || 'The Langham Chicago (330 N Wabash Ave)',
      dropoff: updatedDraft.dropoff || "O'Hare International Airport (ORD) Terminal 5",
      date: updatedDraft.date || 'Tomorrow',
      time: updatedDraft.time || '10:30 AM',
      passengers: updatedDraft.passengers || 2,
      luggage: updatedDraft.luggage || 2,
      flightNumber: updatedDraft.flightNumber || null,
      vehicleId: vehObj.id,
      vehicleName: vehObj.name,
      vehicleCategory: vehObj.categoryLabel,
      vehiclePlate: 'IL • DISPATCH STAGED',
      source: 'AI Assistant',
      chauffeur: {
        name: 'Assigned 2 hours prior',
        rating: 4.99,
        badge: 'Executive Chauffeur',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        phone: '+1 847-268-2323'
      },
      quote: sampleQuote,
      total: sampleQuote.total
    };

    const formattedTotal = typeof sampleQuote.total === 'number' 
      ? sampleQuote.total.toFixed(2) 
      : String(sampleQuote.total).replace('$', '');

    return {
      reply: `Your booking is confirmed! Reference #${bookingRef} is locked with 24/7 Lombard dispatch.\n\n• Staged Vehicle: ${vehObj.name}\n• Route: ${confirmedTrip.pickup} → ${confirmedTrip.dropoff}\n• Schedule: ${confirmedTrip.date} · ${confirmedTrip.time}\n• All-Inclusive Total: $${formattedTotal} (zero surge, tolls & 20% chauffeur gratuity included)\n\nA written confirmation has been sent to your account.`,
      widget: {
        type: 'confirmation-card',
        id: 'confirm-' + Date.now(),
        bookingRef,
        trip: confirmedTrip,
        quote: sampleQuote
      },
      draftPatch: updatedDraft,
      suggestedChips: ['Return to Main Menu', 'View in My Trips', 'Book a return trip', 'Talk to a dispatcher']
    };
  }

  // 6. Generic or out-of-scope response
  return {
    reply: "Premium Chauffeur Services provides luxury, chauffeur-driven black car and bus transport across Chicago, New York, Miami, Atlanta, and Los Angeles. Every ride features fixed written all-in pricing with zero surge.\n\nHow can I help you today? You can ask about our fleet models, airport flight tracking, or request a ride.",
    widget: null,
    suggestedChips: ['Book a ride', 'Which vehicle fits 5 people and 6 bags?', 'Airport pickup (ORD / MDW)', 'Do you cover Naperville?', 'Talk to a dispatcher']
  };
}
