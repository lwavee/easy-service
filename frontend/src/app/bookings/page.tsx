"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CalendarCheck, Clock, MapPin, User, Phone, Star, ShieldCheck, 
  CheckCircle2, AlertCircle, Navigation, FileText, ArrowRight, XCircle, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking, BookingStatus } from "@/types";
import { getStoredBookings, saveBookings } from "@/lib/store";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("active");
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [viewInvoiceBooking, setViewInvoiceBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const data = getStoredBookings();
    setBookings(data);
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this doorstep booking?")) {
      const updated = bookings.map(b => b.id === bookingId ? { ...b, status: "cancelled" as BookingStatus } : b);
      setBookings(updated);
      saveBookings(updated);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReview) return;

    const updated = bookings.map(b => {
      if (b.id === selectedBookingForReview.id) {
        return {
          ...b,
          rating: reviewStars,
          reviewText: reviewText || "Excellent professional service!"
        };
      }
      return b;
    });

    setBookings(updated);
    saveBookings(updated);
    setReviewSubmitted(true);
    setTimeout(() => {
      setSelectedBookingForReview(null);
      setReviewSubmitted(false);
      setReviewText("");
    }, 1500);
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === "active") return b.status !== "completed" && b.status !== "cancelled";
    if (activeTab === "completed") return b.status === "completed";
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><Clock size={14} /> Matching Expert</span>;
      case "assigned":
        return <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><User size={14} /> Expert Assigned</span>;
      case "en_route":
        return <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse"><Navigation size={14} /> Expert En Route</span>;
      case "in_progress":
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse"><Sparkles size={14} /> Work In Progress</span>;
      case "completed":
        return <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><CheckCircle2 size={14} /> Service Completed</span>;
      case "cancelled":
        return <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><XCircle size={14} /> Booking Cancelled</span>;
    }
  };

  const renderTimeline = (status: BookingStatus) => {
    const steps: { key: BookingStatus; label: string }[] = [
      { key: "pending", label: "Booked" },
      { key: "assigned", label: "Assigned" },
      { key: "en_route", label: "En Route" },
      { key: "in_progress", label: "In Progress" },
      { key: "completed", label: "Completed" }
    ];

    const getStepIndex = (s: BookingStatus) => {
      switch (s) {
        case "pending": return 0;
        case "assigned": return 1;
        case "en_route": return 2;
        case "in_progress": return 3;
        case "completed": return 4;
        default: return -1;
      }
    };

    const currentIndex = getStepIndex(status);

    if (status === "cancelled") {
      return (
        <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-2xl text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-2">
          <AlertCircle size={16} /> This booking was cancelled. No charges incurred.
        </div>
      );
    }

    return (
      <div className="w-full py-2">
        <div className="flex justify-between items-center relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${(Math.max(0, currentIndex) / 4) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isDone = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone 
                    ? "bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20" 
                    : "bg-card border-2 border-border text-muted-foreground"
                }`}>
                  {isDone ? (isCurrent ? idx + 1 : "✓") : idx + 1}
                </div>
                <span className={`text-[10px] md:text-xs font-semibold mt-1.5 ${
                  isCurrent ? "text-primary font-bold" : isDone ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-20 container mx-auto px-4 md:px-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <CalendarCheck className="text-primary w-8 h-8" /> My Doorstep Orders
          </h1>
          <p className="text-muted-foreground text-sm">
            Track live expert location, job status, start OTP & invoices
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-card p-1.5 rounded-2xl border border-border shadow-sm shrink-0">
          {(["active", "completed", "all"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab} {tab === "active" && `(${bookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-card border border-border p-12 rounded-3xl text-center shadow-sm space-y-4 max-w-xl mx-auto my-12">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <CalendarCheck size={32} />
          </div>
          <h3 className="text-xl font-bold text-foreground">No Doorstep Orders Found</h3>
          <p className="text-muted-foreground text-sm">
            You don&apos;t have any {activeTab !== "all" ? activeTab : ""} service bookings right now.
          </p>
          <Link href="/book">
            <Button size="lg" className="rounded-full px-8 font-bold shadow-md shadow-primary/20">
              Book Home Expert Now <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all space-y-6">
              
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/80">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      ID: {b.id}
                    </span>
                    <span className="text-xs text-muted-foreground">Booked on {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mt-2">{b.serviceName}</h3>
                </div>
                <div>{getStatusBadge(b.status)}</div>
              </div>

              {/* Step Progress Timeline */}
              {renderTimeline(b.status)}

              {/* Expert Info & OTP Card (If assigned or en_route or in_progress) */}
              {(b.status === "assigned" || b.status === "en_route" || b.status === "in_progress") && (
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-emerald-500/5 border border-primary/20 p-5 rounded-2xl flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={b.assignedEmployeeAvatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"} 
                      alt={b.assignedEmployeeName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/30 shadow-md" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground">{b.assignedEmployeeName}</h4>
                        <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck size={12} /> Verified Expert
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <Star size={14} className="fill-amber-400 text-amber-400" /> {b.assignedEmployeeRating || 4.9} Rating
                        <span>•</span>
                        <a href={`tel:${b.assignedEmployeePhone}`} className="text-primary font-bold flex items-center gap-1 hover:underline">
                          <Phone size={12} /> {b.assignedEmployeePhone}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* OTP Box */}
                  <div className="bg-card border border-primary/30 p-3 rounded-2xl text-center shrink-0 shadow-sm w-full md:w-auto">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Give OTP to Technician
                    </span>
                    <span className="text-2xl font-mono font-extrabold text-primary tracking-widest">
                      {b.startOtp}
                    </span>
                  </div>
                </div>
              )}

              {/* Order Details Grid */}
              <div className="grid md:grid-cols-3 gap-4 text-sm text-foreground bg-muted/30 p-4 rounded-2xl border border-border/60">
                <div className="flex items-start gap-2.5">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Service Address:</span>
                    <span className="font-semibold">{b.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Scheduled Date & Time:</span>
                    <span className="font-semibold">{b.date}, {b.timeSlot}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileText size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-muted-foreground block font-medium">Total Bill & Payment:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">₹{b.totalAmount}</span>
                    <span className="text-[11px] text-muted-foreground block capitalize font-medium">({b.paymentStatus === "cod" ? "Cash / UPI after completion" : b.paymentStatus})</span>
                  </div>
                </div>
              </div>

              {/* Extra Charges if added by Pro */}
              {b.extraCharges && b.extraCharges.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-2 text-xs">
                  <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                    <Sparkles size={14} /> Added Replacement Parts / Extra Services:
                  </span>
                  <div className="divide-y divide-amber-500/10">
                    {b.extraCharges.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1 font-semibold text-foreground">
                        <span>{item.description}</span>
                        <span>+₹{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl border-border hover:bg-muted font-bold text-xs"
                    onClick={() => setViewInvoiceBooking(b)}
                  >
                    <FileText size={14} className="mr-1.5" /> View Invoice
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  {b.status === "completed" && !b.rating && (
                    <Button 
                      size="sm" 
                      className="rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white text-xs shadow-sm"
                      onClick={() => setSelectedBookingForReview(b)}
                    >
                      <Star size={14} className="mr-1.5 fill-white" /> Rate Service
                    </Button>
                  )}

                  {b.status === "completed" && b.rating && (
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-xl text-xs font-bold border border-amber-500/20">
                      <Star size={14} className="fill-amber-400 text-amber-400" /> Rated {b.rating}/5 Stars
                    </div>
                  )}

                  {(b.status === "pending" || b.status === "assigned") && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 text-xs font-bold"
                      onClick={() => handleCancelBooking(b.id)}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedBookingForReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setSelectedBookingForReview(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <XCircle size={24} />
            </button>

            {!reviewSubmitted ? (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                    <Star size={28} className="fill-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Rate Your Experience</h3>
                  <p className="text-xs text-muted-foreground">How was the doorstep service for {selectedBookingForReview.serviceName}?</p>
                </div>

                {/* Star Picker */}
                <div className="flex justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewStars(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        size={32} 
                        className={star <= reviewStars ? "fill-amber-400 text-amber-400" : "text-border"} 
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground">Feedback Comments:</label>
                  <textarea 
                    rows={3}
                    placeholder="Write your feedback about technician punctuality, work quality, clean behavior..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <Button type="submit" className="w-full rounded-2xl font-bold h-12 bg-amber-500 hover:bg-amber-600 text-white">
                  Submit Star Rating & Review
                </Button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-foreground">Thank You for Your Feedback!</h4>
                <p className="text-xs text-muted-foreground">Your review helps maintain high quality home experts on ServiceHub.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {viewInvoiceBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setViewInvoiceBooking(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <XCircle size={24} />
            </button>

            <div className="border-b border-border pb-4 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Official Invoice</span>
                <h3 className="text-xl font-extrabold text-foreground">ServiceHub India</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-muted-foreground">INV-{viewInvoiceBooking.id}</span>
                <span className="text-xs block text-muted-foreground">{viewInvoiceBooking.date}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Billed To:</span>
                <span className="font-bold text-foreground">{viewInvoiceBooking.clientName} ({viewInvoiceBooking.clientPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Service Address:</span>
                <span className="font-bold text-foreground max-w-[220px] text-right">{viewInvoiceBooking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-semibold">Assigned Technician:</span>
                <span className="font-bold text-foreground">{viewInvoiceBooking.assignedEmployeeName || "ServiceHub Expert"}</span>
              </div>
            </div>

            <div className="border border-border rounded-2xl overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-muted text-muted-foreground text-left">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-semibold text-foreground">{viewInvoiceBooking.serviceName}</td>
                    <td className="p-3 text-right font-semibold text-foreground">₹{viewInvoiceBooking.totalAmount}</td>
                  </tr>
                  {viewInvoiceBooking.extraCharges?.map((extra, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-foreground">{extra.description}</td>
                      <td className="p-3 text-right font-semibold text-foreground">+₹{extra.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-foreground">Total Paid Amount:</span>
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ₹{viewInvoiceBooking.totalAmount + (viewInvoiceBooking.extraCharges?.reduce((a, c) => a + c.amount, 0) || 0)}
              </span>
            </div>

            <Button className="w-full rounded-2xl font-bold h-12" onClick={() => window.print()}>
              <FileText size={16} className="mr-2" /> Download / Print PDF Invoice
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
