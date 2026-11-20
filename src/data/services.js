// src/data/services.js
// Exact 10 Chauffeur-Driven Services categorized into Everyday Travel and Events & Groups

export const SERVICE_GROUPS = [
  { id: 'everyday', label: 'Everyday travel' },
  { id: 'events', label: 'Events and groups' }
];

export const SERVICE_CATEGORIES = {
  everyday: ['All', 'Airport', 'Business', 'Long distance'],
  events: ['All', 'Celebrations', 'Group transport', 'Sports and tours']
};

export const SERVICES = [
  // GROUP 1: EVERYDAY TRAVEL
  {
    id: 'airport-transportation',
    slug: 'airport-transportation',
    code: 'PCS-SRV-01',
    title: 'Airport Transportation',
    shortTitle: 'Airport Transportation',
    category: 'Airport',
    group: 'everyday',
    badge: 'Flight tracked',
    pricing: 'Flat rate',
    vehicles: 'Sedans, SUVs',
    icon: 'Plane',
    image: '/services/airport-transportation.webp',
    description: "Our most requested service. Chauffeurs know which door at O'Hare and which Midway lane works at rush hour. Flights are tracked live, so an early landing or a delay changes your pickup time, not your price.",
    highlights: [
      "Curbside or meet-and-greet at O'Hare and Midway",
      "Flat rate from O'Hare to downtown, no meter and no surge",
      "Sedans for solo travellers, SUVs when the luggage count climbs",
      "60 minutes free wait on every arrival, 90 for international",
      "Suburb pickups: Naperville, Schaumburg, Oak Brook, Evanston, Elmhurst"
    ],
    suggestedVehicleIds: ['cadillac-xts', 'mercedes-s-class', 'cadillac-escalade-esv']
  },
  {
    id: 'corporate-executive',
    slug: 'corporate-executive',
    code: 'PCS-SRV-02',
    title: 'Corporate and Executive',
    shortTitle: 'Corporate & Executive',
    category: 'Business',
    group: 'everyday',
    badge: 'Monthly invoice',
    pricing: 'Hourly or point to point',
    vehicles: 'Mercedes S-Class, Lincoln Navigator L, BMW i7 Electric, Mercedes Jet Sprinter',
    icon: 'Briefcase',
    image: '/services/corporate-executive.webp',
    description: "Named chauffeurs, one monthly invoice, and a dispatcher who knows your calendar. Roadshows, client pickups, hourly as-directed work and point-to-point runs across the Loop.",
    highlights: [
      "Named chauffeurs for your team",
      "One monthly invoice",
      "Hourly as-directed service",
      "Insurance certificates sent to your risk team on request"
    ],
    suggestedVehicleIds: ['mercedes-s-class', 'bmw-i7', 'lincoln-navigator-l', 'mercedes-jet-sprinter']
  },
  {
    id: 'suburb-long-distance',
    slug: 'suburb-long-distance',
    code: 'PCS-SRV-03',
    title: 'Suburb and Long Distance',
    shortTitle: 'Suburb & Long Distance',
    category: 'Long distance',
    group: 'everyday',
    badge: 'Door to door',
    pricing: 'Fixed written quote',
    vehicles: 'SUVs, Sprinter, Coaches',
    icon: 'Compass',
    image: '/services/suburb-long-distance.webp',
    description: "Door-to-door from the collar suburbs into the city, out to Milwaukee, South Bend or Indianapolis, and back the same night if you need it.",
    highlights: [
      "Naperville, Schaumburg, Oak Brook, Evanston, Hinsdale, Aurora, Skokie and more",
      "Milwaukee, South Bend and Indianapolis runs",
      "Same-night return available",
      "Luggage-ready SUVs and coaches"
    ],
    suggestedVehicleIds: ['cadillac-escalade-esv', 'chevrolet-suburban', 'mercedes-jet-sprinter', '36-pax-executive-bus']
  },
  {
    id: 'hourly-chauffeur',
    slug: 'hourly-chauffeur',
    code: 'PCS-SRV-04',
    title: 'Hourly Chauffeur',
    shortTitle: 'Hourly Chauffeur',
    category: 'Business',
    group: 'everyday',
    badge: 'As directed',
    pricing: 'Hourly',
    vehicles: 'Sedans, SUVs, Sprinter',
    icon: 'Clock',
    image: '/services/hourly-chauffeur.webp',
    description: "Keep one chauffeur and one car for as long as you need. Multiple stops, meetings and waiting time are handled for you.",
    highlights: [
      "Multi-stop days with no per-trip charges",
      "Wait time included in your written quote",
      "Same-night and last-minute bookings handled by a person on the phone",
      "Available 24/7"
    ],
    suggestedVehicleIds: ['mercedes-s-class', 'cadillac-escalade-esv', 'mercedes-jet-sprinter']
  },

  // GROUP 2: EVENTS AND GROUPS
  {
    id: 'wedding-limo-rental',
    slug: 'wedding-limo-rental',
    code: 'PCS-SRV-05',
    title: 'Wedding Limo Rental',
    shortTitle: 'Wedding Limo Rental',
    category: 'Celebrations',
    group: 'events',
    badge: 'Stays all day',
    pricing: 'Fixed written quote',
    vehicles: 'Lincoln MKT Stretch, Sprinter, SUV convoy',
    icon: 'Heart',
    image: '/services/wedding-limo-rental.webp',
    description: "Stretch limos, Sprinters and SUV convoys for weddings and anniversaries, decorated on request, with a chauffeur who stays for the whole run.",
    highlights: [
      "Wrap-around leather, fibre-optic lighting and a bar console in the MKT stretch",
      "Guest shuttles between hotel, church and reception",
      "Decorated on request",
      "One chauffeur for the whole day"
    ],
    suggestedVehicleIds: ['lincoln-mkt-stretch', 'mercedes-jet-sprinter', 'cadillac-escalade-esv']
  },
  {
    id: 'bachelor-bachelorette',
    slug: 'bachelor-bachelorette',
    code: 'PCS-SRV-06',
    title: 'Bachelor and Bachelorette',
    shortTitle: 'Bachelor & Bachelorette',
    category: 'Celebrations',
    group: 'events',
    badge: 'Up to 18 seats',
    pricing: 'As-directed hours',
    vehicles: 'Hummer H2 Stretch, Sprinter, party buses',
    icon: 'Sparkles',
    image: '/services/bachelor-bachelorette.webp',
    description: "One chauffeur for the whole night, so the group stays together from the dinner reservation to the last stop.",
    highlights: [
      "Multi-stop nights: dinner, club, late food, home",
      "Lighting, sound and coolers in the stretch limo",
      "Hotel-to-venue shuttling for out-of-town guests",
      "Chauffeur handles parking, valet lines and the door"
    ],
    suggestedVehicleIds: ['hummer-h2-stretch', 'mercedes-jet-sprinter', '20-pax-party-bus', '28-pax-party-bus']
  },
  {
    id: 'graduation-limo-rental',
    slug: 'graduation-limo-rental',
    code: 'PCS-SRV-07',
    title: 'Graduation and Prom Limo',
    shortTitle: 'Graduation & Prom Limo',
    category: 'Celebrations',
    group: 'events',
    badge: 'Group friendly',
    pricing: 'Fixed written quote',
    vehicles: 'Stretch limos, party buses',
    icon: 'GraduationCap',
    image: '/services/graduation-limo-rental.webp',
    description: "Stretch limos and party buses for graduation and prom nights, with a chauffeur who gets everyone there and home safely.",
    highlights: [
      "Stretch limos up to 18 passengers",
      "Party buses for larger groups",
      "Multi-stop itineraries",
      "Licensed and insured, background-checked chauffeurs"
    ],
    suggestedVehicleIds: ['lincoln-mkt-stretch', 'hummer-h2-stretch', '20-pax-party-bus']
  },
  {
    id: 'bus-rental',
    slug: 'bus-rental',
    code: 'PCS-SRV-08',
    title: 'Bus Rental',
    shortTitle: 'Bus Rental & Coach',
    category: 'Group transport',
    group: 'events',
    badge: '14 to 56 seats',
    pricing: 'One vehicle, one bill',
    vehicles: 'Sprinter, 20, 24, 28, 36 and 56 passenger buses',
    icon: 'Bus',
    image: '/services/bus-rental.webp',
    description: "When the headcount stops fitting in cars, we move you into a Sprinter, a mini-coach or a full 56-seat motorcoach: one vehicle, one driver, one bill.",
    highlights: [
      "Sprinter vans, mini-buses and full-size coaches",
      "Continuous shuttle loops for conferences and weddings",
      "Luggage bays for group arrivals at O'Hare and Midway",
      "Long distance to Milwaukee, South Bend and Indianapolis"
    ],
    suggestedVehicleIds: ['mercedes-jet-sprinter', '20-pax-party-bus', '28-pax-party-bus', '36-pax-executive-bus', '56-pax-luxury-coach']
  },
  {
    id: 'game-day-transfers',
    slug: 'game-day-transfers',
    code: 'PCS-SRV-09',
    title: 'Game Day Transfers',
    shortTitle: 'Game Day Transfers',
    category: 'Sports and tours',
    group: 'events',
    badge: 'Party buses',
    pricing: 'Fixed written quote',
    vehicles: '28 and 36 passenger party buses',
    icon: 'Trophy',
    image: '/services/game-day-transfers.webp',
    description: "Group transfers to Soldier Field, the United Center and other venues, with a sound system on board and a sober, professional driver.",
    highlights: [
      "Pick-up and drop-off at the venue",
      "Perimeter seating and full sound rig",
      "Return schedule built with you",
      "Ideal for corporate outings and tailgating groups"
    ],
    suggestedVehicleIds: ['cadillac-escalade-esv', '28-pax-party-bus', '36-pax-executive-bus']
  },
  {
    id: 'chicago-wine-tour',
    slug: 'chicago-wine-tour',
    code: 'PCS-SRV-10',
    title: 'Chicago Wine Tour',
    shortTitle: 'Chicago Wine Tour',
    category: 'Sports and tours',
    group: 'events',
    badge: 'Flat hourly rate',
    pricing: 'Hourly',
    vehicles: 'Mercedes Jet Sprinter, 20-passenger mini bus',
    icon: 'Wine',
    image: '/services/chicago-wine-tour.webp',
    description: "A vineyard afternoon without the designated driver. Sprinters and mini coaches run hotel-to-venue and winery loops on a flat hourly rate.",
    highlights: [
      "Stand-up Sprinter for up to 14 guests",
      "Mini coach for larger groups",
      "Hotel-to-venue loops all evening",
      "Flat hourly rate"
    ],
    suggestedVehicleIds: ['mercedes-jet-sprinter', '20-pax-party-bus', 'cadillac-escalade-esv']
  }
];

export function getServiceBySlug(slug) {
  return SERVICES.find(s => s.slug === slug || s.id === slug) || SERVICES[0];
}

export function getServicesByGroup(group) {
  return SERVICES.filter(s => s.group === group);
}
