"use client";

import { useState } from "react";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FaqPage() {
  const [query, setQuery] = useState("");

  const faqs = [
    { category: "Booking", q: "How do I book a home service on ServiceHub?", a: "Simply select your required service (e.g., AC Repair, Deep Cleaning, Plumbing), choose a convenient date & time slot, enter your doorstep address, and confirm your booking." },
    { category: "Booking", q: "Can I reschedule or cancel my appointment?", a: "Yes! You can reschedule or cancel your booking for free up to 2 hours before the scheduled time slot via your account dashboard or by calling support." },
    { category: "Safety & Quality", q: "Are ServiceHub professionals background-checked?", a: "Absolutely. All technicians undergo a mandatory 5-level verification process including Govt ID verification, police background checks, and hands-on technical trade evaluation." },
    { category: "Safety & Quality", q: "What does the 30-Day Guarantee cover?", a: "Our 30-day warranty covers any recurrence of the specific problem serviced. If an issue reoccurs within 30 days, we re-examine and fix it at zero extra charge." },
    { category: "Pricing & Payment", q: "Are there any hidden doorstep inspection charges?", a: "No. All prices on ServiceHub are fixed and displayed upfront before you confirm. If any additional spare part is required, the technician will request your explicit approval first." },
    { category: "Pricing & Payment", q: "What payment methods are supported?", a: "We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD)." },
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      <section className="container mx-auto px-4 md:px-6 py-12 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Got questions? We've got answers. Search below or browse common topics.
        </p>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-muted-foreground w-5 h-5" />
          <Input 
            placeholder="Search FAQs (e.g. cancellation, warranty, pricing)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-12 bg-card border-border rounded-full shadow-sm text-base"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-3xl py-6 space-y-4">
        {filteredFaqs.map((faq, idx) => (
          <div key={idx} className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <span>{faq.category}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{faq.q}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No matching questions found for "{query}". Try searching another keyword or contact support.
          </div>
        )}
      </section>

    </div>
  );
}
