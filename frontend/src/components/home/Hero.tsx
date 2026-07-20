"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ShieldCheck, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 md:pt-28 pb-16 lg:pb-24">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span>Over 1 Million+ Happy Customers</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight"
          >
            Your Home & Car Needs, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Expertly Handled.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Book trusted, background-verified professionals for AC servicing, car spa, deep home cleaning, plumbing & repairs. 
          </motion.p>

          {/* Search Box Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="bg-card p-2 md:p-3 rounded-2xl md:rounded-full border border-border shadow-xl flex flex-col md:flex-row items-center gap-2 transition-all hover:shadow-primary/5">
              
              <div className="flex items-center w-full md:w-1/3 px-4 md:border-r border-border mb-2 md:mb-0">
                <MapPin className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
                <Input 
                  placeholder="Your City..." 
                  className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent text-base"
                  defaultValue="Mumbai"
                />
              </div>

              <div className="flex items-center w-full md:w-2/3 px-4 relative">
                <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
                <Input 
                  placeholder="Search for 'AC Repair', 'Car Wash', or 'Cleaning'..." 
                  className="border-0 shadow-none focus-visible:ring-0 px-0 bg-transparent text-base"
                />
                <Button size="lg" className="rounded-full absolute right-0 md:right-1 h-10 px-6 shrink-0 hidden md:flex">
                  Search
                </Button>
              </div>
              
              {/* Mobile Search Button */}
              <Button size="lg" className="w-full rounded-xl mt-2 md:hidden">
                Search Services
              </Button>
            </div>
            
            {/* Trending Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-sm text-muted-foreground mr-2 font-medium">Trending:</span>
              {[
                { label: "AC Jet Service", href: "/services/split-ac" },
                { label: "Car Foam Wash", href: "/services/car-foam-wash" },
                { label: "Deep Home Clean", href: "/services/cleaning" },
                { label: "Electrician", href: "/services/electrician" }
              ].map((tag, i) => (
                <Link key={i} href={tag.href}>
                  <span className="text-xs md:text-sm px-3.5 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer border border-border/50 font-medium">
                    {tag.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 mt-14 pt-8 border-t border-border/50 w-full"
          >
            {[
              { icon: ShieldCheck, text: "Background Verified Pros" },
              { icon: Clock, text: "On-Time Doorstep Guarantee" },
              { icon: Star, text: "30-Day Free Rework Cover" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <div className="bg-primary/10 p-2 rounded-full">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-sm md:text-base">{item.text}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
