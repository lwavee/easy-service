export type BookingStatus =
  | "pending"
  | "assigned"
  | "en_route"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "cod";

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
}

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  location: string;
  pincode?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  selectedAddons?: BookingAddon[];
  totalAmount: number;
  status: BookingStatus;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  assignedEmployeePhone?: string;
  assignedEmployeeRating?: number;
  assignedEmployeeAvatar?: string;
  startOtp: string;
  createdAt: string;
  completedAt?: string;
  rating?: number;
  reviewText?: string;
  paymentStatus: PaymentStatus;
  mealType?: string;
  foodItems?: string[];
  extraCharges?: { description: string; amount: number }[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  totalBookings: number;
  totalSpent: number;
  rating: number;
  tier: "VIP" | "Regular" | "New";
  joinedDate: string;
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  primarySkill: string;
  skills: string[];
  city: string;
  status: "active" | "busy" | "offline";
  rating: number;
  totalJobsCompleted: number;
  earningsToday: number;
  earningsThisMonth: number;
  activeJobId?: string;
  verified: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  categoryId: string;
  basePrice: number;
  duration: string;
  description: string;
  inclusions: string[];
  exclusions?: string[];
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  itemCount: number;
}

export interface QuoteLineItem {
  description: string;
  qty: number;
  unitPrice: number;
}

export interface Quote {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  projectTitle: string;
  description: string;
  lineItems: QuoteLineItem[];
  totalEstimatedCost: number;
  status: "draft" | "sent" | "approved" | "rejected";
  createdAt: string;
  validUntil: string;
}

export interface Review {
  id: string;
  bookingId: string;
  clientName: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
}
