"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Sparkles,
  Clock,
  FileCheck,
  DollarSign,
  Send,
  Plane,
  Truck,
  Building2,
  Package,
  Ship,
  ShieldCheck,
  Check,
  ArrowRight,
  Phone,
  HelpCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../lib/api";

export default function RequestQuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    originCountry: "",
    destinationCity: "Vancouver (YVR)",
    shipmentMode: "courier",
    cargoType: "",
    weightKg: "",
    packageCount: "",
    specialRequirements: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const modeOptions = [
    {
      id: "courier",
      label: "Courier / Express Bags",
      sub: "Small boxes & consolidations",
      icon: Package,
    },
    {
      id: "air-cargo",
      label: "Commercial Air Cargo",
      sub: "Palletized freight via YVR/YYZ",
      icon: Plane,
    },
    {
      id: "ocean-freight",
      label: "Ocean Container / LCL",
      sub: "Container de-stuffing & drayage",
      icon: Ship,
    },
    {
      id: "india-canada",
      label: "India → Canada Door-to-Door",
      sub: "Full pickup to Canadian delivery",
      icon: Truck,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formattedMessage = `
--- CUSTOM SHIPMENT QUOTE REQUEST ---
Selected Mode: ${formData.shipmentMode.toUpperCase()}
Origin Country/Port: ${formData.originCountry || "Not specified"}
Destination (Canada): ${formData.destinationCity}
Cargo / Commodity: ${formData.cargoType || "General Cargo"}
Estimated Weight: ${formData.weightKg ? formData.weightKg + " kg" : "Unspecified"}
Package / Pallet Count: ${formData.packageCount || "Unspecified"}
Special Handling / Instructions: ${formData.specialRequirements || "None"}
    `.trim();

    try {
      await api.post("/contact", {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: `Quote Request (${formData.shipmentMode})`,
        message: formattedMessage,
      });

      setStatus("success");
      toast.success("Quote request submitted! Our pricing team will email your estimate within 1 business day.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        originCountry: "",
        destinationCity: "Vancouver (YVR)",
        shipmentMode: "courier",
        cargoType: "",
        weightKg: "",
        packageCount: "",
        specialRequirements: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Could not submit quote request. Please try again or call our team directly.");
    }
  };

  const quoteBenefits = [
    {
      title: "1 Business Day Turnaround",
      desc: "Quotations prepared promptly with transparent line-item itemization.",
      icon: Clock,
      color: "text-[#ffd100]",
    },
    {
      title: "Customs Brokerage Coordination",
      desc: "Duty and tax calculation coordinated with CBSA-licensed brokerage partners.",
      icon: FileCheck,
      color: "text-[#f05a28]",
    },
    {
      title: "Preferential Carrier Tariffs",
      desc: "Direct volume discounts via our nationwide UPS domestic delivery integration.",
      icon: DollarSign,
      color: "text-[#1f8a5b]",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#eef1f0] text-[#0b2f3a]">
        {/* Hero Header */}
        <section
          className="relative py-20 sm:py-24 bg-cover bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: "url('/images/hero-banner.webp')",
            backgroundPosition: "center 40%",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(11, 47, 58, 0.94) 0%, rgba(11, 47, 58, 0.88) 50%, rgba(0, 0, 0, 0.70) 100%)",
            }}
          />

          <div className="wrap relative z-10 max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#ffd100] bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/10 mb-4">
              <Sparkles size={14} /> Competitive Canadian Import Rates
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Request a Custom Shipment Quote
            </h1>
            <p className="text-[#d5dcdb] text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Get an accurate, transparent landed-cost estimate. Select your freight mode and details below—we&apos;ll handle the customs, handling, and delivery.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 py-14 space-y-12">
          {/* Top 3 Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quoteBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-white p-6 rounded-2xl border border-[#d5dcdb] shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0b2f3a] flex items-center justify-center shrink-0 shadow-sm">
                    <Icon size={22} className={b.color} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0b2f3a]">{b.title}</h3>
                    <p className="text-xs text-[#51626a] mt-1 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Redesigned Clean App-Style Quote Form */}
          <div className="bg-white rounded-3xl border border-[#d5dcdb] shadow-xl overflow-hidden">
            {/* Form Top Strip */}
            <div className="bg-gradient-to-r from-[#0b2f3a] to-[#14434f] px-8 sm:px-12 py-7 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#ffd100]">
                  Interactive Rate Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white">
                  Tell Us About Your Consignment
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#d5dcdb] bg-white/10 px-4 py-2 rounded-xl border border-white/10 shrink-0">
                <Clock size={16} className="text-[#f05a28]" />
                <span>Response Guaranteed within 1 Business Day</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-14 space-y-10">
              {/* SECTION 1: Routing & Cargo Specifications */}
              <div>
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f05a28]">
                    Step 1 of 2
                  </div>
                  <h3 className="text-xl font-black text-[#0b2f3a] mt-0.5">
                    Routing &amp; Cargo Specifications
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1">
                    Provide trade lanes, service category, and approximate cargo dimensions to calculate exact handling and tariffs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Shipment Mode / Category
                    </label>
                    <select
                      value={formData.shipmentMode}
                      onChange={(e) => setFormData({ ...formData, shipmentMode: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-white text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] transition"
                    >
                      <option value="courier">Courier / Express Consolidation</option>
                      <option value="air-cargo">Commercial Air Freight (YVR / YYZ)</option>
                      <option value="ocean-freight">Ocean Container / LCL Drayage</option>
                      <option value="india-canada">India → Canada Door-to-Door</option>
                      <option value="warehousing">Warehousing &amp; Fulfillment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Origin Country / Port <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. India (Delhi / Mumbai)"
                      value={formData.originCountry}
                      onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Destination in Canada
                    </label>
                    <select
                      value={formData.destinationCity}
                      onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-white text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] transition"
                    >
                      <option value="Vancouver (YVR Hub / BC)">Vancouver (YVR Hub / BC)</option>
                      <option value="Toronto (YYZ Hub / ON)">Toronto (YYZ Hub / ON)</option>
                      <option value="Calgary / Edmonton (AB)">Calgary / Edmonton (AB)</option>
                      <option value="Montreal (YUL / QC)">Montreal (YUL / QC)</option>
                      <option value="Other Canada-wide Postal Code">Other Canada-wide Postal Code</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Commodity / Cargo Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apparel, Auto Parts, Electronics"
                      value={formData.cargoType}
                      onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Estimated Total Weight (kg)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 350 kg"
                      value={formData.weightKg}
                      onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Package / Pallet Count
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15 cartons or 2 skids"
                      value={formData.packageCount}
                      onChange={(e) => setFormData({ ...formData, packageCount: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Target Arrival / Departure Timeline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Within 2 weeks / Immediate"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                    Special Handling, Customs Brokerage, or Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention any flight details, bonded warehouse requirements, temperature controls, or CBSA customs clearance questions..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-medium text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* SECTION 2: Contact & Quotation Details */}
              <div className="pt-8 border-t border-[#d5dcdb]/80">
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f05a28]">
                    Step 2 of 2
                  </div>
                  <h3 className="text-xl font-black text-[#0b2f3a] mt-0.5">
                    Where Should We Send Your Quote?
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1">
                    Your quotation will be prepared by our logistics desk and delivered straight to your email.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Your Name <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Global Trade"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Work Email <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. david@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Phone Number <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (604) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action Bar */}
              <div className="pt-8 border-t border-[#d5dcdb] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2.5 text-xs text-[#51626a]">
                  <ShieldCheck size={18} className="text-[#1f8a5b] shrink-0" />
                  <span>No obligation quotation. Handled in strict confidence under Canadian privacy laws.</span>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#f05a28] hover:bg-[#c2410c] text-white px-10 py-4 rounded-xl font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-orange-500/25 disabled:opacity-50"
                >
                  <Send size={18} />
                  <span>{status === "loading" ? "Submitting Request..." : "Request Official Quote"}</span>
                </button>
              </div>

              {status === "success" && (
                <div className="p-4 rounded-2xl bg-[#1f8a5b]/10 border border-[#1f8a5b]/20 text-[#1f8a5b] text-sm font-bold text-center">
                  ✓ Quote request received! A commercial logistics specialist will review your details and send your pricing within 1 business day.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center">
                  Could not submit your request. Please try again or call our operations desk directly at (672) 968-3390.
                </div>
              )}
            </form>
          </div>

          {/* Quick Support Strip */}
          <div className="bg-[#0b2f3a] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffd100]">
                Urgent Booking or Commercial Consultation?
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Need immediate rate verification before air freight departure?
              </h3>
              <p className="text-[#d5dcdb] text-xs sm:text-sm mt-1">
                Speak directly with our Vancouver or Toronto dispatch coordinators.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="tel:+16729683390"
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2"
              >
                <Phone size={15} /> Call (672) 968-3390
              </a>
              <Link
                href="/book-a-call"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition border border-white/20"
              >
                Schedule Call
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
