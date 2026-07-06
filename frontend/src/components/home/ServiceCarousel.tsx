"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface ServiceItem {
  title: string;
  image: string;
  tag?: string;
  href: string;
}

interface ServiceCarouselProps {
  title: string;
  items: ServiceItem[];
  viewAllHref?: string;
}

export default function ServiceCarousel({ title, items, viewAllHref }: ServiceCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            {title}
          </h2>
          {viewAllHref && (
            <Link href={viewAllHref}>
              <Button variant="outline" size="sm" className="hidden sm:flex text-primary border-primary/20 hover:bg-primary/5">
                See All
              </Button>
            </Link>
          )}
        </div>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-background border border-border shadow-lg rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-background border border-border shadow-lg rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 snap-x snap-mandatory pb-4"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="shrink-0 w-[280px] md:w-[320px] snap-start"
              >
                <Link href={item.href} className="group block">
                  <div className="relative h-[180px] md:h-[200px] w-full rounded-2xl overflow-hidden mb-3 bg-muted">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-success text-success-foreground text-xs font-bold rounded-md shadow-sm">
                        {item.tag}
                      </div>
                    )}
                  </div>
                  <h3 className="text-foreground font-medium text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
