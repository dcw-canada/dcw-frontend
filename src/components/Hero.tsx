import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section
        className="relative overflow-hidden py-24 sm:py-32 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/banner-website@2x.png')",
          backgroundPosition: "center right",
        }}
      >
        {/* Blackish dim overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11, 47, 58, 0.92) 0%, rgba(11, 47, 58, 0.82) 45%, rgba(0, 0, 0, 0.55) 75%, rgba(0, 0, 0, 0.25) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="wrap relative z-10">
          <div className="max-w-7xl">
            <p className="text-[#ffd100] text-xs sm:text-sm font-black tracking-widest uppercase mb-4">
              Delivery · Clearance · Warehousing
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.15] mb-5 drop-shadow-sm">
              Your Trusted Canadian <br /> Logistics Partner
            </h1>

            <p className="text-[#d5dcdb] text-base sm:text-lg tracking-wide leading-loose mt-8 mb-8 max-w-3xl">
              DCW Solutions Inc. specializes in international courier imports,
              supporting shipping partners and businesses from arrival through
              final delivery. We coordinate customs clearance through a
              brokerage partner, offer warehousing in Vancouver and Toronto, and
              deliver Canada-wide through our trusted delivery partners.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10 mb-7">
              <a
                className="inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-orange-500/20"
                href="#contact"
              >
                <span>Request a quote</span>
                <ArrowRight size={18} />
              </a>
              <a
                className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
                href="#services"
              >
                Explore services
              </a>
            </div>

            <div className="inline-flex mt-10 items-center gap-2.5 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-white text-xs sm:text-sm">
              <ShieldCheck size={18} className="text-[#ffd100] shrink-0" />
              <span className="text-[#eef1f0]">
                Competitive rates backed by dependable service, direct tracking,
                and responsive Canadian support.
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="capability-strip" aria-label="DCW service capabilities">
        <div className="wrap capability-strip__grid">
          <div className="capability-strip__item">
            <strong>Courier &amp; Cargo Import</strong>
            <span>Handling &amp; clearance coordination</span>
          </div>
          <div className="capability-strip__item">
            <strong>Warehousing</strong>
            <span>Vancouver &amp; Toronto</span>
          </div>
          <div className="capability-strip__item">
            <strong>Last-Mile Delivery</strong>
            <span>Canada-wide via UPS</span>
          </div>
          <div className="capability-strip__item">
            <strong>India → Canada</strong>
            <span>Door-to-door courier (launching)</span>
          </div>
        </div>
      </div>
    </>
  );
}
