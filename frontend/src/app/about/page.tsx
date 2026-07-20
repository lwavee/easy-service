import { motion } from "framer-motion";
import { ShieldCheck, Users, Award, HeartHandshake, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | ServiceHub",
  description: "Learn about ServiceHub's mission to transform home services with background-verified professionals, transparent pricing, and quality guarantees.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      {/* Hero Header */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-15 mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <span className="px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            Our Mission & Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Simplifying Home Care, Elevating Lives
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
            ServiceHub connects millions of homeowners with trusted, background-verified professionals for cleaning, repair, painting, and beauty services.
          </p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="container mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">1M+</div>
            <div className="text-sm text-muted-foreground font-medium">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">15,000+</div>
            <div className="text-sm text-muted-foreground font-medium">Verified Pros</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">50+</div>
            <div className="text-sm text-muted-foreground font-medium">Cities Covered</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">4.8★</div>
            <div className="text-sm text-muted-foreground font-medium">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why We Started ServiceHub
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Finding reliable home service technicians used to mean unvetted providers, unpredictable pricing, and zero accountability. We built ServiceHub to bring trust, safety, and modern convenience to home care.
            </p>
            <div className="space-y-4">
              {[
                { title: "5-Level Background Verification", desc: "Identity, criminal record, and technical skill checks for every technician." },
                { title: "Fixed Upfront Pricing", desc: "No unexpected add-ons or hidden extra charges at your doorstep." },
                { title: "30-Day Happiness Guarantee", desc: "If you aren't completely satisfied, we re-do the service for free." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" 
              alt="ServiceHub Team" 
              className="rounded-3xl shadow-2xl border border-border w-full aspect-[4/3] object-cover" 
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Experience Effortless Home Care</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Book professional cleaning, appliance repair, or handyman services today.
          </p>
          <Link href="/services">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-md">
              Explore All Services <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
