import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Phone, Calendar, Clock, MessageSquare, Mail, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Book a Call | DCW Solutions Inc.",
  description: "Schedule a consultation with our Canadian customs clearance and logistics operations team.",
};

export default function BookCallPage() {
  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-4xl py-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              Direct Operations Consultation
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Book a Call with Our Team
            </h1>
            <p className="text-[#51626a] text-sm sm:text-base mt-3 leading-relaxed">
              Connect directly with our Canadian import specialists to discuss your supply chain, upcoming courier shipments, or warehousing requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Direct Phone / Immediate Call */}
            <div className="bg-[#0b2f3a] text-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 text-[#ffd100] flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                  Immediate Assistance
                </span>
                <h2 className="text-2xl font-black mt-2 text-white">Call Dispatch Direct</h2>
                <p className="text-[#d5dcdb] text-xs sm:text-sm mt-3 leading-relaxed">
                  Our operations desk is available Monday through Friday (08:00 – 18:00 PST) for immediate urgent inquiries.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="tel:+16729683390"
                  className="block text-center w-full bg-[#f05a28] hover:bg-[#c2410c] text-white py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25"
                >
                  (672) 968-3390
                </a>
                <span className="block text-center text-[11px] text-[#d5dcdb]/70 mt-2">
                  Toll &amp; local standard rates apply
                </span>
              </div>
            </div>

            {/* WhatsApp & Email Booking */}
            <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] hover:border-[#b0bcba] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#eef1f0] text-[#0b2f3a] flex items-center justify-center mb-6">
                  <Calendar size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1f8a5b]">
                  Online Scheduling
                </span>
                <h2 className="text-2xl font-black mt-2 text-[#0b2f3a]">Schedule via WhatsApp or Email</h2>
                <p className="text-[#51626a] text-xs sm:text-sm mt-3 leading-relaxed">
                  Prefer a scheduled Google Meet, Zoom, or quick WhatsApp consultation? Drop us a message with your preferred time slot.
                </p>
                <div className="space-y-2.5 mt-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14434f]">
                    <CheckCircle2 size={16} className="text-[#1f8a5b]" />
                    <span>Import customs consultation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14434f]">
                    <CheckCircle2 size={16} className="text-[#1f8a5b]" />
                    <span>Warehousing &amp; fulfillment rates</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#14434f]">
                    <CheckCircle2 size={16} className="text-[#1f8a5b]" />
                    <span>Courier bag consolidation advice</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#d5dcdb] flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/16729683390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-[#1f8a5b] hover:bg-[#166643] text-white py-3 rounded-xl font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md"
                >
                  WhatsApp Us
                </a>
                <a
                  href="mailto:info@dcwsolution.ca?subject=Requesting a Call with DCW Solutions"
                  className="flex-1 text-center bg-[#eef1f0] hover:bg-[#d5dcdb] text-[#0b2f3a] py-3 rounded-xl font-bold text-xs border border-[#d5dcdb] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Email Booking
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

