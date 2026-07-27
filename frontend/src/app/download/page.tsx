"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Download, Smartphone, ShieldCheck, Zap, 
  Sparkles, ArrowRight, QrCode, Lock
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DownloadAppPage() {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDirectDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement("a");
    link.href = "/servicehub-lite-v1.0.apk";
    link.download = "ServiceHub-Lite-v1.0.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStarted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Main Hero Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-8 md:p-14 shadow-2xl border border-emerald-500/30 text-center relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles size={14} /> Official Android Mobile Release (v1.0)
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Download ServiceHub Lite APK
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Experience ultra-fast doorstep home expert hiring, live technician tracking, and offline digital invoices in a lightweight 2.8 MB app.
            </p>

            {/* Main Download Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={handleDirectDownload}
                className="w-full sm:w-auto rounded-2xl h-16 px-10 text-base font-extrabold bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3"
              >
                <Download size={22} />
                {downloadStarted ? "Downloading APK File..." : "Download Android APK (2.8 MB)"}
              </Button>

              <Link 
                href="/book" 
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto rounded-2xl h-16 px-8 text-base font-bold border-slate-700 hover:bg-slate-800 text-white justify-center")}
              >
                Continue on Web <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            <p className="text-xs text-slate-400 font-semibold flex items-center justify-center gap-2 pt-2">
              <ShieldCheck size={16} className="text-emerald-400" /> 100% Virus & Malware Free • Compatible with Android 7.0+
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Ultra-Fast 2.8 MB Lite APK</h3>
            <p className="text-xs text-muted-foreground">Loads 5x faster than standard mobile websites with zero battery drain.</p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <Lock size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Secure 4-Digit OTP System</h3>
            <p className="text-xs text-muted-foreground">Every doorstep booking comes with a unique security OTP code for technician verification.</p>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <Smartphone size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Offline Invoice & Tracking</h3>
            <p className="text-xs text-muted-foreground">View your booking history, job status, and downloadable receipts even offline.</p>
          </div>
        </div>

        {/* How to Install APK Guide */}
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm space-y-8 mb-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">3 Easy Steps to Install the APK</h2>
            <p className="text-xs text-muted-foreground">How to install ServiceHub Lite on any Android smartphone</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted/40 p-6 rounded-2xl border border-border/80 space-y-3 relative">
              <span className="text-3xl font-mono font-extrabold text-primary">01</span>
              <h4 className="font-bold text-foreground text-base">Tap &quot;Download APK&quot;</h4>
              <p className="text-xs text-muted-foreground">Click the green download button above to save `ServiceHub-Lite-v1.0.apk` to your phone downloads.</p>
            </div>

            <div className="bg-muted/40 p-6 rounded-2xl border border-border/80 space-y-3 relative">
              <span className="text-3xl font-mono font-extrabold text-primary">02</span>
              <h4 className="font-bold text-foreground text-base">Allow &quot;Unknown Sources&quot;</h4>
              <p className="text-xs text-muted-foreground">If prompted by Android Chrome, tap **Settings** and enable **Allow from this source** to proceed.</p>
            </div>

            <div className="bg-muted/40 p-6 rounded-2xl border border-border/80 space-y-3 relative">
              <span className="text-3xl font-mono font-extrabold text-primary">03</span>
              <h4 className="font-bold text-foreground text-base">Open & Launch App</h4>
              <p className="text-xs text-muted-foreground">Tap **Install**. Once finished, launch ServiceHub directly from your Android app drawer!</p>
            </div>
          </div>
        </div>

        {/* Mobile QR Code Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Scan to Install on Mobile</span>
            <h3 className="text-xl font-extrabold text-foreground">Opening from a Computer?</h3>
            <p className="text-xs text-muted-foreground">Scan the QR code with your Android phone camera to download the APK directly onto your smartphone.</p>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border shadow-md shrink-0 flex flex-col items-center gap-2">
            <QrCode size={120} className="text-primary" />
            <span className="text-[10px] font-mono font-bold text-muted-foreground">Scan with Phone Camera</span>
          </div>
        </div>

      </div>
    </div>
  );
}
