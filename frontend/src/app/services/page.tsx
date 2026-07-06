import ServiceCarousel, { ServiceItem } from "@/components/home/ServiceCarousel";

const acRepair: ServiceItem[] = [
  { title: "Split AC Service", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop", href: "/services/split-ac" },
  { title: "Window AC Service", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop", href: "/services/window-ac" },
  { title: "AC Gas Leak Fix", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop", href: "/services/ac-gas" },
];

const cleaningServices: ServiceItem[] = [
  { title: "Deep Home Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop", href: "/services/deep-cleaning", tag: "Best Seller" },
  { title: "Sofa Cleaning", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", href: "/services/sofa-cleaning" },
  { title: "Bathroom Cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", href: "/services/bathroom-cleaning" },
  { title: "Kitchen Cleaning", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop", href: "/services/kitchen-cleaning" },
];

const beautyServices: ServiceItem[] = [
  { title: "Salon for Women", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", href: "/services/salon-women" },
  { title: "Spa for Women", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop", href: "/services/spa-women" },
  { title: "Men's Grooming", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop", href: "/services/mens-grooming" },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/10 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          All Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse through our extensive catalog of professional home services. 
          Everything you need, right at your doorstep.
        </p>
      </div>

      <div className="space-y-4">
        <ServiceCarousel 
          title="AC Repair & Service" 
          items={acRepair} 
        />
        <ServiceCarousel 
          title="Cleaning & Pest Control" 
          items={cleaningServices} 
        />
        <ServiceCarousel 
          title="Beauty & Wellness" 
          items={beautyServices} 
        />
      </div>
    </div>
  );
}
