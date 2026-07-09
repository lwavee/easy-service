"use client";

import { useState } from "react";

export default function BookingForm({ serviceName }: { serviceName: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Mock API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="bg-green-50/10 backdrop-blur-md border border-green-500/20 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground">
          Thank you for booking {serviceName}. We will contact you shortly to confirm the details.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
        >
          Book Another Service
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-foreground mb-6">Book {serviceName}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <input
              required
              type="text"
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <input
              required
              type="tel"
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service Address</label>
          <textarea
            required
            rows={3}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            placeholder="Enter your full address"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Date</label>
            <input
              required
              type="date"
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Time</label>
            <select
              required
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
            >
              <option value="">Select a time</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Special Instructions (Optional)</label>
          <textarea
            rows={2}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            placeholder="Any specific requirements?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-primary text-primary-foreground font-semibold rounded-xl px-4 py-4 mt-4 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
        >
          {status === "submitting" ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </form>
    </div>
  );
}
