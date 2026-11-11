import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Building2, ShieldCheck, MapPin, Truck, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | DCW Solutions Inc.",
  description: "Learn about DCW Solutions Inc., your Canadian logistics gateway for courier imports, customs clearance coordination, warehousing, and nationwide distribution.",
};

export default function AboutUsPage() {
  const pillars = [
    {
      title: "Delivery",
      desc: "Comprehensive Canada-wide final mile courier delivery via UPS and regional freight partners, ensuring rapid transit from gateway hubs to end consumers.",
      icon: Truck,
    },
    {
      title: "Clearance",
      desc: "Seamless customs clearance coordination through established brokerage relationships, ensuring full compliance with CBSA guidelines without costly delays.",
      icon: ShieldCheck,
    },
    {
      title: "Warehousing",
      desc: "Strategically located logistics facilities in Vancouver (YVR) and Toronto (YYZ) equipped for cross-docking, palletizing, sorting, and short/long-term storage.",
      icon: Building2,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-5xl py-8">
          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              About DCW Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Connecting Global Shippers to Canada
            </h1>
            <p className="text-[#51626a] text-sm sm:text-base mt-4 leading-relaxed">
              DCW Solutions Inc. stands for <strong>Delivery, Clearance, and Warehousing</strong>. We specialize in international courier imports, cross-border freight management, and end-to-end logistics support designed for international courier companies, freight forwarders, and commercial importers.
            </p>
          </div>

          {/* Core Values / 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-[#eef1f0] p-8 rounded-2xl border border-[#d5dcdb] flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0b2f3a] text-[#ffd100] flex items-center justify-center mb-6 shadow-sm">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-[#0b2f3a]">{p.title}</h3>
                    <p className="text-sm text-[#51626a] mt-3 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mission & Story */}
          <div className="bg-white rounded-2xl border border-[#d5dcdb] p-8 sm:p-12 shadow-sm mb-16 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a]">
              Our Mission
            </h2>
            <p className="text-[#14434f] text-base leading-relaxed">
              Navigating Canadian import procedures, terminal handling charges, customs brokerage requirements, and last-mile logistics can be fragmented and unpredictable for foreign shippers. DCW Solutions Inc. was built to eliminate this friction by providing a reliable, transparent, single operational point of contact across Canada.
            </p>
            <p className="text-[#14434f] text-base leading-relaxed">
              From our operational centers in British Columbia and Ontario, we coordinate incoming cargo manifests directly with airlines, expedite bonded transfers, ensure precise customs clearance coordination, and execute fast handovers to delivery carriers.
            </p>

            <div className="pt-6 border-t border-[#d5dcdb] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#1f8a5b] shrink-0" size={20} />
                <span className="text-sm font-bold text-[#0b2f3a]">Specialized origin expertise (India, Pakistan, Global)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#1f8a5b] shrink-0" size={20} />
                <span className="text-sm font-bold text-[#0b2f3a]">Dedicated UPS Canada last-mile partnership</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#1f8a5b] shrink-0" size={20} />
                <span className="text-sm font-bold text-[#0b2f3a]">Coast-to-coast delivery coverage</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#1f8a5b] shrink-0" size={20} />
                <span className="text-sm font-bold text-[#0b2f3a]">Responsive local Canadian support desk</span>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#0b2f3a] to-[#14434f] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-2xl font-black">Ready to streamline your Canadian shipments?</h3>
              <p className="text-[#d5dcdb] text-sm mt-1">Get in touch with our operations team or request a customized tariff quote.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/request-a-quote"
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-5 py-3 rounded-xl font-bold text-sm transition shadow-sm flex items-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/book-a-call"
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-bold text-sm transition border border-white/20"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

