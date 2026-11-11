"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Search, PackageCheck, AlertCircle, Phone, Mail, ArrowRight } from "lucide-react";

export default function TrackShipmentPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setSearched(true);
  };

  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-4xl py-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              Shipment Visibility
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Track Your Shipment
            </h1>
            <p className="text-[#51626a] text-sm sm:text-base mt-2">
              Enter your DCW reference or courier tracking number to check arrival, customs clearance, or UPS delivery status.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-[#eef1f0] p-6 sm:p-8 rounded-2xl border border-[#d5dcdb] shadow-sm mb-10">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51626a]" size={20} />
                <input
                  type="text"
                  required
                  placeholder="e.g. DCW-482193 or 1Z..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#d5dcdb] bg-white text-base text-[#0b2f3a] focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0b2f3a] hover:bg-[#14434f] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Track Status</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Status Display or Direct Support */}
          {searched ? (
            <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm mb-10 animate-fade-in">
              <div className="flex items-center gap-3 pb-4 border-b border-[#d5dcdb]">
                <PackageCheck className="text-[#1f8a5b]" size={24} />
                <div>
                  <h3 className="font-bold text-base text-[#0b2f3a]">
                    Tracking: <span className="text-[#f05a28]">{trackingNumber}</span>
                  </h3>
                  <p className="text-xs text-[#51626a]">Direct tracking coordination active</p>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-[#eef1f0]/60 border border-[#d5dcdb] text-sm text-[#14434f] leading-relaxed">
                <p>
                  To receive the official airline arrival notice, customs release timestamp, or UPS tracking link for <strong>{trackingNumber}</strong>, our operations dispatch team can verify your consignment immediately.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`mailto:info@dcwsolution.ca?subject=Tracking Update for ${trackingNumber}`}
                    className="inline-flex items-center gap-2 bg-[#f05a28] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#c2410c] transition"
                  >
                    <Mail size={14} /> Email Dispatch for Milestone
                  </a>
                  <a
                    href="tel:+16729683390"
                    className="inline-flex items-center gap-2 bg-[#0b2f3a] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#14434f] transition"
                  >
                    <Phone size={14} /> Call (672) 968-3390
                  </a>
                </div>
              </div>
            </div>
          ) : null}

          {/* Direct Help Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#d5dcdb] shadow-sm">
              <h3 className="font-bold text-base text-[#0b2f3a]">Courier Inbound Shipments</h3>
              <p className="text-xs text-[#51626a] mt-2 leading-relaxed">
                Inbound parcels from India and international carriers are received at our Vancouver or Toronto hubs, sorted, and handed over to UPS.
              </p>
              <a href="mailto:info@dcwsolution.ca" className="inline-block mt-4 text-xs font-bold text-[#f05a28] hover:underline">
                Ask about container or bag status →
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#d5dcdb] shadow-sm">
              <h3 className="font-bold text-base text-[#0b2f3a]">Commercial Cargo Tracking</h3>
              <p className="text-xs text-[#51626a] mt-2 leading-relaxed">
                For ocean container de-stuffing, bonded freight warehouse transfers, or customs hold verification, contact our clearance desk.
              </p>
              <a href="tel:+16729683390" className="inline-block mt-4 text-xs font-bold text-[#f05a28] hover:underline">
                Speak with operations desk →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

