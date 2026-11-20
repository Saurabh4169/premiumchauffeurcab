// src/data/dispatchData.js
// Dispatcher Console mock data: KPIs, Jobs Kanban, Quote Inbox with AI drafts, Fleet Status, Drivers, Messages

export const DISPATCH_KPIS = {
  todaysJobs: 48,
  activeChauffeurs: 19,
  onTimeRate: 99.4,
  pendingQuotes: 5,
  inTransit: 7,
  delayedFlightsHandled: 3
};

export const DISPATCH_FLIGHT_ALERTS = [
  {
    id: 'fl-1',
    flightNumber: 'UA 1892',
    airline: 'United Airlines',
    origin: 'SFO -> ORD',
    originalEta: '3:15 PM',
    adjustedEta: '3:50 PM',
    status: 'Delayed +35m',
    jobId: 'JOB-7014',
    passenger: 'Dr. Gregory Thorne',
    chauffeur: 'Anthony Rossi (Cadillac XTS)',
    actionTaken: 'Chauffeur staging buffer auto-adjusted to 3:45 PM'
  },
  {
    id: 'fl-2',
    flightNumber: 'AA 408',
    airline: 'American Airlines',
    origin: 'MIA -> ORD',
    originalEta: '4:10 PM',
    adjustedEta: '3:55 PM',
    status: 'Early -15m',
    jobId: 'JOB-7019',
    passenger: 'Elena Rostova',
    chauffeur: 'Darius Vance (Cadillac Escalade ESV)',
    actionTaken: 'Darius notified. Already staged at cell phone lot'
  }
];

export const DISPATCH_JOBS = [
  {
    id: 'JOB-7012',
    customer: 'Sarah Jenkins (Kearney Consulting)',
    phone: '+1 312-555-0199',
    service: 'Corporate and Executive',
    pickup: 'The Langham Chicago (330 N Wabash Ave)',
    dropoff: "O'Hare International Airport (ORD) Terminal 5",
    time: '3:45 PM',
    status: 'en_route', // unassigned, assigned, en_route, completed
    vehicleId: 'mercedes-s-class',
    vehicleName: 'Mercedes-Benz S-Class S580 (IL • VIP 709)',
    chauffeurId: 'drv-1',
    chauffeurName: 'Marcus Sterling',
    passengers: 2,
    bags: 3,
    flight: 'LH 431',
    quoteTotal: 185.50,
    notes: 'Prefers quiet ride & sparkling water. Flight departing at 6:10 PM.'
  },
  {
    id: 'JOB-7014',
    customer: 'Dr. Gregory Thorne',
    phone: '+1 847-555-8821',
    service: 'Airport Transportation',
    pickup: "ORD Terminal 1 (United Baggage Claim 4)",
    dropoff: '550 Sheridan Rd, Winnetka, IL',
    time: '3:50 PM', // Adjusted from 3:15
    status: 'assigned',
    vehicleId: 'cadillac-xts',
    vehicleName: 'Cadillac XTS Luxury Sedan (IL • ORD 102)',
    chauffeurId: 'drv-2',
    chauffeurName: 'Anthony Rossi',
    passengers: 1,
    bags: 2,
    flight: 'UA 1892 (Delayed +35m)',
    quoteTotal: 145.00,
    notes: 'Meet inside baggage claim with digital name tablet.'
  },
  {
    id: 'JOB-7020',
    customer: 'Harrison & Claire Miller Wedding',
    phone: '+1 630-555-4310',
    service: 'Wedding Limo Rental',
    pickup: 'Fourth Presbyterian Church, Chicago',
    dropoff: 'The Drake Hotel Gold Coast',
    time: '5:30 PM',
    status: 'assigned',
    vehicleId: 'lincoln-mkt-stretch',
    vehicleName: 'Lincoln MKT Stretch Limo (IL • WED 777)',
    chauffeurId: 'drv-3',
    chauffeurName: 'Robert Caldwell',
    passengers: 10,
    bags: 4,
    quoteTotal: 576.00,
    notes: 'Red carpet rollout ready. Chilled Dom Perignon on ice.'
  },
  {
    id: 'JOB-7022',
    customer: 'Apex Global Financial (14 Executives)',
    phone: '+1 212-555-9014',
    service: 'Bus Rental & Group Logistics',
    pickup: 'Midway Airport (MDW)',
    dropoff: 'Four Seasons Hotel Chicago',
    time: '6:15 PM',
    status: 'unassigned',
    vehicleId: 'mercedes-jet-sprinter',
    vehicleName: 'Mercedes Jet Sprinter Executive (IL • JET 14)',
    chauffeurId: null,
    chauffeurName: 'Unassigned',
    passengers: 14,
    bags: 14,
    quoteTotal: 340.00,
    notes: 'Need high-bandwidth mobile Wi-Fi verified before departure.'
  },
  {
    id: 'JOB-7008',
    customer: 'David Chen',
    phone: '+1 312-555-8120',
    service: 'Airport Transportation',
    pickup: 'Naperville, IL',
    dropoff: "O'Hare Terminal 3",
    time: '1:30 PM',
    status: 'completed',
    vehicleId: 'chevrolet-suburban',
    vehicleName: 'Chevrolet Suburban Premier (IL • SUB 550)',
    chauffeurId: 'drv-4',
    chauffeurName: 'Darius Vance',
    passengers: 5,
    bags: 5,
    quoteTotal: 175.00,
    notes: 'Completed on time. Client tipped additional $20 in cash.'
  }
];

export const DISPATCH_QUOTES = [
  {
    id: 'REQ-4019',
    customerName: 'Margaret Holloway (Accenture Executive)',
    email: 'm.holloway@accenture.com',
    phone: '+1 312-555-7721',
    requestDate: '10 minutes ago',
    serviceType: 'Suburb and Long Distance',
    routing: 'Oak Brook, IL to Downtown Milwaukee, WI (Pfister Hotel)',
    date: 'Oct 28, 2026 at 9:00 AM',
    passengers: 2,
    luggage: 3,
    requestedVehicle: 'Mercedes-Benz S-Class S580',
    aiDraft: {
      baseFare: 380.00,
      tolls: 28.00, // IL & WI tollway pass
      parking: 0.00,
      gratuity: 76.00, // 20%
      totalAllIn: 484.00,
      aiConfidence: '99%',
      reasoning: 'Calculated 92 miles interstate routing via I-294 & I-94 N. High probability of smooth toll collection. Fuel deadhead factored into base.',
      proposedResponse: 'Dear Ms. Holloway,\n\nThank you for choosing Premium Chauffeur Services. We are pleased to provide your guaranteed fixed quote for executive chauffeured travel from Oak Brook to Milwaukee on Oct 28.\n\nVehicle: Mercedes-Benz S-Class S580\nAll-Inclusive Fixed Quote: $484.00 (Includes highway tolls, 5G Wi-Fi, refreshments, and 20% chauffeur gratuity).\n\nYour chauffeur will arrive 15 minutes prior to scheduled pickup.'
    }
  },
  {
    id: 'REQ-4020',
    customerName: 'Brian Kowalski (Bachelor Party Coordinator)',
    email: 'bkowalski@chicagotech.io',
    phone: '+1 773-555-3991',
    requestDate: '25 minutes ago',
    serviceType: 'Bachelor and Bachelorette',
    routing: '5-Hour As-Directed Nightlife Charter (Wrigleyville -> River North -> West Loop)',
    date: 'Nov 07, 2026 from 8:00 PM to 1:00 AM',
    passengers: 16,
    luggage: 0,
    requestedVehicle: 'Hummer H2 Super Stretch Limo',
    aiDraft: {
      baseFare: 925.00, // $185/hr x 5 hrs
      tolls: 0.00,
      parking: 40.00, // City staging permits
      gratuity: 185.00,
      totalAllIn: 1150.00,
      aiConfidence: '96%',
      reasoning: '5-hour weekend evening charter in prime downtown entertainment corridors. Includes full ice bars, laser party lighting, and unlimited stops.',
      proposedResponse: 'Hi Brian,\n\nHere is your all-inclusive fixed quote for the 5-hour Hummer H2 Super Stretch charter on Saturday, Nov 7.\n\nAll-Inclusive Quote: $1,150.00 (Full 5 hours, iced bars, glassware, laser lighting, unlimited city stops, and chauffeur gratuity included).\n\nNo meters, no surprise fuel charges.'
    }
  }
];

export const DISPATCH_FLEET_STATUS = [
  {
    id: 'mercedes-s-class',
    plate: 'IL • VIP 709',
    name: 'Mercedes-Benz S-Class S580',
    status: 'on_job', // available, on_job, in_service
    mileage: 18420,
    nextServiceMileage: 20000,
    serviceFlag: false,
    currentLocation: 'River North (Ontario St)',
    currentJobId: 'JOB-7012',
    driver: 'Marcus Sterling'
  },
  {
    id: 'cadillac-escalade-esv',
    plate: 'IL • LUX 884',
    name: 'Cadillac Escalade ESV Platinum',
    status: 'available',
    mileage: 29850,
    nextServiceMileage: 30000,
    serviceFlag: true, // service due in 150 miles!
    currentLocation: 'Lombard HQ Facility',
    currentJobId: null,
    driver: 'Darius Vance (Standby)'
  },
  {
    id: 'cadillac-xts',
    plate: 'IL • ORD 102',
    name: 'Cadillac XTS Luxury Sedan',
    status: 'on_job',
    mileage: 44100,
    nextServiceMileage: 50000,
    serviceFlag: false,
    currentLocation: "ORD Terminal 1 Holding Area",
    currentJobId: 'JOB-7014',
    driver: 'Anthony Rossi'
  },
  {
    id: 'bmw-i7',
    plate: 'IL • EV 100',
    name: 'BMW i7 xDrive60 All-Electric',
    status: 'available',
    mileage: 9400,
    nextServiceMileage: 15000,
    serviceFlag: false,
    currentLocation: 'Lombard HQ Charging Bay (94% SOC)',
    currentJobId: null,
    driver: 'Unassigned'
  },
  {
    id: 'mercedes-jet-sprinter',
    plate: 'IL • JET 14',
    name: 'Mercedes Jet Sprinter Executive Van',
    status: 'available',
    mileage: 22100,
    nextServiceMileage: 25000,
    serviceFlag: false,
    currentLocation: 'Lombard HQ Staging Bay',
    currentJobId: null,
    driver: 'Unassigned'
  },
  {
    id: 'lincoln-mkt-stretch',
    plate: 'IL • WED 777',
    name: 'Lincoln MKT Stretch Limousine',
    status: 'on_job',
    mileage: 36500,
    nextServiceMileage: 40000,
    serviceFlag: false,
    currentLocation: 'Near Michigan Ave / Fourth Church',
    currentJobId: 'JOB-7020',
    driver: 'Robert Caldwell'
  },
  {
    id: '56-pax-luxury-coach',
    plate: 'IL • BUS 560',
    name: '56-Pax Motor Coach Luxury Tourliner',
    status: 'in_service',
    mileage: 62400,
    nextServiceMileage: 60000,
    serviceFlag: true, // In scheduled DOT brake inspection
    currentLocation: 'Lombard Commercial Maintenance Center',
    currentJobId: null,
    driver: null
  }
];

export const DISPATCH_DRIVERS = [
  {
    id: 'drv-1',
    name: 'Marcus Sterling',
    phone: '+1 847-268-2323 Ext 101',
    status: 'On Job',
    assignedVehicle: 'Mercedes-Benz S-Class S580 (IL • VIP 709)',
    rating: 4.99,
    hoursToday: '4.5 hrs',
    licenseType: 'Commercial Chauffeur Class C',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'drv-2',
    name: 'Anthony Rossi',
    phone: '+1 847-268-2323 Ext 102',
    status: 'On Job',
    assignedVehicle: 'Cadillac XTS Sedan (IL • ORD 102)',
    rating: 5.0,
    hoursToday: '3.0 hrs',
    licenseType: 'Commercial Chauffeur Class C',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'drv-3',
    name: 'Robert Caldwell',
    phone: '+1 847-268-2323 Ext 103',
    status: 'On Job',
    assignedVehicle: 'Lincoln MKT Stretch (IL • WED 777)',
    rating: 4.97,
    hoursToday: '2.0 hrs',
    licenseType: 'Commercial Chauffeur Class B (Passenger)',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'drv-4',
    name: 'Darius Vance',
    phone: '+1 847-268-2323 Ext 104',
    status: 'Available',
    assignedVehicle: 'Cadillac Escalade ESV (IL • LUX 884)',
    rating: 4.98,
    hoursToday: '5.2 hrs',
    licenseType: 'Commercial Chauffeur Class C',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'drv-5',
    name: 'Helena Mercer',
    phone: '+1 847-268-2323 Ext 105',
    status: 'Available',
    assignedVehicle: 'Mercedes Jet Sprinter (IL • JET 14)',
    rating: 4.99,
    hoursToday: '1.0 hrs',
    licenseType: 'Commercial CDL Class B (Passenger Endorsement)',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const DISPATCH_MESSAGES = [
  {
    id: 'thread-1',
    clientName: 'Sarah Jenkins',
    clientPhone: '+1 312-555-0199',
    tripId: 'JOB-7012',
    unread: true,
    lastTime: '3:34 PM',
    lastMessage: 'I am running 5 minutes ahead of schedule downstairs at the Langham. Is Marcus nearby?',
    suggestedAiReplies: [
      'Marcus is on Ontario St, 4 mins away. He will pull right up to the main Langham portico.',
      'Thank you Sarah! Marcus has arrived at the staging lane and is ready whenever you step out.',
      'Understood! Marcus will load your bags and has chilled still & sparkling water waiting.'
    ],
    history: [
      { sender: 'client', text: 'Hi dispatch, my meeting ended slightly early.', time: '3:31 PM' },
      { sender: 'dispatch', text: 'Good afternoon Sarah. Marcus is dispatched and passing River North now.', time: '3:32 PM' },
      { sender: 'client', text: 'I am running 5 minutes ahead of schedule downstairs at the Langham. Is Marcus nearby?', time: '3:34 PM' }
    ]
  },
  {
    id: 'thread-2',
    clientName: 'Dr. Gregory Thorne',
    clientPhone: '+1 847-555-8821',
    tripId: 'JOB-7014',
    unread: false,
    lastTime: '3:20 PM',
    lastMessage: 'Got your update regarding our delay into ORD. Much appreciated!',
    suggestedAiReplies: [
      'Anthony is tracking your radar. Enjoy the rest of the flight!',
      'Take your time at baggage claim, 60 minutes free wait is active.'
    ],
    history: [
      { sender: 'dispatch', text: 'Hello Dr. Thorne, we see United 1892 was held in Denver and is now touching down at 3:50 PM. Anthony Rossi has adjusted his staging time accordingly.', time: '3:18 PM' },
      { sender: 'client', text: 'Got your update regarding our delay into ORD. Much appreciated!', time: '3:20 PM' }
    ]
  }
];
