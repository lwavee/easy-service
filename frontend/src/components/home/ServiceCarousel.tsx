"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, ArrowRight } from "lucide-react";
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
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {viewAllHref && (
            <Link href={viewAllHref}>
              <Button variant="outline" size="sm" className="hidden sm:flex text-primary border-primary/20 hover:bg-primary/5 rounded-full font-semibold">
                Explore All <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll("left")}
            aria-label="Previous services"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-11 h-11 bg-card border border-border shadow-xl rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll("right")}
            aria-label="Next services"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-11 h-11 bg-card border border-border shadow-xl rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-5 md:gap-6 snap-x snap-mandatory pb-4"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="shrink-0 w-[270px] md:w-[310px] snap-start"
              >
                <Link href={item.href} className="group block">
                  <div className="relative h-[190px] md:h-[210px] w-full rounded-2xl overflow-hidden mb-3 bg-muted border border-border/60 shadow-sm group-hover:shadow-md transition-all">
                    
                    {/* Background Image */}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    
                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                        {item.tag}
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-md text-foreground px-2.5 py-1 rounded-full text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>

                  <h3 className="text-foreground font-bold text-base md:text-lg group-hover:text-primary transition-colors leading-snug">
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
