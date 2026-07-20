import Link from "next/link";
import { Check, ShieldCheck, Zap, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Transparent Pricing & Membership Plans | ServiceHub",
  description: "Explore ServiceHub's transparent doorstep pricing and ServiceHub Pass membership for extra savings and free home inspections.",
};

const pricingPlans = [
  {
    name: "Standard Booking",
    price: "Pay as you go",
    description: "Ideal for occasional repairs and quick home fixes.",
    features: [
      "Fixed rate service quote",
      "Background-verified pro",
      "30-day rework guarantee",
      "Digital receipt & invoice",
      "Standard support"
    ],
    cta: "Browse Services",
    href: "/services",
    popular: false
  },
  {
    name: "ServiceHub Pass (1 Year)",
    price: "₹999 / year",
    description: "Save big on every booking with VIP perks & zero doorstep fees.",
    features: [
      "15% OFF on all service bookings",
      "FREE unlimited doorstep inspection",
      "Priority express dispatch (Under 60 mins)",
      "Zero cancellation charges",
      "Dedicated VIP Customer Success Manager",
      "Free bi-annual AC wellness checkup"
    ],
    cta: "Join Pass & Save",
    href: "/book?plan=pass",
    popular: true
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      {/* Header */}
      <section className="text-center container mx-auto px-4 md:px-6 py-12">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
          100% Price Transparency
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          Simple, Fair & Honest Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          No hidden fees or unexpected charges. Pay only for what you approve with our fixed rate card.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`bg-card border rounded-3xl p-8 relative flex flex-col justify-between shadow-lg transition-all ${
                plan.popular ? "border-primary ring-2 ring-primary/20 shadow-primary/10" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-8 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="text-3xl md:text-4xl font-black text-foreground mb-6">
                  {plan.price}
                </div>

                <div className="space-y-3 pt-4 border-t border-border mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <div className="p-1 rounded-full bg-primary/10 text-primary shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={plan.href} className="w-full">
                <Button 
                  size="lg" 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full rounded-full h-12 text-base font-semibold"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Price Guarantee Banner */}
      <section className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <div className="bg-card border border-border p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">ServiceHub Rate Card Guarantee</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              If a technician asks for more than the approved app estimate, report it immediately to receive a full refund of your doorstep fee plus a ₹500 wallet credit.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
