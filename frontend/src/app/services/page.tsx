"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, Star, Clock, CheckCircle2, 
  Wrench, Zap, Droplets, Paintbrush, Home, Utensils, Bug, ArrowRight, FileText
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getStoredQuotes, saveQuotes } from "@/lib/store";
import { Quote } from "@/types";

const CATEGORIES = [
  { id: "all", name: "All Home Services", icon: Sparkles },
  { id: "appliance", name: "AC & Appliances", icon: Wrench },
  { id: "cleaning", name: "Deep Cleaning", icon: Home },
  { id: "plumbing", name: "Plumbing Fixes", icon: Droplets },
  { id: "electrical", name: "Electrician", icon: Zap },
  { id: "chef", name: "Chef & Cooking", icon: Utensils },
  { id: "painting", name: "Wall Painting", icon: Paintbrush },
  { id: "pest", name: "Pest Control", icon: Bug },
];

const SERVICES_LIST = [
  {
    id: "ac-repair",
    category: "appliance",
    title: "AC Foam Jet Service & Cooling Inspection",
    price: 699,
    originalPrice: 999,
    rating: 4.9,
    reviews: 1420,
    duration: "60 Mins",
    description: "High pressure foam jet washing of indoor cooling coil, outdoor unit spray wash, refrigerant leak test & filter sanitization.",
    inclusions: ["Foam jet pressure wash", "Outdoor condenser flush", "Gas pressure check", "30-Day Doorstep Warranty"],
    popular: true
  },
  {
    id: "cleaning",
    category: "cleaning",
    title: "Full Home Deep Cleaning (3 BHK)",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 980,
    duration: "4 - 5 Hours",
    description: "Industrial machine scrubbing of floors, kitchen grease removal, bathroom descaling, window tracks & balcony cleaning.",
    inclusions: ["3 Trained verified experts", "Eco-friendly disinfectant chemicals", "Kitchen oil degreasing", "Bathroom stain removal"],
    popular: true
  },
  {
    id: "plumbing",
    category: "plumbing",
    title: "Plumbing Repair & Pipe Leakage Fix",
    price: 399,
    originalPrice: 599,
    rating: 4.7,
    reviews: 850,
    duration: "45 Mins",
    description: "Expert fixing of leaking taps, washbasin trap unclogging, flush tank valve replacement & shower fitting repair.",
    inclusions: ["Fault diagnosis & leak test", "Tap & washer repairs", "Post-repair cleanup"],
    popular: true
  },
  {
    id: "electrician",
    category: "electrical",
    title: "Electrician Appliance & Wiring Repair",
    price: 299,
    originalPrice: 450,
    rating: 4.9,
    reviews: 2100,
    duration: "45 Mins",
    description: "MCB trip diagnosis, switch replacement, ceiling fan installation, geyser wiring check & main circuit breaker fixes.",
    inclusions: ["Certified electrician visit", "Safety isolation tools", "30-Day warranty"],
    popular: true
  },
  {
    id: "cooking",
    category: "chef",
    title: "Private Chef & Party Cook Service",
    price: 1499,
    originalPrice: 1999,
    rating: 5.0,
    reviews: 620,
    duration: "2 - 3 Hours",
    description: "Hygienic multi-course meal preparation right at home. Custom menu for breakfast, lunch, dinner or intimate house parties.",
    inclusions: ["Professional master chef", "Customized recipe choices", "Kitchen counter cleanup post cooking"],
    popular: true
  },
  {
    id: "painting",
    category: "painting",
    title: "Full Home Wall Painting & Waterproofing",
    price: 4999,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 430,
    duration: "1 - 3 Days",
    description: "Laser measurement, wall dampness check, premium Royale/Emulsion coats with zero mess drop sheet protection.",
    inclusions: ["On-site color consultation", "Wall crack filling & sanding", "Furniture plastic wrapping"],
    popular: false
  },
  {
    id: "pest",
    category: "pest",
    title: "Cockroach & Pest Control Odorless Spray",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 510,
    duration: "45 Mins",
    description: "Government-approved odorless gel & spray application targeting kitchen cabinets, drain pipes, and wall crevices.",
    inclusions: ["Odorless gel application", "Drain pipe spray treatment", "90-Day protection guarantee"],
    popular: false
  }
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteReq, setQuoteReq] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const filteredServices = selectedCategory === "all" 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === selectedCategory);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;

    const newQuote: Quote = {
      id: `QT-${Math.floor(800 + Math.random() * 100)}`,
      clientName: quoteName,
      clientPhone: quotePhone,
      clientEmail: `${quoteName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      projectTitle: "Custom Home / Commercial Inquiry",
      description: quoteReq || "User requested a customized doorstep service quotation.",
      lineItems: [{ description: "Custom Service Quote Estimate", qty: 1, unitPrice: 2500 }],
      totalEstimatedCost: 2500,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      validUntil: "2026-08-30"
    };

    const quotes = getStoredQuotes();
    saveQuotes([newQuote, ...quotes]);

    setQuoteSubmitted(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSubmitted(false);
      setQuoteName("");
      setQuotePhone("");
      setQuoteReq("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-20">
      
      {/* Hero Header */}
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center max-w-3xl">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-primary/20">
          HomeTriangle Hire Experts Catalog
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
          Book Background-Verified Home Service Experts
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Transparent upfront pricing, 30-day service guarantee, and instant doorstep technician arrival.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  active 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                    : "bg-card border-border text-foreground hover:border-primary/40"
                }`}
              >
                <Icon size={16} /> {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((svc) => (
            <div key={svc.id} className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    {svc.popular && (
                      <span className="text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full border border-amber-500/20 block w-fit mb-2">
                        ★ Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{svc.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={14} className="fill-amber-400" /> {svc.rating}
                  </div>
                  <span className="text-muted-foreground">({svc.reviews} Reviews)</span>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-muted-foreground font-semibold">
                    <Clock size={14} className="text-primary" /> {svc.duration}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {svc.description}
                </p>

                {/* Inclusions checklist */}
                <div className="space-y-1.5 pt-2 border-t border-border/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">What&apos;s Included:</span>
                  {svc.inclusions.map((inc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground font-medium">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-extrabold text-foreground">₹{svc.price}</span>
                  <span className="text-xs text-muted-foreground line-through ml-1.5">₹{svc.originalPrice}</span>
                </div>

                <Link 
                  href={`/book?service=${svc.id}`}
                  className={cn(buttonVariants({ variant: "default" }), "rounded-2xl px-5 font-bold shadow-md shadow-primary/20")}
                >
                  Book Now <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Commercial Banner & Custom Quote Modal Trigger */}
        <div className="mt-16 bg-gradient-to-r from-purple-950 via-slate-900 to-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-purple-500/30">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-500/30">
              Commercial & Large Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Need a Custom Quote for Office or Building Renovation?</h2>
            <p className="text-slate-300 text-sm md:text-base">
              Get customized estimates with line-item breakdowns, site inspection by senior engineers, and GST invoices.
            </p>
          </div>

          <Button 
            size="lg" 
            className="rounded-2xl px-8 font-extrabold h-14 bg-white text-slate-900 hover:bg-slate-100 shadow-xl shrink-0 text-base"
            onClick={() => setShowQuoteModal(true)}
          >
            <FileText size={18} className="mr-2 text-purple-600" /> Request Free Expert Quote
          </Button>
        </div>
      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground font-bold text-xl"
            >
              ✕
            </button>

            {!quoteSubmitted ? (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">Request Commercial Quote</h3>
                  <p className="text-xs text-muted-foreground">Our estimation specialist will call within 30 minutes</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Full Name *</label>
                  <Input required placeholder="Enter your name or business name" value={quoteName} onChange={(e) => setQuoteName(e.target.value)} className="h-11 bg-muted/40" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Phone Number *</label>
                  <Input required type="tel" placeholder="+91 98765 43210" value={quotePhone} onChange={(e) => setQuotePhone(e.target.value)} className="h-11 bg-muted/40" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Requirement Details</label>
                  <textarea rows={3} placeholder="Describe work: Office painting, commercial deep scrub, building electrical rewiring..." value={quoteReq} onChange={(e) => setQuoteReq(e.target.value)} className="w-full p-3 rounded-2xl bg-muted/40 border border-border text-xs text-foreground focus:outline-none focus:border-primary" />
                </div>

                <Button type="submit" className="w-full rounded-2xl font-bold h-12 bg-purple-600 hover:bg-purple-700 text-white shadow-md">
                  Submit Quote Request
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-foreground">Quote Request Received!</h4>
                <p className="text-xs text-muted-foreground">Our senior project estimator has received your details and will get in touch shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
