import Hero from "@/components/home/Hero";
import TopCategoriesStrip from "@/components/home/TopCategoriesStrip";
import PromoBanners from "@/components/home/PromoBanners";
import PopularCategories from "@/components/home/PopularCategories";
import ServiceCarousel, { ServiceItem } from "@/components/home/ServiceCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";

const electricalApplianceServices: ServiceItem[] = [
  { title: "Split & Window AC Servicing", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", href: "/services/split-ac", tag: "5% Off" },
  { title: "Smart TV Repair & Wall Mounting", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop", href: "/services/tv-installation", tag: "Express" },
  { title: "Ceiling & Exhaust Fan Repair", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", href: "/services/fan-repair" },
  { title: "Air Cooler Repair & Servicing", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop", href: "/services/air-cooler-repair", tag: "Hot Pick" },
  { title: "Water Geyser & Room Heater Fix", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop", href: "/services/geyser-repair" },
  { title: "Washing Machine Repair", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop", href: "/services/washing-machine", tag: "Popular" },
  { title: "Refrigerator & Fridge Repair", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", href: "/services/refrigerator" },
  { title: "Microwave & Convection Oven Fix", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop", href: "/services/microwave" },
];

const carCleaningServices: ServiceItem[] = [
  { title: "Car Foam Exterior Wash & Wax", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop", href: "/services/car-foam-wash", tag: "Best Seller" },
  { title: "Car Interior Deep Spa & Sanitization", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop", href: "/services/car-interior-cleaning" },
  { title: "Complete Car Full Spa & Teflon Polish", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop", href: "/services/car-full-spa" },
  { title: "Bike & Superbike Foam Pressure Wash", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop", href: "/services/bike-cleaning", tag: "Express" },
];

const deepCleaningServices: ServiceItem[] = [
  { title: "Full Home Deep Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop", href: "/services/deep-cleaning", tag: "Top Rated" },
  { title: "Sofa & Upholstery Shampooing", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", href: "/services/sofa-cleaning" },
  { title: "Bathroom Sanitization & Scale Removal", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", href: "/services/bathroom-cleaning" },
  { title: "Kitchen Degreasing & Cabinet Clean", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop", href: "/services/kitchen-cleaning" },
  { title: "Overhead Water Tank Disinfection", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop", href: "/services/water-tank-cleaning" },
];

const handymanServices: ServiceItem[] = [
  { title: "Furniture Assembly & Repair", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", href: "/services/furniture-assembly" },
  { title: "Balcony Bird & Safety Net Installation", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", href: "/services/safety-net" },
  { title: "Tile Grouting & Waterproofing", image: "https://images.unsplash.com/photo-1523413651479-59cb1f20e278?q=80&w=800&auto=format&fit=crop", href: "/services/tile-grouting" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Hero />
      <TopCategoriesStrip />
      <PromoBanners />
      <PopularCategories />
      
      <div className="py-6 space-y-6">
        <ServiceCarousel 
          title="Electrical & Appliance Repair (AC, TV, Fan, Cooler, Geyser & More)" 
          items={electricalApplianceServices} 
          viewAllHref="/services"
        />

        <ServiceCarousel 
          title="Car & Vehicle Cleaning" 
          items={carCleaningServices} 
          viewAllHref="/services/car-foam-wash"
        />

        <ServiceCarousel 
          title="Deep Home Cleaning" 
          items={deepCleaningServices} 
          viewAllHref="/services/cleaning"
        />
        
        <ServiceCarousel 
          title="Handyman Repair & Service" 
          items={handymanServices} 
          viewAllHref="/services/handyman"
        />
      </div>

      <WhyChooseUs />
      <HowItWorks />
      <CustomerReviews />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
