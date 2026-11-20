// src/data/sampleRates.js
// Single source of truth for sample estimates used in demo AI bookings and quote cards.
// All dollar figures in the assistant are labeled "Sample estimate".
// Real quotes are confirmed in writing by 24/7 Lombard dispatch.

export const SAMPLE_RATES = {
  // Base flat rates by vehicle category for standard Chicago airport transfer (ORD/MDW <-> Loop)
  airportFlat: {
    'cadillac-xts': { base: 115.00, tolls: 8.50, parking: 0.00, waitComp: '60m free', gratuity: 25.00, total: 148.50 },
    'mercedes-s-class': { base: 165.00, tolls: 8.50, parking: 0.00, waitComp: '60m free', gratuity: 35.00, total: 208.50 },
    'bmw-i7': { base: 175.00, tolls: 8.50, parking: 0.00, waitComp: '60m free', gratuity: 37.00, total: 220.50 },
    'cadillac-escalade-esv': { base: 185.00, tolls: 9.50, parking: 0.00, waitComp: '60m free', gratuity: 39.00, total: 233.50 },
    'chevrolet-suburban': { base: 165.00, tolls: 9.50, parking: 0.00, waitComp: '60m free', gratuity: 35.00, total: 209.50 },
    'lincoln-navigator-l': { base: 185.00, tolls: 9.50, parking: 0.00, waitComp: '60m free', gratuity: 39.00, total: 233.50 },
    'lincoln-mkt-stretch': { base: 225.00, tolls: 10.00, parking: 0.00, waitComp: '60m free', gratuity: 47.00, total: 282.00 },
    'hummer-h2-stretch': { base: 295.00, tolls: 10.00, parking: 0.00, waitComp: '60m free', gratuity: 61.00, total: 366.00 },
    'mercedes-jet-sprinter': { base: 285.00, tolls: 12.00, parking: 0.00, waitComp: '60m free', gratuity: 60.00, total: 357.00 },
    'party-bus-20': { base: 350.00, tolls: 15.00, parking: 0.00, waitComp: '60m free', gratuity: 73.00, total: 438.00 },
    'limo-bus-24': { base: 395.00, tolls: 15.00, parking: 0.00, waitComp: '60m free', gratuity: 82.00, total: 492.00 },
    'party-bus-28': { base: 450.00, tolls: 18.00, parking: 0.00, waitComp: '60m free', gratuity: 94.00, total: 562.00 },
    'executive-bus-36': { base: 520.00, tolls: 20.00, parking: 0.00, waitComp: '60m free', gratuity: 108.00, total: 648.00 },
    'luxury-coach-56': { base: 650.00, tolls: 25.00, parking: 0.00, waitComp: '60m free', gratuity: 135.00, total: 810.00 }
  },

  // Hourly as-directed standard minimums (3-hour minimum for sedans/SUVs, 4-hour for stretch/buses)
  hourlyRates: {
    'cadillac-xts': { ratePerHour: 85.00, minHours: 3 },
    'mercedes-s-class': { ratePerHour: 115.00, minHours: 3 },
    'bmw-i7': { ratePerHour: 125.00, minHours: 3 },
    'cadillac-escalade-esv': { ratePerHour: 135.00, minHours: 3 },
    'chevrolet-suburban': { ratePerHour: 120.00, minHours: 3 },
    'lincoln-navigator-l': { ratePerHour: 135.00, minHours: 3 },
    'lincoln-mkt-stretch': { ratePerHour: 165.00, minHours: 4 },
    'hummer-h2-stretch': { ratePerHour: 220.00, minHours: 4 },
    'mercedes-jet-sprinter': { ratePerHour: 195.00, minHours: 4 },
    'party-bus-20': { ratePerHour: 240.00, minHours: 4 },
    'limo-bus-24': { ratePerHour: 265.00, minHours: 4 },
    'party-bus-28': { ratePerHour: 295.00, minHours: 4 },
    'executive-bus-36': { ratePerHour: 340.00, minHours: 5 },
    'luxury-coach-56': { ratePerHour: 420.00, minHours: 5 }
  }
};

/**
 * Build an itemized quote estimate for a given vehicle and service.
 * @param {string} vehicleId
 * @param {string} serviceType
 * @param {object} options
 */
export function buildSampleQuote(vehicleId = 'cadillac-escalade-esv', serviceType = 'airport-transportation', options = {}) {
  const rateData = SAMPLE_RATES.airportFlat[vehicleId] || SAMPLE_RATES.airportFlat['cadillac-escalade-esv'];
  const isHourly = serviceType === 'hourly-chauffeur';
  
  if (isHourly) {
    const hourly = SAMPLE_RATES.hourlyRates[vehicleId] || SAMPLE_RATES.hourlyRates['cadillac-escalade-esv'];
    const hours = options.hours || hourly.minHours;
    const base = hourly.ratePerHour * hours;
    const gratuity = Math.round(base * 0.20);
    const tolls = 15.00;
    const total = base + gratuity + tolls;
    return {
      isHourly: true,
      hours,
      baseFare: base.toFixed(2),
      tolls: tolls.toFixed(2),
      parking: '0.00',
      waitComp: 'Included in hourly charter',
      gratuity: gratuity.toFixed(2),
      total: total.toFixed(2),
      badge: 'Sample estimate',
      footnote: 'Final all-in price is confirmed in writing by dispatch before your ride. Gratuity and standard tolls included.'
    };
  }

  return {
    isHourly: false,
    baseFare: rateData.base.toFixed(2),
    tolls: rateData.tolls.toFixed(2),
    parking: rateData.parking.toFixed(2),
    waitComp: rateData.waitComp,
    gratuity: rateData.gratuity.toFixed(2),
    total: rateData.total.toFixed(2),
    badge: 'Sample estimate',
    footnote: 'Final all-in price is confirmed in writing by dispatch before your ride. Gratuity and standard tolls included.'
  };
}
