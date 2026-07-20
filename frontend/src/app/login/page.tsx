"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Lock, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-muted/10 flex items-center justify-center pt-24 pb-20 px-4">
      <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <User size={32} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to ServiceHub</h1>
          <p className="text-sm text-muted-foreground">Log in or sign up to manage your home service bookings</p>
        </div>

        {/* Login Form */}
        {!submitted ? (
          <form 
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-4"
          >
            <div className="flex rounded-xl bg-muted p-1 border border-border">
              <button
                type="button"
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${loginMethod === "phone" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                onClick={() => setLoginMethod("phone")}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${loginMethod === "email" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
                onClick={() => setLoginMethod("email")}
              >
                Email Password
              </button>
            </div>

            {loginMethod === "phone" ? (
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-sm text-muted-foreground font-semibold">+91</span>
                  <Input 
                    type="tel" 
                    required 
                    placeholder="98765 43210" 
                    className="pl-14 h-12 bg-muted/50 text-base"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Email Address</label>
                  <Input type="email" required placeholder="user@example.com" className="h-12 bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Password</label>
                  <Input type="password" required placeholder="••••••••" className="h-12 bg-muted/50" />
                </div>
              </>
            )}

            <Button type="submit" size="lg" className="w-full rounded-xl h-12 text-base font-semibold mt-2">
              {loginMethod === "phone" ? "Send Login OTP" : "Log In"} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground">Verification Sent!</h3>
            <p className="text-sm text-muted-foreground">Check your device to complete your secure login.</p>
            <Button variant="outline" className="w-full rounded-xl" onClick={() => setSubmitted(false)}>
              Back to Login
            </Button>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          By continuing, you agree to ServiceHub's{" "}
          <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
        </div>

      </div>
    </div>
  );
}
