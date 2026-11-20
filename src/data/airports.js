// src/data/airports.js
// 10 Airports strictly required: ORD, MDW (Chicago), JFK, LGA, EWR (New York), MIA, FLL (Miami), ATL (Atlanta), LAX, BUR (Los Angeles)

export const AIRPORTS = [
  {
    code: 'ORD',
    name: "O'Hare International Airport",
    city: 'Chicago, IL',
    cityId: 'chicago',
    terminals: ['Terminal 1 (United, Lufthansa)', 'Terminal 2 (Air Canada, JetBlue)', 'Terminal 3 (American, Alaska)', 'Terminal 5 (International Arrivals)'],
    meetGreetLocation: 'Baggage claim vestibule or Lower Level Door 5E',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'MDW',
    name: 'Midway International Airport',
    city: 'Chicago, IL',
    cityId: 'chicago',
    terminals: ['Main Terminal Concourse A', 'Concourse B (Southwest)', 'Concourse C'],
    meetGreetLocation: 'Lower Level baggage claim next to Information Desk',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    city: 'New York, NY',
    cityId: 'new-york',
    terminals: ['Terminal 1', 'Terminal 4 (Delta)', 'Terminal 5 (JetBlue)', 'Terminal 7', 'Terminal 8 (American)'],
    meetGreetLocation: 'Arrivals Hall with personalized digital name tablet',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'LGA',
    name: 'LaGuardia Airport',
    city: 'New York, NY',
    cityId: 'new-york',
    terminals: ['Terminal A (Marine Air)', 'Terminal B (Main Concourse)', 'Terminal C (Delta Sky Way)'],
    meetGreetLocation: 'Welcome Center / Baggage Claim Lower Level',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'EWR',
    name: 'Newark Liberty International Airport',
    city: 'Newark / New York, NJ',
    cityId: 'new-york',
    terminals: ['Terminal A (New Flagship)', 'Terminal B (International)', 'Terminal C (United Hub)'],
    meetGreetLocation: 'Baggage carousel greeting or Level 1 Limousine Stand',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'MIA',
    name: 'Miami International Airport',
    city: 'Miami, FL',
    cityId: 'miami',
    terminals: ['North Terminal (Concourse D)', 'Central Terminal (Concourses E, F, G)', 'South Terminal (Concourses H, J)'],
    meetGreetLocation: 'Customs Exit greeting or Carousel pickup door',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'FLL',
    name: 'Fort Lauderdale-Hollywood International Airport',
    city: 'Fort Lauderdale / Miami, FL',
    cityId: 'miami',
    terminals: ['Terminal 1 (Yellow)', 'Terminal 2 (Red)', 'Terminal 3 (Purple)', 'Terminal 4 (Green)'],
    meetGreetLocation: 'Ground Transportation greeting zone',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'ATL',
    name: 'Hartsfield-Jackson Atlanta International Airport',
    city: 'Atlanta, GA',
    cityId: 'atlanta',
    terminals: ['Domestic Terminal North', 'Domestic Terminal South (Delta)', 'Maynard H. Jackson Jr. International Terminal'],
    meetGreetLocation: 'Atrium Clock Tower or International Arrivals Hall',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'LAX',
    name: 'Los Angeles International Airport',
    city: 'Los Angeles, CA',
    cityId: 'los-angeles',
    terminals: ['Tom Bradley International (TBIT)', 'Terminals 1-3', 'Terminals 4-8'],
    meetGreetLocation: 'Outer curb VIP commercial lane or Baggage claim meet',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  },
  {
    code: 'BUR',
    name: 'Hollywood Burbank Airport',
    city: 'Burbank / Los Angeles, CA',
    cityId: 'los-angeles',
    terminals: ['Terminal A', 'Terminal B'],
    meetGreetLocation: 'Passenger pickup island opposite main exit',
    freeWaitDomestic: 60,
    freeWaitIntl: 90
  }
];
