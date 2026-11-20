// src/services/concierge.js
// Rule-based mock engine with async signature matching real LLM / assistant API

import { FLEET } from '../data/fleet.js';
import { COMPANY_INFO } from '../data/cities.js';

/**
 * Send a message to the AI Concierge.
 * @param {string} userMessage - The raw message from user.
 * @param {Array} chatHistory - Previous message objects { id, sender, text, card }
 * @returns {Promise<{ replyText: string, card?: { type: 'vehicle' | 'quote' | 'handoff' | 'quick_book', data: any }, suggestedChips?: string[] }>}
 */
export async function sendConciergeMessage(userMessage, chatHistory = []) {
  // Simulate natural LLM response latency
  await new Promise((resolve) => setTimeout(resolve, 650));

  const query = (userMessage || '').toLowerCase();

  // 1. Capacity & Luggage questions: e.g. "5 people and 6 bags", "7 people", "14 passengers"
  if (query.includes('bag') || query.includes('people') || query.includes('passenger') || query.includes('fit') || query.includes('seat')) {
    // Check if high capacity (10+)
    if (query.includes('14') || query.includes('team') || query.includes('conference')) {
      const sprinter = FLEET.find(v => v.id === 'mercedes-jet-sprinter');
      return {
        replyText: "For a group of up to 14 passengers with 14 full-sized bags, our Mercedes-Benz Jet Sprinter Executive Van is the gold standard. It features stand-up 6'4\" headroom, individual leather captain chairs, dual 4K monitors, and an isolated rear luggage bay.",
        card: {
          type: 'vehicle',
          data: sprinter
        },
        suggestedChips: ['Get quote for Jet Sprinter', 'Ask about hourly charter', 'Speak with dispatcher']
      };
    }

    if (query.includes('18') || query.includes('bachelor') || query.includes('prom')) {
      const hummer = FLEET.find(v => v.id === 'hummer-h2-stretch');
      return {
        replyText: "For celebratory parties up to 18 guests, our Hummer H2 Super Stretch Limousine is equipped with triple lounge seating, dual mirrored bars, and club laser lighting. Note: this vehicle accommodates carry-on bags only.",
        card: {
          type: 'vehicle',
          data: hummer
        },
        suggestedChips: ['Reserve Hummer Stretch', 'View Party Buses (20-28 pax)', 'Talk to dispatch']
      };
    }

    if (query.includes('5') || query.includes('6') || query.includes('suv') || query.includes('family')) {
      const escalade = FLEET.find(v => v.id === 'cadillac-escalade-esv');
      return {
        replyText: "For 5 to 6 passengers with 6 pieces of checked luggage, our Cadillac Escalade ESV Platinum or Chevrolet Suburban Premier is ideal. The extended wheelbase provides expansive luggage room behind the 3rd row without sacrificing passenger comfort.",
        card: {
          type: 'vehicle',
          data: escalade
        },
        suggestedChips: ['Book Escalade ESV', 'View Chevrolet Suburban', 'Airport pickup options']
      };
    }

    // Default 1-3 pax sedan
    const sclass = FLEET.find(v => v.id === 'mercedes-s-class');
    return {
      replyText: "For 1 to 3 passengers with up to 3 bags, our Executive Sedans (Cadillac XTS, Mercedes S-Class, BMW i7 Electric) provide whisper-quiet comfort with professional chauffeur gate meet-and-greet.",
      card: {
        type: 'vehicle',
        data: sclass
      },
      suggestedChips: ['Book Mercedes S-Class', 'Book Cadillac XTS ($115)', 'Electric BMW i7']
    };
  }

  // 2. Airport pickup & flight tracking
  if (query.includes('airport') || query.includes('ord') || query.includes('o\'hare') || query.includes('midway') || query.includes('mdw') || query.includes('jfk') || query.includes('flight') || query.includes('terminal')) {
    const xts = FLEET.find(v => v.id === 'cadillac-xts');
    return {
      replyText: "All airport pickups include automatic real-time flight tracking! Whether your flight touches down early or is delayed, our 24/7 Lombard dispatch team adjusts chauffeur staging automatically. You receive 60 minutes complimentary wait time (90 minutes for international customs) and luggage assistance.",
      card: {
        type: 'quote',
        data: {
          title: "Sample Airport Transfer: O'Hare (ORD) to Downtown",
          vehicle: xts,
          baseRate: 115.00,
          tolls: 8.50,
          waitComp: '60 min complimentary',
          gratuity: 'Included in written quote',
          sampleTotal: 145.00,
          notice: 'Written flat quote • No surge pricing • Driver buffer guaranteed'
        }
      },
      suggestedChips: ['Book ORD Pickup', 'Book Midway (MDW)', 'Do you track delays?']
    };
  }

  // 3. Wedding quotes & formal limo
  if (query.includes('wedding') || query.includes('bride') || query.includes('anniversary') || query.includes('ceremony')) {
    const limo = FLEET.find(v => v.id === 'lincoln-mkt-stretch');
    return {
      replyText: "Congratulations! Our wedding limousine service includes formally attired chauffeurs, complimentary chilled champagne flutes on ice, custom fiber-optic starfield ceiling lighting, and a red carpet rollout upon request. We also coordinate multi-vehicle shuttles for bridal parties and guests.",
      card: {
        type: 'vehicle',
        data: limo
      },
      suggestedChips: ['Request Wedding Quote', 'View 24-Pax Limo Bus', 'Call Dispatcher (847-268-2323)']
    };
  }

  // 4. Long distance & Suburbs (Milwaukee, South Bend, Indianapolis)
  if (query.includes('milwaukee') || query.includes('south bend') || query.includes('notre dame') || query.includes('indianapolis') || query.includes('long distance') || query.includes('suburb')) {
    const navigator = FLEET.find(v => v.id === 'lincoln-navigator-l');
    return {
      replyText: "We provide direct, non-stop interstate chauffeured service connecting Lombard and Chicago to Milwaukee, South Bend, Indianapolis, and surrounding suburbs. Enjoy 5G Wi-Fi, massage seating, and zero airport terminal stress with a written flat quote that includes all highway tolls.",
      card: {
        type: 'vehicle',
        data: navigator
      },
      suggestedChips: ['Milwaukee Flat Quote', 'South Bend / Notre Dame', 'Speak with Dispatch']
    };
  }

  // 5. Speak with dispatcher / Phone handoff
  if (query.includes('speak') || query.includes('call') || query.includes('human') || query.includes('dispatcher') || query.includes('phone') || query.includes('agent')) {
    return {
      replyText: `Our 24/7 Lombard dispatch team is always answered by a real person. You can call us directly right now at ${COMPANY_INFO.phoneDisplay} or tap the button below.`,
      card: {
        type: 'handoff',
        data: {
          phone: COMPANY_INFO.phone,
          phoneDisplay: COMPANY_INFO.phoneDisplay,
          address: COMPANY_INFO.address,
          status: '24/7 Live Dispatch On Duty'
        }
      },
      suggestedChips: ['Start a booking instead', 'Check fleet options', 'What are your rates?']
    };
  }

  // 6. Pricing, flat quote, discount questions
  if (query.includes('price') || query.includes('quote') || query.includes('cost') || query.includes('discount') || query.includes('rate') || query.includes('meter')) {
    return {
      replyText: "At Premium Chauffeur Services, pricing is always a fixed, written, all-in quote. Highway tolls, airport access fees, complimentary wait time, and chauffeur gratuity are 100% included upfront. We never use meters, never surge during rain or peak demand, and never invent discounts: you get honest, guaranteed pricing.",
      card: {
        type: 'quote',
        data: {
          title: 'Guaranteed All-Inclusive Fixed Pricing',
          vehicle: FLEET[0],
          baseRate: 115.00,
          sampleTotal: 145.00,
          notice: 'Driver included • Fuel & tolls included • Written guarantee'
        }
      },
      suggestedChips: ['Get fixed quote now', 'Airport rates', 'View entire fleet']
    };
  }

  // Default helpful concierge response
  return {
    replyText: "Welcome to Premium Chauffeur Services. How can I assist you with your journey today? I can help you select the ideal vehicle, estimate an all-inclusive fixed quote, or connect you immediately with our 24/7 Lombard dispatch team.",
    suggestedChips: [
      'Airport pickup (ORD / MDW)',
      'Which vehicle fits 5 people & 6 bags?',
      'Wedding quote',
      'Talk to a dispatcher'
    ]
  };
}
