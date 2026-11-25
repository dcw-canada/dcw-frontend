"use client";

import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Plane,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WA_I2C =
  "https://wa.me/16729683390?text=" +
  encodeURIComponent("Hi DCW, I'd like help shipping from India to Canada.");

export default function IndiaCanadaSection() {
  return (
    <section id="india-to-canada" className="section section--paper relative overflow-hidden">
      <div className="wrap space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f05a28]/10 text-[#c2410c] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#f05a28]/20">
              <span className="w-2 h-2 rounded-full bg-[#f05a28]" />
              <span>New route, launching soon</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b2f3a] tracking-tight leading-tight">
              Ship from India to Canada with confidence
            </h2>

            <p className="text-[#51626a] text-base sm:text-lg leading-relaxed">
              Reliable door-to-door shipping for families, businesses and online
              sellers, with one DCW contact from pickup to delivery.
            </p>

            <ul className="space-y-4 pt-1">
              <li className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong className="block text-sm sm:text-base font-bold text-[#0b2f3a]">
                    Pickup anywhere in India
                  </strong>
                  <span className="text-xs sm:text-sm text-[#51626a]">
                    Tell us your city and PIN code and we confirm the pickup.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong className="block text-sm sm:text-base font-bold text-[#0b2f3a]">
                    Customs clearance coordinated
                  </strong>
                  <span className="text-xs sm:text-sm text-[#51626a]">
                    Handled through our partner customs brokerage when your
                    shipment lands.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center shrink-0 mt-0.5">
                  <Truck size={20} />
                </div>
                <div>
                  <strong className="block text-sm sm:text-base font-bold text-[#0b2f3a]">
                    Delivery anywhere in Canada
                  </strong>
                  <span className="text-xs sm:text-sm text-[#51626a]">
                    Through our delivery partners, including UPS, with a tracking
                    number.
                  </span>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/india-to-canada"
                className="inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore India-to-Canada shipping</span>
                <ArrowRight size={18} />
              </Link>

              {/* Requirement: For India-to-Canada shipment quotations, use "Contact Us" as the only CTA */}
              <Link
                href="/india-to-canada#i2c-form"
                className="inline-flex items-center gap-2 bg-white hover:bg-[#eef1f0] text-[#0b2f3a] border border-[#d5dcdb] px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Contact Us for Quote</span>
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-[#51626a] pt-1">
              Questions first?{" "}
              <a
                href={WA_I2C}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1f8a5b] hover:underline inline-flex items-center gap-1"
              >
                <WhatsAppIcon size={16} /> Get shipping assistance on WhatsApp
              </a>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#0b2f3a] text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <Plane className="text-[#ffd100]" size={20} />
                  <span className="font-bold text-sm text-white">
                    India ➔ Canada Gateways
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ffd100] bg-white/10 px-2.5 py-1 rounded">
                  Schematic
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#d5dcdb]">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block font-bold">
                    Pickup Anywhere in India
                  </strong>
                  <span>
                    Delhi NCR, Mumbai, Punjab (Amritsar, Ludhiana, Jalandhar),
                    Chandigarh, Ahmedabad, Bengaluru, Chennai, Kolkata, Kochi.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block font-bold">
                    Arrival Gateways
                  </strong>
                  <span>Vancouver (YVR) and Toronto (YYZ)</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block font-bold">
                    Delivery Anywhere in Canada
                  </strong>
                  <span>
                    Toronto, Brampton, Mississauga, Vancouver, Surrey, Calgary,
                    Edmonton, Winnipeg, Montreal, Ottawa, Halifax &amp; all
                    regions through partners including UPS.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
