"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, User, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

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

    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <User size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            ServiceHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/services"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            Services <ChevronDown size={14} />
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Light / Dark Mode"
            className="p-2 rounded-full border border-border bg-card text-foreground hover:border-primary transition-all shadow-sm"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
            <Search size={20} />
          </button>
          <Link href="/login" className="text-sm font-medium hover:text-primary">
            Log in
          </Link>
          <Link href="/book">
            <Button className="rounded-full px-6 shadow-md shadow-primary/20">Book Now</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Light / Dark Mode"
            className="p-2 rounded-full border border-border bg-card text-foreground"
          >
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <button
            className="text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 md:hidden"
        >
          <Link
            href="/services"
            className="text-base font-medium py-2 border-b border-border"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-base font-medium py-2 border-b border-border"
          >
            About Us
          </Link>
          <Link
            href="/pricing"
            className="text-base font-medium py-2 border-b border-border"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-base font-medium py-2 border-b border-border"
          >
            Contact
          </Link>
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/login">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link href="/book">
              <Button className="w-full justify-center rounded-full">
                Book Now
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
