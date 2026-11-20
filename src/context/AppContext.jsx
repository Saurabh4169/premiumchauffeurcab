// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CITIES, COMPANY_INFO } from '../data/cities.js';
import { INITIAL_TRIPS } from '../data/trips.js';
import { NOTIFICATIONS } from '../data/notifications.js';
import { FLEET } from '../data/fleet.js';

const AppContext = createContext(null);

const INITIAL_REQUESTS = [
  {
    id: 'QR-20481',
    type: 'quote',
    typeLabel: 'Quote Request',
    service: 'airport-transportation',
    serviceTitle: 'Airport Transportation',
    routeOrTopic: "O'Hare (ORD) Terminal 5 to The Langham Chicago",
    pickup: "O'Hare International Airport (ORD) Terminal 5",
    dropoff: "The Langham Chicago (330 N Wabash Ave)",
    date: '2026-11-24',
    time: '2:30 PM',
    passengers: 2,
    luggage: 3,
    vehicleType: 'Sedan (Cadillac XTS / Mercedes S-Class)',
    status: 'Quote sent',
    statusColor: 'success',
    createdAt: 'Today, 10:15 AM',
    quotedAmount: 'Fixed all-in quote',
    notes: 'Flight LH 431 arriving gate M14. Chauffeur meet inside baggage claim requested.',
    contactName: 'Brayan Richard',
    contactEmail: 'brayanrichard@gmai.com',
    contactPhone: '+1 (312) 555-0144'
  },
  {
    id: 'QR-19842',
    type: 'corporate',
    typeLabel: 'Corporate Account Query',
    service: 'corporate-executive',
    serviceTitle: 'Corporate & Executive',
    routeOrTopic: 'Monthly Net-30 Invoicing for Meridian Capital team',
    status: 'In review',
    statusColor: 'warning',
    createdAt: 'Yesterday, 3:45 PM',
    notes: 'Requesting direct billing setup for 12 executive board members traveling bi-weekly between Chicago and New York.',
    contactName: 'Brayan Richard',
    contactEmail: 'brayanrichard@gmai.com',
    contactPhone: '+1 (312) 555-0144'
  }
];

export function AppProvider({ children }) {
  // Active city
  const [activeCityId, setActiveCityId] = useState('chicago');
  const activeCity = CITIES.find(c => c.id === activeCityId) || CITIES[0];

  // User state
  const [user, setUser] = useState({
    isAuthenticated: true,
    name: 'Brayan Richard',
    email: 'brayanrichard@gmai.com',
    phone: '+1 (312) 555-0144',
    isCorporate: true,
    corporateCompany: 'Meridian Capital Chicago',
    billingCode: 'MCC-EXEC-701',
    preferences: {
      temperature: '70°F (Cool Comfort)',
      water: 'San Pellegrino Sparkling',
      quietRide: true,
      music: 'Soft Acoustic Jazz',
      baggageAssistance: true
    },
    savedAddresses: [
      { id: 'addr-1', label: 'Primary Residence', address: 'The Residences at St. Regis, 363 E Wacker Dr, Chicago', isDefault: true },
      { id: 'addr-2', label: 'Corporate Office', address: '55 West 22nd Street STE 140, Lombard, IL 60148', isDefault: false },
      { id: 'addr-3', label: 'Preferred Airport Gate', address: "O'Hare International Airport (ORD) Terminal 5", isDefault: false }
    ],
    savedPassengers: [
      { id: 'pax-1', name: 'Brayan Richard', phone: '+1 (312) 555-0144', email: 'brayanrichard@gmai.com', notes: 'Primary Client' },
      { id: 'pax-2', name: 'Eleanor Vance', phone: '+1 (312) 555-0188', email: 'e.vance@meridiancap.com', notes: 'Executive Partner' }
    ],
    paymentMethods: [
      { id: 'pm-1', type: 'amex', label: 'American Express Centurion', last4: '8821', expiry: '09/28', isDefault: true },
      { id: 'pm-2', type: 'visa', label: 'Chase Corporate Executive', last4: '4190', expiry: '12/27', isDefault: false },
      { id: 'pm-3', type: 'apple_pay', label: 'Apple Pay (Quick Authorize)', isDefault: false }
    ]
  });

  // =====================================
  // SAVE / FAVORITES FEATURE (PERSISTED)
  // =====================================
  const [savedVehicles, setSavedVehicles] = useState(() => {
    try {
      const stored = localStorage.getItem('pcs_saved_vehicles');
      return stored ? JSON.parse(stored) : ['cadillac-escalade-esv', 'mercedes-s-class'];
    } catch {
      return ['cadillac-escalade-esv', 'mercedes-s-class'];
    }
  });

  const [savedServices, setSavedServices] = useState(() => {
    try {
      const stored = localStorage.getItem('pcs_saved_services');
      return stored ? JSON.parse(stored) : ['airport-transportation', 'corporate-executive'];
    } catch {
      return ['airport-transportation', 'corporate-executive'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pcs_saved_vehicles', JSON.stringify(savedVehicles));
    } catch {}
  }, [savedVehicles]);

  useEffect(() => {
    try {
      localStorage.setItem('pcs_saved_services', JSON.stringify(savedServices));
    } catch {}
  }, [savedServices]);

  const isSaved = (type, id) => {
    if (type === 'vehicle') return savedVehicles.includes(id);
    return savedServices.includes(id);
  };

  const undoSave = (type, id) => {
    if (type === 'vehicle') {
      setSavedVehicles(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    } else {
      setSavedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    }
  };

  const toggleSave = (type, id, itemTitle = '') => {
    const currentlySaved = isSaved(type, id);
    if (currentlySaved) {
      if (type === 'vehicle') {
        setSavedVehicles(prev => prev.filter(v => v !== id));
      } else {
        setSavedServices(prev => prev.filter(s => s !== id));
      }
      showToast(`Removed from saved list`, 'info');
    } else {
      if (type === 'vehicle') {
        setSavedVehicles(prev => [...prev, id]);
      } else {
        setSavedServices(prev => [...prev, id]);
      }
      showToast('Saved to your list', 'success', {
        label: 'Undo',
        onClick: () => undoSave(type, id)
      });
    }
  };

  // =====================================
  // COMPARE FEATURE (SESSION STORAGE)
  // =====================================
  const [compareList, setCompareList] = useState(() => {
    try {
      const stored = sessionStorage.getItem('pcs_compare_list');
      return stored ? JSON.parse(stored) : { type: null, ids: [] };
    } catch {
      return { type: null, ids: [] };
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('pcs_compare_list', JSON.stringify(compareList));
    } catch {}
  }, [compareList]);

  const isInCompare = (id) => compareList.ids.includes(id);

  const toggleCompare = (type, id, itemTitle = '') => {
    // 1. Same type check
    if (compareList.type && compareList.type !== type && compareList.ids.length > 0) {
      showToast(`Finish or clear your ${compareList.type} comparison first`, 'warning');
      return;
    }

    // 2. If already in list -> remove
    if (compareList.ids.includes(id)) {
      setCompareList(prev => {
        const nextIds = prev.ids.filter(x => x !== id);
        return {
          type: nextIds.length > 0 ? prev.type : null,
          ids: nextIds
        };
      });
      showToast(`Removed from compare`, 'info');
      return;
    }

    // 3. Max 3 check
    if (compareList.ids.length >= 3) {
      showToast('You can compare up to 3', 'warning');
      return;
    }

    // 4. Add to compare list
    setCompareList(prev => ({
      type: type,
      ids: [...prev.ids, id]
    }));
    showToast(`Added to compare (${compareList.ids.length + 1}/3)`, 'info');
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => {
      const nextIds = prev.ids.filter(x => x !== id);
      return {
        type: nextIds.length > 0 ? prev.type : null,
        ids: nextIds
      };
    });
  };

  const clearCompare = () => {
    setCompareList({ type: null, ids: [] });
    showToast('Comparison cleared', 'info');
  };

  // Services Filter State
  const [servicesFilter, setServicesFilter] = useState({
    group: 'everyday',
    chip: 'All'
  });

  // Trips & Quotes state
  const [trips, setTrips] = useState(INITIAL_TRIPS);

  // Requests state
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const unreadRequestsCount = requests.filter(r => r.status === 'Quote sent' || r.status === 'In review').length;

  const addRequest = (newReq) => {
    setRequests(prev => [newReq, ...prev]);
  };

  // Live Chat state
  const [liveChatMessages, setLiveChatMessages] = useState([]);
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  // Notifications state
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Booking Draft State
  const [bookingDraft, setBookingDraft] = useState({
    serviceType: 'airport-transportation',
    pickup: '',
    dropoff: '',
    stops: [],
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:30 AM',
    passengers: 2,
    luggage: 3,
    childSeat: false,
    accessible: false,
    flightNumber: 'LH 431',
    flightLater: false,
    selectedVehicleId: 'mercedes-s-class',
    passengerName: 'Brayan Richard',
    passengerPhone: '+1 (312) 555-0144',
    passengerEmail: 'brayanrichard@gmai.com',
    specialRequests: 'Chilled sparkling water and quiet ride preferred',
    returnTrip: false,
    returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    returnTime: '4:00 PM',
    promoCode: '',
    paymentMethod: 'pm-1'
  });

  const updateBookingDraft = (updates) => {
    setBookingDraft(prev => ({ ...prev, ...updates }));
  };

  // Toast Notification System with Action / Undo support
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'info', action = null) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type, action }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Book trip helper
  const finalizeBooking = (calculatedQuote) => {
    const newId = `PCS-${Math.floor(10000 + Math.random() * 90000)}`;
    const selectedVehicle = FLEET.find(v => v.id === bookingDraft.selectedVehicleId) || FLEET[0];
    
    const newTrip = {
      id: newId,
      status: 'confirmed',
      statusLabel: 'Confirmed & Flight-Tracked',
      type: 'upcoming',
      service: bookingDraft.serviceType === 'airport-transportation' ? 'Airport Transportation' : 'Corporate Chauffeur',
      pickup: bookingDraft.pickup,
      dropoff: bookingDraft.dropoff,
      date: bookingDraft.date,
      time: bookingDraft.time,
      passengers: bookingDraft.passengers,
      luggage: bookingDraft.luggage,
      flightNumber: bookingDraft.flightNumber || null,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      vehicleCategory: selectedVehicle.categoryLabel,
      vehiclePlate: 'IL • ASSIGNED SOON',
      chauffeur: {
        name: 'Assigned 2 hours prior',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rating: 4.99,
        badge: 'Executive Chauffeur'
      },
      quote: calculatedQuote,
      total: 'Fixed all-in quote',
      timeline: [
        { step: 'Reservation Confirmed', time: 'Just Now', completed: true, note: 'Written flat quote locked' },
        { step: 'Chauffeur Dispatched', time: 'Pending', completed: false, note: 'Dispatched with 30m buffer' },
        { step: 'En Route to Pickup', time: 'Pending', completed: false, note: 'Real-time GPS tracking will activate' },
        { step: 'Arrived at Staging', time: 'Pending', completed: false, note: 'Chauffeur stages at door' },
        { step: 'Trip Completed', time: 'Pending', completed: false, note: 'Curbside or destination arrival' }
      ]
    };

    setTrips(prev => [newTrip, ...prev]);
    return newId;
  };

  return (
    <AppContext.Provider
      value={{
        activeCity,
        activeCityId,
        setActiveCityId,
        companyInfo: COMPANY_INFO,
        user,
        setUser,
        savedVehicles,
        savedServices,
        isSaved,
        toggleSave,
        undoSave,
        compareList,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        servicesFilter,
        setServicesFilter,
        trips,
        setTrips,
        requests,
        setRequests,
        addRequest,
        unreadRequestsCount,
        liveChatMessages,
        setLiveChatMessages,
        unreadChatCount,
        setUnreadChatCount,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        bookingDraft,
        updateBookingDraft,
        finalizeBooking,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
