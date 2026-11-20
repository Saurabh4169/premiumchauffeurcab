// src/data/trips.js
// Realistic customer trips across Upcoming, Past, and Quotes

export const INITIAL_TRIPS = [
  {
    id: 'PCS-89241',
    status: 'en_route', // 'confirmed', 'assigned', 'en_route', 'arrived', 'completed', 'quote'
    statusLabel: 'Chauffeur En Route',
    type: 'upcoming',
    service: 'Airport Transportation',
    pickup: 'The Langham Chicago, 330 N Wabash Ave, Chicago, IL',
    dropoff: "O'Hare International Airport (ORD) Terminal 5",
    date: 'Today, Oct 24',
    time: '3:45 PM',
    rawDate: '2026-10-24T15:45:00',
    passengers: 2,
    luggage: 3,
    flightNumber: 'LH 431 to Frankfurt',
    flightStatus: 'On Schedule (Gate M18)',
    vehicleId: 'mercedes-s-class',
    vehicleName: 'Mercedes-Benz S-Class S580',
    vehicleCategory: 'Ultra-Luxury Sedan',
    vehiclePlate: 'IL • VIP 709',
    vehicleColor: 'Obsidian Black Metallic',
    chauffeur: {
      name: 'Marcus Sterling',
      rating: 4.99,
      tripsCompleted: 1420,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      phone: '+1 847-268-2323',
      badge: 'Master Chauffeur',
      yearsWithCompany: '6 years',
      etaMinutes: 8,
      currentLocation: 'Passing River North on Ontario St'
    },
    quote: {
      base: 145.00,
      tolls: 8.50,
      parking: 0.00,
      waitTime: 0.00, // 60 min complimentary
      gratuity: 32.00,
      total: 185.50
    },
    total: 185.50,
    timeline: [
      { step: 'Reservation Confirmed', time: '11:00 AM', completed: true, note: 'Written flat quote locked' },
      { step: 'Chauffeur Dispatched', time: '3:15 PM', completed: true, note: 'Marcus assigned with 30m buffer' },
      { step: 'En Route to Pickup', time: '3:32 PM', completed: true, note: 'ETA 8 mins via Ontario St' },
      { step: 'Arrived at Staging', time: '3:42 PM', completed: false, note: 'Will stage at Langham main portico' },
      { step: 'Trip Completed', time: '4:30 PM', completed: false, note: 'Curbside Terminal 5 departure' }
    ]
  },
  {
    id: 'PCS-89312',
    status: 'assigned',
    statusLabel: 'Chauffeur Assigned',
    type: 'upcoming',
    service: 'Corporate and Executive',
    pickup: '55 West 22nd Street, Lombard, IL (HQ)',
    dropoff: 'McCormick Place West Building, 2301 S Indiana Ave, Chicago',
    date: 'Tomorrow, Oct 25',
    time: '8:15 AM',
    rawDate: '2026-10-25T08:15:00',
    passengers: 4,
    luggage: 4,
    flightNumber: null,
    vehicleId: 'cadillac-escalade-esv',
    vehicleName: 'Cadillac Escalade ESV Platinum',
    vehicleCategory: 'Full-Size Luxury SUV',
    vehiclePlate: 'IL • LUX 884',
    vehicleColor: 'Black Raven',
    chauffeur: {
      name: 'Darius Vance',
      rating: 4.98,
      tripsCompleted: 890,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      phone: '+1 847-268-2323',
      badge: 'Executive Chauffeur',
      yearsWithCompany: '4 years',
      etaMinutes: null,
      currentLocation: 'Staging in Lombard facility'
    },
    quote: {
      base: 165.00,
      tolls: 10.00,
      parking: 0.00,
      waitTime: 0.00,
      gratuity: 35.00,
      total: 210.00
    },
    total: 210.00,
    timeline: [
      { step: 'Reservation Confirmed', time: 'Yesterday', completed: true, note: 'Corporate account billing' },
      { step: 'Chauffeur Assigned', time: 'Today', completed: true, note: 'Darius Vance allocated with Escalade ESV' },
      { step: 'En Route to Pickup', time: '7:45 AM', completed: false, note: '30 min pre-arrival buffer' },
      { step: 'Arrived at Staging', time: '8:05 AM', completed: false, note: 'Lombard office main entrance' },
      { step: 'Trip Completed', time: '9:00 AM', completed: false, note: 'McCormick Place drop-off' }
    ]
  },
  {
    id: 'PCS-88401',
    status: 'completed',
    statusLabel: 'Completed',
    type: 'past',
    service: 'Airport Transportation',
    pickup: "O'Hare International Airport (ORD) Terminal 1",
    dropoff: 'The Peninsula Chicago, 108 E Superior St',
    date: 'Oct 18, 2026',
    time: '6:30 PM',
    passengers: 2,
    luggage: 3,
    flightNumber: 'UA 219 (Landed 15m early)',
    vehicleId: 'cadillac-xts',
    vehicleName: 'Cadillac XTS Luxury Sedan',
    vehiclePlate: 'IL • ORD 102',
    chauffeur: {
      name: 'Anthony Rossi',
      rating: 5.0,
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    quote: {
      base: 115.00,
      tolls: 7.50,
      parking: 5.00,
      waitTime: 0.00,
      gratuity: 25.00,
      total: 152.50
    }
  },
  {
    id: 'PCS-87990',
    status: 'completed',
    statusLabel: 'Completed',
    type: 'past',
    service: 'Wedding Limo Rental',
    pickup: 'St. James Cathedral, Chicago',
    dropoff: 'The Drake Hotel, Gold Coast, Chicago',
    date: 'Oct 12, 2026',
    time: '2:00 PM',
    passengers: 10,
    luggage: 4,
    vehicleId: 'lincoln-mkt-stretch',
    vehicleName: 'Lincoln MKT Stretch Limousine',
    vehiclePlate: 'IL • WED 777',
    chauffeur: {
      name: 'Robert Caldwell',
      rating: 4.97,
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    },
    quote: {
      base: 480.00,
      tolls: 0.00,
      parking: 0.00,
      waitTime: 0.00,
      gratuity: 96.00,
      total: 576.00
    }
  },
  {
    id: 'PCS-Q-99120',
    status: 'quote',
    statusLabel: 'Quote Pending Approval',
    type: 'quotes',
    service: 'Suburb and Long Distance',
    pickup: 'Oak Brook, IL',
    dropoff: 'University of Notre Dame, South Bend, IN',
    date: 'Nov 02, 2026',
    time: '10:00 AM',
    passengers: 3,
    luggage: 4,
    vehicleId: 'lincoln-navigator-l',
    vehicleName: 'Lincoln Navigator L Reserve',
    quote: {
      base: 360.00,
      tolls: 24.00,
      parking: 0.00,
      waitTime: 0.00,
      gratuity: 72.00,
      total: 456.00
    },
    note: 'Valid for 7 days. Flat guaranteed quote includes Indiana Toll Road fees and return driver deadhead.'
  }
];
