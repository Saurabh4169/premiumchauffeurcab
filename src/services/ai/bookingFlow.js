// src/services/ai/bookingFlow.js
// Slot filling, natural language parsing, and vehicle recommendation engine.

import { FLEET } from '../../data/fleet.js';
import { buildSampleQuote } from '../../data/sampleRates.js';

export const KNOWN_LOCATIONS = [
  { name: "O'Hare International Airport (ORD)", keywords: ['o\'hare', 'ord', 'ohare'] },
  { name: "Midway International Airport (MDW)", keywords: ['midway', 'mdw'] },
  { name: "The Langham Chicago (330 N Wabash Ave)", keywords: ['langham', '330 n wabash'] },
  { name: "Downtown Loop, Chicago", keywords: ['loop', 'downtown chicago', 'downtown loop'] },
  { name: "McCormick Place Convention Center", keywords: ['mccormick', 'mccormick place'] },
  { name: "United Center", keywords: ['united center'] },
  { name: "Soldier Field", keywords: ['soldier field'] },
  { name: "Navy Pier", keywords: ['navy pier'] },
  { name: "PCS Headquarters (55 W 22nd St, Lombard, IL)", keywords: ['lombard', 'pcs hq', 'headquarters'] },
  { name: "Naperville Downtown Riverwalk", keywords: ['naperville'] },
  { name: "Oak Brook Promenade & Polo Club", keywords: ['oak brook', 'polo club'] },
  { name: "Schaumburg Corporate Center", keywords: ['schaumburg'] },
  { name: "John F. Kennedy International Airport (JFK)", keywords: ['jfk'] },
  { name: "LaGuardia Airport (LGA)", keywords: ['laguardia', 'lga'] },
  { name: "Newark Liberty International Airport (EWR)", keywords: ['newark', 'ewr'] },
  { name: "Miami International Airport (MIA)", keywords: ['mia', 'miami airport'] },
  { name: "Fort Lauderdale-Hollywood Int Airport (FLL)", keywords: ['fll', 'fort lauderdale'] },
  { name: "Hartsfield-Jackson Atlanta Int Airport (ATL)", keywords: ['atl', 'atlanta airport'] },
  { name: "Los Angeles International Airport (LAX)", keywords: ['lax'] },
  { name: "Hollywood Burbank Airport (BUR)", keywords: ['burbank', 'bur'] }
];

/**
 * Natural language intent and slot parser.
 * Extracts passengers, dates, times, airports, landmarks, and service types.
 * @param {string} text
 * @returns {object} extracted slot patch
 */
export function parseNaturalLanguageInput(text = '') {
  const patch = {};
  const lower = text.toLowerCase();

  // 1. Passenger parsing
  // Matches "6 people", "6 pax", "6 guests", "party of 6", "for 4", "6 passengers"
  const paxMatch = lower.match(/(?:for\s+|party\s+of\s+)?(\d{1,2})\s*(?:people|pax|guests|passengers|persons)/i) ||
                   lower.match(/(\d{1,2})\s*(?:pax|people|guests)/i);
  if (paxMatch) {
    const num = parseInt(paxMatch[1], 10);
    if (num >= 1 && num <= 56) patch.passengers = num;
  }

  // 2. Luggage parsing
  // Matches "6 bags", "4 suitcases", "3 luggage"
  const bagMatch = lower.match(/(\d{1,2})\s*(?:bags|bag|suitcases|suitcase|pieces\s+of\s+luggage|luggage)/i);
  if (bagMatch) {
    patch.luggage = parseInt(bagMatch[1], 10);
  }

  // 3. Date parsing
  const today = new Date();
  if (lower.includes('today') || lower.includes('tonight')) {
    patch.date = today.toISOString().split('T')[0];
  } else if (lower.includes('tomorrow')) {
    const tomorrow = new Date(today.getTime() + 86400000);
    patch.date = tomorrow.toISOString().split('T')[0];
  } else {
    // Check weekday names (e.g. "on friday", "this saturday", "next monday")
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (let i = 0; i < weekdays.length; i++) {
      if (lower.includes(weekdays[i])) {
        const currentDay = today.getDay();
        let daysToAdd = (i - currentDay + 7) % 7;
        if (daysToAdd === 0) daysToAdd = 7; // assume next upcoming
        const targetDate = new Date(today.getTime() + daysToAdd * 86400000);
        patch.date = targetDate.toISOString().split('T')[0];
        break;
      }
    }
  }

  // 4. Time parsing
  // Matches "5 a.m.", "5am", "5:30 am", "17:00", "6pm", "6:30 p.m.", "at 10:15"
  const timeMatch = lower.match(/(\b\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)/i) ||
                    lower.match(/at\s+(\d{1,2})(?::(\d{2}))?\b/i);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10);
    const minute = timeMatch[2] ? timeMatch[2].padStart(2, '0') : '00';
    let ampm = (timeMatch[3] || '').replace(/\./g, '').toLowerCase();

    if (!ampm) {
      ampm = (hour >= 8 && hour < 12) ? 'am' : (hour === 12 || hour < 8 ? 'pm' : 'pm');
    }

    if (ampm === 'pm' && hour < 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;

    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const finalAmPm = hour >= 12 ? 'PM' : 'AM';
    patch.time = `${String(displayHour).padStart(2, '0')}:${minute} ${finalAmPm}`;
  }

  // 5. Locations matching
  const matchedLocations = [];
  for (const loc of KNOWN_LOCATIONS) {
    if (loc.keywords.some(kw => lower.includes(kw))) {
      matchedLocations.push(loc.name);
    }
  }

  if (matchedLocations.length === 1) {
    // If text says "to [location]" or "from [location]"
    const toMatch = lower.match(/(?:to|dropoff|drop\s+off|dest)\s+([a-z0-9'\s]+)/i);
    const fromMatch = lower.match(/(?:from|pickup|pick\s+up)\s+([a-z0-9'\s]+)/i);

    if (toMatch && matchedLocations.some(l => l.toLowerCase().includes(toMatch[1].trim()))) {
      patch.dropoff = matchedLocations[0];
    } else if (fromMatch && matchedLocations.some(l => l.toLowerCase().includes(fromMatch[1].trim()))) {
      patch.pickup = matchedLocations[0];
    } else {
      // If it mentions an airport alone, usually pickup for arrivals or default pickup
      if (lower.includes('o\'hare') || lower.includes('ord') || lower.includes('midway') || lower.includes('mdw')) {
        patch.pickup = matchedLocations[0];
        patch.service = 'airport-transportation';
      } else {
        patch.dropoff = matchedLocations[0];
      }
    }
  } else if (matchedLocations.length >= 2) {
    // Determine order: "from A to B"
    const firstLoc = matchedLocations[0];
    const secondLoc = matchedLocations[1];
    const idx1 = lower.indexOf(firstLoc.split(' ')[0].toLowerCase());
    const idx2 = lower.indexOf(secondLoc.split(' ')[0].toLowerCase());

    if (idx1 !== -1 && idx2 !== -1) {
      if (idx1 < idx2) {
        patch.pickup = firstLoc;
        patch.dropoff = secondLoc;
      } else {
        patch.pickup = secondLoc;
        patch.dropoff = firstLoc;
      }
    }
  }

  // 6. Service type matching
  if (lower.includes('airport') || lower.includes('flight') || lower.includes('terminal') || lower.includes('ord') || lower.includes('mdw')) {
    patch.service = 'airport-transportation';
  } else if (lower.includes('hourly') || lower.includes('as directed') || lower.includes('charter')) {
    patch.service = 'hourly-chauffeur';
  } else if (lower.includes('wedding') || lower.includes('bride') || lower.includes('groom')) {
    patch.service = 'wedding-limo-rental';
  } else if (lower.includes('corporate') || lower.includes('business') || lower.includes('meeting') || lower.includes('roadshow')) {
    patch.service = 'corporate-executive';
  }

  // 7. Vehicle selection matching
  if (lower.includes('cadillac xts') || lower.includes('xts')) {
    patch.selectedVehicleId = 'cadillac-xts';
    patch.vehicle = 'cadillac-xts';
  } else if (lower.includes('escalade') || lower.includes('cadillac escalade')) {
    patch.selectedVehicleId = 'cadillac-escalade-esv';
    patch.vehicle = 'cadillac-escalade-esv';
  } else if (lower.includes('s-class') || lower.includes('s580') || lower.includes('mercedes s')) {
    patch.selectedVehicleId = 'mercedes-s-class';
    patch.vehicle = 'mercedes-s-class';
  } else if (lower.includes('bmw') || lower.includes('i7')) {
    patch.selectedVehicleId = 'bmw-i7';
    patch.vehicle = 'bmw-i7';
  } else if (lower.includes('suburban') || lower.includes('chevrolet suburban')) {
    patch.selectedVehicleId = 'chevrolet-suburban';
    patch.vehicle = 'chevrolet-suburban';
  } else if (lower.includes('navigator') || lower.includes('lincoln navigator')) {
    patch.selectedVehicleId = 'lincoln-navigator-l';
    patch.vehicle = 'lincoln-navigator-l';
  } else if (lower.includes('sprinter') || lower.includes('jet sprinter')) {
    patch.selectedVehicleId = 'mercedes-jet-sprinter';
    patch.vehicle = 'mercedes-jet-sprinter';
  } else if (lower.includes('mkt') || lower.includes('stretch')) {
    patch.selectedVehicleId = 'lincoln-mkt-stretch';
    patch.vehicle = 'lincoln-mkt-stretch';
  } else if (lower.includes('hummer')) {
    patch.selectedVehicleId = 'hummer-h2-stretch';
    patch.vehicle = 'hummer-h2-stretch';
  } else if (lower.includes('party bus') || lower.includes('coach') || lower.includes('bus')) {
    patch.selectedVehicleId = 'party-bus-20';
    patch.vehicle = 'party-bus-20';
  }

  return patch;
}

/**
 * Determine the next missing slot to collect.
 * @param {object} draft
 * @returns {string|null} slot name or null if all required slots filled
 */
export function getNextMissingSlot(draft = {}) {
  if (!draft.service) return 'service';
  if (!draft.pickup) return 'pickup';
  if (!draft.dropoff) return 'dropoff';
  if (!draft.date) return 'date';
  if (!draft.time) return 'time';
  if (!draft.passengers) return 'passengers';
  if (draft.luggage === undefined || draft.luggage === null) return 'luggage';
  if (!draft.selectedVehicleId && !draft.vehicle) return 'vehicle';
  return null;
}

/**
 * Recommend vehicle based on passengers, luggage, and occasion.
 * Implements strict business rules:
 * - <=3 pax & <=3 bags -> Sedan
 * - <=6 pax & <=6 bags -> Luxury SUV
 * - 7-10 pax -> Lincoln MKT Stretch
 * - <=14 pax -> Mercedes Jet Sprinter
 * - 15-18 pax -> Hummer H2 Stretch
 * - 19-56 pax -> Buses by group size
 * @param {object} draft
 * @returns {{ bestMatch: object, alternative: object, reason: string }}
 */
export function getVehicleRecommendation(draft = {}) {
  const pax = draft.passengers || 2;
  const bags = draft.luggage || 2;
  const isWedding = draft.service === 'wedding-limo-rental';
  const isAirport = draft.service === 'airport-transportation';

  // 1. Large groups (19+)
  if (pax > 18) {
    let busId = 'party-bus-20';
    if (pax <= 20) busId = 'party-bus-20';
    else if (pax <= 24) busId = 'limo-bus-24';
    else if (pax <= 28) busId = 'party-bus-28';
    else if (pax <= 36) busId = 'executive-bus-36';
    else busId = 'luxury-coach-56';

    const bus = FLEET.find(v => v.id === busId) || FLEET.find(v => v.id === 'executive-bus-36');
    const alt = FLEET.find(v => v.id === 'mercedes-jet-sprinter');
    return {
      bestMatch: bus,
      alternative: alt,
      reason: `Comfortably seats all ${pax} passengers with executive climate control and panoramic highway visibility.`
    };
  }

  // 2. Celebrations / Bachelor up to 18
  if (pax > 14 || (isWedding && pax > 10)) {
    const hummer = FLEET.find(v => v.id === 'hummer-h2-stretch');
    const sprinter = FLEET.find(v => v.id === 'mercedes-jet-sprinter');
    return {
      bestMatch: hummer,
      alternative: sprinter,
      reason: `Ultra-luxury lounge seating for up to 18 guests. Note: carry-on bags only.`
    };
  }

  // 3. Medium delegation up to 14
  if (pax > 6 || bags > 6) {
    const sprinter = FLEET.find(v => v.id === 'mercedes-jet-sprinter');
    const escalade = FLEET.find(v => v.id === 'cadillac-escalade-esv');
    return {
      bestMatch: sprinter,
      alternative: escalade,
      reason: `Stand-up 6'4" headroom, 14 individual leather captain seats, and separate rear luggage hold for 14 full-sized bags.`
    };
  }

  // 4. Wedding 7 to 10 pax
  if (isWedding && pax >= 4) {
    const mkt = FLEET.find(v => v.id === 'lincoln-mkt-stretch');
    const sclass = FLEET.find(v => v.id === 'mercedes-s-class');
    return {
      bestMatch: mkt,
      alternative: sclass,
      reason: `Custom white-glove wedding limousine with mirrored champagne bar and red carpet rollout.`
    };
  }

  // 5. Up to 6 pax / 6 bags -> Luxury SUV
  if (pax > 3 || bags > 3) {
    const escalade = FLEET.find(v => v.id === 'cadillac-escalade-esv');
    const suburban = FLEET.find(v => v.id === 'chevrolet-suburban');
    return {
      bestMatch: escalade,
      alternative: suburban,
      reason: `Extended wheelbase accommodates up to 6 passengers with 6 checked suitcases behind the 3rd row.`
    };
  }

  // 6. 1 to 3 pax & <=3 bags -> Executive Sedan
  if (isAirport) {
    const xts = FLEET.find(v => v.id === 'cadillac-xts');
    const sclass = FLEET.find(v => v.id === 'mercedes-s-class');
    return {
      bestMatch: xts,
      alternative: sclass,
      reason: `Spacious, quiet airport transport with flight tracking and 60 minutes free wait time included.`
    };
  }

  const sclass = FLEET.find(v => v.id === 'mercedes-s-class');
  const bmw = FLEET.find(v => v.id === 'bmw-i7');
  return {
    bestMatch: sclass,
    alternative: bmw,
    reason: `Flagship German executive engineering with reclining rear Nappa leather seats and whisper-quiet ride.`
  };
}

/**
 * Generate a random booking reference (e.g. PCB-24817).
 */
export function generateBookingReference() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `PCB-${num}`;
}
