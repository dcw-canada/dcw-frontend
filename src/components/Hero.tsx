import Link from "next/link";
import { ArrowRight, ShieldCheck, Plane } from "lucide-react";

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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <p className="text-[#ffd100] text-xs sm:text-sm font-black tracking-widest uppercase reveal">
                Delivery · Clearance · Warehousing
              </p>
              <Link
                href="/india-to-canada"
                className="inline-flex items-center gap-1.5 bg-[#f05a28]/25 hover:bg-[#f05a28]/35 border border-[#f05a28]/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm transition-all hover:scale-105"
              >
                <span>🇮🇳➔🇨🇦 India to Canada Shipping</span>
                <span className="text-[#ffd100]">Explore →</span>
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-[1.15] mb-5 drop-shadow-sm reveal delay-100">
              Your Trusted Canadian <br /> Logistics Partner
            </h1>

            <p className="text-[#d5dcdb] text-base sm:text-lg tracking-wide leading-loose mt-8 mb-8 max-w-3xl reveal delay-200">
              DCW Solutions Inc. specializes in international courier imports,
              supporting shipping partners and businesses from arrival through
              final delivery. We coordinate customs clearance through a
              brokerage partner, offer warehousing in Vancouver and Toronto, and
              deliver Canada-wide through our trusted delivery partners.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10 mb-7 reveal delay-300">
              <Link
                className="group inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
                href="/india-to-canada"
              >
                <span>India ➔ Canada Shipping</span>
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md"
                href="#contact"
              >
                <span>Request a quote</span>
              </a>
              <a
                className="inline-flex items-center text-white/80 hover:text-white px-4 py-3.5 text-sm sm:text-base font-semibold hover:underline"
                href="#services"
              >
                Explore services
              </a>
            </div>

            <div className="inline-flex mt-10 items-center gap-2.5 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-white text-xs sm:text-sm transition-all duration-300 hover:bg-black/45 reveal delay-400">
              <ShieldCheck size={18} className="text-[#ffd100] shrink-0" />
              <span className="text-[#eef1f0]">
                Competitive rates backed by dependable service, direct tracking,
                and responsive Canadian support.
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="capability-strip reveal" aria-label="DCW service capabilities">
        <div className="wrap capability-strip__grid">
          <div className="capability-strip__item reveal delay-100">
            <strong>Courier &amp; Cargo Import</strong>
            <span>Handling &amp; clearance coordination</span>
          </div>
          <div className="capability-strip__item reveal delay-200">
            <strong>Warehousing</strong>
            <span>Vancouver &amp; Toronto</span>
          </div>
          <div className="capability-strip__item reveal delay-300">
            <strong>Last-Mile Delivery</strong>
            <span>Canada-wide via UPS</span>
          </div>
          <Link href="/india-to-canada" className="capability-strip__item reveal delay-400 group cursor-pointer hover:bg-black/5 transition rounded-lg">
            <strong className="group-hover:text-[#f05a28] transition-colors flex items-center gap-1">
              India → Canada <span className="text-xs">➔</span>
            </strong>
            <span>Door-to-door courier &amp; cargo</span>
          </Link>
        </div>
      </div>
    </>
  );
}
