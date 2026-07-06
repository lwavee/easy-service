"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const professionals = [
  {
    name: "Michael Chen",
    role: "Master Electrician",
    rating: 4.9,
    reviews: 342,
    experience: "8 Years",
    jobs: "1.2k+",
    location: "Downtown",
    skills: ["Wiring", "Panels", "Smart Home"],
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Sarah Jenkins",
    role: "Professional Cleaner",
    rating: 4.8,
    reviews: 512,
    experience: "5 Years",
    jobs: "2k+",
    location: "Westside",
    skills: ["Deep Cleaning", "Move in/out"],
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
  },
  {
    name: "David Miller",
    role: "Expert Plumber",
    rating: 5.0,
    reviews: 128,
    experience: "12 Years",
    jobs: "3k+",
    location: "North Hills",
    skills: ["Pipe Fix", "Installations"],
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
  {
    name: "Elena Rodriguez",
    role: "AC Technician",
    rating: 4.7,
    reviews: 284,
    experience: "6 Years",
    jobs: "800+",
    location: "South Bay",
    skills: ["AC Repair", "Maintenance"],
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
  },
];

export default function FeaturedProfessionals() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Top Rated Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              Meet our highly skilled and verified experts who consistently deliver 5-star services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {professionals.map((pro, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    {/* Fallback to div if next/image domain is not configured yet */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted">
                      <img src={pro.image} alt={pro.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-success p-1 rounded-full border-2 border-card">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-lg text-sm font-semibold">
                    <Star className="w-4 h-4 fill-secondary" />
                    {pro.rating}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-lg text-foreground">{pro.name}</h3>
                  <p className="text-primary text-sm font-medium">{pro.role}</p>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{pro.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>{pro.experience} experience &bull; {pro.jobs} jobs</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {pro.skills.map((skill, i) => (
                    <span key={i} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>

                <Link href={`/book?pro=${pro.name.toLowerCase().replace(' ', '-')}`} className="w-full">
                  <Button className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
                    Book Professional
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
