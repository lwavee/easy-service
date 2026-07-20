"use client";

import Link from "next/link";
import { 
  Wrench, 
  MonitorSpeaker, 
  Sparkles, 
  Paintbrush, 
  Truck, 
  Home, 
  Car,
  Snowflake
} from "lucide-react";

const categories = [
  { name: "AC Repair & Jet Service", icon: Snowflake, color: "text-cyan-500", href: "/services/ac-repair" },
  { name: "Car & Bike Cleaning", icon: Car, color: "text-blue-500", href: "/services/car-foam-wash" },
  { name: "Deep Home Cleaning", icon: Sparkles, color: "text-teal-500", href: "/services/cleaning" },
  { name: "Handyman & Repairs", icon: Wrench, color: "text-orange-500", href: "/services/handyman" },
  { name: "Appliance Servicing", icon: MonitorSpeaker, color: "text-indigo-500", href: "/services/appliance" },
  { name: "Painting & Waterproofing", icon: Paintbrush, color: "text-purple-500", href: "/services/painting" },
  { name: "Movers & Packers", icon: Truck, color: "text-amber-600", href: "/services/movers" },
];

export default function TopCategoriesStrip() {
  return (
    <section className="py-8 bg-background border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex overflow-x-auto pb-4 md:pb-0 hide-scrollbar gap-4 md:gap-6 justify-start xl:justify-center items-center">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link key={i} href={cat.href} className="shrink-0 group">
                <div className="flex flex-col items-center justify-center w-28 md:w-36 h-28 md:h-36 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                  <div className={`mb-3 p-3 rounded-full bg-muted/60 group-hover:bg-primary/10 transition-colors`}>
                    <Icon className={`w-7 h-7 md:w-9 md:h-9 ${cat.color}`} strokeWidth={1.8} />
                  </div>
                  <span className="text-xs md:text-sm text-center font-semibold text-foreground px-2 leading-tight">
                    {cat.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
