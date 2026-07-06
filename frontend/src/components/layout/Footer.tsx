import Link from "next/link";
import { User } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <User size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                ServiceHub
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Your trusted platform for booking premium home services. Professional technicians at your doorstep in minutes.
            </p>
            <div className="space-y-3 mt-2">
              <h4 className="font-medium text-foreground">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="max-w-[240px]" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground text-lg mb-2">Company</h4>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link href="/partner" className="text-muted-foreground hover:text-primary transition-colors">Become a Professional</Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground text-lg mb-2">Services</h4>
            <Link href="/services/cleaning" className="text-muted-foreground hover:text-primary transition-colors">Home Cleaning</Link>
            <Link href="/services/electrician" className="text-muted-foreground hover:text-primary transition-colors">Electricians</Link>
            <Link href="/services/plumbing" className="text-muted-foreground hover:text-primary transition-colors">Plumbing</Link>
            <Link href="/services/appliance-repair" className="text-muted-foreground hover:text-primary transition-colors">Appliance Repair</Link>
            <Link href="/services/painting" className="text-muted-foreground hover:text-primary transition-colors">Painting</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground text-lg mb-2">Legal</h4>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
            <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ServiceHub Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              <FaFacebook size={20} />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
