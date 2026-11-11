"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Handshake,
  CheckCircle2,
  Building,
  Plane,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Truck,
  Sparkles,
  Layers,
  PhoneCall,
  Boxes,
  Send,
  Clock,
  Briefcase,
  Check,
  Building2,
  PackageCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../lib/api";

export default function ShippingPartnerPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "courier-co",
    headquartersCountry: "",
    estimatedMonthlyVolume: "100-500",
    originLanes: "",
    primaryService: "clearance-delivery",
    additionalDetails: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const businessTypes = [
    {
      id: "courier-co",
      label: "International Courier",
      sub: "Consolidation bags & air express",
      icon: Truck,
    },
    {
      id: "freight-forwarder",
      label: "Freight Forwarder",
      sub: "Air & ocean cargo clearance / drayage",
      icon: Plane,
    },
    {
      id: "3pl-provider",
      label: "3PL & Logistics Provider",
      sub: "Canadian cross-docking & warehousing",
      icon: Building2,
    },
    {
      id: "ecommerce-aggregator",
      label: "E-Commerce Enterprise",
      sub: "High-volume repeat import parcels",
      icon: Boxes,
    },
  ];

  const volumeTiers = [
    { id: "starter", label: "< 100", unit: "shipments / mo" },
    { id: "100-500", label: "100 - 500", unit: "shipments / mo" },
    { id: "500-2000", label: "500 - 2,000", unit: "shipments / mo" },
    { id: "enterprise", label: "2,000+", unit: "shipments / mo (Tier 1)" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formattedMessage = `
--- B2B SHIPPING PARTNER APPLICATION ---
Company: ${formData.companyName}
Representative: ${formData.contactName}
Partner Category: ${formData.businessType}
Headquarters / Location: ${formData.headquartersCountry || "Not specified"}
Monthly Volume Tier: ${formData.estimatedMonthlyVolume}
Origin Trade Lanes: ${formData.originLanes || "Global"}
Primary Canadian Service Needed: ${formData.primaryService}
Operational Notes / Expectations: ${formData.additionalDetails || "None provided"}
    `.trim();

    try {
      await api.post("/contact", {
        name: formData.contactName,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        service: `B2B Partnership (${formData.businessType})`,
        message: formattedMessage,
      });

      setStatus("success");
      toast.success("Partnership application received! Our commercial director will contact you within 1 business day.");
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        businessType: "courier-co",
        headquartersCountry: "",
        estimatedMonthlyVolume: "100-500",
        originLanes: "",
        primaryService: "clearance-delivery",
        additionalDetails: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Could not submit inquiry. Please try again or reach out to info@dcwsolution.ca.");
    }
  };

  const partnerPillars = [
    {
      title: "Vancouver & Toronto Hubs",
      desc: "Bonded and non-bonded warehouse infrastructure close to YVR and YYZ to receive, inspect, scan, and sort consolidated air cargo.",
      icon: Building,
      badge: "Inbound Capacity",
    },
    {
      title: "Customs Brokerage Coordination",
      desc: "Licensed customs brokerage relationships to handle commercial and courier entry manifest filings with high CBSA compliance.",
      icon: ShieldCheck,
      badge: "Regulatory Compliance",
    },
    {
      title: "Tiered Volume Wholesale Rates",
      desc: "Predictable, transparent wholesale tariffs tailored to weekly or monthly courier import volumes to preserve your company margins.",
      icon: Boxes,
      badge: "Commercial Tariffs",
    },
    {
      title: "National UPS Last-Mile Handover",
      desc: "Direct injection into UPS domestic logistics with automated tracking generation across all 10 provinces and 3 territories.",
      icon: Truck,
      badge: "Coast-to-Coast Reach",
    },
  ];

  const whoPartners = [
    {
      role: "International Courier Companies",
      benefit: "Single destination agent in Canada providing bonded airport recovery, clearance, and swift courier handover.",
    },
    {
      role: "Global Freight Forwarders",
      benefit: "Reliable Canadian customs coordination, de-stuffing, cross-docking, and drayage to your client’s final door.",
    },
    {
      role: "E-Commerce Logistics Integrators",
      benefit: "Scalable volume handling for repeat cross-border shipments, parcels, and consumer returns.",
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
              <Sparkles size={14} /> B2B Shipping Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Become a DCW Shipping Partner
            </h1>
            <p className="text-[#d5dcdb] text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Expand your reach into Canada. DCW Solutions Inc. serves as your trusted Canadian destination agent for air cargo recovery, customs clearance coordination, and UPS last-mile injection.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-16">
          {/* 4 Pillars Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                Why Partner With DCW
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] mt-1">
                Your Operational Arm in Canada
              </h2>
              <p className="text-xs sm:text-sm text-[#51626a] mt-2">
                We eliminate fragmented Canadian destination logistics with one accountable point of contact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnerPillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="bg-white p-8 rounded-3xl border border-[#d5dcdb] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#0b2f3a] text-[#ffd100] flex items-center justify-center shadow-sm">
                          <Icon size={22} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#f05a28] bg-[#f05a28]/10 px-2.5 py-1 rounded-md">
                          {p.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-[#0b2f3a] mt-2">{p.title}</h3>
                      <p className="text-xs sm:text-sm text-[#51626a] mt-2.5 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Who Partners with DCW */}
          <div className="bg-[#0b2f3a] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10 w-full">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffd100]">
                Target Collaborations
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 max-w-4xl">
                Designed for Forward-Thinking Logistics Providers
              </h2>
              <p className="text-[#d5dcdb] text-sm sm:text-base mt-3 leading-relaxed max-w-3xl">
                We collaborate with logistics enterprises worldwide who require a reliable Canadian partner with physical warehousing and direct courier linehaul access.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                {whoPartners.map((wp) => (
                  <div
                    key={wp.role}
                    className="bg-white/10 p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/15 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-base text-[#ffd100] mb-2">{wp.role}</div>
                      <div className="text-xs sm:text-sm text-[#d5dcdb] leading-relaxed">
                        {wp.benefit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Redesigned Partner Application Form: Modern, Inviting, Step-by-Step */}
          <div className="bg-white rounded-3xl border border-[#d5dcdb] shadow-xl overflow-hidden">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-[#0b2f3a] to-[#14434f] px-8 sm:px-12 py-7 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#ffd100]">
                  Agency Onboarding
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white">
                  Shipping Partner Application
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#d5dcdb] bg-white/10 px-4 py-2 rounded-xl border border-white/10 shrink-0">
                <Clock size={16} className="text-[#f05a28]" />
                <span>Wholesale Account Setup in 24 Hours</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-14 space-y-12">
              {/* STEP 1: Organization Type Tiles */}
              <div>
                <div className="mb-4">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f05a28]">
                    Step 1 of 3
                  </div>
                  <h3 className="text-xl font-black text-[#0b2f3a] mt-0.5">
                    What Type of Organization Are You?
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1">
                    Select your business profile to match wholesale agency terms.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {businessTypes.map((t) => {
                    const Icon = t.icon;
                    const isSelected = formData.businessType === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setFormData({ ...formData, businessType: t.id })}
                        className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between relative group ${
                          isSelected
                            ? "bg-[#0b2f3a] text-white border-[#0b2f3a] shadow-lg shadow-[#0b2f3a]/20 scale-[1.02]"
                            : "bg-[#eef1f0]/50 text-[#0b2f3a] border-[#d5dcdb] hover:bg-white hover:border-[#0b2f3a]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-[#f05a28] text-white"
                                : "bg-white text-[#0b2f3a] border border-[#d5dcdb] group-hover:border-[#0b2f3a]"
                            }`}
                          >
                            <Icon size={20} />
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "bg-[#ffd100] border-[#ffd100] text-[#0b2f3a]"
                                : "border-[#d5dcdb] bg-white"
                            }`}
                          >
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm sm:text-base leading-snug">
                            {t.label}
                          </div>
                          <div
                            className={`text-xs mt-1 leading-relaxed ${
                              isSelected ? "text-[#d5dcdb]" : "text-[#51626a]"
                            }`}
                          >
                            {t.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Volume & Route Preferences */}
              <div className="pt-8 border-t border-[#d5dcdb]/80">
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f05a28]">
                    Step 2 of 3
                  </div>
                  <h3 className="text-xl font-black text-[#0b2f3a] mt-0.5">
                    Estimated Inbound Volume &amp; Trade Lanes
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1">
                    Wholesale pricing tiers unlock progressively higher margin discounts based on volume.
                  </p>
                </div>

                {/* Volume selector chips */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-3">
                    Expected Monthly Consignment Volume
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {volumeTiers.map((vt) => {
                      const isSelected = formData.estimatedMonthlyVolume === vt.id;
                      return (
                        <button
                          type="button"
                          key={vt.id}
                          onClick={() => setFormData({ ...formData, estimatedMonthlyVolume: vt.id })}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "bg-[#0b2f3a] text-white border-[#0b2f3a] shadow-md font-bold"
                              : "bg-[#eef1f0]/40 border-[#d5dcdb] text-[#14434f] hover:bg-white"
                          }`}
                        >
                          <div className="text-base font-black">{vt.label}</div>
                          <div className={`text-[11px] mt-0.5 ${isSelected ? "text-[#ffd100]" : "text-[#51626a]"}`}>
                            {vt.unit}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Headquarters / Origin Country <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. India, UAE, UK, Singapore"
                      value={formData.headquartersCountry}
                      onChange={(e) => setFormData({ ...formData, headquartersCountry: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Key Origin Trade Lanes <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DEL / BOM / DXB to YVR / YYZ"
                      value={formData.originLanes}
                      onChange={(e) => setFormData({ ...formData, originLanes: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Primary Service Needed
                    </label>
                    <select
                      value={formData.primaryService}
                      onChange={(e) => setFormData({ ...formData, primaryService: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-white text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] transition"
                    >
                      <option value="clearance-delivery">Customs Clearance + UPS Delivery</option>
                      <option value="airport-recovery">Airport Terminal Recovery &amp; Deconsolidation</option>
                      <option value="bonded-warehousing">Bonded &amp; Non-Bonded Storage (YVR/YYZ)</option>
                      <option value="full-gateway">Full Canadian Gateway Representation</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                    Operational Requirements, Flight Schedules or EDI Needs (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your flight frequencies, bag barcode formats, customs brokerage preferences, or specific Canadian destination cities..."
                    value={formData.additionalDetails}
                    onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-medium text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                  />
                </div>
              </div>

              {/* STEP 3: Corporate Contact Details */}
              <div className="pt-8 border-t border-[#d5dcdb]/80">
                <div className="mb-6">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f05a28]">
                    Step 3 of 3
                  </div>
                  <h3 className="text-xl font-black text-[#0b2f3a] mt-0.5">
                    Agency &amp; Partnership Representative
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1">
                    Our partnership director will schedule a call and issue official wholesale pricing schedules.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Company Name <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Express Air Cargo Ltd."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Representative Name <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Corporate Email <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ops@expressair.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-[#eef1f0]/40 text-sm font-semibold text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14434f] mb-2">
                      Direct Phone / WhatsApp <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98000 00000"
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
                  <CheckCircle2 size={18} className="text-[#1f8a5b] shrink-0" />
                  <span>Wholesale B2B Agency Partnership Application. Reviewed within 1 business day.</span>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#f05a28] hover:bg-[#c2410c] text-white px-10 py-4 rounded-xl font-black text-sm sm:text-base transition-all shadow-xl hover:shadow-orange-500/25 disabled:opacity-50"
                >
                  <Handshake size={18} />
                  <span>{status === "loading" ? "Submitting Application..." : "Submit Partner Application"}</span>
                </button>
              </div>

              {status === "success" && (
                <div className="p-4 rounded-2xl bg-[#1f8a5b]/10 border border-[#1f8a5b]/20 text-[#1f8a5b] text-sm font-bold text-center">
                  ✓ Partnership application received! Our commercial partnerships director will review your agency profile and contact you within 1 business day.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center">
                  Could not submit your inquiry. Please try again or email us directly at info@dcwsolution.ca.
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
