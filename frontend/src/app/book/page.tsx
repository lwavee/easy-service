"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Calendar, Clock, MapPin, User, Phone, Sparkles, ShieldCheck, Utensils, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

function BookingForm() {
  const searchParams = useSearchParams();
  const rawService = searchParams.get("service") || "ac-repair";

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    service: rawService.includes("cook") ? "cooking" : rawService,
    specificWork: "",
    date: "",
    timeSlot: "10:00 AM - 12:00 PM",
    mealType: "Breakfast",
    selectedFoodItems: [] as string[],
    notes: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCookingService = formData.service === "cooking" || formData.service.includes("cook");

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
    if (formData.mealType === "Breakfast") return breakfastItems;
    if (formData.mealType === "Snacks") return snackItems;
    return lunchDinnerItems;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border p-10 rounded-3xl text-center max-w-xl mx-auto shadow-xl space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-foreground">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Thank you <span className="font-semibold text-foreground">{formData.fullName}</span>! Our background-verified expert has been assigned to your doorstep.
        </p>

        <div className="bg-muted/60 p-6 rounded-2xl text-left space-y-3 text-sm text-foreground border border-border">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID:</span>
            <span className="font-mono font-bold text-primary">SH-89420</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-semibold">{formData.fullName} ({formData.phone})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-semibold">{formData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-semibold capitalize">{formData.service.replace("-", " ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date & Time:</span>
            <span className="font-semibold">{formData.date || "Scheduled Date"}, {formData.timeSlot}</span>
          </div>

          {isCookingService && formData.selectedFoodItems.length > 0 && (
            <div className="pt-2 border-t border-border/80">
              <span className="text-muted-foreground block mb-1">Selected Meal Items ({formData.mealType}):</span>
              <div className="flex flex-wrap gap-1.5">
                {formData.selectedFoodItems.map((food, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                    {food}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button size="lg" className="rounded-full w-full font-semibold" onClick={() => window.location.href = "/"}>
          Back to Homepage
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Book Doorstep Service</h1>
          <p className="text-sm text-muted-foreground">Fill in your details for instant doorstep booking</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 px-3 py-1.5 rounded-full shrink-0">
          <ShieldCheck size={16} /> 30-Day Guarantee
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <User size={16} className="text-primary" /> Full Name
          </label>
          <Input 
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="h-12 bg-muted/50 border-border text-base"
          />
        </div>

        {/* 2. Mobile Number */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Phone size={16} className="text-primary" /> Mobile Phone Number
          </label>
          <Input 
            required
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="h-12 bg-muted/50 border-border text-base"
          />
        </div>

        {/* 3. Location / Address */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin size={16} className="text-primary" /> Location / Full Doorstep Address
          </label>
          <textarea 
            required
            rows={2}
            placeholder="House/Flat No., Building Name, Street Area & Pincode"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full p-3.5 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none text-foreground text-sm"
          />
        </div>

        {/* 4. Service (Specific Work Selection) */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> Service (Specific Work Required)
          </label>
          <select 
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value, selectedFoodItems: []})}
            className="w-full h-12 rounded-xl bg-muted/50 border border-border px-4 font-semibold text-foreground focus:outline-none focus:border-primary text-base"
          >
            <option value="ac-repair">AC Repair & Jet Servicing</option>
            <option value="car-foam-wash">Car & Bike Cleaning / Detailing</option>
            <option value="cleaning">Deep Home Cleaning</option>
            <option value="cooking">Cooking & Private Chef Service</option>
            <option value="electrician">Electrician & Electrical Appliance Repair</option>
            <option value="plumbing">Plumbing Leak & Fitting Repair</option>
            <option value="painting">Wall Painting & Waterproofing</option>
            <option value="handyman">Handyman & Furniture Assembly</option>
          </select>
        </div>

        {/* 5. Date & Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> Preferred Date
            </label>
            <Input 
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="h-12 bg-muted/50 border-border text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Preferred Time Slot
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
              className="w-full h-12 rounded-xl bg-muted/50 border border-border px-4 font-semibold text-foreground focus:outline-none focus:border-primary text-base"
            >
              <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
              <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              <option value="Express 60 Mins">Express Arrival (Under 60 mins)</option>
            </select>
          </div>
        </div>

        {/* 6. Conditional Cooking Food Item Selection */}
        {isCookingService && (
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <Utensils size={18} /> Select Food Items to be Prepared
            </div>

            {/* Meal Type Tabs */}
            <div className="flex rounded-xl bg-muted p-1 border border-border">
              {["Breakfast", "Lunch / Dinner", "Snacks"].map((meal) => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setFormData({...formData, mealType: meal.split(" ")[0]})}
                  className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all ${
                    formData.mealType === meal.split(" ")[0]
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>

            {/* Food Item Selection Pills */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-semibold">
                Tap items you want cooked ({formData.mealType}):
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {getFoodList().map((item) => {
                  const selected = formData.selectedFoodItems.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFoodItem(item)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        selected 
                          ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                          : "bg-card border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {selected && <Check size={14} />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <Button type="submit" size="lg" className="w-full rounded-2xl h-14 text-base font-bold shadow-lg shadow-primary/20 mt-4">
          Confirm Doorstep Booking
        </Button>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-20 container mx-auto px-4 md:px-6">
      <Suspense fallback={<div className="text-center py-20">Loading Booking Portal...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
