import ServiceCarousel, { ServiceItem } from "@/components/home/ServiceCarousel";
import { Sparkles, Snowflake, Car, Wrench, Utensils, ShieldCheck, CheckCircle2, Zap, Tv } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const electricalApplianceServices: ServiceItem[] = [
  { 
    title: "Split & Window AC Servicing", 
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", 
    href: "/services/split-ac",
    tag: "Best Seller"
  },
  { 
    title: "Smart TV Repair & Wall Mounting", 
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop", 
    href: "/services/tv-installation",
    tag: "Same Day"
  },
  { 
    title: "Ceiling & Exhaust Fan Repair", 
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", 
    href: "/services/fan-repair" 
  },
  { 
    title: "Air Cooler Repair & Servicing", 
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop", 
    href: "/services/air-cooler-repair",
    tag: "Summer Special"
  },
  { 
    title: "Water Geyser & Room Heater Fix", 
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop", 
    href: "/services/geyser-repair" 
  },
  { 
    title: "Washing Machine Repair & Service", 
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop", 
    href: "/services/washing-machine",
    tag: "Top Rated"
  },
  { 
    title: "Refrigerator & Fridge Repair", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", 
    href: "/services/refrigerator" 
  },
  { 
    title: "Microwave & Convection Oven Fix", 
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop", 
    href: "/services/microwave" 
  },
  { 
    title: "Kitchen Chimney & Hob Repair", 
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop", 
    href: "/services/chimney-repair" 
  },
  { 
    title: "Inverter Battery & Wiring Repair", 
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop", 
    href: "/services/electrician",
    tag: "24/7 Express"
  },
];

const vehicleCleaningServices: ServiceItem[] = [
  { 
    title: "Car Exterior Foam Wash & Wax", 
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop", 
    href: "/services/car-foam-wash",
    tag: "Trending"
  },
  { 
    title: "Car Interior Deep Spa & Vacuum", 
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop", 
    href: "/services/car-interior-cleaning",
    tag: "Best Seller"
  },
  { 
    title: "Complete Car Full Spa & Polish", 
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop", 
    href: "/services/car-full-spa" 
  },
  { 
    title: "Bike & Superbike Foam Wash", 
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop", 
    href: "/services/bike-cleaning" 
  },
];

const homeCleaningServices: ServiceItem[] = [
  { 
    title: "Full Home Deep Cleaning", 
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop", 
    href: "/services/deep-cleaning", 
    tag: "Popular" 
  },
  { 
    title: "Sofa & Upholstery Shampooing", 
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", 
    href: "/services/sofa-cleaning" 
  },
  { 
    title: "Bathroom Sanitization & Scale Removal", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", 
    href: "/services/bathroom-cleaning" 
  },
  { 
    title: "Kitchen Degreasing & Cabinet Clean", 
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop", 
    href: "/services/kitchen-cleaning" 
  },
  { 
    title: "Overhead Water Tank Disinfection", 
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop", 
    href: "/services/water-tank-cleaning" 
  },
  { 
    title: "Carpet Steam Cleaning", 
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop", 
    href: "/services/carpet-cleaning" 
  },
  { 
    title: "Pest & Termite Control Protection", 
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop", 
    href: "/services/pest-control",
    tag: "Eco Friendly" 
  },
];

const cookingServices: ServiceItem[] = [
  { title: "North Indian Cook", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop", href: "/services/cook-north-indian" },
  { title: "South Indian Cook", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop", href: "/services/cook-south-indian" },
  { title: "Mughlai Cook", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop", href: "/services/cook-mughlai" },
  { title: "Chinese Cook", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop", href: "/services/cook-chinese" },
  { title: "Continental Cook", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop", href: "/services/cook-continental" },
  { title: "Italian Cook", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop", href: "/services/cook-italian" },
  { title: "Bakery & Pastry Cook", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop", href: "/services/cook-bakery" },
  { title: "Tandoor Cook", image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=800&auto=format&fit=crop", href: "/services/cook-tandoor" },
  { title: "Fast Food Cook", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop", href: "/services/cook-fast-food" },
  { title: "Sweets (Halwai) Cook", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop", href: "/services/cook-sweets" },
];

export const metadata = {
  title: "All Electrical & Appliance Repair Services | ServiceHub",
  description: "Book certified repairs for AC, Smart TV, Fan, Cooler, Heater, Washing Machine, Refrigerator, Microwave, and home electrical wiring.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/10 pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 mb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <span className="px-4 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            Background-Verified Experts
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Electrical & Home Appliance Repair Directory
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-xl mx-auto">
            Book certified professionals for AC, TV, Fan, Air Cooler, Geyser, Washing Machine, and home electrical repairs with 30-day warranty.
          </p>
        </div>
      </section>

      {/* Quick Nav Category Chips */}
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#electrical-appliances" className="px-5 py-2.5 rounded-full bg-card border border-border shadow-sm text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> Electrical & Appliance Repair
          </a>
          <a href="#car-cleaning" className="px-5 py-2.5 rounded-full bg-card border border-border shadow-sm text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2">
            <Car className="w-4 h-4 text-blue-500" /> Car & Bike Detailing
          </a>
          <a href="#home-cleaning" className="px-5 py-2.5 rounded-full bg-card border border-border shadow-sm text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" /> Deep Home Cleaning
          </a>
          <a href="#cooking" className="px-5 py-2.5 rounded-full bg-card border border-border shadow-sm text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" /> Private Chef & Cooks
          </a>
        </div>
      </div>

      {/* Carousels */}
      <div className="space-y-12">
        <div id="electrical-appliances">
          <ServiceCarousel 
            title="Electrical & Appliance Repair (AC, TV, Fan, Cooler, Heater & More)" 
            items={electricalApplianceServices} 
          />
        </div>

        <div id="car-cleaning">
          <ServiceCarousel 
            title="Car & Vehicle Cleaning Services" 
            items={vehicleCleaningServices} 
          />
        </div>

        <div id="home-cleaning">
          <ServiceCarousel 
            title="Deep Home Cleaning & Pest Control" 
            items={homeCleaningServices} 
          />
        </div>

        <div id="cooking">
          <ServiceCarousel 
            title="Professional Chefs & Home Cooking" 
            items={cookingServices} 
          />
        </div>
      </div>

      {/* Trust Banner */}
      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">30-Day Rework Guarantee</h4>
              <p className="text-xs text-muted-foreground">Free re-visit if electrical issue reoccurs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Licensed Electricians</h4>
              <p className="text-xs text-muted-foreground">Govt ID & Skill verified technicians</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
