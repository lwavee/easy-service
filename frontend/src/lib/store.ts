import { Booking, Client, Employee, ServiceItem, Quote, Review } from "@/types";

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "HT-98210",
    clientName: "Rahul Sharma",
    clientPhone: "+91 98765 43210",
    clientEmail: "rahul.sharma@example.com",
    location: "B-402, Sunshine Heights, Powai, Mumbai",
    pincode: "400076",
    serviceId: "ac-repair",
    serviceName: "AC Foam Jet Service & Cooling Inspection",
    date: "2026-07-28",
    timeSlot: "11:00 AM - 01:00 PM",
    notes: "Master bedroom Split AC not cooling properly.",
    totalAmount: 1299,
    status: "in_progress",
    assignedEmployeeId: "EMP-101",
    assignedEmployeeName: "Rajesh Kumar",
    assignedEmployeePhone: "+91 91234 56789",
    assignedEmployeeRating: 4.9,
    assignedEmployeeAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    startOtp: "4829",
    createdAt: "2026-07-27T18:30:00Z",
    paymentStatus: "cod",
  },
  {
    id: "HT-98205",
    clientName: "Ananya Roy",
    clientPhone: "+91 99887 76655",
    clientEmail: "ananya.roy@example.com",
    location: "Flat 1201, Orchid Towers, HSR Layout, Bengaluru",
    pincode: "560102",
    serviceId: "cleaning",
    serviceName: "Deep Full Home Cleaning (3 BHK)",
    date: "2026-07-29",
    timeSlot: "09:00 AM - 11:00 AM",
    notes: "Please pay extra attention to balcony and kitchen tiles.",
    totalAmount: 3499,
    status: "assigned",
    assignedEmployeeId: "EMP-102",
    assignedEmployeeName: "Sanjay Patel",
    assignedEmployeePhone: "+91 98112 23344",
    assignedEmployeeRating: 4.8,
    assignedEmployeeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    startOtp: "7104",
    createdAt: "2026-07-27T15:10:00Z",
    paymentStatus: "paid",
  },
  {
    id: "HT-98199",
    clientName: "Vikram Malhotra",
    clientPhone: "+91 97654 32109",
    clientEmail: "vikram.m@example.com",
    location: "House 45, Green Glen Layout, Bellandur, Bengaluru",
    pincode: "560103",
    serviceId: "plumbing",
    serviceName: "Bathroom Leak Repair & Tap Replacement",
    date: "2026-07-28",
    timeSlot: "02:00 PM - 04:00 PM",
    notes: "Main shower mixer valve leaking heavily.",
    totalAmount: 699,
    status: "pending",
    startOtp: "2951",
    createdAt: "2026-07-28T01:15:00Z",
    paymentStatus: "pending",
  },
  {
    id: "HT-98150",
    clientName: "Priya Nair",
    clientPhone: "+91 91122 33445",
    clientEmail: "priya.nair@example.com",
    location: "C-12, Palm Meadows, Whitefield, Bengaluru",
    pincode: "560066",
    serviceId: "cooking",
    serviceName: "Private Home Chef - Special Feast",
    date: "2026-07-26",
    timeSlot: "06:00 PM - 08:00 PM",
    mealType: "Lunch / Dinner",
    foodItems: ["Paneer Butter Masala", "Dal Makhani", "Veg Biryani", "Butter Roti & Naan", "Gulab Jamun"],
    totalAmount: 1899,
    status: "completed",
    assignedEmployeeId: "EMP-103",
    assignedEmployeeName: "Chef Amit Verma",
    assignedEmployeePhone: "+91 93344 55667",
    assignedEmployeeRating: 5.0,
    assignedEmployeeAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80",
    startOtp: "8832",
    createdAt: "2026-07-26T10:00:00Z",
    completedAt: "2026-07-26T20:30:00Z",
    rating: 5,
    reviewText: "Chef Amit cooked delicious restaurant-style food for our anniversary party! Impeccable hygiene and presentation.",
    paymentStatus: "paid",
  }
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: "CL-501",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    address: "B-402, Sunshine Heights, Powai, Mumbai",
    pincode: "400076",
    totalBookings: 6,
    totalSpent: 8450,
    rating: 4.9,
    tier: "VIP",
    joinedDate: "2025-11-12",
    notes: "Prefers morning slots between 10 AM - 12 PM."
  },
  {
    id: "CL-502",
    name: "Ananya Roy",
    phone: "+91 99887 76655",
    email: "ananya.roy@example.com",
    address: "Flat 1201, Orchid Towers, HSR Layout, Bengaluru",
    pincode: "560102",
    totalBookings: 3,
    totalSpent: 7200,
    rating: 5.0,
    tier: "Regular",
    joinedDate: "2026-01-05",
    notes: "Has a friendly golden retriever at home."
  },
  {
    id: "CL-503",
    name: "Vikram Malhotra",
    phone: "+91 97654 32109",
    email: "vikram.m@example.com",
    address: "House 45, Green Glen Layout, Bellandur, Bengaluru",
    pincode: "560103",
    totalBookings: 1,
    totalSpent: 699,
    rating: 4.5,
    tier: "New",
    joinedDate: "2026-07-28"
  },
  {
    id: "CL-504",
    name: "Priya Nair",
    phone: "+91 91122 33445",
    email: "priya.nair@example.com",
    address: "C-12, Palm Meadows, Whitefield, Bengaluru",
    pincode: "560066",
    totalBookings: 8,
    totalSpent: 14200,
    rating: 5.0,
    tier: "VIP",
    joinedDate: "2025-08-20"
  }
];

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-101",
    name: "Rajesh Kumar",
    phone: "+91 91234 56789",
    email: "rajesh.ac@servicehub.com",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    primarySkill: "AC Repair & Servicing",
    skills: ["AC Repair & Servicing", "Electrician & Appliance Repair"],
    city: "Mumbai & Thane",
    status: "busy",
    rating: 4.9,
    totalJobsCompleted: 342,
    earningsToday: 2450,
    earningsThisMonth: 58400,
    activeJobId: "HT-98210",
    verified: true
  },
  {
    id: "EMP-102",
    name: "Sanjay Patel",
    phone: "+91 98112 23344",
    email: "sanjay.clean@servicehub.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    primarySkill: "Deep Home Cleaning",
    skills: ["Deep Home Cleaning", "Sofa & Carpet Cleaning", "Pest Control"],
    city: "Bengaluru",
    status: "busy",
    rating: 4.8,
    totalJobsCompleted: 215,
    earningsToday: 1800,
    earningsThisMonth: 46200,
    activeJobId: "HT-98205",
    verified: true
  },
  {
    id: "EMP-103",
    name: "Chef Amit Verma",
    phone: "+91 93344 55667",
    email: "chef.amit@servicehub.com",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80",
    primarySkill: "Private Chef & Cooking",
    skills: ["Private Chef & Cooking", "Party Catering"],
    city: "Bengaluru",
    status: "active",
    rating: 5.0,
    totalJobsCompleted: 189,
    earningsToday: 0,
    earningsThisMonth: 62000,
    verified: true
  },
  {
    id: "EMP-104",
    name: "Vikrant Singh",
    phone: "+91 98711 22334",
    email: "vikrant.plumb@servicehub.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    primarySkill: "Plumbing & Fitting",
    skills: ["Plumbing & Fitting", "Water Heater Repair"],
    city: "Bengaluru",
    status: "active",
    rating: 4.7,
    totalJobsCompleted: 410,
    earningsToday: 1200,
    earningsThisMonth: 51000,
    verified: true
  }
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "ac-repair",
    title: "AC Foam Jet Service & Cooling Check",
    categoryId: "appliance",
    basePrice: 699,
    duration: "60 mins",
    description: "Deep foam jet cleaning of indoor cooling coils, outdoor condenser unit wash, gas check & filter sterilization.",
    inclusions: ["Foam jet pressure wash of cooling coils", "Outdoor unit high pressure wash", "Gas pressure check", "30-Day service warranty"],
    exclusions: ["Spare parts & refrigerant gas top-up extra if required"],
    popular: true
  },
  {
    id: "cleaning",
    title: "Full Home Deep Cleaning",
    categoryId: "cleaning",
    basePrice: 2499,
    duration: "4 - 5 hrs",
    description: "Machine scrub of floors, kitchen oil degreasing, bathroom descaling, balcony cleaning & window track vacuuming.",
    inclusions: ["2-3 Trained pros with industrial machines", "Eco-friendly disinfectant chemicals", "Kitchen degreasing & exhaust hood scrub", "Bathroom stain removal"],
    popular: true
  },
  {
    id: "plumbing",
    title: "Plumbing Repair & Leakage Fix",
    categoryId: "plumbing",
    basePrice: 399,
    duration: "45 mins",
    description: "Expert resolution for leaking taps, flush tank issues, washbasin clogged drains & pipe installations.",
    inclusions: ["Inspection & fault diagnosis", "Fixing tap/pipe leaks & washers", "Post-service leak testing"],
    popular: true
  },
  {
    id: "electrician",
    title: "Electrician Appliance & Wiring Repair",
    categoryId: "electrical",
    basePrice: 299,
    duration: "45 mins",
    description: "Repair of MCB trips, switches, ceiling fans, chandeliers, geyser wiring & main breaker boards.",
    inclusions: ["Background verified certified electrician", "Safe diagnostic tools", "30-Day warranty"],
    popular: true
  },
  {
    id: "cooking",
    title: "Private Chef & Event Cook Service",
    categoryId: "chef",
    basePrice: 1499,
    duration: "2 - 3 hrs",
    description: "Hygienic multi-course meal preparation right at home. Custom menu for breakfast, lunch, dinner or intimate house parties.",
    inclusions: ["Meal preparation by professional chef", "Customized recipe choices", "Kitchen counter cleanup post cooking"],
    popular: true
  },
  {
    id: "painting",
    title: "Wall Painting & Waterproofing",
    categoryId: "painting",
    basePrice: 4999,
    duration: "1 - 3 days",
    description: "Laser measurement, wall dampness check, premium Royale/Emulsion coats with zero mess drop sheet protection.",
    inclusions: ["On-site color consultation", "Wall crack filling & sanding", "Furniture plastic wrapping"],
    popular: false
  }
];

const INITIAL_QUOTES: Quote[] = [
  {
    id: "QT-701",
    clientName: "Mehta Enterprises",
    clientPhone: "+91 98200 11223",
    clientEmail: "contact@mehtaent.com",
    projectTitle: "Office Renovation & Commercial Deep Scrub",
    description: "Complete painting & deep floor scrubbing for 3,500 sq ft office space.",
    lineItems: [
      { description: "3,500 sqft Wall Painting Dual Coat", qty: 3500, unitPrice: 18 },
      { description: "Industrial Floor Scrubbing & Polishing", qty: 1, unitPrice: 8500 },
      { description: "AC Duct Deep Sterilization", qty: 8, unitPrice: 1200 }
    ],
    totalEstimatedCost: 81100,
    status: "sent",
    createdAt: "2026-07-25",
    validUntil: "2026-08-10"
  }
];

// Helper functions for localStorage state persistence
const STORAGE_KEYS = {
  BOOKINGS: "easy_service_bookings",
  CLIENTS: "easy_service_clients",
  EMPLOYEES: "easy_service_employees",
  SERVICES: "easy_service_services",
  QUOTES: "easy_service_quotes"
};

export const getStoredBookings = (): Booking[] => {
  if (typeof window === "undefined") return INITIAL_BOOKINGS;
  const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    return INITIAL_BOOKINGS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_BOOKINGS;
  }
};

export const saveBookings = (bookings: Booking[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }
};

export const getStoredClients = (): Client[] => {
  if (typeof window === "undefined") return INITIAL_CLIENTS;
  const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
    return INITIAL_CLIENTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_CLIENTS;
  }
};

export const saveClients = (clients: Client[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }
};

export const getStoredEmployees = (): Employee[] => {
  if (typeof window === "undefined") return INITIAL_EMPLOYEES;
  const stored = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
    return INITIAL_EMPLOYEES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_EMPLOYEES;
  }
};

export const saveEmployees = (employees: Employee[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }
};

export const getStoredServices = (): ServiceItem[] => {
  if (typeof window === "undefined") return INITIAL_SERVICES;
  const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    return INITIAL_SERVICES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_SERVICES;
  }
};

export const saveServices = (services: ServiceItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }
};

export const getStoredQuotes = (): Quote[] => {
  if (typeof window === "undefined") return INITIAL_QUOTES;
  const stored = localStorage.getItem(STORAGE_KEYS.QUOTES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(INITIAL_QUOTES));
    return INITIAL_QUOTES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_QUOTES;
  }
};

export const saveQuotes = (quotes: Quote[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }
};
