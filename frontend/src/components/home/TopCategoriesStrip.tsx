"use client";

import Link from "next/link";
import { 
  Wrench, 
  MonitorSpeaker, 
  Sparkles, 
  Paintbrush, 
  Truck, 
  Home, 
  Scissors 
} from "lucide-react";

const categories = [
  { name: "Handyman Services", icon: Wrench, color: "text-orange-500", href: "/services/handyman" },
  { name: "Appliance Repair", icon: MonitorSpeaker, color: "text-blue-500", href: "/services/appliance" },
  { name: "Cleaning & Pest Control", icon: Sparkles, color: "text-teal-500", href: "/services/cleaning" },
  { name: "Painting & Water proofing", icon: Paintbrush, color: "text-purple-500", href: "/services/painting" },
  { name: "Movers & Storage", icon: Truck, color: "text-yellow-600", href: "/services/movers" },
  { name: "Renovation & Fabrication", icon: Home, color: "text-indigo-500", href: "/services/renovation" },
  { name: "Makeup & Styling", icon: Scissors, color: "text-pink-500", href: "/services/makeup" },
];

export default function TopCategoriesStrip() {
  return (
    <section className="py-8 bg-background border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Horizontal scroll on small screens, flex wrap on larger ones */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 hide-scrollbar gap-4 md:gap-6 justify-start xl:justify-center items-center">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link key={i} href={cat.href} className="shrink-0 group">
                <div className="flex flex-col items-center justify-center w-28 md:w-36 h-28 md:h-36 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className={`mb-3 p-3 rounded-full bg-muted/50 group-hover:bg-primary/5 transition-colors`}>
                    <Icon className={`w-8 h-8 md:w-10 md:h-10 ${cat.color}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs md:text-sm text-center font-medium text-foreground px-2">
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
