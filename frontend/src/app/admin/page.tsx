"use client";

import { useState, useEffect } from "react";
import { 
  Shield, Users, Briefcase, FileText, Settings, Sparkles, 
  Search, Plus, CheckCircle2, Clock, MapPin, Phone, Star, 
  ChevronRight, XCircle, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Booking, Employee, Quote, ServiceItem } from "@/types";
import { 
  getStoredBookings, saveBookings, 
  getStoredEmployees, getStoredQuotes, saveQuotes, 
  getStoredServices, saveServices 
} from "@/lib/store";

export default function AdminOpsPage() {
  const [activeTab, setActiveTab] = useState<"dispatch" | "employees" | "quotes" | "services">("dispatch");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  // Manual Assign Modal
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<Booking | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

  // Create Quote Modal
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteClientName, setQuoteClientName] = useState("");
  const [quoteClientPhone, setQuoteClientPhone] = useState("");
  const [quoteProjectTitle, setQuoteProjectTitle] = useState("");
  const [quoteItems, setQuoteItems] = useState<{ description: string; qty: number; unitPrice: number }[]>([
    { description: "Wall Painting Dual Coat", qty: 1000, unitPrice: 18 }
  ]);

  // Create Service Modal
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceCategory, setNewServiceCategory] = useState("appliance");
  const [newServiceDuration, setNewServiceDuration] = useState("60 mins");
  const [newServiceDesc, setNewServiceDesc] = useState("");

  useEffect(() => {
    setBookings(getStoredBookings());
    setEmployees(getStoredEmployees());
    setQuotes(getStoredQuotes());
    setServices(getStoredServices());
  }, []);

  const handleManualAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForAssign || !selectedEmployeeId) return;

    const emp = employees.find(e => e.id === selectedEmployeeId);
    if (!emp) return;

    const updatedBookings = bookings.map(b => {
      if (b.id === selectedBookingForAssign.id) {
        return {
          ...b,
          status: "assigned" as const,
          assignedEmployeeId: emp.id,
          assignedEmployeeName: emp.name,
          assignedEmployeePhone: emp.phone,
          assignedEmployeeRating: emp.rating,
          assignedEmployeeAvatar: emp.avatar
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    saveBookings(updatedBookings);
    setSelectedBookingForAssign(null);
  };

  const handleAddQuoteItem = () => {
    setQuoteItems([...quoteItems, { description: "", qty: 1, unitPrice: 500 }]);
  };

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteClientName || !quoteProjectTitle) return;

    const total = quoteItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
    const newQuote: Quote = {
      id: `QT-${Math.floor(700 + Math.random() * 200)}`,
      clientName: quoteClientName,
      clientPhone: quoteClientPhone || "+91 98765 00000",
      clientEmail: `${quoteClientName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      projectTitle: quoteProjectTitle,
      description: "Custom Commercial & Residential Project Proposal",
      lineItems: quoteItems,
      totalEstimatedCost: total,
      status: "sent",
      createdAt: new Date().toISOString().split("T")[0],
      validUntil: "2026-08-30"
    };

    const updated = [newQuote, ...quotes];
    setQuotes(updated);
    saveQuotes(updated);

    setShowQuoteModal(false);
    setQuoteClientName("");
    setQuoteClientPhone("");
    setQuoteProjectTitle("");
    setQuoteItems([{ description: "Wall Painting Dual Coat", qty: 1000, unitPrice: 18 }]);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle || !newServicePrice) return;

    const newService: ServiceItem = {
      id: newServiceTitle.toLowerCase().replace(/\s+/g, "-"),
      title: newServiceTitle,
      categoryId: newServiceCategory,
      basePrice: parseFloat(newServicePrice),
      duration: newServiceDuration,
      description: newServiceDesc || "Professional doorstep service with 30-day warranty.",
      inclusions: ["Verified Expert Technician", "Safe Industrial Tools", "30-Day Service Guarantee"],
      popular: true
    };

    const updated = [newService, ...services];
    setServices(updated);
    saveServices(updated);

    setShowServiceModal(false);
    setNewServiceTitle("");
    setNewServicePrice("");
    setNewServiceDesc("");
  };

  const totalRevenue = bookings
    .filter(b => b.status === "completed")
    .reduce((acc, b) => acc + b.totalAmount, 0);

  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-20 container mx-auto px-4 md:px-6 max-w-7xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
              <Shield className="text-purple-600 w-8 h-8" /> Admin Operations Control Center
            </h1>
            <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
              Live Control Room
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Dispatch management, technician assignments, commercial quote generator & service catalog pricing
          </p>
        </div>

        {/* Top Analytics Pills */}
        <div className="flex items-center gap-3 bg-card p-3 rounded-2xl border border-border shadow-sm shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">Completed Revenue</span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">Active Doorstep Jobs</span>
            <span className="text-lg font-extrabold text-primary">
              {bookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length}
            </span>
          </div>
        </div>
      </div>

      {/* Admin Tab Bar */}
      <div className="flex bg-card p-1.5 rounded-2xl border border-border shadow-sm mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab("dispatch")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shrink-0 ${
            activeTab === "dispatch" 
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock size={16} /> Job Dispatch Board ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab("employees")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shrink-0 ${
            activeTab === "employees" 
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Briefcase size={16} /> Service Pros & Technicians ({employees.length})
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shrink-0 ${
            activeTab === "quotes" 
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText size={16} /> Commercial Custom Quotes ({quotes.length})
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shrink-0 ${
            activeTab === "services" 
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings size={16} /> Service Catalog & Prices ({services.length})
        </button>
      </div>

      {/* TAB 1: DISPATCH BOARD */}
      {activeTab === "dispatch" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-foreground">Real-time Doorstep Job Dispatch Board</h2>
            <span className="text-xs text-muted-foreground font-semibold">Click &quot;Assign Pro&quot; to allocate unassigned client bookings</span>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/60 text-muted-foreground text-xs uppercase font-extrabold tracking-wider border-b border-border">
                    <th className="p-4 pl-6">Booking ID & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Service Name</th>
                    <th className="p-4">Slot & Location</th>
                    <th className="p-4">Assigned Technician</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Dispatch Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 pl-6 font-mono font-bold text-primary">
                        {b.id}
                        <span className="text-[11px] block font-normal text-muted-foreground">
                          {b.date}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-foreground">{b.clientName}</div>
                        <a href={`tel:${b.clientPhone}`} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                          <Phone size={10} /> {b.clientPhone}
                        </a>
                      </td>

                      <td className="p-4 font-semibold text-foreground max-w-xs truncate">
                        {b.serviceName}
                        <span className="text-xs block text-emerald-600 font-extrabold">₹{b.totalAmount}</span>
                      </td>

                      <td className="p-4 text-xs text-muted-foreground max-w-xs">
                        <div className="font-semibold text-foreground">{b.timeSlot}</div>
                        <div className="truncate flex items-center gap-1">
                          <MapPin size={12} className="text-rose-500 shrink-0" /> {b.location}
                        </div>
                      </td>

                      <td className="p-4">
                        {b.assignedEmployeeName ? (
                          <div className="flex items-center gap-2">
                            <img src={b.assignedEmployeeAvatar} alt={b.assignedEmployeeName} className="w-7 h-7 rounded-full object-cover border border-primary" />
                            <div>
                              <span className="font-bold text-foreground text-xs block">{b.assignedEmployeeName}</span>
                              <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                                <Star size={10} className="fill-amber-400" /> {b.assignedEmployeeRating}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold capitalize ${
                          b.status === "completed" ? "bg-emerald-500/10 text-emerald-600" :
                          b.status === "in_progress" ? "bg-indigo-500/10 text-indigo-600 animate-pulse" :
                          b.status === "assigned" ? "bg-blue-500/10 text-blue-600" :
                          "bg-amber-500/10 text-amber-600"
                        }`}>
                          {b.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <Button 
                          size="sm" 
                          variant={b.assignedEmployeeName ? "outline" : "default"}
                          className="rounded-xl font-bold text-xs"
                          onClick={() => setSelectedBookingForAssign(b)}
                        >
                          {b.assignedEmployeeName ? "Reassign Pro" : "Assign Pro"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICE PROS & TECHNICIANS */}
      {activeTab === "employees" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-foreground">Registered Doorstep Technicians & Experts</h2>
            <span className="text-xs text-muted-foreground font-semibold">{employees.filter(e => e.status === "active").length} Pros Currently Active</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp) => (
              <div key={emp.id} className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4 hover:border-primary transition-all">
                <div className="flex items-center gap-4">
                  <img src={emp.avatar} alt={emp.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30 shadow-md" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-foreground text-base">{emp.name}</h3>
                      <span className={`w-2.5 h-2.5 rounded-full ${emp.status === "active" ? "bg-emerald-500" : emp.status === "busy" ? "bg-amber-500" : "bg-gray-400"}`} />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground block">{emp.primarySkill}</span>
                    <span className="text-[11px] font-mono text-muted-foreground">ID: {emp.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-muted/40 p-3 rounded-2xl border border-border">
                  <div>
                    <span className="text-muted-foreground font-semibold block">Rating:</span>
                    <span className="font-bold text-amber-500 flex items-center gap-1"><Star size={12} className="fill-amber-400" /> {emp.rating} / 5.0</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-semibold block">Jobs Completed:</span>
                    <span className="font-bold text-foreground">{emp.totalJobsCompleted} Services</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-border/60">
                    <span className="text-muted-foreground font-semibold block">Today&apos;s Earnings:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">₹{emp.earningsToday}</span>
                  </div>
                </div>

                <a href={`tel:${emp.phone}`} className="w-full py-2.5 rounded-xl border border-border bg-muted/30 text-center font-bold text-xs flex items-center justify-center gap-2 hover:bg-muted text-foreground">
                  <Phone size={14} className="text-emerald-500" /> Call Technician ({emp.phone})
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMMERCIAL CUSTOM QUOTES */}
      {activeTab === "quotes" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Commercial Project Custom Quote Engine</h2>
              <p className="text-xs text-muted-foreground">Draft and send official proposals for bulk painting, office cleaning & renovations</p>
            </div>
            <Button 
              className="rounded-2xl font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20"
              onClick={() => setShowQuoteModal(true)}
            >
              <Plus size={18} className="mr-2" /> Generate Custom Project Quote
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quotes.map((q) => (
              <div key={q.id} className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex justify-between items-start border-b border-border pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      Quote ID: {q.id}
                    </span>
                    <h3 className="font-extrabold text-foreground text-lg mt-1">{q.projectTitle}</h3>
                  </div>
                  <span className="text-xs font-extrabold text-purple-600 bg-purple-500/10 px-3 py-1 rounded-full uppercase">
                    {q.status}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground font-semibold">Client Name:</span> <span className="font-bold text-foreground">{q.clientName} ({q.clientPhone})</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground font-semibold">Created Date:</span> <span className="font-bold text-foreground">{q.createdAt}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground font-semibold">Valid Until:</span> <span className="font-bold text-foreground">{q.validUntil}</span></div>
                </div>

                <div className="bg-muted/40 p-3 rounded-2xl border border-border space-y-1 text-xs">
                  <span className="font-bold text-foreground block mb-1">Itemized Breakdown:</span>
                  {q.lineItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-muted-foreground font-medium">
                      <span>{item.description} (x{item.qty})</span>
                      <span className="font-bold text-foreground">₹{item.qty * item.unitPrice}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-muted-foreground">Total Estimated Project Cost:</span>
                  <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">₹{q.totalEstimatedCost.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SERVICE CATALOG & PRICES */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Master Service Catalog & Pricing Editor</h2>
              <p className="text-xs text-muted-foreground">Manage active services, base rates, and service inclusions</p>
            </div>
            <Button 
              className="rounded-2xl font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20"
              onClick={() => setShowServiceModal(true)}
            >
              <Plus size={18} className="mr-2" /> Add New Service Item
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                    Category: {svc.categoryId}
                  </span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">₹{svc.basePrice}</span>
                </div>
                <h3 className="font-bold text-foreground text-base">{svc.title}</h3>
                <p className="text-xs text-muted-foreground">{svc.description}</p>
                <div className="pt-2 border-t border-border text-xs space-y-1">
                  <span className="font-bold text-foreground block">Inclusions:</span>
                  {svc.inclusions.map((inc, idx) => (
                    <span key={idx} className="block text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-500" /> {inc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Assign Modal */}
      {selectedBookingForAssign && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-foreground">Assign Technician to Booking {selectedBookingForAssign.id}</h3>
            <form onSubmit={handleManualAssign} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Select Verified Technician:</label>
                <select 
                  required
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full h-12 rounded-xl bg-muted/50 border border-border px-4 font-bold text-sm text-foreground"
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.primarySkill}) • {emp.rating} ⭐
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setSelectedBookingForAssign(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white">
                  Confirm Dispatch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-foreground">Draft Custom Commercial Proposal</h3>
            <form onSubmit={handleCreateQuote} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Client Organization / Name *</label>
                <Input required placeholder="e.g. Apex Corporate Office" value={quoteClientName} onChange={(e) => setQuoteClientName(e.target.value)} className="h-11 bg-muted/40" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Contact Phone *</label>
                <Input required type="tel" placeholder="+91 98765 43210" value={quoteClientPhone} onChange={(e) => setQuoteClientPhone(e.target.value)} className="h-11 bg-muted/40" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Project Title *</label>
                <Input required placeholder="e.g. 5,000 sq ft Office Deep Polish & Painting" value={quoteProjectTitle} onChange={(e) => setQuoteProjectTitle(e.target.value)} className="h-11 bg-muted/40" />
              </div>

              {/* Line Items */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">Itemized Line Items</span>
                  <button type="button" onClick={handleAddQuoteItem} className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                    <Plus size={12} /> Add Item
                  </button>
                </div>

                {quoteItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input placeholder="Description" value={item.description} onChange={(e) => {
                      const updated = [...quoteItems];
                      updated[idx].description = e.target.value;
                      setQuoteItems(updated);
                    }} className="h-10 text-xs bg-muted/40 flex-2" />

                    <Input type="number" placeholder="Qty" value={item.qty} onChange={(e) => {
                      const updated = [...quoteItems];
                      updated[idx].qty = parseInt(e.target.value) || 1;
                      setQuoteItems(updated);
                    }} className="h-10 text-xs bg-muted/40 w-16" />

                    <Input type="number" placeholder="Rate ₹" value={item.unitPrice} onChange={(e) => {
                      const updated = [...quoteItems];
                      updated[idx].unitPrice = parseFloat(e.target.value) || 0;
                      setQuoteItems(updated);
                    }} className="h-10 text-xs bg-muted/40 w-24" />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={() => setShowQuoteModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 rounded-2xl font-bold bg-purple-600 hover:bg-purple-700 text-white">Send Proposal</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-xl font-extrabold text-foreground">Add New Service to Catalog</h3>
            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Service Title *</label>
                <Input required placeholder="e.g. Sofa & Mattress Steam Sanitize" value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} className="h-11 bg-muted/40" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Base Price (₹) *</label>
                <Input required type="number" placeholder="e.g. 1199" value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} className="h-11 bg-muted/40" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Category *</label>
                <select value={newServiceCategory} onChange={(e) => setNewServiceCategory(e.target.value)} className="w-full h-11 rounded-xl bg-muted/40 border border-border px-3 text-xs font-bold">
                  <option value="appliance">AC & Appliance Repair</option>
                  <option value="cleaning">Home Cleaning</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="chef">Cooking & Chef</option>
                  <option value="painting">Painting</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Description</label>
                <Input placeholder="Service highlights..." value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)} className="h-11 bg-muted/40" />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={() => setShowServiceModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 rounded-2xl font-bold bg-purple-600 hover:bg-purple-700 text-white">Save Service</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
