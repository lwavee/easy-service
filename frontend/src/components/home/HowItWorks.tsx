"use client";

import { motion } from "framer-motion";
import { Search, Calendar, UserCheck, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Choose Service",
    description: "Select from our wide range of professional services.",
    color: "bg-blue-500",
  },
  {
    icon: Calendar,
    title: "2. Pick a Slot",
    description: "Choose a date and time that fits your schedule.",
    color: "bg-purple-500",
  },
  {
    icon: UserCheck,
    title: "3. Pro Arrives",
    description: "A verified professional arrives at your doorstep.",
    color: "bg-orange-500",
  },
  {
    icon: Star,
    title: "4. Job Done",
    description: "Pay securely and enjoy your completed service.",
    color: "bg-green-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Simple Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 hidden lg:block -translate-y-1/2 rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative bg-card border border-border p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all text-center group"
                >
                  <div className={`w-20 h-20 mx-auto rounded-3xl ${step.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative bg-background`}>
                    <Icon className={`w-10 h-10 ${step.color.replace('bg-', 'text-')}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
