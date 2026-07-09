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

const cookingServices: ServiceItem[] = [
  { title: "North Indian Cook", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop", href: "/services/cook-north-indian" },
  { title: "South Indian Cook", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop", href: "/services/cook-south-indian" },
  { title: "Mughlai Cook", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop", href: "/services/cook-mughlai" },
  { title: "Chinese Cook", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800&auto=format&fit=crop", href: "/services/cook-chinese" },
  { title: "Continental Cook", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop", href: "/services/cook-continental" },
  { title: "Italian Cook", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop", href: "/services/cook-italian" },
  { title: "Bakery & Pastry Cook", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop", href: "/services/cook-bakery" },
  { title: "Tandoor Cook", image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=800&auto=format&fit=crop", href: "/services/cook-tandoor" },
  { title: "Fast Food Cook", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop", href: "/services/cook-fast-food" },
  { title: "Sweets (Halwai) Cook", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop", href: "/services/cook-sweets" },
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
        <ServiceCarousel 
          title="Cooking Services" 
          items={cookingServices} 
        />
      </div>
    </div>
  );
}
