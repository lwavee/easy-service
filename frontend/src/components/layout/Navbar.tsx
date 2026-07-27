"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, Sun, Moon, Menu, X, Smartphone,
  Briefcase, Shield, CalendarCheck, Users, Sparkles
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getStoredBookings } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeBookingCount, setActiveBookingCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Load active bookings count
    const updateCount = () => {
      const bookings = getStoredBookings();
      const active = bookings.filter(b => b.status !== "completed" && b.status !== "cancelled");
      setActiveBookingCount(active.length);
    };
    updateCount();
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-200 ${
        isScrolled
          ? "bg-background/95 border-b border-border shadow-sm py-2.5"
          : "bg-background/80 py-3.5 border-b border-border/40"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="bg-gradient-to-tr from-primary to-emerald-500 text-primary-foreground p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform">
            <Sparkles size={22} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-1">
              ServiceHub <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">HT Experts</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium -mt-1">Doorstep Experts & Pro Hiring</span>
          </div>
        </Link>

        {/* Center Role Switcher (Desktop) */}
        <div className="hidden lg:flex items-center bg-muted/80 p-1.5 rounded-2xl border border-border/80 shadow-inner">
          <Link
            href="/services"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              pathname === "/services" || pathname === "/" || pathname === "/book"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User size={14} className="text-primary" /> Customer View
          </Link>

          <Link
            href="/bookings"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all relative ${
              pathname === "/bookings"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarCheck size={14} className="text-emerald-500" /> My Orders
            {activeBookingCount > 0 && (
              <span className="ml-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                {activeBookingCount}
              </span>
            )}
          </Link>

          <Link
            href="/employee"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              pathname === "/employee"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase size={14} className="text-blue-500" /> Pro / Employee
          </Link>

          <Link
            href="/client-management"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              pathname === "/client-management"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users size={14} className="text-amber-500" /> Client CRM
          </Link>

          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              pathname === "/admin"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Shield size={14} className="text-purple-500" /> Admin Ops
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <Link
            href="/download"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-2xl font-extrabold text-xs h-10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 px-3.5")}
          >
            <Smartphone size={14} className="mr-1.5" /> Mobile App (APK)
          </Link>

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Light / Dark Mode"
            className="p-2 rounded-xl border border-border bg-card text-foreground hover:border-primary transition-all shadow-sm"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <Link
            href="/book"
            className={cn(buttonVariants({ variant: "default" }), "rounded-2xl px-5 font-bold shadow-md shadow-primary/20 bg-primary text-primary-foreground hover:opacity-90 h-10")}
          >
            Instant Booking
          </Link>
        </div>

        {/* Mobile Actions & Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/download"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-xl px-2.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 border-emerald-500/30 h-8")}
          >
            <Smartphone size={14} className="mr-1" /> App
          </Link>

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Light / Dark Mode"
            className="p-2 rounded-xl border border-border bg-card text-foreground"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <button
            className="text-foreground p-2 rounded-xl border border-border bg-card"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Role Switcher Menu */}
      {mobileMenuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-background border-b border-border shadow-2xl py-5 px-5 flex flex-col gap-3 lg:hidden"
        >
          <div className="text-xs font-bold uppercase text-muted-foreground px-2">Switch Application View</div>
          
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 border border-border text-sm font-bold text-foreground"
          >
            <span className="flex items-center gap-2.5"><User size={18} className="text-primary" /> Customer View</span>
            <span className="text-xs text-muted-foreground">Book Services</span>
          </Link>

          <Link
            href="/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 border border-border text-sm font-bold text-foreground"
          >
            <span className="flex items-center gap-2.5">
              <CalendarCheck size={18} className="text-emerald-500" /> My Active Orders
            </span>
            {activeBookingCount > 0 ? (
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeBookingCount} Active
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Track Order</span>
            )}
          </Link>

          <Link
            href="/employee"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 border border-border text-sm font-bold text-foreground"
          >
            <span className="flex items-center gap-2.5"><Briefcase size={18} className="text-blue-500" /> Pro / Employee App</span>
            <span className="text-xs text-muted-foreground">Technician Jobs</span>
          </Link>

          <Link
            href="/client-management"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 border border-border text-sm font-bold text-foreground"
          >
            <span className="flex items-center gap-2.5"><Users size={18} className="text-amber-500" /> Client Handling CRM</span>
            <span className="text-xs text-muted-foreground">Customer Profiles</span>
          </Link>

          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 border border-border text-sm font-bold text-foreground"
          >
            <span className="flex items-center gap-2.5"><Shield size={18} className="text-purple-500" /> Admin Ops Center</span>
            <span className="text-xs text-muted-foreground">Dispatch & Quotes</span>
          </Link>

          <Link
            href="/download"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm font-bold text-emerald-600 dark:text-emerald-400"
          >
            <span className="flex items-center gap-2.5"><Smartphone size={18} /> Download Android APK App</span>
            <span className="text-xs font-bold">2.8 MB</span>
          </Link>

          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(buttonVariants({ variant: "default" }), "w-full rounded-2xl h-12 text-base font-bold shadow-md shadow-primary/20 justify-center")}
            >
              Book Expert Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
