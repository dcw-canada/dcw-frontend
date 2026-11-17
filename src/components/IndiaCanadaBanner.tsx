"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Plane,
  Truck,
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
} from "lucide-react";

interface IndiaCanadaBannerProps {
  showPageLink?: boolean;
}

export default function IndiaCanadaBanner({
  showPageLink = true,
}: IndiaCanadaBannerProps) {
  return (
    <section className="wrap my-8 sm:my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2f3a] via-[#14434f] to-[#071f26] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#f05a28]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#ffd100]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#ffd100] bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                <Sparkles size={14} className="text-[#ffd100]" />
                India → Canada Route
              </span>
              <span className="text-xs font-bold text-white/80 bg-[#f05a28]/20 text-[#ff8357] border border-[#f05a28]/40 px-3 py-1 rounded-full">
                🇮🇳 India ➔ 🇨🇦 Canada
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Shipping from India to Canada?{" "}
              <span className="text-[#ffd100]">We&apos;ve got you covered.</span>
            </h2>

            <p className="text-[#d5dcdb] text-base sm:text-lg leading-relaxed max-w-2xl">
              Door-to-door: pickup anywhere in India, customs clearance
              coordinated, delivery anywhere in Canada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <CheckCircle2 size={18} className="text-[#ffd100] shrink-0" />
                <span>Pickup anywhere in India</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <CheckCircle2 size={18} className="text-[#ffd100] shrink-0" />
                <span>Customs clearance coordinated</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <CheckCircle2 size={18} className="text-[#ffd100] shrink-0" />
                <span>Vancouver (YVR) &amp; Toronto (YYZ) entry</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/90">
                <CheckCircle2 size={18} className="text-[#ffd100] shrink-0" />
                <span>Delivery anywhere in Canada via UPS</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {showPageLink && (
                <Link
                  href="/india-to-canada"
                  className="group inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore India-to-Canada shipping</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              )}

              {/* Requirement: For India-to-Canada shipment quotations, use "Contact Us" as the only CTA */}
              <Link
                href="/india-to-canada#i2c-form"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Contact Us for Quote</span>
              </Link>

              <a
                href="tel:+16729683390"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm font-semibold px-3 py-2 transition-colors"
              >
                <PhoneCall size={15} className="text-[#ffd100]" />
                <span>(672) 968-3390</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-7 space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Plane className="text-[#ffd100]" size={20} />
                  <span className="font-bold text-sm text-white">
                    India ➔ Canada Corridor
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffd100] bg-black/30 px-2.5 py-1 rounded-md">
                  Active Service
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#f05a28]/20 flex items-center justify-center text-[#ff8357] shrink-0 font-black text-xs">
                    IN
                  </div>
                  <div>
                    <strong className="block text-white font-bold">
                      Pickup in India
                    </strong>
                    <span className="text-white/70">
                      Delhi NCR, Mumbai, Punjab (Amritsar, Ludhiana, Jalandhar),
                      Chandigarh, Ahmedabad, Bengaluru, Chennai, Kolkata, Kochi.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#ffd100]/20 flex items-center justify-center text-[#ffd100] shrink-0 font-black text-xs">
                    CA
                  </div>
                  <div>
                    <strong className="block text-white font-bold">
                      Customs Clearance &amp; Arrival
                    </strong>
                    <span className="text-white/70">
                      Arrival through Vancouver (YVR) and Toronto (YYZ). Coordinated
                      through partner customs brokerage.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#1f8a5b]/20 flex items-center justify-center text-[#34d399] shrink-0 font-black text-xs">
                    UPS
                  </div>
                  <div>
                    <strong className="block text-white font-bold">
                      Delivery Anywhere in Canada
                    </strong>
                    <span className="text-white/70">
                      Delivered through partners including UPS, with a tracking
                      number.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#ffd100]" />
                  <span>Door-to-door transit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#34d399]" />
                  <span>One DCW team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
