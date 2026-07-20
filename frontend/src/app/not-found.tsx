import Link from "next/link";
import { Home, Search, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/10 flex items-center justify-center pt-24 pb-20 px-4">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl text-center max-w-lg space-y-6">
        
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-4xl font-extrabold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Oops! The page or service route you are looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-2xl text-left space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Popular Services to Explore:</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/services/ac-repair" className="text-xs bg-card border border-border px-3 py-1.5 rounded-full hover:border-primary">
              AC Repair
            </Link>
            <Link href="/services/cleaning" className="text-xs bg-card border border-border px-3 py-1.5 rounded-full hover:border-primary">
              Deep Cleaning
            </Link>
            <Link href="/services/electrician" className="text-xs bg-card border border-border px-3 py-1.5 rounded-full hover:border-primary">
              Electrician
            </Link>
            <Link href="/services/plumbing" className="text-xs bg-card border border-border px-3 py-1.5 rounded-full hover:border-primary">
              Plumbing
            </Link>
            <Link href="/services" className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full">
              All Services →
            </Link>
          </div>
        </div>

        <div className="pt-2 flex gap-4">
          <Link href="/" className="w-full">
            <Button size="lg" className="w-full rounded-full h-12 text-base font-semibold">
              <Home className="mr-2 w-4 h-4" /> Go to Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
