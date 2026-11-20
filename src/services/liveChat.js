// src/services/liveChat.js
// Mock human dispatch team live chat engine with realistic scripted responses by topic

const DISPATCH_AGENTS = [
  { name: 'Maria Santos', role: 'Senior Dispatcher', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
  { name: 'David Kowalski', role: 'Lead Logistics Coordinator', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { name: 'Marcus Sterling', role: 'Fleet Controller', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' }
];

export function getRandomDispatcher() {
  return DISPATCH_AGENTS[Math.floor(Math.random() * DISPATCH_AGENTS.length)];
}

export async function sendLiveChatMessage(chatId, userMessage, topic = 'general', contextData = null) {
  // Simulate network dispatch response latency (1.2 to 2.2 seconds)
  const delayMs = Math.floor(1200 + Math.random() * 1000);
  await new Promise(resolve => setTimeout(resolve, delayMs));

  const textLower = userMessage.toLowerCase();
  const agent = getRandomDispatcher();

  // 1. Airport Pickups / Flight Changes
  if (topic === 'Airport pickup' || textLower.includes('airport') || textLower.includes('flight') || textLower.includes('o\'hare') || textLower.includes('midway') || textLower.includes('terminal')) {
    return {
      agent,
      replyText: "Hello! I'm on dispatch radar monitoring all Chicago airspace runs. For airport transfers, our chauffeurs are staged 15 minutes before landing. We track your tail number in real-time, so delays or early arrivals are handled automatically at no extra charge. Would you like curbside greeting or inside baggage meet-and-greet?",
      quickReplies: ['Curbside pickup door', 'Baggage meet-and-greet', 'Check my flight ETA', 'Need to change time'],
      card: {
        type: 'airport_policy',
        title: 'Airport Grace Period Guarantee',
        details: '60 minutes domestic complimentary wait time · 90 minutes international from touchdown.'
      }
    };
  }

  // 2. Booking Changes or Status
  if (topic === 'Booking change' || textLower.includes('change') || textLower.includes('modify') || textLower.includes('reschedule') || textLower.includes('cancel') || textLower.includes('pcs-')) {
    return {
      agent,
      replyText: "I have your reservation history right here on our dispatch board. You can adjust your pickup time, add an extra stop, or upgrade vehicle class up to 2 hours before scheduled pickup without penalty. What modification would you like me to log for you?",
      quickReplies: ['Change pickup time', 'Add an intermediate stop', 'Upgrade vehicle', 'Speak to phone dispatcher']
    };
  }

  // 3. Written Quote Inquiries
  if (topic === 'Quote' || textLower.includes('quote') || textLower.includes('rate') || textLower.includes('cost') || textLower.includes('price')) {
    return {
      agent,
      replyText: "All our quotes are fixed, written, and all-inclusive—tolls, airport gate fees, 60-min wait time, and chauffeur gratuity are 100% included with zero surge pricing. I can prepare a written rate for you right now or finalize your submitted quote request.",
      quickReplies: ['Sedan rate to Loop', 'Cadillac Escalade ESV quote', 'Hourly charter quote', 'Send formal PDF quote']
    };
  }

  // 4. Corporate Direct Billing / Invoicing
  if (topic === 'Billing and invoice' || textLower.includes('corporate') || textLower.includes('billing') || textLower.includes('invoice') || textLower.includes('net 30')) {
    return {
      agent,
      replyText: "We provide dedicated corporate invoicing with Net-30 terms, named recurring chauffeurs, and itemized travel receipts for your expense department. Would you like me to send your accounting team our corporate billing agreement or add an authorized passenger?",
      quickReplies: ['Set up Net-30 invoice', 'Download trip receipt', 'Add billing code', 'Request insurance COI']
    };
  }

  // 5. Lost Items in Vehicle
  if (topic === 'Lost item' || textLower.includes('lost') || textLower.includes('left') || textLower.includes('forgot') || textLower.includes('bag')) {
    return {
      agent,
      replyText: "I am alerting our fleet operations team immediately. All vehicles are inspected by the chauffeur right after every drop-off. Please tell me which trip this was, and a description of the item so we can contact the driver right away.",
      quickReplies: ['Phone / Electronics', 'Luggage or coat', 'Wallet or documents', 'Call driver directly']
    };
  }

  // Default General Dispatcher Response
  return {
    agent,
    replyText: `Thank you for contacting Lombard 24/7 Dispatch. I've noted your request regarding "${userMessage}". Our dispatch desk has full authority to adjust bookings, coordinate emergency transfers, or issue written fixed quotes immediately. How may I best assist your schedule today?`,
    quickReplies: ['View available fleet', 'Check active chauffeur ETA', 'Book airport transfer', 'Call dispatch (+1 847-268-2323)']
  };
}
