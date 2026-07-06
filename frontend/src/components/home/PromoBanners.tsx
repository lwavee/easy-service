"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const banners = [
  {
    title: "Home cleaning made easy",
    subtitle: "Trusted Cleaning Professionals",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    btnText: "Book Now",
  },
  {
    title: "Reliable home repair services",
    subtitle: "Electricians • Plumbers • Carpenters",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    btnText: "Book Now",
  },
  {
    title: "Professional appliance repairs",
    subtitle: "30 Days warranty",
    image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=800&auto=format&fit=crop",
    btnText: "Book Now",
  }
];

export default function PromoBanners() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${banner.image}')` }}
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="max-w-[70%]">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {banner.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base font-medium">
                    {banner.subtitle}
                  </p>
                </div>
                <div>
                  <Button variant="secondary" className="bg-white text-black hover:bg-white/90 font-semibold px-6">
                    {banner.btnText}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
