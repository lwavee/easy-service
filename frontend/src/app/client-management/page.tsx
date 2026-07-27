"use client";

import { useState, useEffect } from "react";
import { 
  Users, Search, UserPlus, Phone, Mail, MapPin, 
  Star, ShieldCheck, Sparkles, Filter, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, Booking } from "@/types";
import { getStoredClients, saveClients, getStoredBookings } from "@/lib/store";

export default function ClientManagementPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<"all" | "VIP" | "Regular" | "New">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  // New Client Form State
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientAddress, setNewClientAddress] = useState("");
  const [newClientPincode, setNewClientPincode] = useState("");

  useEffect(() => {
    setClients(getStoredClients());
    setBookings(getStoredBookings());
  }, []);

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientPhone) return;

    const newClient: Client = {
      id: `CL-${Math.floor(100 + Math.random() * 900)}`,
      name: newClientName,
      phone: newClientPhone,
      email: newClientEmail || `${newClientName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      address: newClientAddress || "City Center",
      pincode: newClientPincode || "400001",
      totalBookings: 0,
      totalSpent: 0,
      rating: 5.0,
      tier: "New",
      joinedDate: new Date().toISOString().split("T")[0]
    };

    const updated = [newClient, ...clients];
    setClients(updated);
    saveClients(updated);

    setShowAddClientModal(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewClientEmail("");
    setNewClientAddress("");
    setNewClientPincode("");
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = tierFilter === "all" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const getClientBookings = (clientPhone: string) => {
    return bookings.filter(b => b.clientPhone === clientPhone || b.clientName === selectedClient?.name);
  };

  return (
    <div className="min-h-screen bg-muted/10 pt-28 pb-20 container mx-auto px-4 md:px-6 max-w-7xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
              <Users className="text-amber-500 w-8 h-8" /> Client Handling CRM
            </h1>
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
              {clients.length} Registered Customers
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Customer relationship management, spending analytics, address records & support histories
          </p>
        </div>

        <Button 
          size="lg" 
          className="rounded-2xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 shrink-0"
          onClick={() => setShowAddClientModal(true)}
        >
          <UserPlus size={18} className="mr-2" /> Add New Customer Record
        </Button>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="bg-card border border-border p-4 rounded-3xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by customer name, phone, email, address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 bg-muted/40 border-border rounded-2xl text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs text-muted-foreground font-bold flex items-center gap-1 shrink-0"><Filter size={14} /> Tier:</span>
          {(["all", "VIP", "Regular", "New"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 ${
                tierFilter === t 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t} {t === "VIP" && "⭐"}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table / Grid */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/60 text-muted-foreground text-xs uppercase font-extrabold tracking-wider border-b border-border">
                <th className="p-4 pl-6">Customer Profile</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Primary Address</th>
                <th className="p-4">Total Bookings</th>
                <th className="p-4">Total Revenue</th>
                <th className="p-4">Tier Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold flex items-center justify-center text-base shrink-0">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {client.name}
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">ID: {client.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 space-y-0.5">
                    <a href={`tel:${client.phone}`} className="font-semibold text-foreground flex items-center gap-1 hover:text-primary">
                      <Phone size={12} className="text-emerald-500" /> {client.phone}
                    </a>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail size={12} /> {client.email}
                    </span>
                  </td>

                  <td className="p-4 max-w-xs truncate text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-rose-500 shrink-0" />
                      <span className="truncate">{client.address} ({client.pincode})</span>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-foreground">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-extrabold">
                      {client.totalBookings} Orders
                    </span>
                  </td>

                  <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                    ₹{client.totalSpent.toLocaleString("en-IN")}
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 w-fit ${
                      client.tier === "VIP" 
                        ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
                        : client.tier === "Regular" 
                        ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                        : "bg-gray-500/10 text-gray-600 border border-gray-500/20"
                    }`}>
                      {client.tier === "VIP" && <Sparkles size={12} />}
                      {client.tier} Client
                    </span>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl border-border font-bold text-xs"
                      onClick={() => setSelectedClient(client)}
                    >
                      View CRM History <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail History Drawer Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setSelectedClient(null)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground font-bold text-xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 font-extrabold text-2xl flex items-center justify-center">
                {selectedClient.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-extrabold text-foreground">{selectedClient.name}</h3>
                  <span className="bg-amber-500/10 text-amber-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {selectedClient.tier} Client
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Joined ServiceHub on {selectedClient.joinedDate}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-muted/40 p-3 rounded-2xl border border-border">
                <span className="text-[11px] text-muted-foreground font-bold block">Total Bookings</span>
                <span className="text-lg font-extrabold text-foreground">{selectedClient.totalBookings}</span>
              </div>
              <div className="bg-muted/40 p-3 rounded-2xl border border-border">
                <span className="text-[11px] text-muted-foreground font-bold block">Lifetime Revenue</span>
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">₹{selectedClient.totalSpent}</span>
              </div>
              <div className="bg-muted/40 p-3 rounded-2xl border border-border">
                <span className="text-[11px] text-muted-foreground font-bold block">Satisfaction Score</span>
                <span className="text-lg font-extrabold text-amber-500 flex items-center justify-center gap-1">
                  <Star size={16} className="fill-amber-400" /> {selectedClient.rating}
                </span>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="bg-muted/30 p-4 rounded-2xl border border-border/80 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-500" /> <span className="font-bold text-foreground">{selectedClient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-500" /> <span className="font-bold text-foreground">{selectedClient.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-rose-500 shrink-0 mt-0.5" /> <span className="font-semibold text-foreground">{selectedClient.address} ({selectedClient.pincode})</span>
              </div>
              {selectedClient.notes && (
                <div className="pt-2 border-t border-border/60 text-amber-700 dark:text-amber-300 italic font-medium">
                  Note: &quot;{selectedClient.notes}&quot;
                </div>
              )}
            </div>

            {/* Client Booking History */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" /> Order History for {selectedClient.name}
              </h4>

              {getClientBookings(selectedClient.phone).length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-2">No past booking records linked to this phone number.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {getClientBookings(selectedClient.phone).map((b) => (
                    <div key={b.id} className="p-3 bg-muted/40 rounded-xl border border-border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-foreground block">{b.serviceName}</span>
                        <span className="text-[11px] text-muted-foreground">{b.date} • Status: {b.status}</span>
                      </div>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{b.totalAmount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button className="w-full rounded-2xl font-bold h-12" onClick={() => setSelectedClient(null)}>
              Close Customer Details
            </Button>
          </div>
        </div>
      )}

      {/* Add New Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-5">
            <h3 className="text-xl font-extrabold text-foreground">Add New Customer Record</h3>
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Full Name *</label>
                <Input 
                  required
                  placeholder="e.g. Vikramaditya Gupta"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="h-11 bg-muted/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Mobile Phone Number *</label>
                <Input 
                  required
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="h-11 bg-muted/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <Input 
                  type="email"
                  placeholder="vikram@example.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="h-11 bg-muted/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Service Address</label>
                <Input 
                  placeholder="Building, Flat, Street, Area"
                  value={newClientAddress}
                  onChange={(e) => setNewClientAddress(e.target.value)}
                  className="h-11 bg-muted/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Pincode</label>
                <Input 
                  placeholder="400076"
                  value={newClientPincode}
                  onChange={(e) => setNewClientPincode(e.target.value)}
                  className="h-11 bg-muted/40"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={() => setShowAddClientModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 rounded-2xl font-bold bg-amber-500 hover:bg-amber-600 text-white">
                  Save Customer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
