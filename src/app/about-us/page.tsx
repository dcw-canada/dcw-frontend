import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ShieldCheck,
  Building2,
  Truck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Eye,
  Handshake,
  Headphones,
  Globe,
  Package,
} from "lucide-react";

export const metadata = {
  title: "About Us | DCW Solutions Inc.",
  description:
    "Learn about DCW Solutions Inc., your Canadian logistics gateway for courier and cargo handling, customs clearance coordination, warehousing, and nationwide delivery.",
};

export default function AboutUsPage() {
  const coreValues = [
    {
      title: "Reliability",
      desc: "Handle every shipment with care, proactive tracking, and total accountability from arrival notice to handover.",
      icon: ShieldCheck,
    },
    {
      title: "Transparency",
      desc: "Communicate clearly about pricing structures, customs documentation requirements, and shipment progress.",
      icon: Eye,
    },
    {
      title: "Compliance",
      desc: "Uphold applicable Canadian customs and shipping requirements through verified customs brokerage partnerships.",
      icon: CheckCircle2,
    },
    {
      title: "Responsiveness",
      desc: "Provide timely support, fast turnaround times, and practical solutions tailored to each partner's volume.",
      icon: Headphones,
    },
    {
      title: "Partnership",
      desc: "Build lasting relationships that support our shipping partners' and commercial importers' long-term business growth.",
      icon: Handshake,
    },
  ];

  const whoWeServe = [
    {
      title: "International Courier Companies & Freight Forwarders",
      desc: "A reliable destination partner in Canada. We provide inbound handling, terminal recovery, customs clearance coordination, bag sorting, and direct handover into national delivery networks like UPS.",
      badge: "B2B Logistics Partners",
    },
    {
      title: "Canadian Businesses & Commercial Importers",
      desc: "Straightforward, end-to-end import solutions for recurring commercial freight, palletized shipments, and e-commerce consolidations, with warehousing and distribution support in Vancouver and Toronto.",
      badge: "Commercial Importers",
    },
    {
      title: "Individual & Family Shippers",
      desc: "Simple, friendly assistance for personal shipments and door-to-door courier services from India to Canada—with clear guidance on pickup, documentation, and home delivery.",
      badge: "Door-to-Door Courier",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-5xl py-8">
          {/* Header & Introduction */}
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              About DCW Solutions Inc.
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Delivery · Clearance · Warehousing
            </h1>
            <p className="text-[#51626a] text-base sm:text-lg mt-4 leading-relaxed">
              DCW was founded to make international courier and cargo movements into Canada easier to manage. We help address fragmented logistics arrangements by coordinating arrival handling, customs clearance through a brokerage partner, warehousing, and final delivery—giving customers a more connected process and clearer communication.
            </p>
          </div>

          {/* Growth & Milestones Stat Callout */}
          <div className="bg-[#0b2f3a] text-white rounded-3xl p-8 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#ffd100_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ffd100]">
                  Proven Track Record
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2 text-white">
                  27,000+ Shipments Processed in Year One
                </h2>
                <p className="text-[#d5dcdb] text-sm mt-3 leading-relaxed">
                  Through dependable service and responsive operational support, DCW has rapidly scaled from handling initial courier consolidations to offering dedicated warehousing facilities in Vancouver and Toronto with nationwide Canadian delivery.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                <div className="text-4xl sm:text-5xl font-black text-[#ffd100]">27k+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white mt-2">
                  Shipments Coordinated
                </div>
                <div className="text-[11px] text-[#d5dcdb] mt-1">Coast-to-Coast across Canada</div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Statements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#eef1f0] p-8 rounded-3xl border border-[#d5dcdb] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                  Our Purpose
                </span>
                <h3 className="text-2xl font-black text-[#0b2f3a] mt-2">Our Mission</h3>
                <p className="text-[#14434f] text-base mt-3 leading-relaxed font-medium">
                  &ldquo;To simplify international shipping through reliable courier and cargo handling, coordinated customs clearance, warehousing, and delivery services backed by responsive support.&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-[#eef1f0] p-8 rounded-3xl border border-[#d5dcdb] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1f8a5b]">
                  Our Outlook
                </span>
                <h3 className="text-2xl font-black text-[#0b2f3a] mt-2">Our Vision</h3>
                <p className="text-[#14434f] text-base mt-3 leading-relaxed font-medium">
                  &ldquo;To become the trusted Canadian logistics partner connecting international shipping businesses and customers with destinations across Canada.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* What We Do & Our Scope */}
          <div className="bg-white rounded-3xl border border-[#d5dcdb] p-8 sm:p-12 shadow-sm mb-16 space-y-6">
            <div className="border-b border-[#d5dcdb] pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                Integrated Canadian Gateway
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] mt-2">
                One Operational Point of Contact
              </h2>
            </div>
            <p className="text-[#14434f] text-base leading-relaxed">
              DCW Solutions Inc. provides courier and cargo handling, freight forwarding, customs clearance coordination, warehousing, and last-mile delivery in Canada. We specialize in international courier imports, supporting shipping partners and businesses from arrival through final delivery.
            </p>
            <p className="text-[#14434f] text-base leading-relaxed">
              We bring shipment handling, customs brokerage coordination, warehousing, and final delivery together under one roof. Our deep experience with time-sensitive courier imports, close working relationship with a licensed customs brokerage partner, and direct agreements with major delivery carriers such as UPS help keep consignments moving smoothly through arrival, sorting, and delivery.
            </p>
            <div className="p-4 rounded-2xl bg-[#eef1f0] border border-[#d5dcdb] text-sm text-[#0b2f3a]">
              <strong className="text-[#f05a28]">Upcoming Service Launch:</strong> We are also launching door-to-door courier services with pickup anywhere in India and delivery across Canada, subject to service availability and applicable terms and conditions.
            </div>
          </div>

          {/* Who We Work With */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                Tailored Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] mt-2">
                Who We Work With
              </h2>
              <p className="text-sm text-[#51626a] mt-2">
                Approachable, clear, and tailored support adapted to your exact logistics requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whoWeServe.map((item) => (
                <div key={item.title} className="bg-white p-7 rounded-3xl border border-[#d5dcdb] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f05a28] bg-[#f05a28]/10 px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#0b2f3a] mt-4 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#51626a] mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28]">
                Guiding Principles
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] mt-2">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-[#eef1f0] p-6 rounded-2xl border border-[#d5dcdb] flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#0b2f3a] text-[#ffd100] flex items-center justify-center mb-4 shrink-0 shadow-sm">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-base text-[#0b2f3a]">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-[#51626a] mt-2 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operational Facilities / Locations */}
          <div className="bg-white rounded-3xl border border-[#d5dcdb] p-8 sm:p-10 shadow-sm mb-16">
            <div className="flex items-center gap-3 pb-6 border-b border-[#d5dcdb]">
              <div className="p-3 bg-[#0b2f3a] text-[#ffd100] rounded-xl shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#0b2f3a]">Our Facilities &amp; Hubs</h2>
                <p className="text-xs sm:text-sm text-[#51626a]">Vancouver and Toronto operations serving all Canadian provinces</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {/* Vancouver Hub */}
              <div className="p-6 rounded-2xl bg-[#eef1f0]/70 border border-[#d5dcdb]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#0b2f3a]">Vancouver Facility (YVR)</h3>
                  <span className="text-xs font-bold bg-[#1f8a5b]/10 text-[#1f8a5b] px-2.5 py-1 rounded-full">
                    Open for Walk-Ins
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#14434f] mt-3">
                  115-6086 Russ Baker Way, Richmond, BC V7B 1B4
                </div>
                <p className="text-xs text-[#51626a] mt-2 leading-relaxed">
                  Minutes from Vancouver International Airport (YVR) and bonded container terminals. Equipped for cross-docking, palletization, sorting, and customer receiving.
                </p>
              </div>

              {/* Toronto Hub */}
              <div className="p-6 rounded-2xl bg-[#eef1f0]/70 border border-[#d5dcdb]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#0b2f3a]">Toronto Facility (YYZ)</h3>
                  <span className="text-xs font-bold bg-[#f05a28]/10 text-[#f05a28] px-2.5 py-1 rounded-full">
                    Operational Hub
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#14434f] mt-3">
                  Greater Toronto Area, Ontario (Serving YYZ)
                </div>
                <p className="text-xs text-[#51626a] mt-2 leading-relaxed">
                  Eastern distribution node coordinating freight transfers, sorting, and regional injection into domestic express delivery networks.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#0b2f3a] to-[#14434f] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Looking for reliable Canadian logistics support?
              </h3>
              <p className="text-[#d5dcdb] text-sm mt-2 max-w-xl leading-relaxed">
                Whether you are an international courier company, freight forwarder, or commercial importer, connect with our operations team today for tailored rates and dependable service.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/request-a-quote"
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition shadow-md flex items-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/book-a-call"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition border border-white/20"
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
