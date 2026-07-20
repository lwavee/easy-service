import Metadata from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  CheckCircle2, Star, ShieldCheck, Clock, Award, 
  ArrowRight, PhoneCall, HelpCircle, Sparkles, Wrench,
  ThumbsUp, UserCheck, Zap, Tv
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceDetail {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  seoKeywords: string[];
}

const serviceDatabase: Record<string, Partial<ServiceDetail>> = {
  "ac-repair": {
    title: "AC Repair & Jet Servicing",
    category: "Appliance Care",
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 1240,
    startingPrice: "₹499",
    description: "Expert air conditioner repair, gas charging, deep jet cleaning, and installation services by certified HVAC technicians with 30-day warranty.",
    highlights: ["Deep Jet Foam Wash", "Gas Pressure Check & Refill", "30-Day Rework Guarantee", "Original Spare Parts"],
    inclusions: ["Indoor unit deep foam jet wash", "Outdoor unit high-pressure wash", "Gas leak diagnosis & pressure check", "Filter cleaning & anti-bacterial sanitization"],
    exclusions: ["Cost of spare parts if required", "Heavy wall cutting/masonry work"],
    process: [
      { step: "01", title: "Inspection & Diagnosis", desc: "Technician inspects cooling performance, gas level, and electricals." },
      { step: "02", title: "High-Pressure Jet Wash", desc: "Deep cleaning to remove dust and mold from cooling coils." },
      { step: "03", title: "Gas Top-up & Testing", desc: "Precision gas pressure tuning and performance verification." },
    ],
    faqs: [
      { q: "How often should AC be serviced?", a: "We recommend servicing your AC every 6 months to ensure optimal cooling and lower electricity bills." },
      { q: "What is included in the 30-day warranty?", a: "If the same issue reoccurs within 30 days, our technician will re-inspect and fix it at zero extra charge." },
    ]
  },
  "tv-installation": {
    title: "Smart TV Repair & Wall Mounting",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 1840,
    startingPrice: "₹299",
    description: "Expert LED/OLED Smart TV repair, motherboard troubleshooting, backlight replacement, display panel fix, and precision wall mounting.",
    highlights: ["Precision Laser Level Wall Mounting", "Display & Power Board Fix", "Genuine Replacement Parts", "Same Day Service"],
    inclusions: ["TV wall bracket installation", "Wire concealment & cable management", "Soundbar/Set-top box connection", "Display calibration & picture test"],
    exclusions: ["Cost of TV wall bracket hardware", "Masonry concealment channel"],
    process: [
      { step: "01", title: "Laser Level Marking", desc: "Measuring optimal viewing height and wall stud strength." },
      { step: "02", title: "Drilling & Bracket Mount", desc: "Securing heavy-duty wall bracket using anchor bolts." },
      { step: "03", title: "Mount & Testing", desc: "Mounting television, connecting cables, and testing HDMI signals." }
    ],
    faqs: [
      { q: "Do you supply the wall mount bracket?", a: "Yes, our technicians carry standard tilt and swivel wall mounts available for purchase on site." }
    ]
  },
  "fan-repair": {
    title: "Ceiling & Exhaust Fan Repair & Fitting",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 920,
    startingPrice: "₹149",
    description: "Fast doorstep repair for ceiling fans, exhaust fans, and BLDC motor fans. Capacitor replacement, winding fix, and noise elimination.",
    highlights: ["Capacitor Replacement", "BLDC & Regulator Fix", "Blade Balancing", "Zero Wobble Guarantee"],
    inclusions: ["Fan motor diagnosis", "Capacitor replacement", "Downrod & hook safety check", "Speed regulator testing"],
    exclusions: ["Cost of new fan motor or replacement blades"],
    process: [
      { step: "01", title: "Voltage & Speed Check", desc: "Inspecting electrical supply and capacitor output." },
      { step: "02", title: "Component Fix", desc: "Replacing worn capacitors, bearings, or wiring joints." },
      { step: "03", title: "Safety Testing", desc: "Ensuring zero wobble and silent operation." }
    ],
    faqs: [
      { q: "Why is my ceiling fan moving slowly?", a: "A weak capacitor is the most common reason. Replacing it restores full RPM speed immediately." }
    ]
  },
  "air-cooler-repair": {
    title: "Air Cooler Repair & Servicing",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 780,
    startingPrice: "₹349",
    description: "Descaling desert coolers, water pump replacement, honeycomb pad replacement, fan motor lubrication, and wiring repair.",
    highlights: ["Water Pump Replacement", "Honeycomb Pad Change", "Tank Descaling", "Maximum Air Throw"],
    inclusions: ["Cooler tank cleaning & descaling", "Water pump & distributor pipe clearing", "Fan motor lubrication", "Wiring safety check"],
    exclusions: ["Cost of new honeycomb pads or pump motor"],
    process: [
      { step: "01", title: "Tank Wash & Drain", desc: "Draining stale water and removing mineral scale buildup." },
      { step: "02", title: "Pump & Pad Inspection", desc: "Checking water circulation pump and pad absorption." },
      { step: "03", title: "Flow Test", desc: "Testing water distribution and cold air delivery." }
    ],
    faqs: [
      { q: "How often should cooler pads be replaced?", a: "Honeycomb pads should be replaced once every summer season for fresh, hygienic air flow." }
    ]
  },
  "geyser-repair": {
    title: "Water Geyser & Room Heater Repair",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 1120,
    startingPrice: "₹399",
    description: "Certified geyser repair for electric & gas water heaters, room radiator heaters, thermostat replacement, heating element fix, and leak sealing.",
    highlights: ["Heating Element Replacement", "Thermostat Safety Fix", "Pressure Valve Check", "Zero Leakage Cover"],
    inclusions: ["Thermostat testing & temperature calibration", "Heating coil descaling/replacement", "Auto cut-off safety verification", "Pipe joint leak seal"],
    exclusions: ["Geyser tank replacement"],
    process: [
      { step: "01", title: "Electrical Safety Check", desc: "Verifying earthing and checking circuit continuity." },
      { step: "02", title: "Element & Thermostat Test", desc: "Replacing burnt coil elements or faulty thermostats." },
      { step: "03", title: "Water Heat Test", desc: "Testing rapid water heating and auto power-cut safety." }
    ],
    faqs: [
      { q: "Why is the geyser tripping my MCB?", a: "A burnt heating element touching the water casing causes earthing leakage. Replacing the element fixes this safely." }
    ]
  },
  "washing-machine": {
    title: "Washing Machine Repair & Service",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 2210,
    startingPrice: "₹499",
    description: "Doorstep technician for front load, top load, and semi-automatic washing machines. Drum noise, water inlet, spin motor, and PCB repair.",
    highlights: ["Front & Top Load Specialists", "Drain Pump Fix", "Drum Bearing Repair", "30-Day Guarantee"],
    inclusions: ["Complete electrical & motor diagnosis", "Water inlet valve & drain pump clearing", "Belt tensioning & drum balance check", "Vibration damping calibration"],
    exclusions: ["Cost of spare parts or replacement PCB"],
    process: [
      { step: "01", title: "Error Code Diagnosis", desc: "Scanning PCB error codes and inspecting drive belt." },
      { step: "02", title: "Component Repair", desc: "Replacing inlet valve, drain pump, or motor carbon brushes." },
      { step: "03", title: "Spin & Drain Test", desc: "Running full wash, rinse, and high-speed spin cycle." }
    ],
    faqs: [
      { q: "Why is my washing machine shaking violently?", a: "Violent shaking occurs due to worn shock absorbers or uneven drum levelling. Our technician fixes both on site." }
    ]
  },
  "refrigerator": {
    title: "Refrigerator & Fridge Repair",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 1980,
    startingPrice: "₹449",
    description: "Certified technicians for single door, double door, and side-by-side inverter fridges. Compressor fix, cooling gas refill, thermostat, and ice maker repair.",
    highlights: ["Compressor Diagnosis", "Gas Pressure Refill", "Frost Free Defrost Fix", "Thermostat Calibration"],
    inclusions: ["Cooling coil inspection & defrost check", "Thermostat & relay replacement", "Gas leak repair & charging", "Door gasket seal check"],
    exclusions: ["Cabinet sheet metal replacement"],
    process: [
      { step: "01", title: "Cooling & Gas Check", desc: "Measuring freezer temperature and compressor relay function." },
      { step: "02", title: "Gas Top-Up / Relay Fix", desc: "Replacing start relay or soldering gas leak lines." },
      { step: "03", title: "Chilling Performance Test", desc: "Verifying defrost timer and freezer frost creation." }
    ],
    faqs: [
      { q: "Why is the fridge section not cooling while freezer is cold?", a: "This is caused by a blocked air duct or faulty defrost timer. We unclog the duct and replace the defrost sensor." }
    ]
  },
  "microwave": {
    title: "Microwave & Oven Repair",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 1140,
    startingPrice: "₹349",
    description: "Fast repair for solo, grill, and convection microwaves. Magnetron replacement, touch panel fix, high-voltage diode, and turntable motor repair.",
    highlights: ["Magnetron Replacement", "Touchpad / Keypad Repair", "Door Safety Switch Fix", "Genuine High-Voltage Parts"],
    inclusions: ["Magnetron & high voltage diode testing", "Turntable motor & roller ring check", "Touch panel button repair", "Heating performance test"],
    exclusions: ["Replacement glass turntable plate"],
    process: [
      { step: "01", title: "High-Voltage Testing", desc: "Safely testing transformer output, diode, and magnetron." },
      { step: "02", title: "Component Fix", desc: "Replacing burnt magnetron or faulty door interlock switches." },
      { step: "03", title: "Heating Test", desc: "Testing microwave heating on water sample in under 30 seconds." }
    ],
    faqs: [
      { q: "Why is the microwave running but not heating food?", a: "A blown high-voltage diode or dead magnetron is the main cause. Replacing the magnetron restores instant heating." }
    ]
  },
  "chimney-repair": {
    title: "Kitchen Chimney & Hob Servicing",
    category: "Electrical & Appliances",
    heroImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 1450,
    startingPrice: "₹599",
    description: "Deep chemical degreasing for baffle filters, suction motor repair, touch/gesture control fix, and duct pipe installation.",
    highlights: ["Heavy Oil Degreasing", "Suction Motor Tuning", "Gesture Control Repair", "Duct Pipe Fitting"],
    inclusions: ["Filter caustic soda chemical bath", "Blower fan oil removal & motor lube", "Touch panel & LED light fix", "Suction power testing"],
    exclusions: ["Replacement aluminum flexible duct pipe"],
    process: [
      { step: "01", title: "Filter Dismount & Chemical Bath", desc: "Soaking heavy metal filters in oil-dissolving solution." },
      { step: "02", title: "Motor & Fan Cleaning", desc: "Scrubbing grease off motor housing and impeller." },
      { step: "03", title: "Reassembly & Suction Test", desc: "Mounting clean filters and testing CFM air extraction." }
    ],
    faqs: [
      { q: "How often should chimney filters be deep cleaned?", a: "Every 3 to 6 months to prevent oil dripping onto your cooking stove and maintain high suction." }
    ]
  },
  "car-foam-wash": {
    title: "Doorstep Car Foam Wash & Wax",
    category: "Vehicle Detailing",
    heroImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 1820,
    startingPrice: "₹499",
    description: "High-pressure foam wash at your doorstep with pH-neutral shampoo, micro-fiber dry, tyre dressing, and spray wax coating.",
    highlights: ["Doorstep Water & Power Setup", "pH-Neutral Snow Foam", "Tyre & Rim Shine", "Microfiber Scratch-Free Dry"],
    inclusions: ["High-pressure underbody & exterior rinse", "Snow foam application & mitt scrub", "Glass & mirror streak-free wipe", "Tyre polish & dashboard dust-off"],
    exclusions: ["Paint correction/scratch buffing", "Internal upholstery shampooing"],
    process: [
      { step: "01", title: "High-Pressure Pre-Rinse", desc: "Rinsing loose mud and road grime off body and wheel arches." },
      { step: "02", title: "Snow Foam Scrubbing", desc: "Covering car in thick foam to lift stubborn contaminants safely." },
      { step: "03", title: "Microfiber Dry & Polish", desc: "Drying with plush microfibers and applying tyre & trim shine." }
    ],
    faqs: [
      { q: "Do you bring your own water and electricity?", a: "Yes! Our mobile car detailers carry portable water tanks and pressure washers." }
    ]
  },
  "car-interior-cleaning": {
    title: "Car Interior Deep Spa & Vacuum",
    category: "Vehicle Detailing",
    heroImage: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 1240,
    startingPrice: "₹999",
    description: "Comprehensive interior cleaning including seat upholstery injection-extraction shampooing, AC vent sanitization, and leather condition.",
    highlights: ["Upholstery Stain Removal", "AC Duct Sanitization", "Dashboard & Plastic Polish", "Odor Elimination"],
    inclusions: ["Fabric seat shampooing & extraction", "Leather seat cleaning & conditioner", "Roof liner & floor mat deep vacuuming", "AC duct antibacterial steam/foam spray"],
    exclusions: ["Exterior car wash", "Engine bay detailing"],
    process: [
      { step: "01", title: "Deep Vacuuming", desc: "Removing dirt from seat crevices, carpets, and boot space." },
      { step: "02", title: "Shampoo Extraction", desc: "Scrubbing stains and extracting liquid with heavy-duty vacuum." },
      { step: "03", title: "Sanitization & Polish", desc: "Disinfecting AC vents and conditioning leather/dashboard." }
    ],
    faqs: [
      { q: "How long do seats take to dry?", a: "Our high-power suction extractors remove 90% water; seats dry completely in about 2 hours." }
    ]
  },
  "car-full-spa": {
    title: "Complete Car Full Spa & Teflon Polish",
    category: "Vehicle Detailing",
    heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 940,
    startingPrice: "₹1,499",
    description: "The ultimate 360-degree car makeover combining exterior pressure foam wash, interior deep shampoo extraction, and Teflon sealant polish.",
    highlights: ["360 Exterior & Interior", "Teflon Paint Protection", "Stain & Odor Removal", "Showroom Gloss Finish"],
    inclusions: ["Exterior snow foam wash", "Teflon paint sealant application", "Interior seat & carpet deep shampooing", "Engine bay dressing & glass treatment"],
    exclusions: ["Deep ceramic coating scratch sanding"],
    process: [
      { step: "01", title: "Foam Wash & Prep", desc: "Washing exterior body and deep cleaning wheel wells." },
      { step: "02", title: "Interior Deep Spa", desc: "Complete seat, carpet, roof, and trunk sanitization." },
      { step: "03", title: "Teflon Polish Coating", desc: "Applying protective gloss sealant for mirror reflection." }
    ],
    faqs: [
      { q: "What is the benefit of Teflon polish?", a: "Teflon protects your paint against UV oxidation, water spots, dust adhesion, and light swirl marks." }
    ]
  },
  "cleaning": {
    title: "Deep Home Cleaning",
    category: "Cleaning & Hygiene",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 3100,
    startingPrice: "₹1,499",
    description: "Professional full home deep cleaning using hospital-grade disinfectants, motorized scrubbing machines, and eco-friendly solutions.",
    highlights: ["Hospital-grade Disinfection", "Heavy-duty Mechanized Scrubbing", "Trained Cleaning Crew", "Complete Stain Removal"],
    inclusions: ["Living room & bedroom vacuuming", "Kitchen degreasing & cabinet cleaning", "Bathroom sanitization", "Balcony & window cleaning"],
    exclusions: ["Wall painting stain removal", "Internal appliance disassembly", "Heavy furniture lifting"],
    process: [
      { step: "01", title: "Dusting & Vacuuming", desc: "Removal of loose dust, cobwebs, and debris across all rooms." },
      { step: "02", title: "Mechanized Scrubbing", desc: "Deep scrubbing of tile floors, counters, and stubborn grime." },
      { step: "03", title: "Sanitization & Polish", desc: "Disinfection of high-touch surfaces and chrome polishing." },
    ],
    faqs: [
      { q: "How long does full home cleaning take?", a: "A standard 2BHK deep cleaning typically takes between 4 to 6 hours depending on home size." },
      { q: "Do I need to provide cleaning supplies?", a: "No, our team comes equipped with professional machines, microfibers, and eco-friendly chemicals." },
    ]
  },
  "electrician": {
    title: "Professional Electrician Services",
    category: "Handyman & Repair",
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 2150,
    startingPrice: "₹199",
    description: "Licensed electricians for quick wiring, switchboard repair, light fixture installations, MCB replacement, and short circuit troubleshooting.",
    highlights: ["Certified Electricians", "Safety First Protocol", "Same Day Service", "Transparent Pricing"],
    inclusions: ["Fault diagnosis & load checking", "Switchboard installation/repair", "Short-circuit troubleshooting", "Ceiling fan & light fitting"],
    exclusions: ["Material/wire purchase cost", "Wall cutting beyond standard scope"],
    process: [
      { step: "01", title: "Safety Inspection", desc: "Complete testing of voltage, grounding, and line safety." },
      { step: "02", title: "Repair / Installation", desc: "Precision wiring fix or fixture mounting following electrical codes." },
      { step: "03", title: "Load Test", desc: "Final verification under full load before sign-off." },
    ],
    faqs: [
      { q: "Are your electricians licensed?", a: "Yes, all our electricians are background checked, certified, and trained in residential safety standards." },
    ]
  },
  "plumbing": {
    title: "Expert Plumbing Services",
    category: "Handyman & Repair",
    heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    reviewsCount: 1890,
    startingPrice: "₹249",
    description: "Reliable plumbers for pipe leak repair, tap installation, drain unclogging, water heater fitting, and toilet repairs.",
    highlights: ["Fast Drain Unclogging", "Leakage Fixing", "Genuine Spare Fitting", "Guaranteed Workmanship"],
    inclusions: ["Tap & shower repair/replacement", "Drainage block clearance", "Flush tank repair", "Pipeline leak patch"],
    exclusions: ["Sanitaryware purchase cost", "Main underground line excavation"],
    process: [
      { step: "01", title: "Leak Detection", desc: "Locating source of seepage, pressure drop, or block." },
      { step: "02", title: "Precision Fix", desc: "Replacing gaskets, sealing joints, or installing new fixtures." },
      { step: "03", title: "Pressure Testing", desc: "Checking water pressure and flow rate post-repair." },
    ],
    faqs: [
      { q: "How quickly can a plumber arrive?", a: "We offer 60-minute express dispatch for emergency plumbing issues." },
    ]
  },
  "painting": {
    title: "Wall Painting & Waterproofing",
    category: "Home Improvement",
    heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewsCount: 980,
    startingPrice: "₹7/sq.ft",
    description: "Transform your home with dust-free mechanized painting, damp treatment, texture design, and premium paint brands.",
    highlights: ["Laser Measurement", "Dust-Free Sanding", "Asian Paints / Berger Certified", "Color Consultation"],
    inclusions: ["Furniture masking & floor protection", "Wall putty & primer application", "2 coats of premium emulsion", "Post-paint cleanup"],
    exclusions: ["Major structural plaster repair", "Exterior scaffolding erection"],
    process: [
      { step: "01", title: "Site Inspection", desc: "Laser measurement and moisture check of all walls." },
      { step: "02", title: "Masking & Preparation", desc: "Protecting furniture and floor before smooth putty sanding." },
      { step: "03", title: "Mechanized Painting", desc: "Uniform dual-coat spray/roller finish with final cleanup." },
    ],
    faqs: [
      { q: "Do you assist with color selection?", a: "Yes! Our painting experts provide free shade cards and digital preview assistance." },
    ]
  },
};

function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getServiceData(slug: string): ServiceDetail {
  const existing = serviceDatabase[slug];
  const formattedTitle = formatSlugToTitle(slug);

  if (existing && existing.title) {
    return {
      slug,
      title: existing.title,
      category: existing.category || "Professional Home Service",
      heroImage: existing.heroImage || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
      rating: existing.rating || 4.8,
      reviewsCount: existing.reviewsCount || 450,
      startingPrice: existing.startingPrice || "₹299",
      description: existing.description || `Book top-rated, background-verified professionals for ${formattedTitle}. On-time arrival, transparent pricing, and 100% satisfaction guaranteed.`,
      highlights: existing.highlights || [
        "Verified & Trained Experts",
        "Transparent Doorstep Rates",
        "30-Day Service Guarantee",
        "Same Day Slot Booking"
      ],
      inclusions: existing.inclusions || [
        `Complete diagnostic & performance check of ${formattedTitle}`,
        "High quality tools and authentic spare parts",
        "Post-service cleanup and safety verification",
        "Digital invoice with warranty card"
      ],
      exclusions: existing.exclusions || [
        "Unspecified major structural changes",
        "Cost of additional hardware/spares if required"
      ],
      process: existing.process || [
        { step: "01", title: "Easy Online Booking", desc: "Choose your preferred date, time slot, and service details." },
        { step: "02", title: "Expert Arrival", desc: "Verified professional arrives on time with complete equipment." },
        { step: "03", title: "Service & Guarantee", desc: "Job execution with 30-day service warranty and digital payment." }
      ],
      faqs: existing.faqs || [
        { q: `Why choose ServiceHub for ${formattedTitle}?`, a: "We conduct 5-level background checks on all service professionals and offer standard upfront pricing with zero hidden charges." },
        { q: "What if I need to reschedule my booking?", a: "You can reschedule or cancel your booking for free up to 2 hours before the scheduled appointment." }
      ],
      seoKeywords: existing.seoKeywords || [slug, formattedTitle, "home service", "repair near me", "professional service"]
    };
  }

  return {
    slug,
    title: `${formattedTitle} Service`,
    category: "Professional Home Service",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 620,
    startingPrice: "₹299",
    description: `Professional, doorstep ${formattedTitle} services by background-checked technicians. Reliable, fast, and transparent pricing guaranteed.`,
    highlights: [
      "Background-Checked Experts",
      "Upfront Fixed Pricing",
      "30-Day Service Guarantee",
      "Flexible Slot Selection"
    ],
    inclusions: [
      `Comprehensive inspection for ${formattedTitle}`,
      "Use of professional-grade tools & equipment",
      "Complete post-service testing and cleanup",
      "Digital tax invoice and warranty"
    ],
    exclusions: [
      "Unspecified heavy structural alterations",
      "Cost of external materials unless selected"
    ],
    process: [
      { step: "01", title: "Schedule Booking", desc: "Select your service slot and location in under 2 minutes." },
      { step: "02", title: "Professional Inspection", desc: "Our certified expert arrives with full equipment." },
      { step: "03", title: "Quality Guarantee", desc: "Job completed with 30-day post-service warranty cover." }
    ],
    faqs: [
      { q: `How do I book ${formattedTitle}?`, a: "Click the 'Book Now' button, pick your preferred date and time slot, and enter your address." },
      { q: "Is there any warranty on the service?", a: "Yes! All our services come with a 30-day rework guarantee at no additional cost." }
    ],
    seoKeywords: [slug, formattedTitle, "doorstep service", "verified pros", "best price"]
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = getServiceData(resolvedParams.slug);
  return {
    title: `${data.title} | Book Online - ServiceHub`,
    description: data.description,
    keywords: data.seoKeywords.join(", "),
    openGraph: {
      title: `${data.title} - Top Rated Home Services`,
      description: data.description,
      images: [{ url: data.heroImage }],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceData(resolvedParams.slug);

  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background via-muted/20 to-background border-b border-border/60 py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>{service.category}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {service.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-full font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{service.rating}</span>
                </div>
                <span className="text-muted-foreground">({service.reviewsCount}+ verified ratings)</span>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {service.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href={`/book?service=${service.slug}`}>
                  <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 text-base h-12 font-semibold">
                    Book Now from {service.startingPrice} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="rounded-full px-6 h-12 font-semibold">
                    <PhoneCall className="mr-2 w-4 h-4" /> Speak to Expert
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-card aspect-[4/3]">
                <img 
                  src={service.heroImage} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-xs uppercase tracking-wider text-white/80 font-medium">Starting At</p>
                    <p className="text-3xl font-extrabold text-white">{service.startingPrice}</p>
                    <p className="text-xs text-white/70">Inclusive of all taxes & doorstep charge</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground text-base">
              Simple, transparent 3-step process to get your service completed seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.process.map((step, idx) => (
              <div key={idx} className="bg-card border border-border/80 p-8 rounded-3xl relative hover:border-primary/50 transition-colors shadow-sm">
                <div className="text-4xl font-black text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-16 bg-muted/20 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            
            {/* Inclusions */}
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">What's Included</h3>
              </div>
              <ul className="space-y-4">
                {service.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500/10 text-rose-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">What's Excluded</h3>
              </div>
              <ul className="space-y-4">
                {service.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about this service</p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                <h4 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-muted-foreground text-sm pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 md:p-12 rounded-3xl text-center shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to book your {service.title}?</h3>
            <p className="text-primary-foreground/90 max-w-lg mx-auto mb-8 text-base">
              Get instant confirmation with background-verified professionals delivered to your doorstep.
            </p>
            <Link href={`/book?service=${service.slug}`}>
              <Button size="lg" variant="secondary" className="rounded-full px-8 text-base font-semibold h-12 shadow-md">
                Book This Service Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
