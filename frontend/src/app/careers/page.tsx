import Link from "next/link";
import { Briefcase, MapPin, ArrowRight, Heart, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Careers at ServiceHub | Join Our Team",
  description: "Build the future of doorstep home services. Explore tech, operations, product, and field management career opportunities at ServiceHub.",
};

const openPositions = [
  { title: "Senior Full Stack Engineer", dept: "Engineering", location: "Mumbai / Remote", type: "Full Time" },
  { title: "Product Manager - Supply Growth", dept: "Product", location: "Mumbai HQ", type: "Full Time" },
  { title: "City Operations Manager", dept: "Operations", location: "Delhi NCR", type: "Full Time" },
  { title: "Lead Service Quality Inspector", dept: "Quality Control", location: "Bengaluru", type: "Full Time" },
  { title: "UI/UX Product Designer", dept: "Design", location: "Remote", type: "Full Time" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            We are Hiring!
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Help Us Reinvent Home Care
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We're building an incredible team driven to empower local technicians and simplify everyday living for millions.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
            <Heart className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Comprehensive Wellness</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Health insurance for you and your family, wellness allowances, and mental health resources.</p>
          </div>
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Hyper Growth Environment</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Work with passionate teammates scaling a high-frequency daily utility app across tier 1 and 2 cities.</p>
          </div>
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
            <Award className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Competitive ESOPs</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Generous equity packages so every team member shares in our long-term company success.</p>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl py-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Open Opportunities</h2>
        <div className="space-y-4">
          {openPositions.map((pos, idx) => (
            <div key={idx} className="bg-card border border-border p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors shadow-sm">
              <div>
                <h4 className="text-lg font-bold text-foreground">{pos.title}</h4>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                  <span>{pos.dept}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {pos.location}</span>
                  <span>•</span>
                  <span>{pos.type}</span>
                </div>
              </div>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full px-6 shrink-0">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
