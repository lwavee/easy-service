import TopCategoriesStrip from "@/components/home/TopCategoriesStrip";
import PromoBanners from "@/components/home/PromoBanners";
import ServiceCarousel, { ServiceItem } from "@/components/home/ServiceCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";

const mostBookedServices: ServiceItem[] = [
  { title: "AC Repair Service", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop", href: "/services/ac-repair", tag: "5% Off" },
  { title: "Chimney Repair Service", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop", href: "/services/chimney-repair" },
  { title: "Washing Machine Repair", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop", href: "/services/washing-machine" },
  { title: "Refrigerator Repair", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", href: "/services/refrigerator" },
  { title: "Microwave Repair", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop", href: "/services/microwave", tag: "New" },
];

const handymanServices: ServiceItem[] = [
  { title: "Furniture Assembly", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop", href: "/services/furniture-assembly" },
  { title: "Bird & Safety Net", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", href: "/services/safety-net" },
  { title: "Sofa Repair", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop", href: "/services/sofa-repair" },
  { title: "TV Installation", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop", href: "/services/tv-installation" },
  { title: "Tile Grouting", image: "https://images.unsplash.com/photo-1523413651479-59cb1f20e278?q=80&w=800&auto=format&fit=crop", href: "/services/tile-grouting" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <TopCategoriesStrip />
      <PromoBanners />
      
      <div className="py-4">
        <ServiceCarousel 
          title="Most Booked Services" 
          items={mostBookedServices} 
          viewAllHref="/services"
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
