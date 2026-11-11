import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactSection from "../../components/ContactSection";
import { Handshake, CheckCircle2, Building, Plane, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Become a Shipping Partner | DCW Solutions Inc.",
  description: "Partner with DCW Solutions Inc. for seamless Canadian inbound courier handling, customs clearance coordination, and UPS last-mile delivery.",
};

export default function ShippingPartnerPage() {
  const benefits = [
    {
      title: "Full Canadian Inbound Infrastructure",
      desc: "Warehouses in Vancouver and Toronto ready to receive consolidated air cargo and courier bags.",
    },
    {
      title: "Coordinated Customs Clearance",
      desc: "Licensed customs brokerage relationships ensure high compliance and prompt cargo releases.",
    },
    {
      title: "Competitive Tiered Volume Rates",
      desc: "Volume-based wholesale pricing that allows your agency to stay profitable while offering reliable Canada transit.",
    },
    {
      title: "Preferential UPS Domestic Handover",
      desc: "Direct integration with UPS for immediate onward dispatch to every province and postal code.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-5xl py-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              B2B Partner Network
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Become a DCW Shipping Partner
            </h1>
            <p className="text-[#51626a] text-sm sm:text-base mt-3 leading-relaxed">
              Are you an international courier company, freight forwarder, or 3PL looking for an established Canadian destination agent? Join our network today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl bg-[#eef1f0] border border-[#d5dcdb] flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[#0b2f3a] text-[#ffd100] shrink-0 mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0b2f3a]">{b.title}</h3>
                  <p className="text-xs text-[#51626a] mt-1.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-[#d5dcdb] shadow-sm p-4 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-[#0b2f3a]">Submit Partnership Inquiry</h2>
              <p className="text-xs text-[#51626a] mt-1">Our commercial partnerships director will contact you promptly.</p>
            </div>
            <ContactSection />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

