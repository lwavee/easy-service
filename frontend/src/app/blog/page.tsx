import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Home Care & Maintenance Blog | ServiceHub Tips",
  description: "Expert advice on AC maintenance, deep cleaning hacks, electrical safety tips, and home improvement guides from ServiceHub professionals.",
};

const blogPosts = [
  {
    title: "10 Essential AC Maintenance Tips Before Summer Peak",
    category: "Appliance Care",
    date: "July 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop",
    excerpt: "Learn how regular coil cleaning and gas pressure checks can double your air conditioner lifespan and cut energy bills by 25%.",
    slug: "ac-maintenance-tips"
  },
  {
    title: "Deep Cleaning vs Regular Cleaning: What Does Your Home Need?",
    category: "Home Hygiene",
    date: "July 14, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    excerpt: "Understand the difference between daily surface wipes and mechanized deep foam scrubbing for tile grout, kitchen grease, and bathroom scales.",
    slug: "deep-cleaning-guide"
  },
  {
    title: "How to Detect & Prevent Electrical Short Circuits at Home",
    category: "Safety & Repairs",
    date: "July 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    excerpt: "Crucial electrical safety checks every homeowner should perform on MCB switches, heavy appliances, and old wiring.",
    slug: "prevent-electrical-short-circuits"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      
      <section className="container mx-auto px-4 md:px-6 py-12 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          ServiceHub Journal & Guides
        </h1>
        <p className="text-lg text-muted-foreground">
          Practical home care tips, appliance maintenance advice, and expert guides written by verified professionals.
        </p>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-6xl py-6">
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                </div>
                <Link href={`/services`}>
                  <Button variant="ghost" className="p-0 text-primary hover:bg-transparent font-semibold inline-flex items-center gap-1">
                    Read Full Article <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
