"use client";

import { motion } from "framer-motion";

export default function TrustedCompanies() {
  const companies = [
    { name: "TechCorp", logo: "TC" },
    { name: "HomePlus", logo: "HP" },
    { name: "BuildCo", logo: "BC" },
    { name: "CleanPro", logo: "CP" },
    { name: "FixIt", logo: "FI" },
    { name: "ServeRight", logo: "SR" },
  ];

  return (
    <section className="py-12 border-b border-border/50 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by over 10,000+ companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                {company.logo}
              </div>
              <span className="text-xl font-semibold text-foreground tracking-tight">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
