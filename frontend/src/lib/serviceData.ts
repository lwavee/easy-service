export interface ServiceDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  seoDescription: string;
  seoKeywords: string;
  image: string;
  benefits: string[];
  timing?: string;
  coverage?: string;
  menuItems?: string[];
}

export const servicesData: Record<string, ServiceDetails> = {
  // AC Repair
  "split-ac": {
    id: "split-ac",
    title: "Split AC Service",
    category: "AC Repair & Service",
    description: "Comprehensive split AC servicing and maintenance to ensure optimal cooling and energy efficiency.",
    seoDescription: "Professional Split AC service and repair. Expert technicians for optimal cooling performance.",
    seoKeywords: "Split AC service, AC repair, air conditioner maintenance, split AC cleaning",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Thorough filter cleaning", "Gas level check", "Cooling coil wash", "Performance optimization"],
  },
  // Cooks
  "cook-north-indian": {
    id: "cook-north-indian",
    title: "North Indian Cook",
    category: "Cooking Services",
    description: "Hire an expert North Indian cook to prepare authentic, delicious meals right in your home. Perfect for daily meals or special occasions.",
    seoDescription: "Hire a professional North Indian Cook. Authentic Punjabi, Mughlai, and North Indian cuisine prepared fresh at your home.",
    seoKeywords: "North Indian cook, hire cook, personal chef, Indian food chef, home cooking",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Authentic flavors", "Customized spice levels", "Hygienic preparation", "Flexible timings"],
  },
  "cook-south-indian": {
    id: "cook-south-indian",
    title: "South Indian Cook",
    category: "Cooking Services",
    description: "Experience the rich flavors of South India with our specialized cooks. From crispy dosas to flavorful curries.",
    seoDescription: "Hire an expert South Indian Cook. Delicious Idli, Dosa, Sambar, and authentic meals prepared at your home.",
    seoKeywords: "South Indian cook, hire dosa cook, personal chef, South Indian food, home cook",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Authentic recipes", "Healthy preparations", "Variety of breakfast options", "Professional service"],
  },
  "cook-mughlai": {
    id: "cook-mughlai",
    title: "Mughlai Cook",
    category: "Cooking Services",
    description: "Indulge in royal Mughlai cuisine prepared by experienced chefs at your home.",
    seoDescription: "Professional Mughlai Cook for hire. Biryani, Kebab, and rich curries prepared authentically.",
    seoKeywords: "Mughlai cook, Biryani chef, hire chef, Mughlai cuisine, personal cook",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Rich authentic flavors", "Special event catering", "Premium ingredients", "Expert biryani preparation"],
  },
  "cook-chinese": {
    id: "cook-chinese",
    title: "Chinese Cook",
    category: "Cooking Services",
    description: "Enjoy delicious Indo-Chinese and authentic Chinese dishes prepared right in your kitchen.",
    seoDescription: "Hire a Chinese food cook for your home. Noodles, Manchurian, and authentic Chinese meals.",
    seoKeywords: "Chinese cook, Indo-Chinese chef, Asian cuisine, home chef, hire cook",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Restaurant style taste", "Hygienic cooking", "Customized dishes", "Quick preparation"],
    timing: "Available for Lunch (11 AM - 3 PM) and Dinner (6 PM - 10 PM)",
    coverage: "Includes prep work, cooking, and post-cooking kitchen cleanup.",
    menuItems: [
      "Veg Manchurian",
      "Gobi Manchurian",
      "Chicken Manchurian",
      "Chilli Chicken",
      "Chilli Paneer",
      "Crispy Corn",
      "Spring Rolls",
      "Momos",
      "Dragon Chicken",
      "Honey Chilli Potato"
    ]
  },
  "cook-continental": {
    id: "cook-continental",
    title: "Continental Cook",
    category: "Cooking Services",
    description: "Sophisticated Continental cuisine prepared with finesse by our expert chefs.",
    seoDescription: "Expert Continental Cook for hire. Steaks, salads, and European cuisine at home.",
    seoKeywords: "Continental cook, European cuisine chef, personal chef, hire cook",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Healthy ingredients", "Elegant presentation", "Diet-friendly options", "Professional etiquette"],
  },
  "cook-italian": {
    id: "cook-italian",
    title: "Italian Cook",
    category: "Cooking Services",
    description: "Authentic Italian pastas, pizzas, and risottos crafted to perfection in your home.",
    seoDescription: "Hire an Italian Cook. Authentic pasta, pizza, and Italian cuisine for your home.",
    seoKeywords: "Italian cook, pasta chef, pizza chef, Italian food, hire personal cook",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Fresh pasta making", "Authentic sauces", "High-quality ingredients", "Delightful desserts"],
  },
  "cook-bakery": {
    id: "cook-bakery",
    title: "Bakery & Pastry Cook",
    category: "Cooking Services",
    description: "Freshly baked bread, cakes, and pastries prepared right in your own oven.",
    seoDescription: "Professional Bakery & Pastry Cook. Fresh cakes, breads, and desserts baked at home.",
    seoKeywords: "Pastry chef, home baker, bakery cook, fresh cakes, hire baker",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Custom cakes", "Fresh daily breads", "Hygienic baking", "Special dietary baking"],
  },
  "cook-tandoor": {
    id: "cook-tandoor",
    title: "Tandoor Cook",
    category: "Cooking Services",
    description: "Expert tandoor chefs for the perfect rotis, naans, and smoky kebabs.",
    seoDescription: "Hire a Tandoor Cook. Authentic smoky kebabs, naan, and tandoori items.",
    seoKeywords: "Tandoor cook, kebab chef, tandoori items, hire tandoor chef",
    image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Perfectly charred flavor", "Variety of Indian breads", "Live counters for parties", "Expert marination"],
  },
  "cook-fast-food": {
    id: "cook-fast-food",
    title: "Fast Food Cook",
    category: "Cooking Services",
    description: "Craving street food? Our fast food cooks bring the taste to your clean kitchen.",
    seoDescription: "Hire a Fast Food Cook. Burgers, sandwiches, and street food favorites prepared hygienically.",
    seoKeywords: "Fast food cook, street food chef, burger maker, hire fast food chef",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Quick snacks", "Kid-friendly options", "Party catering", "Hygienic preparation"],
  },
  "cook-sweets": {
    id: "cook-sweets",
    title: "Sweets (Halwai) Cook",
    category: "Cooking Services",
    description: "Traditional Indian sweets (mithai) prepared with pure ingredients by expert halwais.",
    seoDescription: "Professional Halwai for hire. Traditional Indian sweets, jalebi, gulab jamun prepared at home.",
    seoKeywords: "Halwai, sweets cook, Indian mithai maker, hire halwai, festival sweets",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Pure desi ghee preparation", "Festive specials", "Bulk orders for events", "Authentic recipes"],
  },
  // Default fallback
  "default": {
    id: "default",
    title: "Professional Service",
    category: "Home Services",
    description: "Top-rated professional services tailored to your needs.",
    seoDescription: "Book professional home services with Easy Service.",
    seoKeywords: "home services, professional service, booking",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    benefits: ["Verified professionals", "Satisfaction guaranteed", "Transparent pricing", "Easy booking"],
  }
};

export function getServiceDetails(id: string): ServiceDetails {
  return servicesData[id] || { ...servicesData["default"], id };
}
