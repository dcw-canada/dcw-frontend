import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";
import { Calculator, ArrowRight, ShieldCheck, Clock, FileCheck } from "lucide-react";

export const metadata = {
  title: "Request a Quote | DCW Solutions Inc.",
  description: "Get customized freight forwarding, customs clearance, and courier import pricing for shipments arriving in Canada.",
};

export default function RequestQuotePage() {
  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-5xl py-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              Tailored Logistics Pricing
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Request a Custom Shipment Quote
            </h1>
            <p className="text-[#51626a] text-sm sm:text-base mt-3 leading-relaxed">
              Whether you are shipping international courier parcels, full cargo containers, or organizing drayage and customs clearance, our operations team will prepare competitive landed-cost pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#eef1f0] p-6 rounded-2xl border border-[#d5dcdb] flex items-start gap-4">
              <div className="p-3 bg-[#0b2f3a] text-[#ffd100] rounded-xl shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b2f3a]">Fast Turnaround</h3>
                <p className="text-xs text-[#51626a] mt-1 leading-relaxed">
                  Quotations prepared and emailed within 1 business day.
                </p>
              </div>
            </div>

            <div className="bg-[#eef1f0] p-6 rounded-2xl border border-[#d5dcdb] flex items-start gap-4">
              <div className="p-3 bg-[#f05a28] text-white rounded-xl shrink-0">
                <Calculator size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b2f3a]">Transparent Rates</h3>
                <p className="text-xs text-[#51626a] mt-1 leading-relaxed">
                  Clear itemization of clearance, handling, and UPS last-mile fees.
                </p>
              </div>
            </div>

            <div className="bg-[#eef1f0] p-6 rounded-2xl border border-[#d5dcdb] flex items-start gap-4">
              <div className="p-3 bg-[#1f8a5b] text-white rounded-xl shrink-0">
                <FileCheck size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b2f3a]">CBSA Compliant</h3>
                <p className="text-xs text-[#51626a] mt-1 leading-relaxed">
                  Accurate duty and tax estimation coordinated with licensed brokers.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Contact / Quote Form */}
          <div className="bg-white rounded-2xl border border-[#d5dcdb] shadow-sm p-2 sm:p-6">
            <ContactSection />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

