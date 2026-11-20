// src/data/cities.js
// 5 core metropolitan markets + HQ in Lombard, IL

export const CITIES = [
  {
    id: 'chicago',
    name: 'Chicago & Suburbs',
    state: 'IL',
    tag: 'Headquarters & Primary Hub',
    airports: ['ORD', 'MDW'],
    hqAddress: '55 West 22nd Street STE 140, Lombard, IL 60148',
    phone: '+1 847-268-2323',
    popularLocations: [
      { name: "O'Hare International Airport (ORD) Terminal 5", category: 'Airport' },
      { name: 'Midway International Airport (MDW)', category: 'Airport' },
      { name: 'The Langham Chicago (330 N Wabash Ave)', category: 'Luxury Hotel' },
      { name: 'The Peninsula Chicago (108 E Superior St)', category: 'Luxury Hotel' },
      { name: 'Four Seasons Hotel Chicago (120 E Delaware Pl)', category: 'Luxury Hotel' },
      { name: 'McCormick Place Convention Center', category: 'Convention' },
      { name: 'United Center (1901 W Madison St)', category: 'Arena' },
      { name: 'Wrigley Field (1060 W Addison St)', category: 'Stadium' },
      { name: 'Willis Tower (233 S Wacker Dr)', category: 'Corporate' },
      { name: '55 West 22nd St, Lombard (HQ)', category: 'HQ Office' },
      { name: 'Oak Brook Promenade & Polo Club', category: 'Suburb' },
      { name: 'Downtown Naperville Riverwalk', category: 'Suburb' },
      { name: 'Highland Park / Lake Forest Estates', category: 'North Shore' },
      { name: 'Milwaukee Downtown / Mitchell Field (MKE)', category: 'Interstate Transfer' },
      { name: 'University of Notre Dame, South Bend, IN', category: 'Interstate Transfer' },
      { name: 'Indianapolis Motor Speedway & Downtown', category: 'Interstate Transfer' }
    ]
  },
  {
    id: 'new-york',
    name: 'New York City',
    state: 'NY',
    tag: 'Tri-State Executive Corridor',
    airports: ['JFK', 'LGA', 'EWR'],
    phone: '+1 847-268-2323',
    popularLocations: [
      { name: 'JFK International Airport Terminal 4', category: 'Airport' },
      { name: 'LaGuardia Airport Terminal B', category: 'Airport' },
      { name: 'Newark Liberty Terminal A (EWR)', category: 'Airport' },
      { name: 'The Carlyle, A Rosewood Hotel (Madison Ave)', category: 'Luxury Hotel' },
      { name: 'The Plaza Hotel (Fifth Avenue)', category: 'Luxury Hotel' },
      { name: 'One World Trade Center / Wall St', category: 'Financial' },
      { name: 'Midtown Manhattan (Hudson Yards)', category: 'Corporate' },
      { name: 'Greenwich, CT & Westchester Country Clubs', category: 'Suburb' }
    ]
  },
  {
    id: 'miami',
    name: 'Miami & South Florida',
    state: 'FL',
    tag: 'South Florida Prestige Hub',
    airports: ['MIA', 'FLL'],
    phone: '+1 847-268-2323',
    popularLocations: [
      { name: 'Miami International Airport (MIA)', category: 'Airport' },
      { name: 'Fort Lauderdale-Hollywood Int (FLL)', category: 'Airport' },
      { name: 'Faena Hotel Miami Beach (Collins Ave)', category: 'Luxury Resort' },
      { name: 'The Setai Miami Beach', category: 'Luxury Resort' },
      { name: 'Brickell Financial District (Brickell Ave)', category: 'Financial' },
      { name: 'PortMiami Cruise Terminal VIP Staging', category: 'Seaport' },
      { name: 'Palm Beach Worth Avenue & The Breakers', category: 'Prestige' }
    ]
  },
  {
    id: 'atlanta',
    name: 'Atlanta',
    state: 'GA',
    tag: 'Southeast Corporate Capital',
    airports: ['ATL'],
    phone: '+1 847-268-2323',
    popularLocations: [
      { name: 'Hartsfield-Jackson Atlanta Int (ATL)', category: 'Airport' },
      { name: 'The St. Regis Atlanta (Buckhead)', category: 'Luxury Hotel' },
      { name: 'Four Seasons Hotel Atlanta (Midtown)', category: 'Luxury Hotel' },
      { name: 'Mercedes-Benz Stadium VIP Suite Gate', category: 'Stadium' },
      { name: 'Alpharetta Tech Corridor', category: 'Corporate' }
    ]
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    tag: 'West Coast Entertainment Hub',
    airports: ['LAX', 'BUR'],
    phone: '+1 847-268-2323',
    popularLocations: [
      { name: 'Los Angeles International Airport (LAX) TBIT', category: 'Airport' },
      { name: 'Hollywood Burbank Airport (BUR)', category: 'Airport' },
      { name: 'The Beverly Hills Hotel (Sunset Blvd)', category: 'Luxury Hotel' },
      { name: 'Hotel Bel-Air (Stone Canyon Rd)', category: 'Luxury Resort' },
      { name: 'Century City Executive Center', category: 'Corporate' },
      { name: 'SoFi Stadium VIP Lot 1', category: 'Arena' },
      { name: 'Newport Beach & Pelican Hill', category: 'Coastal' }
    ]
  }
];

export const COMPANY_INFO = {
  name: 'Premium Chauffeur Services',
  phone: '+1 847-268-2323',
  phoneDisplay: '(847) 268-2323',
  email: 'info@premiumchauffeurservices.com',
  address: '55 West 22nd Street STE 140, Lombard, IL 60148',
  hours: '24/7 Dispatch answered by a real person',
  tagline: 'The car is there before you are.',
  licenseInfo: 'Licensed, Insured & Background Checked Commercial Chauffeurs'
};
