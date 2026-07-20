"use client";

import { useState } from "react";
import { UserCheck, ShieldCheck, Wallet, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            Join 15,000+ Skilled Professionals
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Grow Your Business with ServiceHub
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Earn higher income, set your own flexible hours, and get guaranteed daily doorstep service requests.
          </p>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
            <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Earn Up To ₹60,000/mo</h3>
            <p className="text-muted-foreground text-sm">Direct weekly payouts straight to your bank account with zero delay.</p>
          </div>
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Work on Your Schedule</h3>
            <p className="text-muted-foreground text-sm">Turn your online availability ON or OFF whenever you want to take jobs.</p>
          </div>
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center">
            <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Insurance & Skill Training</h3>
            <p className="text-muted-foreground text-sm">Free safety equipment, accidental health cover, and advanced masterclasses.</p>
          </div>
        </div>
      </section>

      {/* Partner Registration Form */}
      <section className="container mx-auto px-4 md:px-6 max-w-2xl py-6">
        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Register as a Professional</h2>
          <p className="text-muted-foreground text-sm text-center mb-8">Fill in your details to start earning with ServiceHub</p>

          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input required placeholder="Ramesh Sharma" className="h-12 bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Phone Number</label>
                <Input required type="tel" placeholder="+91 98765 43210" className="h-12 bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Primary Service Skill</label>
                <select required className="w-full h-12 rounded-xl bg-muted/50 border border-border px-4 text-foreground font-medium">
                  <option value="ac">AC Repair & Servicing</option>
                  <option value="cleaning">Home Cleaning</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="painting">Painting</option>
                  <option value="carpenter">Carpentry & Assembly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">City / Working Area</label>
                <Input required placeholder="Mumbai, Thane, Navi Mumbai" className="h-12 bg-muted/50" />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-xl h-12 text-base font-semibold">
                Submit Partner Application <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-foreground">Application Received!</h3>
              <p className="text-muted-foreground text-sm">Our onboarding specialist will call you within 24 hours for document verification.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
