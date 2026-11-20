// src/data/knowledge.js
// Comprehensive business knowledge base for AI Assistant
// Follows strict business rules: no meters, zero surge, written flat quotes, 24/7 Lombard dispatch.

export const COMPANY_CONTACT = {
  name: 'Premium Chauffeur Services',
  phone: '+1 847-268-2323',
  phoneRaw: '+18472682323',
  email: 'info@premiumchauffeurservices.com',
  address: '55 West 22nd Street STE 140, Lombard, IL 60148',
  hours: '24/7/365 Live Human Dispatch Operations'
};

export const CITIES_SERVED = [
  { name: 'Chicago', code: 'ORD / MDW', note: 'Flagship Lombard HQ, airport transfers, Loop corporate & suburban travel.' },
  { name: 'New York', code: 'JFK / LGA / EWR', note: 'Tri-state executive travel, Wall Street roadshows, Hamptons private staging.' },
  { name: 'Miami', code: 'MIA / FLL', note: 'Brickell financial, South Beach VIP, PortMiami seaport & private FBO staging.' },
  { name: 'Atlanta', code: 'ATL', note: 'Midtown & Buckhead executive corridors, Alpharetta tech hub, Hartsfield arrivals.' },
  { name: 'Los Angeles', code: 'LAX / BUR', note: 'Beverly Hills, Century City, studio lots, Burbank & LAX commercial staging.' }
];

export const SUBURBS_SERVED = [
  'Naperville', 'Schaumburg', 'Oak Brook', 'Evanston', 'Elmhurst',
  'Hinsdale', 'Arlington Heights', 'Aurora', 'Skokie', 'Des Plaines',
  'Lombard (HQ)', 'Chicago Heights', 'Oak Park', 'Highland Park', 'Lake Forest'
];

export const LONG_DISTANCE_DESTINATIONS = [
  'Milwaukee & Kohler, WI',
  'South Bend & University of Notre Dame, IN',
  'Indianapolis, IN',
  'Grand Rapids & Detroit, MI',
  'Rockford & Quad Cities, IL'
];

export const KNOWLEDGE_TOPICS = [
  {
    keywords: ['naperville', 'schaumburg', 'oak brook', 'suburb', 'suburbs', 'evanston', 'elmhurst', 'hinsdale', 'aurora', 'skokie'],
    topic: 'Suburban Coverage',
    answer: "Yes, we provide full door-to-door suburban coverage throughout the Greater Chicago area, including Naperville, Schaumburg, Oak Brook, Evanston, Hinsdale, and all North/West suburbs. Every trip includes scheduled chauffeur staging, luggage assistance, and optional same-night return.",
    actionChip: 'Book Suburban Transfer'
  },
  {
    keywords: ['airport', 'o\'hare', 'ord', 'midway', 'mdw', 'jfk', 'lga', 'ewr', 'mia', 'lax', 'flight', 'terminal'],
    topic: 'Airport Transfers & Flight Tracking',
    answer: "Every airport transfer includes real-time flight tracking! We automatically adjust dispatch timing for early or delayed arrivals. Domestic flights receive 60 minutes complimentary wait time after touchdown; international flights receive 90 minutes for customs clearance.",
    actionChip: 'Book Airport Ride'
  },
  {
    keywords: ['quote', 'flat rate', 'meter', 'surge', 'hidden', 'price', 'pricing', 'cost'],
    topic: 'Pricing & Zero Surge Guarantee',
    answer: "We operate exclusively on fixed, written, all-inclusive quotes. There are never surge multipliers, meters, or unexpected fees. Every quote includes highway tolls, airport fees, wait buffers, and a 20% chauffeur gratuity.",
    actionChip: 'Request Fixed Quote'
  },
  {
    keywords: ['luggage', 'bags', 'bag', 'capacity', 'fit', 'people', 'passengers', 'suitcases'],
    topic: 'Vehicle Capacities & Luggage',
    answer: "• Sedans (Cadillac XTS / S-Class / BMW i7): 1–3 passengers, up to 3 bags.\n• Luxury SUVs (Escalade ESV / Suburban): 1–6 passengers, up to 6 checked bags.\n• Jet Sprinter: Up to 14 passengers with 14 full-sized suitcases.\n• Executive Buses: 20 to 56 passengers by group size.",
    actionChip: 'Compare Fleet Models'
  },
  {
    keywords: ['wedding', 'bride', 'groom', 'bachelor', 'prom', 'event', 'champagne', 'celebration'],
    topic: 'Weddings & Celebrations',
    answer: "Our formal wedding and event packages feature Lincoln MKT stretch limousines, Hummer H2 lounges, and executive shuttles. Service includes formally attired chauffeurs, complimentary chilled champagne flutes, red carpet rollout, and coordinated bridal party staging.",
    actionChip: 'Get Wedding Quote'
  },
  {
    keywords: ['child', 'booster', 'car seat', 'baby', 'infant', 'toddler'],
    topic: 'Child Safety & Booster Seats',
    answer: "We provide sanitized forward-facing child safety seats and booster seats upon request ($25 per seat). Please indicate your child's age or approximate weight when booking so dispatch equips the correct seat model.",
    actionChip: 'Add Child Seat'
  },
  {
    keywords: ['accessibility', 'accessible', 'wheelchair', 'ramp', 'ada'],
    topic: 'ADA & Accessible Vehicles',
    answer: "We offer ADA-compliant wheelchair-accessible vehicles equipped with commercial hydraulic lifts or ramps and Q'Straint safety tie-downs. Please notify dispatch in advance so we stage a certified accessible vehicle.",
    actionChip: 'Request Accessible Vehicle'
  },
  {
    keywords: ['corporate', 'business', 'invoice', 'billing', 'net 30', 'meridian', 'account'],
    topic: 'Corporate Accounts & Billing',
    answer: "Corporate accounts enjoy itemized monthly Net-30 consolidated billing, dedicated account managers, priority peak availability, and executive flight tracking. You can apply directly through the profile section or with our dispatch team.",
    actionChip: 'Set Up Corporate Account'
  },
  {
    keywords: ['dispatch', 'phone', 'call', 'talk', 'human', 'agent', 'person', 'support', 'help', 'contact'],
    topic: '24/7 Human Dispatch Support',
    answer: "Our Lombard dispatch headquarters is staffed by real human coordinators 24 hours a day, 365 days a year. You can reach us directly at +1 847-268-2323 or info@premiumchauffeurservices.com.",
    actionChip: 'Call Dispatch Now'
  },
  {
    keywords: ['long distance', 'milwaukee', 'notre dame', 'south bend', 'indianapolis', 'interstate'],
    topic: 'Intercity Long Distance Charters',
    answer: "We provide seamless non-stop luxury transfers between Chicago and regional Midwest hubs, including Milwaukee (MKE), University of Notre Dame in South Bend, and Indianapolis. Executive Sprinters and coaches include high-speed Wi-Fi and power outlets.",
    actionChip: 'Request Long Distance Charter'
  }
];

/**
 * Search the knowledge base for an answer to a user query.
 * @param {string} query
 * @returns {object|null}
 */
export function searchKnowledgeBase(query = '') {
  const q = query.toLowerCase();
  for (const item of KNOWLEDGE_TOPICS) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return item;
    }
  }
  return null;
}
