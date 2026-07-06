"use client";

import { motion } from "framer-motion";
import { 
  Users, ShieldCheck, Zap, Coins, 
  Award, Headphones
} from "lucide-react";

const features = [
  { 
    icon: ShieldCheck, 
    title: "Verified Professionals", 
    description: "Every technician goes through a strict background check and skill verification process.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  { 
    icon: Coins, 
    title: "Transparent Pricing", 
    description: "No hidden charges. You see the final price before you book the service.",
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  },
  { 
    icon: Award, 
    title: "Service Guarantee", 
    description: "We offer up to 30 days of warranty on most of our repair services.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  { 
    icon: Zap, 
    title: "Instant Booking", 
    description: "Book a service in under 60 seconds and get an expert assigned instantly.",
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Why Choose Us
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            The Trusted Choice for <br/> <span className="text-primary">Home Services</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-background border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative background glow */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${feature.color.split(' ')[0]} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 relative z-10`}>
                  <Icon className="w-7 h-7" strokeWidth={2} />
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-foreground relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Need help with booking?</h3>
              <p className="text-primary-foreground/80">Our support team is available 24/7 to assist you.</p>
            </div>
          </div>
          <button className="bg-background text-primary hover:bg-background/90 px-8 py-4 rounded-full font-bold transition-colors whitespace-nowrap shadow-lg">
            Call 1800-123-4567
          </button>
        </motion.div>

      </div>
    </section>
  );
}
