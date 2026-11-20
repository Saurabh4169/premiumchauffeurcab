// src/data/driveLocations.js
// Location data for "Where We Drive" section: Cities, Airports & Chicago Suburbs

export const DRIVE_TABS = [
  { id: 'cities', label: 'Cities' },
  { id: 'airports', label: 'Airports' },
  { id: 'suburbs', label: 'Chicago Suburbs' }
];

export const DRIVE_LOCATIONS = {
  cities: [
    {
      id: 'chicago',
      name: 'Chicago',
      sublabel: 'ORD · MDW · Suburbs',
      image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/promo-highway.webp',
      marketId: 'chicago',
      airports: "O'Hare (ORD) & Midway (MDW)",
      description: "Flagship home market and 24/7 Lombard dispatch headquarters. Flat-rate airport transfers, Loop corporate staging, and door-to-door suburban travel.",
      services: ['Airport Transportation', 'Corporate Executive', 'Hourly Charter', 'FBO Tarmac Access', 'Wedding & Event Limousines']
    },
    {
      id: 'new-york',
      name: 'New York',
      sublabel: 'JFK · LGA · EWR',
      image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-s-class.webp',
      marketId: 'new-york',
      airports: 'JFK, LaGuardia (LGA) & Newark (EWR)',
      description: "Tri-state executive corridor. Manhattan corporate staging, Wall Street financial roadshows, Greenwich CT, and Hamptons private transfers.",
      services: ['JFK / LGA / EWR Flight Tracking', 'Wall Street Roadshows', 'Manhattan As-Directed', 'Tri-State Long Distance']
    },
    {
      id: 'miami',
      name: 'Miami',
      sublabel: 'MIA · FLL · Port',
      image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/cadillac-escalade-esv.webp',
      marketId: 'miami',
      airports: 'Miami Int (MIA) & Fort Lauderdale (FLL)',
      description: "South Florida prestige transport. Miami Beach, Brickell financial center, PortMiami VIP seaport staging, and Palm Beach estates.",
      services: ['MIA & FLL Flight Tracking', 'PortMiami VIP Staging', 'Brickell Corporate Fleet', 'Palm Beach Executive Transfers']
    },
    {
      id: 'atlanta',
      name: 'Atlanta',
      sublabel: 'ATL · Corporate',
      image: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/bmw-i7.webp',
      marketId: 'atlanta',
      airports: 'Hartsfield-Jackson Atlanta Int (ATL)',
      description: "Southeast corporate capital. Midtown, Buckhead executive corridors, Alpharetta technology hub, and seamless Hartsfield-Jackson arrivals.",
      services: ['ATL Terminal Meet & Greet', 'Buckhead Executive Chauffeur', 'Alpharetta Tech Corridor', 'Mercedes-Benz Stadium VIP']
    },
    {
      id: 'los-angeles',
      name: 'Los Angeles',
      sublabel: 'LAX · BUR · Studios',
      image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-jet-sprinter.webp',
      marketId: 'los-angeles',
      airports: 'LAX TBIT & Hollywood Burbank (BUR)',
      description: "West Coast entertainment and executive staging. Beverly Hills, Century City, studio lots, and coastal transfers to Newport Beach.",
      services: ['LAX Commercial Curbside', 'Burbank Studio Transfers', 'Beverly Hills As-Directed', 'Executive Sprinter Group Charters']
    }
  ],
  airports: [
    {
      id: 'ord',
      name: "O'Hare (ORD)",
      sublabel: 'ORD · Chicago',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=600&q=80',
      fallback: '/services/airport-transportation.webp',
      marketId: 'chicago',
      airports: "O'Hare International Airport (ORD)",
      description: "Terminals 1, 2, 3 & Terminal 5 international arrivals. Flight tracking on all inbound flights with 60m domestic / 90m international complimentary wait.",
      services: ['Terminal Meet & Greet', 'Curbside Express Pickup', 'Commercial Flight Tracking', 'Zero Surge Guarantee']
    },
    {
      id: 'mdw',
      name: 'Midway (MDW)',
      sublabel: 'MDW · Chicago',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
      fallback: '/services/airport-transportation.webp',
      marketId: 'chicago',
      airports: 'Midway International Airport (MDW)',
      description: "Lower level baggage claim greeting or curbside pickup. Chauffeur stages in the buffer lot prior to touchdown for zero wait time.",
      services: ['Flight-Tracked Arrivals', '60 Min Complimentary Wait', 'Luggage Assistance', 'Downtown Loop Direct (25 min)']
    },
    {
      id: 'jfk',
      name: 'JFK Airport',
      sublabel: 'JFK · New York',
      image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-s-class.webp',
      marketId: 'new-york',
      airports: 'John F. Kennedy International Airport (JFK)',
      description: "Dedicated chauffeur meet-and-greet in Terminal 4, Terminal 5, Terminal 7, and Terminal 8. Fixed written quotes to Manhattan and Tri-State.",
      services: ['All-Inclusive Fixed Rates', 'Digital Tablet Name Meet', 'Tolls & Surcharges Included', 'Suburban Tri-State Delivery']
    },
    {
      id: 'lga-ewr',
      name: 'LGA & Newark',
      sublabel: 'LGA · EWR',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/cadillac-escalade-esv.webp',
      marketId: 'new-york',
      airports: 'LaGuardia (LGA) & Newark Liberty (EWR)',
      description: "New Terminal B & C at LaGuardia and Flagship Terminal A at Newark Liberty. Fast executive dispatch into Midtown Manhattan.",
      services: ['Newark Terminal A Meet', 'LaGuardia VIP Commercial Curb', 'Lincoln & Holland Tunnel Tolls Included', 'Midtown Executive Shuttles']
    },
    {
      id: 'mia-fll',
      name: 'MIA & FLL',
      sublabel: 'Miami · FLL',
      image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-jet-sprinter.webp',
      marketId: 'miami',
      airports: 'Miami Int (MIA) & Fort Lauderdale (FLL)',
      description: "Serving all commercial terminals and private FBOs (Signature, Atlantic Aviation). Chilled still water and air-conditioned luxury staging.",
      services: ['FBO Tarmac Direct Staging', 'PortMiami Cruise Connections', 'South Beach Resorts Transfer', 'Escalade ESV Luxury SUV Fleet']
    },
    {
      id: 'atl-airport',
      name: 'ATL Airport',
      sublabel: 'ATL · Atlanta',
      image: 'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/bmw-i7.webp',
      marketId: 'atlanta',
      airports: 'Hartsfield-Jackson Atlanta Int (ATL)',
      description: "Domestic North/South terminals and Maynard H. Jackson Jr. International Terminal. Professional meet-and-greet at the Atrium Clock Tower.",
      services: ['Atrium Meet & Greet', 'Buckhead Express Transit', 'Flight Tracking Buffer', '24/7 Dispatch Coordination']
    },
    {
      id: 'lax-bur',
      name: 'LAX & BUR',
      sublabel: 'LAX · BUR',
      image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-s-class.webp',
      marketId: 'los-angeles',
      airports: 'Los Angeles (LAX) & Hollywood Burbank (BUR)',
      description: "Outer commercial curb staging at Tom Bradley International (TBIT) and streamlined curbside arrivals at Hollywood Burbank Airport.",
      services: ['TBIT International Arrivals', 'Burbank Quick Curbside Meet', 'Beverly Hills & Century City', 'VIP Airport Chaperone']
    }
  ],
  suburbs: [
    {
      id: 'naperville',
      name: 'Naperville',
      sublabel: 'DuPage Co. · 35m ORD',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/promo-highway.webp',
      marketId: 'chicago',
      airports: 'Direct transfers to ORD (35 min) and MDW (40 min)',
      description: "Downtown Riverwalk, DuPage corporate campuses, and residential door-to-door service with guaranteed return staging.",
      services: ['Airport Transfers to ORD & MDW', 'Executive As-Directed Hourly', 'Same-Night Return Guarantee', 'Child Booster Seats Available']
    },
    {
      id: 'schaumburg',
      name: 'Schaumburg',
      sublabel: 'NW Hub · 18m ORD',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-s-class.webp',
      marketId: 'chicago',
      airports: "O'Hare International Airport (18 min)",
      description: "Northwest suburban commerce center and corporate offices. Fast access via I-90 and I-290 into O'Hare and Chicago Loop.",
      services: ['O\'Hare Express Transfer', 'Corporate Headquarters Roadshows', 'Hourly Chauffeur Service', 'Executive Sprinter Van Groups']
    },
    {
      id: 'oak-brook',
      name: 'Oak Brook',
      sublabel: 'PCS Hub · 20m ORD',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/cadillac-escalade-esv.webp',
      marketId: 'chicago',
      airports: 'ORD (22 min) · MDW (25 min)',
      description: "Oak Brook Promenade, Polo Club, corporate headquarters, and luxury hotels. 10 minutes from our Lombard dispatch headquarters.",
      services: ['Immediate Dispatch Proximity', 'Polo Club & Event Transfers', 'Corporate Roadshows', 'Airport Flat Rates']
    },
    {
      id: 'evanston',
      name: 'Evanston',
      sublabel: 'North Shore · 25m',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/bmw-i7.webp',
      marketId: 'chicago',
      airports: "O'Hare (28 min) · Midway (45 min)",
      description: "North Shore lakeside community, university events, and residential estates. Pre-dispatched buffer ensures on-time arrival.",
      services: ['North Shore Airport Service', 'University Commencements', 'Downtown Chicago Opera & Dining', 'Luxury Sedan & SUV Staging']
    },
    {
      id: 'elmhurst',
      name: 'Elmhurst',
      sublabel: 'DuPage · 15m ORD',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-s-class.webp',
      marketId: 'chicago',
      airports: "O'Hare Airport (15 min)",
      description: "Minutes from Lombard dispatch. Seamless executive transport to O'Hare, hospitals, and downtown business corridors.",
      services: ['Immediate Curbside Staging', 'O\'Hare Rapid Transit', 'Executive Corporate Accounts', 'Fixed Written Pricing']
    },
    {
      id: 'hinsdale',
      name: 'Hinsdale',
      sublabel: 'Cook / DuPage',
      image: 'https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/cadillac-escalade-esv.webp',
      marketId: 'chicago',
      airports: 'MDW (22 min) · ORD (25 min)',
      description: "Historic downtown, private residences, and fine dining. Dispatched with generous buffer times for pristine reliability.",
      services: ['Residential Airport Transfers', 'Private Executive Chauffeur', 'Special Occasion Limousines', 'Airport Flight Tracking']
    },
    {
      id: 'arlington-heights',
      name: 'Arlington Hts',
      sublabel: 'NW Corridor',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-jet-sprinter.webp',
      marketId: 'chicago',
      airports: 'ORD (20 min)',
      description: "Northwest suburban corridor and commercial venues. Door-to-door transfers with suited professional chauffeurs.",
      services: ['Northwest Airport Gateway', 'Executive Jet Sprinter Hire', 'Corporate Commuter Service', 'Zero Surge Pricing']
    },
    {
      id: 'aurora',
      name: 'Aurora',
      sublabel: 'Fox Valley · 45m',
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/promo-highway.webp',
      marketId: 'chicago',
      airports: 'ORD (45 min) · MDW (50 min)',
      description: "Fox Valley intercity corridor. Safe, comfortable highway transfers with complimentary in-vehicle Wi-Fi and chilled water.",
      services: ['Fox Valley Long Distance', 'Airport Flat Rates', 'Executive Motor Coaches', 'Corporate Account Billing']
    },
    {
      id: 'skokie',
      name: 'Skokie',
      sublabel: 'North Shore Link',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/bmw-i7.webp',
      marketId: 'chicago',
      airports: 'ORD (18 min) · MDW (40 min)',
      description: "North suburban commercial corridor, medical complexes, and luxury shopping centers. Guaranteed on-time staging.",
      services: ['North Shore Airport Link', 'Executive Roadshows', 'Hourly As-Directed', 'Commercial Fleet Staging']
    },
    {
      id: 'des-plaines',
      name: 'Des Plaines',
      sublabel: 'O\'Hare North 10m',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=600&q=80',
      fallback: '/services/airport-transportation.webp',
      marketId: 'chicago',
      airports: "O'Hare North Gateway (10 min)",
      description: "Immediate proximity to O'Hare international terminals and car rental centers. 24/7 on-demand chauffeur staging.",
      services: ['O\'Hare 10-Minute Rapid Staging', 'Casino & Hotel VIP Transfers', 'Flight Tracking Buffer', '24/7 Dispatch Hotline']
    },
    {
      id: 'lombard',
      name: 'Lombard (HQ)',
      sublabel: 'PCS Flagship HQ',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/mercedes-s-class.webp',
      marketId: 'chicago',
      airports: 'ORD (22 min) · MDW (25 min)',
      description: "Our corporate headquarters at 55 West 22nd Street. 24/7 live operations, vehicle maintenance bay, and executive dispatch center.",
      services: ['Corporate Headquarters Base', 'Direct 24/7 Person-to-Person Dispatch', 'Fleet Staging & Inspection Facility', 'Midwest Regional Dispatch']
    },
    {
      id: 'chicago-heights',
      name: 'Chicago Hts',
      sublabel: 'South Suburbs',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/cadillac-escalade-esv.webp',
      marketId: 'chicago',
      airports: 'Midway (35 min) · O\'Hare (55 min)',
      description: "South suburban transit corridor and commercial delivery. Suited professional drivers with FBI background clearance.",
      services: ['South Suburban Express', 'Midway Airport Priority', 'Corporate Accounts', 'Flat-Rate Written Quotes']
    },
    {
      id: 'long-distance',
      name: 'Long Distance',
      sublabel: 'Interstate Coach',
      image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
      fallback: '/fleet/promo-highway.webp',
      marketId: 'chicago',
      airports: 'Milwaukee (MKE), South Bend (SBN), Indianapolis (IND)',
      description: "Interstate long-distance luxury charters to Milwaukee, University of Notre Dame in South Bend, and Indianapolis. Executive Sprinters and 56-passenger motor coaches with onboard restroom and Wi-Fi.",
      services: ['Interstate Non-Stop Charters', 'Notre Dame Game Day Transfers', 'Milwaukee & Kohler Golf Trips', 'Indianapolis Business Expeditions']
    }
  ]
};
