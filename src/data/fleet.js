// src/data/fleet.js
// Strict 14 vehicles matching exact prompt specs

export const CATEGORIES = [
  { id: 'all', label: 'All Cars', count: 14, icon: 'Car' },
  { id: 'sedans', label: 'Sedans', count: 3, icon: 'Car' },
  { id: 'suvs', label: 'SUVs', count: 3, icon: 'Shield' },
  { id: 'limousines', label: 'Limousines', count: 2, icon: 'Crown' },
  { id: 'sprinter', label: 'Sprinter Vans', count: 1, icon: 'Truck' },
  { id: 'buses', label: 'Buses & Coaches', count: 5, icon: 'Bus' },
];

export const FLEET = [
  // SEDANS (3 pax, 3 bags)
  {
    id: 'cadillac-xts',
    slug: 'cadillac-xts',
    name: 'Cadillac XTS Luxury Sedan',
    shortName: 'Cadillac XTS',
    brand: 'Cadillac',
    year: '2024 Edition',
    category: 'sedans',
    categoryLabel: 'Executive Sedan',
    passengers: 3,
    luggage: 3,
    classRating: 'Executive Luxury',
    bestFor: "O'Hare & Midway airport transfers",
    headline: "Quiet, refined executive comfort for Chicago business & airport travel",
    description: "The gold standard for Chicago airport executive travel. Featuring plush hand-cut leather seating, tri-zone climate control, rear USB-C rapid charging, acoustic privacy glass, and ample trunk capacity for 3 full-sized checked suitcases. Driver included with professional gate meet-and-greet.",
    sampleEstimate: 115,
    hourlyRate: 85,
    minHours: 2,
    rating: 4.96,
    reviewsCount: 348,
    included: [
      'Chauffeur included & vetted',
      'Flight tracking on all airport runs',
      '60 min complimentary wait at airport',
      'Chilled still & sparkling bottled water',
      'Onboard high-speed 5G Wi-Fi',
      'Tolls, parking & gratuity included in written quote'
    ],
    features: ['Leather Seating', 'Acoustic Glass', 'Tri-Zone Climate', 'Bottled Water', 'USB-C Charging'],
    image: '/fleet/cadillac-xts.webp',
    gallery: [
      '/fleet/cadillac-xts.webp',
      '/fleet/cadillac-xts-interior.webp',
      '/fleet/cadillac-xts-rear.webp'
    ]
  },
  {
    id: 'mercedes-s-class',
    slug: 'mercedes-s-class',
    name: 'Mercedes-Benz S-Class S580',
    shortName: 'Mercedes S-Class',
    brand: 'Mercedes-Benz',
    year: '2025 Flagship',
    category: 'sedans',
    categoryLabel: 'Ultra-Luxury Sedan',
    passengers: 3,
    luggage: 3,
    classRating: 'Ultra-Luxury Flagship',
    bestFor: 'Client pickups, roadshows & VIP gala arrivals',
    headline: 'The pinnacle of global chauffeured luxury and sovereign ride smoothness',
    description: "Unrivaled prestige for C-suite roadshows and keynote arrivals. Equipped with executive rear reclining seating with calf support, active ambient lighting, Burmester 3D surround sound, acoustic dual-pane glazing, and active air suspension that glides over city pavements.",
    sampleEstimate: 165,
    hourlyRate: 115,
    minHours: 3,
    rating: 4.99,
    reviewsCount: 412,
    included: [
      'Executive-tier certified chauffeur',
      'Flight tracking with real-time ETA dispatch',
      '60 min free domestic wait (90 min intl)',
      'Fiji water, mints & hot hand towels upon request',
      'Encrypted mobile Wi-Fi terminal',
      'Fixed written all-inclusive quote'
    ],
    features: ['Reclining Executive Seats', 'Burmester 3D Sound', 'Rear Climate Controls', 'Ambient Lighting', 'Privacy Blinds'],
    image: '/fleet/mercedes-s-class.webp',
    gallery: [
      '/fleet/mercedes-s-class.webp',
      '/fleet/mercedes-s-class-interior.webp',
      '/fleet/mercedes-s-class-rear.webp'
    ]
  },
  {
    id: 'bmw-i7',
    slug: 'bmw-i7',
    name: 'BMW i7 xDrive60 All-Electric',
    shortName: 'BMW i7 Electric',
    brand: 'BMW',
    year: '2025 Electric Flagship',
    category: 'sedans',
    categoryLabel: 'Electric Luxury Sedan',
    passengers: 3,
    luggage: 3,
    classRating: 'Sustainable Executive Flagship',
    bestFor: 'Sustainable corporate travel & tech executive transfers',
    headline: 'Near-silent electric propulsion with executive 31-inch theater screen',
    description: "Zero-emission luxury aligned with corporate ESG mandates. Features near-silent acoustic cabin, rear executive lounge seating, dynamic panoramic Sky Lounge LED roof, and the 31.3-inch 8K BMW Theater Screen with Amazon Fire TV streaming for en route presentations.",
    sampleEstimate: 155,
    hourlyRate: 110,
    minHours: 2,
    rating: 4.98,
    reviewsCount: 189,
    included: [
      'Zero-emission ESG certified ride',
      'Chauffeur included & flight-tracked',
      '60 min free airport wait time',
      'Eco-packaged botanical spring waters',
      '31.3-inch 8K theater display for HDMI/AirPlay',
      'All tolls, fees & tip included in quote'
    ],
    features: ['31" Theater Screen', 'Sky Lounge LED Roof', 'Zero Emissions', 'Executive Lounge Seating', 'Wireless Charging'],
    image: '/fleet/bmw-i7.webp',
    gallery: [
      '/fleet/bmw-i7.webp',
      '/fleet/bmw-i7-interior.webp',
      '/fleet/bmw-i7-rear.webp'
    ]
  },

  // SUVS (6 pax, 6 bags)
  {
    id: 'cadillac-escalade-esv',
    slug: 'cadillac-escalade-esv',
    name: 'Cadillac Escalade ESV Platinum',
    shortName: 'Cadillac Escalade ESV',
    brand: 'Cadillac',
    year: '2025 Extended Edition',
    category: 'suvs',
    categoryLabel: 'Full-Size Luxury SUV',
    passengers: 6,
    luggage: 6,
    classRating: 'Flagship Luxury SUV',
    bestFor: 'Airport groups, VIP security & high-profile delegations',
    headline: 'Commanding presence with expansive extended-wheelbase luggage capacity',
    description: "The premier vehicle for VIP groups, family airport transfers, and executive roadshows. The ESV extended wheelbase provides deep cargo space for 6 oversized suitcases behind the 3rd row, paired with AKG Studio Reference 36-speaker sound, rear dual 12.6-inch displays, and heated/ventilated captain chairs.",
    sampleEstimate: 175,
    hourlyRate: 125,
    minHours: 3,
    rating: 4.99,
    reviewsCount: 620,
    included: [
      'Chauffeur included & background-checked',
      'Luggage assistance curbside and terminal',
      'Flight tracking & 60 min free wait',
      'Complimentary chilled waters & refreshments',
      'AKG Reference Sound & Rear Screens',
      'Fixed quote with zero surprises'
    ],
    features: ['Extended Cargo (6 Bags)', 'AKG 36-Speaker Audio', 'Rear Screens', 'Heated Captain Chairs', 'All-Wheel Drive'],
    image: '/fleet/cadillac-escalade-esv.webp',
    gallery: [
      '/fleet/cadillac-escalade-esv.webp',
      '/fleet/cadillac-escalade-esv-interior.webp',
      '/fleet/cadillac-escalade-esv-cargo.webp'
    ]
  },
  {
    id: 'chevrolet-suburban',
    slug: 'chevrolet-suburban',
    name: 'Chevrolet Suburban Premier',
    shortName: 'Chevrolet Suburban',
    brand: 'Chevrolet',
    year: '2024 Luxury Edition',
    category: 'suvs',
    categoryLabel: 'Executive Large SUV',
    passengers: 6,
    luggage: 6,
    classRating: 'Executive Large SUV',
    bestFor: 'Families, group airport transfers & suburb pickups',
    headline: 'Reliable group comfort with cavernous cargo and quiet highway composure',
    description: "The trusted workhorse of luxury group travel between Chicago downtown, Lombard, Naperville, and O'Hare/Midway. Spacious 3-row layout comfortably seats 6 adults with independent climate zones, generous legroom, and effortless capacity for 6 checked bags plus golf clubs.",
    sampleEstimate: 145,
    hourlyRate: 105,
    minHours: 2,
    rating: 4.94,
    reviewsCount: 480,
    included: [
      'Chauffeur included & suburb-expert driver',
      'Flight tracking on arrival with buffer time',
      '60 min complimentary wait at airport',
      'Child seats available upon request',
      'Spacious luggage hold for 6 large bags',
      'Tolls & gratuities built into written quote'
    ],
    features: ['Cavernous Cargo', 'Tri-Zone Climate', 'Child Seat Friendly', 'USB Ports All Rows', 'Tinted Privacy Glass'],
    image: '/fleet/chevrolet-suburban.webp',
    gallery: [
      '/fleet/chevrolet-suburban.webp',
      '/fleet/chevrolet-suburban-interior.webp',
      '/fleet/chevrolet-suburban-cargo.webp'
    ]
  },
  {
    id: 'lincoln-navigator-l',
    slug: 'lincoln-navigator-l',
    name: 'Lincoln Navigator L Reserve',
    shortName: 'Lincoln Navigator L',
    brand: 'Lincoln',
    year: '2024 Extended Edition',
    category: 'suvs',
    categoryLabel: 'Prestige Extended SUV',
    passengers: 6,
    luggage: 6,
    classRating: 'Executive Reserve SUV',
    bestFor: 'Corporate accounts & long-distance suburb travel',
    headline: 'Sanctuary cabin design with Perfect Position massage seating',
    description: "Engineered as an acoustic sanctuary. Lincoln's extended wheelbase Reserve edition boasts 30-way Perfect Position leather seats with Active Motion massage, Revel Ultima 28-speaker audio, power-deployable illuminated running boards, and immense rear storage.",
    sampleEstimate: 165,
    hourlyRate: 120,
    minHours: 3,
    rating: 4.97,
    reviewsCount: 310,
    included: [
      'Chauffeur included with formal attire',
      'Flight tracking & meet-and-greet in baggage claim',
      '60 min free wait domestic (90 min international)',
      'Revel Ultima audio & active noise cancellation',
      'Ample space for 6 suitcases + carry-ons',
      'All-inclusive written flat quote'
    ],
    features: ['30-Way Massage Seats', 'Revel Ultima Audio', 'Illuminated Running Boards', 'Active Noise Canceling', 'Panoramic Vista Roof'],
    image: '/fleet/lincoln-navigator-l.webp',
    gallery: [
      '/fleet/lincoln-navigator-l.webp',
      '/fleet/lincoln-navigator-l-interior.webp',
      '/fleet/lincoln-navigator-l-rear.webp'
    ]
  },

  // LIMOUSINES
  {
    id: 'lincoln-mkt-stretch',
    slug: 'lincoln-mkt-stretch',
    name: 'Lincoln MKT Stretch Limousine',
    shortName: 'Lincoln MKT Stretch',
    brand: 'Lincoln',
    year: 'Custom MasterCoach Edition',
    category: 'limousines',
    categoryLabel: 'Stretch Limousine',
    passengers: 10,
    luggage: 4,
    classRating: 'Traditional Formal Stretch',
    bestFor: 'Weddings, anniversaries & formal theater galas',
    headline: 'Timeless stretch elegance with perimeter J-seating and backlit bar consoles',
    description: "Classic American celebration transport crafted by certified Master Coachbuilders. Features full perimeter leather J-seating for 10 guests, fiber-optic starfield ceiling, dual champagne chillers with glassware, bluetooth multi-zone audio, and a solid privacy divider with hands-free chauffeur intercom.",
    sampleEstimate: 240,
    hourlyRate: 145,
    minHours: 3,
    rating: 4.97,
    reviewsCount: 275,
    included: [
      'Formally attired chauffeur included',
      'Complimentary champagne bucket with ice & flutes',
      'Custom mood fiber-optic lighting',
      'Bluetooth premium sound system',
      'Red carpet rollout available for brides',
      'Written all-in quote including tip & fuel'
    ],
    features: ['10-Guest J-Lounge', 'Starfield Ceiling', 'Dual Champagne Bars', 'Privacy Divider Intercom', 'Bluetooth Sound'],
    image: '/fleet/lincoln-mkt-stretch.webp',
    gallery: [
      '/fleet/lincoln-mkt-stretch.webp',
      '/fleet/lincoln-mkt-stretch-interior.webp',
      '/fleet/lincoln-mkt-stretch-bar.webp'
    ]
  },
  {
    id: 'hummer-h2-stretch',
    slug: 'hummer-h2-stretch',
    name: 'Hummer H2 Super Stretch Limo',
    shortName: 'Hummer H2 Stretch',
    brand: 'Hummer',
    year: 'Celebrity Edition',
    category: 'limousines',
    categoryLabel: 'Super Stretch SUV Limo',
    passengers: 18,
    luggage: 2, // carry-on only
    classRating: 'Super Stretch Statement',
    bestFor: 'Bachelor & bachelorette parties, proms & concert nights',
    headline: 'High-impact nightlife arrival with club-level laser lighting and bass',
    description: "The ultimate statement vehicle for energetic celebrations. Accommodates up to 18 passengers (carry-on bags only) with triple lounge seating sections, laser light shows, dynamic disco flooring, multiple LCD displays, 2,000-watt sound system, and two mirrored full-length bar stations.",
    sampleEstimate: 320,
    hourlyRate: 185,
    minHours: 4,
    rating: 4.95,
    reviewsCount: 390,
    included: [
      'Chauffeur included & dedicated party concierge',
      'Two mirrored bars with ice chests & drinkware',
      'Club laser lighting & dynamic disco floor',
      'High-output 2000W subwoofer sound system',
      'Privacy partition & intercom',
      'Fixed written quote with gratuity included'
    ],
    features: ['18-Guest Capacity', 'Club Laser Lighting', 'Mirrored Full Bars', '2000W Subwoofer Audio', 'Carry-On Only Spec'],
    image: '/fleet/hummer-h2-stretch.webp',
    gallery: [
      '/fleet/hummer-h2-stretch.webp',
      '/fleet/hummer-h2-stretch-interior.webp',
      '/fleet/hummer-h2-stretch-lighting.webp'
    ]
  },

  // SPRINTER (14 pax, 14 bags)
  {
    id: 'mercedes-jet-sprinter',
    slug: 'mercedes-jet-sprinter',
    name: 'Mercedes-Benz Jet Sprinter Executive Van',
    shortName: 'Mercedes Jet Sprinter',
    brand: 'Mercedes-Benz',
    year: '2025 Bespoke Edition',
    category: 'sprinter',
    categoryLabel: 'Executive Jet Sprinter',
    passengers: 14,
    luggage: 14,
    classRating: 'First-Class Jet Van',
    bestFor: 'Executive teams, conference shuttles & golf outings',
    headline: 'Private jet luxury on wheels with full stand-up headroom and 14 dedicated bags',
    description: "Custom-configured for executive teams who need to collaborate on the move. Features 6'4\" standing headroom, 14 individual diamond-stitched leather captain chairs, dual 43-inch Smart TVs with Apple TV/HDMI screen share, conference tables, 110V AC power outlets at every seat, and an isolated rear luggage bay fitting 14 full-sized bags.",
    sampleEstimate: 260,
    hourlyRate: 165,
    minHours: 3,
    rating: 4.99,
    reviewsCount: 520,
    included: [
      'Certified commercial chauffeur included',
      'Flight tracking & curbside or gate coordination',
      'Rear luggage hold for 14 large bags + golf bags',
      'Dual 43" 4K Smart TVs with HDMI & AirPlay',
      'High-speed 5G Wi-Fi & 110V power outlets',
      'Written fixed quote with no hidden charges'
    ],
    features: ['Stand-Up Headroom 6\'4"', '14 Captain Seats', 'Dedicated 14-Bag Hold', 'Dual 43" 4K Displays', 'Conference Tables'],
    image: '/fleet/mercedes-jet-sprinter.webp',
    gallery: [
      '/fleet/mercedes-jet-sprinter.webp',
      '/fleet/mercedes-jet-sprinter-interior.webp',
      '/fleet/mercedes-jet-sprinter-work.webp'
    ]
  },

  // BUSES AND COACHES (5 vehicles)
  {
    id: '20-pax-party-bus',
    slug: '20-pax-party-bus',
    name: '20-Pax Ford F-450 Custom Party Bus',
    shortName: '20-Pax Party Bus',
    brand: 'Ford F-450 Super Duty',
    year: '2024 Custom Build',
    category: 'buses',
    categoryLabel: 'Boutique Party Bus',
    passengers: 20,
    luggage: 8,
    classRating: 'Boutique Celebration Coach',
    bestFor: 'Birthday celebrations, winery tours & concert tailgates',
    headline: 'Intimate party lounge with perimeter leather banquettes and LED light shows',
    description: "Built on a heavy-duty Ford F-450 chassis for a smooth, stable ride. Accommodates 20 guests in perimeter two-tone leather wrap-around seating. Fitted with two granite-topped bar stations, high-end Bluetooth audio with punchy bass, smart TV, and color-changing LED canopy lighting.",
    sampleEstimate: 290,
    hourlyRate: 175,
    minHours: 4,
    rating: 4.94,
    reviewsCount: 215,
    included: [
      'Commercial chauffeur included',
      'Granite-topped bar with ice wells',
      'Bluetooth sound with subwoofers',
      'LED mood & party lighting',
      'Fixed written quote with driver tip'
    ],
    features: ['20 Guests', 'Perimeter Leather Banquettes', 'Granite Bars', 'Bluetooth Sound', 'Smart TV'],
    image: '/fleet/20-pax-party-bus.webp',
    gallery: [
      '/fleet/20-pax-party-bus.webp',
      '/fleet/20-pax-party-bus-interior.webp'
    ]
  },
  {
    id: '24-pax-limo-bus',
    slug: '24-pax-limo-bus',
    name: '24-Pax International Limo Bus',
    shortName: '24-Pax Limo Bus',
    brand: 'International Commercial',
    year: '2024 Executive Build',
    category: 'buses',
    categoryLabel: 'Mid-Size Limo Bus',
    passengers: 24,
    luggage: 10,
    classRating: 'Executive Limo Bus',
    bestFor: 'Wedding guest shuttles, corporate team outings & vineyard hops',
    headline: 'Spacious elegance bridging formal limousine luxury with mini-coach comfort',
    description: "The ideal balance of elegance and capacity for wedding parties and corporate galas. Smooth air-ride suspension, wide center aisle, plush leather contour seating for 24, rear luggage compartment, illuminated bar wells, and warm ambient architectural lighting.",
    sampleEstimate: 330,
    hourlyRate: 195,
    minHours: 4,
    rating: 4.96,
    reviewsCount: 190,
    included: [
      'Licensed CDL chauffeur included',
      'Air-ride smooth highway suspension',
      'Generous luggage storage',
      'Ice bins and beverage station',
      'All-in quote with zero fuel surcharges'
    ],
    features: ['24 Passengers', 'Air-Ride Comfort', 'Wide Walk-Through Aisle', 'Illuminated Bar Bins', 'Bluetooth Audio'],
    image: '/fleet/24-pax-limo-bus.webp',
    gallery: [
      '/fleet/24-pax-limo-bus.webp',
      '/fleet/24-pax-limo-bus-interior.webp'
    ]
  },
  {
    id: '28-pax-party-bus',
    slug: '28-pax-party-bus',
    name: '28-Pax Ford F-650 Big-Rig Party Bus',
    shortName: '28-Pax Party Bus',
    brand: 'Ford F-650 Heavy Duty',
    year: '2025 Custom Edition',
    category: 'buses',
    categoryLabel: 'Heavy-Duty Party Bus',
    passengers: 28,
    luggage: 12,
    classRating: 'Heavy-Duty Celebration Bus',
    bestFor: 'Major wedding parties, game day transfers & bar crawls',
    headline: 'High-energy nightclub atmosphere on a robust commercial chassis',
    description: "Built on the rugged Ford F-650 platform, this 28-passenger party bus provides extraordinary room to socialize, dance, and celebrate. Equipped with dual 50-inch 4K screens, concert sound with dual 12-inch subwoofers, fiber-optic ceiling, and two oversized iced beverage coolers.",
    sampleEstimate: 360,
    hourlyRate: 215,
    minHours: 4,
    rating: 4.97,
    reviewsCount: 310,
    included: [
      'Commercial CDL chauffeur included',
      'Dual 50" 4K Smart TVs with screen mirroring',
      'Massive sound system with Bluetooth',
      'Dual oversized beverage bars',
      'Gratuity, tolls & cleaning buffer included'
    ],
    features: ['28 Passengers', 'Dual 50" 4K Screens', '12" Subwoofers', 'Fiber-Optic Ceiling', 'Two Large Bars'],
    image: '/fleet/28-pax-party-bus.webp',
    gallery: [
      '/fleet/28-pax-party-bus.webp',
      '/fleet/28-pax-party-bus-interior.webp'
    ]
  },
  {
    id: '36-pax-executive-bus',
    slug: '36-pax-executive-bus',
    name: '36-Pax Freightliner Executive Shuttle Bus',
    shortName: '36-Pax Executive Bus',
    brand: 'Freightliner M2',
    year: '2024 Executive Build',
    category: 'buses',
    categoryLabel: 'Corporate Shuttle Coach',
    passengers: 36,
    luggage: 36,
    classRating: 'Executive Shuttle Coach',
    bestFor: 'McCormick Place conventions, roadshows & corporate retreats',
    headline: 'Forward-facing corporate luxury with dedicated underbelly luggage bays',
    description: "Designed for corporate group logistics and convention delegates. Forward-facing high-back leather executive reclining seats with personal reading lights, retractable armrests, USB & AC power at each row, overhead parcel racks, and full underbelly luggage compartments accommodating 36 suitcases.",
    sampleEstimate: 420,
    hourlyRate: 240,
    minHours: 4,
    rating: 4.98,
    reviewsCount: 280,
    included: [
      'Professional CDL executive chauffeur',
      'Underbelly luggage bays fitting 36 bags',
      'Onboard public address (PA) microphone system',
      'High-speed Wi-Fi & AC power sockets at every row',
      'Fixed written contract pricing'
    ],
    features: ['36 Executive Recliners', '36 Full Bag Bays', 'PA Microphone System', 'High-Speed Wi-Fi', 'Overhead Parcel Racks'],
    image: '/fleet/36-pax-executive-bus.webp',
    gallery: [
      '/fleet/36-pax-executive-bus.webp',
      '/fleet/36-pax-executive-bus-interior.webp'
    ]
  },
  {
    id: '56-pax-luxury-coach',
    slug: '56-pax-luxury-coach',
    name: '56-Pax Motor Coach Luxury Tourliner',
    shortName: '56-Pax Luxury Coach',
    brand: 'Prevost / MCI Luxury',
    year: '2025 Tourliner',
    category: 'buses',
    categoryLabel: 'Full-Size Luxury Motor Coach',
    passengers: 56,
    luggage: 56,
    classRating: 'Flagship Motor Coach',
    bestFor: 'Interstate charters (Milwaukee, Indianapolis, South Bend) & large conferences',
    headline: 'Ultimate intercity touring comfort with onboard restroom and cavernous bay storage',
    description: "The gold standard for large-scale passenger movements across the Midwest and beyond. Equipped with 56 plush reclining European leather seats with adjustable footrests, clean onboard private lavatory, five overhead video monitors with DVD/HDMI, panoramic tinted touring windows, and cavernous below-floor storage for 56+ heavy travel bags.",
    sampleEstimate: 580,
    hourlyRate: 295,
    minHours: 5,
    rating: 4.99,
    reviewsCount: 340,
    included: [
      'Certified interstate motorcoach chauffeur',
      'Private clean onboard lavatory',
      'Massive pass-through luggage bays for 56 bags',
      'Multiple video monitors with HDMI & PA mic',
      'All highway tolls, permits & gratuity included in written quote'
    ],
    features: ['56 Luxury Recliners', 'Private Onboard Lavatory', '56+ Below-Floor Bags', '5 Video Monitors', 'Midwest Interstate Certified'],
    image: '/fleet/56-pax-luxury-coach.webp',
    gallery: [
      '/fleet/56-pax-luxury-coach.webp',
      '/fleet/56-pax-luxury-coach-interior.webp'
    ]
  }
];

export const VEHICLES = FLEET;
export const getVehicleById = (id) => FLEET.find(v => v.id === id || v.slug === id) || FLEET[0];
