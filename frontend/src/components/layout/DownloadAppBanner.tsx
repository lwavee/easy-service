"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadAppBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if already running in standalone mode (APK container)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setIsInstalled(true);
      }
    } else {
      // Direct download APK file
      const link = document.createElement("a");
      link.href = "/servicehub-lite-v1.0.apk";
      link.download = "ServiceHub-Lite-v1.0.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-emerald-500/30 text-white p-3.5 md:p-4 shadow-2xl">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 max-w-6xl">
        
        {/* Left Side: App Icon & Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
            <Smartphone size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm md:text-base text-white tracking-tight flex items-center gap-1.5">
                ServiceHub Lite App <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">2.8 MB APK</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block">
              Fast doorstep booking, live GPS technician tracking & offline invoices
            </p>
            <p className="text-[11px] text-slate-300 sm:hidden">
              5x Faster • Doorstep Expert Booking
            </p>
          </div>
        </div>

        {/* Right Side: Download Action & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/download" className="hidden md:block text-xs font-bold text-slate-300 hover:text-white px-2">
            View Details
          </Link>

          <Button
            onClick={handleInstallClick}
            size="sm"
            className="rounded-2xl font-extrabold text-xs h-10 px-4 md:px-5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
          >
            <Download size={15} /> Download App (APK)
          </Button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors ml-1"
            aria-label="Close Banner"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
