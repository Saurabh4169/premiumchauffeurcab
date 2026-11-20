// src/data/notifications.js
// Grouped notifications: Today, Yesterday, Earlier

export const NOTIFICATIONS = [
  {
    id: 'notif-1',
    group: 'Today',
    time: '3:32 PM',
    title: 'Marcus is En Route',
    body: 'Your Mercedes S-Class (IL • VIP 709) is passing River North. Estimated arrival at The Langham is 3:42 PM.',
    type: 'trip',
    tripId: 'PCS-89241',
    read: false,
    icon: 'Car'
  },
  {
    id: 'notif-2',
    group: 'Today',
    time: '1:15 PM',
    title: 'Flight Tracked: LH 431',
    body: 'Your departure flight to Frankfurt is on time at ORD Terminal 5 Gate M18. Driver staging buffer calculated.',
    type: 'flight',
    tripId: 'PCS-89241',
    read: false,
    icon: 'Plane'
  },
  {
    id: 'notif-3',
    group: 'Yesterday',
    time: '4:20 PM',
    title: 'New Fixed Quote Ready',
    body: 'Your written all-inclusive quote for South Bend, IN (PCS-Q-99120) has been finalized at $456.00 flat.',
    type: 'quote',
    tripId: 'PCS-Q-99120',
    read: true,
    icon: 'FileText'
  },
  {
    id: 'notif-4',
    group: 'Yesterday',
    time: '9:00 AM',
    title: 'Chauffeur Assigned for Tomorrow',
    body: 'Darius Vance has been assigned to your McCormick Place transfer in a Cadillac Escalade ESV.',
    type: 'trip',
    tripId: 'PCS-89312',
    read: true,
    icon: 'UserCheck'
  },
  {
    id: 'notif-5',
    group: 'Earlier',
    time: 'Oct 18',
    title: 'Receipt for Trip PCS-88401',
    body: 'Thank you for riding from ORD Terminal 1 to The Peninsula. Your final receipt of $152.50 is ready.',
    type: 'receipt',
    tripId: 'PCS-88401',
    read: true,
    icon: 'Receipt'
  }
];
