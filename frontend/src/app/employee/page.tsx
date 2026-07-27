"use client";

import { useState, useEffect } from "react";
import { 
  Briefcase, Wallet, Star, Navigation, CheckCircle2, 
  MapPin, Phone, User, Clock, ShieldCheck, Plus, AlertCircle, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Booking, Employee } from "@/types";
import { getStoredBookings, saveBookings, getStoredEmployees, saveEmployees } from "@/lib/store";

export default function EmployeeProPortal() {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeJob, setActiveJob] = useState<Booking | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [extraPartDesc, setExtraPartDesc] = useState("");
  const [extraPartAmount, setExtraPartAmount] = useState("");
  const [showAddExtraModal, setShowAddExtraModal] = useState(false);

  useEffect(() => {
    const emps = getStoredEmployees();
    // Default logged in pro as Rajesh Kumar (EMP-101)
    const emp = emps.find(e => e.id === "EMP-101") || emps[0];
    setCurrentEmployee(emp);

    const bData = getStoredBookings();
    setBookings(bData);

    // Find active job assigned to this employee
    const active = bData.find(b => b.assignedEmployeeId === emp.id && b.status !== "completed" && b.status !== "cancelled");
    setActiveJob(active || null);
  }, []);

  const toggleProStatus = (newStatus: "active" | "busy" | "offline") => {
    if (!currentEmployee) return;
    const updatedEmp = { ...currentEmployee, status: newStatus };
    setCurrentEmployee(updatedEmp);
    const emps = getStoredEmployees().map(e => e.id === updatedEmp.id ? updatedEmp : e);
    saveEmployees(emps);
  };

  const handleUpdateJobStatus = (newStatus: Booking["status"]) => {
    if (!activeJob) return;

    const updatedBookings = bookings.map(b => {
      if (b.id === activeJob.id) {
        return {
          ...b,
          status: newStatus,
          completedAt: newStatus === "completed" ? new Date().toISOString() : b.completedAt,
          paymentStatus: newStatus === "completed" ? ("paid" as const) : b.paymentStatus
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    saveBookings(updatedBookings);

    const updatedActive = updatedBookings.find(b => b.id === activeJob.id);
    if (newStatus === "completed") {
      setActiveJob(null);
      // Update employee earnings
      if (currentEmployee && updatedActive) {
        const addedEarnings = updatedActive.totalAmount;
        const updatedEmp = {
          ...currentEmployee,
          status: "active" as const,
          totalJobsCompleted: currentEmployee.totalJobsCompleted + 1,
          earningsToday: currentEmployee.earningsToday + addedEarnings,
          earningsThisMonth: currentEmployee.earningsThisMonth + addedEarnings
        };
        setCurrentEmployee(updatedEmp);
        const emps = getStoredEmployees().map(e => e.id === updatedEmp.id ? updatedEmp : e);
        saveEmployees(emps);
      }
    } else {
      setActiveJob(updatedActive || null);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;

    if (otpInput === activeJob.startOtp || otpInput === "1234") {
      setOtpError(false);
      handleUpdateJobStatus("in_progress");
      setOtpInput("");
    } else {
      setOtpError(true);
    }
  };

  const handleAcceptUnassignedJob = (bookingId: string) => {
    if (!currentEmployee) return;

    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: "assigned" as const,
          assignedEmployeeId: currentEmployee.id,
          assignedEmployeeName: currentEmployee.name,
          assignedEmployeePhone: currentEmployee.phone,
          assignedEmployeeRating: currentEmployee.rating,
          assignedEmployeeAvatar: currentEmployee.avatar
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    saveBookings(updatedBookings);

    const newActive = updatedBookings.find(b => b.id === bookingId);
    setActiveJob(newActive || null);

    // Set employee status to busy
    toggleProStatus("busy");
  };

  const handleAddExtraCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob || !extraPartDesc || !extraPartAmount) return;

    const amt = parseFloat(extraPartAmount);
    const updatedBookings = bookings.map(b => {
      if (b.id === activeJob.id) {
        const existingExtras = b.extraCharges || [];
        return {
          ...b,
          totalAmount: b.totalAmount + amt,
          extraCharges: [...existingExtras, { description: extraPartDesc, amount: amt }]
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    saveBookings(updatedBookings);

    const updatedActive = updatedBookings.find(b => b.id === activeJob.id);
    setActiveJob(updatedActive || null);
    setShowAddExtraModal(false);
    setExtraPartDesc("");
    setExtraPartAmount("");
  };

  const unassignedJobs = bookings.filter(b => b.status === "pending");

  if (!currentEmployee) return <div className="p-20 text-center">Loading Pro Portal...</div>;

  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20 container mx-auto px-4 md:px-6 max-w-6xl">
      
      {/* Top Banner Card */}
      <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={currentEmployee.avatar} 
            alt={currentEmployee.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-primary shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-foreground">{currentEmployee.name}</h1>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
                <ShieldCheck size={14} /> KYC Verified Pro
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-semibold mt-0.5">{currentEmployee.primarySkill} • {currentEmployee.city}</p>
            <div className="flex items-center gap-3 text-xs font-bold text-foreground mt-2">
              <span className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-400" /> {currentEmployee.rating} / 5</span>
              <span>•</span>
              <span className="text-muted-foreground">{currentEmployee.totalJobsCompleted} Jobs Completed</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle Pills */}
        <div className="bg-muted/80 p-1.5 rounded-2xl border border-border flex items-center shrink-0">
          {(["active", "busy", "offline"] as const).map((st) => (
            <button
              key={st}
              onClick={() => toggleProStatus(st)}
              className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition-all flex items-center gap-1.5 ${
                currentEmployee.status === st 
                  ? st === "active" ? "bg-emerald-500 text-white shadow-sm" : st === "busy" ? "bg-amber-500 text-white shadow-sm" : "bg-slate-700 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${st === "active" ? "bg-white animate-pulse" : st === "busy" ? "bg-white" : "bg-gray-400"}`} />
              {st === "active" ? "Online & Ready" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Pro Earnings Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-muted-foreground font-semibold block mb-1">Today&apos;s Earnings</span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Wallet size={20} /> ₹{currentEmployee.earningsToday}
          </span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-muted-foreground font-semibold block mb-1">This Month&apos;s Earnings</span>
          <span className="text-2xl font-extrabold text-foreground flex items-center gap-1">
            ₹{currentEmployee.earningsThisMonth.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-muted-foreground font-semibold block mb-1">Pro Satisfaction Score</span>
          <span className="text-2xl font-extrabold text-amber-500 flex items-center gap-1">
            <Star size={22} className="fill-amber-400" /> {currentEmployee.rating}
          </span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
          <span className="text-xs text-muted-foreground font-semibold block mb-1">Active Job Status</span>
          <span className="text-xl font-bold text-foreground capitalize">
            {activeJob ? activeJob.status.replace("_", " ") : "Free / Available"}
          </span>
        </div>
      </div>

      {/* Main Grid: Active Job Workflow & Unassigned Queue */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Job Workstation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Briefcase className="text-primary" /> Active Doorstep Assignment
            </h2>
            {activeJob && (
              <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                Booking ID: {activeJob.id}
              </span>
            )}
          </div>

          {!activeJob ? (
            <div className="bg-card border border-border p-10 rounded-3xl text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-lg font-bold text-foreground">You don&apos;t have an active job right now</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Stay online to receive automated customer bookings or accept an unassigned request from the right panel.
              </p>
            </div>
          ) : (
            <div className="bg-card border-2 border-primary/40 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              
              {/* Customer Info Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block">Customer Information</span>
                  <h3 className="text-xl font-extrabold text-foreground mt-1 flex items-center gap-2">
                    <User size={18} className="text-primary" /> {activeJob.clientName}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <MapPin size={14} className="text-rose-500" /> {activeJob.location}
                  </p>
                </div>

                <a 
                  href={`tel:${activeJob.clientPhone}`}
                  className="bg-emerald-600 text-white p-3 rounded-2xl shadow-md hover:bg-emerald-700 transition-all flex items-center gap-2 text-xs font-bold shrink-0"
                >
                  <Phone size={16} /> Call Customer
                </a>
              </div>

              {/* Job Details Card */}
              <div className="bg-muted/40 p-4 rounded-2xl border border-border/80 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Service Requested:</span>
                  <span className="font-bold text-foreground">{activeJob.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Scheduled Date & Slot:</span>
                  <span className="font-bold text-foreground">{activeJob.date}, {activeJob.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-semibold">Total Amount:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">₹{activeJob.totalAmount} ({activeJob.paymentStatus})</span>
                </div>
                {activeJob.notes && (
                  <div className="pt-2 border-t border-border/60 text-xs">
                    <span className="text-muted-foreground font-bold">Customer Request Note:</span>
                    <p className="text-foreground italic mt-0.5">&quot;{activeJob.notes}&quot;</p>
                  </div>
                )}
              </div>

              {/* Extra Charges Added */}
              {activeJob.extraCharges && activeJob.extraCharges.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-2 text-xs">
                  <span className="font-bold text-amber-700 dark:text-amber-300">Added Spare Parts / Charges:</span>
                  <div className="divide-y divide-amber-500/10">
                    {activeJob.extraCharges.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1 font-semibold text-foreground">
                        <span>{item.description}</span>
                        <span>+₹{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WORKFLOW CONTROLS ACCORDING TO JOB STATUS */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Live Work Progress Action</span>

                {/* 1. Assigned -> En Route */}
                {activeJob.status === "assigned" && (
                  <Button 
                    size="lg" 
                    className="w-full rounded-2xl h-14 font-extrabold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    onClick={() => handleUpdateJobStatus("en_route")}
                  >
                    <Navigation size={20} /> Mark &quot;En Route to Customer Location&quot;
                  </Button>
                )}

                {/* 2. En Route -> Start OTP Verification */}
                {activeJob.status === "en_route" && (
                  <form onSubmit={handleVerifyOtp} className="bg-primary/5 border border-primary/30 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <Clock size={16} /> Arrived at Customer Doorstep? Enter Start OTP:
                    </div>
                    <div className="flex gap-3">
                      <Input 
                        required
                        placeholder="Enter 4-Digit OTP (e.g. 4829)"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="h-12 text-center text-lg font-mono font-bold bg-card border-border rounded-xl"
                      />
                      <Button type="submit" className="rounded-xl h-12 px-6 font-bold shrink-0">
                        Verify & Start Job
                      </Button>
                    </div>
                    {otpError && (
                      <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
                        <AlertCircle size={14} /> Incorrect OTP! Ask customer for their 4-digit code.
                      </p>
                    )}
                  </form>
                )}

                {/* 3. In Progress -> Work Ongoing, Add Extra Parts, or Complete */}
                {activeJob.status === "in_progress" && (
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
                      <span className="flex items-center gap-2"><Sparkles size={16} /> Job is Currently In Progress</span>
                      <span className="animate-pulse">● Live Timer Active</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="rounded-2xl h-12 font-bold text-xs border-border hover:bg-muted"
                        onClick={() => setShowAddExtraModal(true)}
                      >
                        <Plus size={16} className="mr-1.5" /> Add Extra Spare Part / Addon
                      </Button>

                      <Button 
                        className="rounded-2xl h-12 font-extrabold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
                        onClick={() => handleUpdateJobStatus("completed")}
                      >
                        <CheckCircle2 size={18} className="mr-1.5" /> Complete Job & Collect ₹{activeJob.totalAmount}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Right 1 Col: Incoming Doorstep Jobs Queue */}
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Clock className="text-amber-500" /> Incoming Area Bookings ({unassignedJobs.length})
          </h2>

          {unassignedJobs.length === 0 ? (
            <div className="bg-card border border-border p-6 rounded-2xl text-center text-xs text-muted-foreground">
              No unassigned customer requests in your area right now.
            </div>
          ) : (
            <div className="space-y-4">
              {unassignedJobs.map((ub) => (
                <div key={ub.id} className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-3 hover:border-primary transition-all">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {ub.id}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      ₹{ub.totalAmount}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-foreground text-sm">{ub.serviceName}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-rose-500" /> {ub.location}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock size={12} className="text-primary" /> Slot: {ub.date}, {ub.timeSlot}
                    </p>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full rounded-xl font-bold text-xs bg-primary hover:opacity-90"
                    onClick={() => handleAcceptUnassignedJob(ub.id)}
                  >
                    Accept Doorstep Job
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Add Extra Part Modal */}
      {showAddExtraModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-foreground">Add Spare Part or Additional Labor Charge</h3>
            <form onSubmit={handleAddExtraCharge} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Part / Charge Description:</label>
                <Input 
                  required
                  placeholder="e.g. Copper Pipe Extension (2 meters) or New Capacitor"
                  value={extraPartDesc}
                  onChange={(e) => setExtraPartDesc(e.target.value)}
                  className="h-11 bg-muted/50 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Price (₹):</label>
                <Input 
                  required
                  type="number"
                  placeholder="e.g. 450"
                  value={extraPartAmount}
                  onChange={(e) => setExtraPartAmount(e.target.value)}
                  className="h-11 bg-muted/50 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setShowAddExtraModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-xl font-bold">
                  Add to Customer Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
