"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, Zap, Snowflake, Wrench, Paintbrush, 
  Laptop, Tv, ChefHat, Droplets, Flower2, 
  Shirt, Scissors
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Cleaning", icon: Sparkles, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { name: "Electrician", icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  { name: "AC Repair", icon: Snowflake, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
  { name: "Plumbing", icon: Droplets, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "Painting", icon: Paintbrush, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { name: "Electronics", icon: Tv, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { name: "Carpentry", icon: Wrench, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { name: "Salon at Home", icon: Scissors, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
];

export default function PopularCategories() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Professional Services, <span className="text-primary">On Demand</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From deep cleaning to quick repairs, book expert professionals instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href={`/services/${category.name.toLowerCase().replace(/ /g, "-")}`} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group relative bg-card border border-border p-6 rounded-3xl overflow-hidden cursor-pointer"
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex flex-col items-center text-center gap-4 z-10">
                    <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 shadow-sm`}>
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
