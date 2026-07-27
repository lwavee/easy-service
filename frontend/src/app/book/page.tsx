"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, Calendar, Clock, MapPin, User, Phone, 
  Sparkles, ShieldCheck, Utensils, Check, ArrowRight, Star
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Booking, Client } from "@/types";
import { getStoredBookings, saveBookings, getStoredClients, saveClients, getStoredEmployees } from "@/lib/store";

const breakfastItems = [
  "Samosa", "Kachori", "Poha", "Idli & Dosa", "Pasta", 
  "Aloo Paratha", "Upma", "Sandwich", "Chole Bhature", "Puri Bhaji", "Special Tea & Coffee"
];

const lunchDinnerItems = [
  "Paneer Butter Masala", "Dal Makhani", "Veg / Chicken Biryani", "Butter Roti & Naan", 
  "Jeera Rice", "Rajma Chawal", "Mix Veg Korma", "Gulab Jamun & Desserts"
];

const snackItems = [
  "Pakoda", "French Fries", "Spring Roll", "Momos", "Cold Coffee", "Cutlet"
];

const SERVICE_PRICES: Record<string, { title: string; price: number }> = {
  "ac-repair": { title: "AC Foam Jet Service & Cooling Inspection", price: 699 },
  "car-foam-wash": { title: "Car & Bike Foam Wash Detailing", price: 599 },
  "cleaning": { title: "Full Home Deep Cleaning", price: 2499 },
  "cooking": { title: "Private Home Chef & Meal Service", price: 1499 },
  "electrician": { title: "Electrician Appliance & Wiring Repair", price: 299 },
  "plumbing": { title: "Plumbing Leakage & Tap Fix", price: 399 },
  "painting": { title: "Wall Painting & Waterproofing", price: 4999 },
  "handyman": { title: "Handyman & Furniture Assembly", price: 449 },
};

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawService = searchParams.get("service") || "ac-repair";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    pincode: "400076",
    service: rawService.includes("cook") ? "cooking" : (SERVICE_PRICES[rawService] ? rawService : "ac-repair"),
    date: new Date().toISOString().split("T")[0],
    timeSlot: "11:00 AM - 01:00 PM",
    mealType: "Lunch / Dinner",
    selectedFoodItems: [] as string[],
    notes: ""
  });

  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const isCookingService = formData.service === "cooking" || formData.service.includes("cook");
  const selectedServiceInfo = SERVICE_PRICES[formData.service] || SERVICE_PRICES["ac-repair"];

  const toggleFoodItem = (item: string) => {
    setFormData(prev => {
      const exists = prev.selectedFoodItems.includes(item);
      if (exists) {
        return { ...prev, selectedFoodItems: prev.selectedFoodItems.filter(i => i !== item) };
      } else {
        return { ...prev, selectedFoodItems: [...prev.selectedFoodItems, item] };
      }
    });
  };

  const getFoodList = () => {
    if (formData.mealType.includes("Breakfast")) return breakfastItems;
    if (formData.mealType.includes("Snacks")) return snackItems;
    return lunchDinnerItems;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomId = `HT-${Math.floor(90000 + Math.random() * 9999)}`;
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

    // Auto-match random available employee if possible
    const employees = getStoredEmployees();
    const matchedEmp = employees.find(e => e.status === "active") || employees[0];

    const newBooking: Booking = {
      id: randomId,
      clientName: formData.fullName,
      clientPhone: formData.phone,
      clientEmail: formData.email || `${formData.fullName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      location: formData.location,
      pincode: formData.pincode,
      serviceId: formData.service,
      serviceName: selectedServiceInfo.title,
      date: formData.date,
      timeSlot: formData.timeSlot,
      notes: formData.notes,
      totalAmount: selectedServiceInfo.price,
      status: "assigned",
      assignedEmployeeId: matchedEmp ? matchedEmp.id : undefined,
      assignedEmployeeName: matchedEmp ? matchedEmp.name : undefined,
      assignedEmployeePhone: matchedEmp ? matchedEmp.phone : undefined,
      assignedEmployeeRating: matchedEmp ? matchedEmp.rating : 4.9,
      assignedEmployeeAvatar: matchedEmp ? matchedEmp.avatar : undefined,
      startOtp: randomOtp,
      createdAt: new Date().toISOString(),
      paymentStatus: "cod",
      mealType: isCookingService ? formData.mealType : undefined,
      foodItems: isCookingService ? formData.selectedFoodItems : undefined
    };

    // Save Booking to store
    const existingBookings = getStoredBookings();
    const updatedBookings = [newBooking, ...existingBookings];
    saveBookings(updatedBookings);

    // Save / update Client record
    const existingClients = getStoredClients();
    const clientExists = existingClients.find(c => c.phone === formData.phone);
    if (!clientExists) {
      const newClient: Client = {
        id: `CL-${Math.floor(500 + Math.random() * 400)}`,
        name: formData.fullName,
        phone: formData.phone,
        email: newBooking.clientEmail!,
        address: formData.location,
        pincode: formData.pincode,
        totalBookings: 1,
        totalSpent: selectedServiceInfo.price,
        rating: 5.0,
        tier: "New",
        joinedDate: new Date().toISOString().split("T")[0]
      };
      saveClients([newClient, ...existingClients]);
    } else {
      const updatedClients = existingClients.map(c => {
        if (c.phone === formData.phone) {
          return {
            ...c,
            totalBookings: c.totalBookings + 1,
            totalSpent: c.totalSpent + selectedServiceInfo.price
          };
        }
        return c;
      });
      saveClients(updatedClients);
    }

    setCreatedBooking(newBooking);
  };

  if (createdBooking) {
    return (
      <div className="bg-card border border-border p-8 md:p-12 rounded-3xl text-center max-w-xl mx-auto shadow-2xl space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        
        <div>
          <h2 className="text-3xl font-extrabold text-foreground">Doorstep Booking Confirmed!</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Thank you <span className="font-bold text-foreground">{createdBooking.clientName}</span>! Your home expert is on standby.
          </p>
        </div>

        {/* Start OTP Highlight Box */}
        <div className="bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/30 p-5 rounded-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Give this OTP to Expert when they arrive:
          </span>
          <span className="text-4xl font-mono font-extrabold text-primary tracking-widest block mt-1">
            {createdBooking.startOtp}
          </span>
        </div>

        {/* Assigned Technician Card */}
        {createdBooking.assignedEmployeeName && (
          <div className="bg-muted/50 p-4 rounded-2xl border border-border flex items-center gap-4 text-left">
            <img 
              src={createdBooking.assignedEmployeeAvatar} 
              alt={createdBooking.assignedEmployeeName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/30"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-primary block">Assigned Verified Expert</span>
              <h4 className="font-bold text-foreground">{createdBooking.assignedEmployeeName}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Star size={12} className="fill-amber-400 text-amber-400" /> {createdBooking.assignedEmployeeRating} Rating
                <span>•</span>
                <a href={`tel:${createdBooking.assignedEmployeePhone}`} className="text-primary font-bold hover:underline">
                  {createdBooking.assignedEmployeePhone}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-muted/40 p-5 rounded-2xl text-left space-y-2.5 text-xs text-foreground border border-border">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-semibold">Booking ID:</span>
            <span className="font-mono font-bold text-primary">{createdBooking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-semibold">Service:</span>
            <span className="font-bold">{createdBooking.serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-semibold">Address:</span>
            <span className="font-bold">{createdBooking.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-semibold">Date & Time:</span>
            <span className="font-bold">{createdBooking.date}, {createdBooking.timeSlot}</span>
          </div>
          <div className="flex justify-between border-t border-border/80 pt-2 text-sm">
            <span className="text-muted-foreground font-bold">Total Payable Amount:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{createdBooking.totalAmount} (Cash / UPI)</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link 
            href="/bookings"
            className={cn(buttonVariants({ size: "lg" }), "rounded-2xl w-full font-bold h-12 shadow-lg shadow-primary/20 justify-center")}
          >
            Track Live Order Status <ArrowRight size={16} className="ml-2" />
          </Link>

          <Link 
            href="/services"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl w-full font-bold h-12 justify-center")}
          >
            Book Another Service
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Book Doorstep Expert</h1>
          <p className="text-xs text-muted-foreground">Select date, slot & address for instant technician dispatch</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full shrink-0 border border-primary/20">
          <ShieldCheck size={16} /> 30-Day Guarantee
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Full Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-2">
            <User size={16} className="text-primary" /> Full Name *
          </label>
          <Input 
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="h-12 bg-muted/40 border-border text-sm"
          />
        </div>

        {/* 2. Mobile Number & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-2">
              <Phone size={16} className="text-primary" /> Mobile Phone Number *
            </label>
            <Input 
              required
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="h-12 bg-muted/40 border-border text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-2">
              Email Address (Optional)
            </label>
            <Input 
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="h-12 bg-muted/40 border-border text-sm"
            />
          </div>
        </div>

        {/* 3. Location / Address */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-2">
            <MapPin size={16} className="text-primary" /> Doorstep Service Address *
          </label>
          <textarea 
            required
            rows={2}
            placeholder="Flat/House No., Building Name, Street Area & Pincode"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full p-3 rounded-2xl bg-muted/40 border border-border focus:border-primary outline-none text-foreground text-sm"
          />
        </div>

        {/* 4. Service Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-2 justify-between">
            <span className="flex items-center gap-2"><Sparkles size={16} className="text-primary" /> Select Expert Service</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
              Standard Price: ₹{selectedServiceInfo.price}
            </span>
          </label>
          <select 
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value, selectedFoodItems: []})}
            className="w-full h-12 rounded-2xl bg-muted/40 border border-border px-4 font-bold text-foreground focus:outline-none focus:border-primary text-sm"
          >
            <option value="ac-repair">AC Foam Jet Service & Cooling Inspection (₹699)</option>
            <option value="cleaning">Full Home Deep Cleaning - 3 BHK (₹2,499)</option>
            <option value="plumbing">Plumbing Leakage & Tap Fix (₹399)</option>
            <option value="electrician">Electrician Appliance & Wiring Repair (₹299)</option>
            <option value="cooking">Private Home Chef & Meal Service (₹1,499)</option>
            <option value="car-foam-wash">Car & Bike Foam Wash Detailing (₹599)</option>
            <option value="painting">Wall Painting & Waterproofing (₹4,999)</option>
            <option value="handyman">Handyman & Furniture Assembly (₹449)</option>
          </select>
        </div>

        {/* 5. Date & Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> Preferred Date *
            </label>
            <Input 
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="h-12 bg-muted/40 border-border text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Preferred Arrival Slot
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
              className="w-full h-12 rounded-2xl bg-muted/40 border border-border px-4 font-bold text-foreground focus:outline-none focus:border-primary text-sm"
            >
              <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
              <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              <option value="Express 60 Mins">Express Arrival (Under 60 mins)</option>
            </select>
          </div>
        </div>

        {/* Conditional Chef Meal Selection */}
        {isCookingService && (
          <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Utensils size={18} /> Select Food Items to be Prepared
            </div>

            <div className="flex rounded-xl bg-muted p-1 border border-border">
              {["Breakfast", "Lunch / Dinner", "Snacks"].map((meal) => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setFormData({...formData, mealType: meal})}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    formData.mealType === meal
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground font-bold">
                Tap items you want cooked ({formData.mealType}):
              </p>
              <div className="flex flex-wrap gap-2">
                {getFoodList().map((item) => {
                  const selected = formData.selectedFoodItems.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFoodItem(item)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1 ${
                        selected 
                          ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                          : "bg-card border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {selected && <Check size={12} />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full rounded-2xl h-14 text-base font-extrabold shadow-xl shadow-primary/20 mt-4">
          Confirm & Dispatch Expert (₹{selectedServiceInfo.price})
        </Button>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-20 container mx-auto px-4 md:px-6">
      <Suspense fallback={<div className="text-center py-20">Loading Doorstep Booking Portal...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
