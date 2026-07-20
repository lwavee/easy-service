"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "Alex Johnson",
    service: "Home Cleaning",
    rating: 5,
    text: "Absolutely fantastic! The team arrived on time and left my house sparkling clean. The attention to detail was incredible. Will definitely book again.",
    date: "2 days ago",
  },
  {
    name: "Emily Davis",
    service: "AC Repair",
    rating: 5,
    text: "My AC broke down in the middle of a heatwave. ServiceHub got a technician to me within an hour. Professional, polite, and very efficient.",
    date: "1 week ago",
  },
  {
    name: "Mark Wilson",
    service: "Plumbing",
    rating: 4,
    text: "Very professional service. The plumber explained the issue clearly and fixed it efficiently without leaving a mess. Pricing was completely fair.",
    date: "3 weeks ago",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success font-medium text-sm mb-4"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Loved by Our Early Adopters</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            What Our <span className="text-primary">First Customers</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Read what our satisfied customers have to say about their experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-background border border-border/60 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col h-full group"
            >
              <div className="absolute top-8 right-8 text-muted opacity-30 group-hover:opacity-100 group-hover:text-primary/10 transition-all duration-500 transform group-hover:scale-110">
                <Quote className="w-12 h-12" fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>
              
              <p className="text-foreground/90 text-lg leading-relaxed mb-8 flex-1 relative z-10 font-medium">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-border/50 pt-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-primary font-medium">{review.service}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
