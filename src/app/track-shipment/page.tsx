"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Search,
  PackageCheck,
  AlertCircle,
  Phone,
  Mail,
  ArrowRight,
  PlaneLanding,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Building2,
} from "lucide-react";

export default function TrackShipmentPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setSearched(true);
  };

  const steps = [
    {
      title: "Flight Arrival (YVR / YYZ)",
      desc: "Cargo & courier manifests received directly from inbound international flights.",
      icon: PlaneLanding,
    },
    {
      title: "Customs Clearance Coordination",
      desc: "Electronic documentation submitted to CBSA via our licensed brokerage partner.",
      icon: ShieldCheck,
    },
    {
      title: "Warehouse Sorting & Deconsolidation",
      desc: "Bags and pallets sorted, scanned, and labelled at Richmond or Toronto hubs.",
      icon: Building2,
    },
    {
      title: "Handover to Domestic Delivery",
      desc: "Injected into UPS Canada network for final-mile delivery with live tracking.",
      icon: Truck,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#eef1f0] text-[#0b2f3a]">
        {/* Dynamic Header Hero Banner */}
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
              <Sparkles size={14} /> Real-Time Inbound Visibility
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Track Your Inbound Shipment
            </h1>
            <p className="text-[#d5dcdb] text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Monitor international courier bags, commercial freight consolidations, and customs clearance releases entering Canada.
            </p>

            {/* Prominent Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <form
                onSubmit={handleSearch}
                className="bg-white p-2.5 rounded-2xl shadow-2xl border border-white/20 flex flex-col sm:flex-row gap-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#f05a28]/40"
              >
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51626a]"
                    size={20}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Enter DCW Ref (e.g. DCW-482193) or AWB / UPS #"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-[#0b2f3a] text-sm sm:text-base font-semibold focus:outline-none transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="group bg-[#f05a28] hover:bg-[#c2410c] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  <span>Track Status</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>
              <p className="text-[12px] text-[#d5dcdb]/80 mt-2 text-center">
                Need help finding your reference number? Check your booking confirmation or dispatch invoice.
              </p>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16 space-y-16">
          {/* Tracking Result Card (Interactive) */}
          {searched ? (
            <div className="bg-white rounded-3xl border border-[#d5dcdb] p-8 sm:p-10 shadow-xl transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d5dcdb]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1f8a5b]/10 text-[#1f8a5b] flex items-center justify-center font-bold">
                    <PackageCheck size={26} />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#1f8a5b] bg-[#1f8a5b]/10 px-2 py-0.5 rounded">
                      Consignment Located
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0b2f3a] mt-1">
                      Reference: <span className="text-[#f05a28]">{trackingNumber}</span>
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#51626a] bg-[#eef1f0] px-3.5 py-2 rounded-xl">
                  <Clock size={15} />
                  <span>Verified by Operations Desk</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-base text-[#0b2f3a]">
                    Consignment Handling Status
                  </h3>
                  <p className="text-sm text-[#51626a] leading-relaxed">
                    This shipment is coordinated by DCW Solutions Inc. For live flight manifest verification, official CBSA customs entry status, or onward UPS domestic tracking credentials:
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`mailto:info@dcwsolution.ca?subject=Shipment Milestone Request: ${trackingNumber}`}
                      className="group inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25"
                    >
                      <Mail size={15} />
                      <span>Email Dispatch for Tracking Link</span>
                    </a>
                    <a
                      href="tel:+16729683390"
                      className="group inline-flex items-center gap-2 bg-[#0b2f3a] hover:bg-[#14434f] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                    >
                      <Phone size={15} />
                      <span>Direct Dispatch: (672) 968-3390</span>
                    </a>
                  </div>
                </div>

                <div className="bg-[#eef1f0] p-6 rounded-2xl border border-[#d5dcdb] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#51626a]">
                    Operational Gateway
                  </div>
                  <div className="text-sm font-bold text-[#0b2f3a]">
                    DCW Richmond Hub (YVR) / Toronto (YYZ)
                  </div>
                  <div className="text-xs text-[#51626a]">
                    Bonded Transfer &amp; Domestic UPS Onward Dispatch Coordinated
                  </div>
                  <div className="pt-3 border-t border-[#d5dcdb] flex items-center gap-2 text-xs text-[#1f8a5b] font-bold">
                    <CheckCircle2 size={16} />
                    <span>Arrival handling &amp; customs coordination in progress</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Standard 4-Stage Inbound Process */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                Shipment Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] mt-1">
                How Your Shipment Moves Through Canada
              </h2>
              <p className="text-xs sm:text-sm text-[#51626a] mt-2">
                Every consignment handled by DCW adheres to strict Canadian import protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="group bg-white p-6 rounded-2xl border border-[#d5dcdb] hover:border-[#b0bcba] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#0b2f3a] text-[#ffd100] group-hover:scale-105 transition-transform duration-200 flex items-center justify-center font-bold shadow-sm">
                          <Icon size={20} />
                        </div>
                        <span className="text-xl font-black text-[#d5dcdb] group-hover:text-[#b0bcba] transition-colors duration-200">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#0b2f3a]">{s.title}</h3>
                      <p className="text-xs text-[#51626a] mt-2 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Assistance Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white p-8 rounded-3xl border border-[#d5dcdb] hover:border-[#b0bcba] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                  Courier Consolidation Bags
                </span>
                <h3 className="text-xl font-black text-[#0b2f3a] mt-2">
                  Overseas Courier Partner Queries
                </h3>
                <p className="text-xs sm:text-sm text-[#51626a] mt-3 leading-relaxed">
                  For international courier companies shipping consolidated bags or master waybills (MAWB), contact our dispatch team with your flight schedule.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d5dcdb]">
                <a
                  href="mailto:info@dcwsolution.ca"
                  className="font-bold text-xs text-[#f05a28] group-hover:text-[#c2410c] flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span>Email B2B Operations Support</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-3xl border border-[#d5dcdb] hover:border-[#b0bcba] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1f8a5b]">
                  Commercial Freight
                </span>
                <h3 className="text-xl font-black text-[#0b2f3a] mt-2">
                  Pallet &amp; Container Clearance
                </h3>
                <p className="text-xs sm:text-sm text-[#51626a] mt-3 leading-relaxed">
                  Have commercial cargo on an ocean container or air freighter undergoing CBSA review? Our brokerage partners ensure clear updates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#d5dcdb]">
                <Link
                  href="/book-a-call"
                  className="font-bold text-xs text-[#1f8a5b] group-hover:text-[#166b46] flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span>Book a Customs Call</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
