import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b2f3a] text-[#d5dcdb] pt-14 pb-8 border-t border-white/10 font-[Archivo] text-sm">
      <div className="wrap">
        {/* Main 3-Column Layout: Left (Brand & Socials) | Middle (Quick Links 3 Sub-cols) | Right (Office Info & Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* ============================================================== */}
          {/* COLUMN 1: Brand Info & Social Network (Span 3 on desktop)     */}
          {/* ============================================================== */}
          <div className="lg:col-span-3 space-y-4">
            {/* Logo */}
            <div>
              <Link
                href="/"
                className="inline-block bg-white/95 hover:bg-white px-4 py-2.5 rounded-xl border border-white/20 shadow-sm transition-all"
              >
                <Image
                  src="/images/dcw-logo-transparent.png"
                  alt="DCW Solutions Inc."
                  width={200}
                  height={68}
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-sm font-semibold text-[#ffd100] italic leading-snug">
              Connecting the world to Canada.
            </p>

            {/* Trust / Company Overview */}
            <p className="text-xs sm:text-sm text-[#a9c2c6] leading-relaxed">
              Your trusted Canadian freight and logistics partner for
              international courier imports, customs clearance coordination,
              secure warehousing in Vancouver &amp; Toronto, and seamless delivery
              nationwide.
            </p>

            {/* Social Network */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-widest text-white/80 mb-3">
                Social Network
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Facebook"
                >
                  <FacebookIcon size={24} />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="Instagram"
                >
                  <InstagramIcon size={24} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedInIcon size={24} />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/16729683390"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  title="WhatsApp"
                >
                  <WhatsAppIcon size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUMN 2: Quick Links (Span 6 on desktop, 3 sub-columns)       */}
          {/* ============================================================== */}
          <div className="lg:col-span-6">
            <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
              Quick Links
            </h3>
            {/* Divider spanning across all 3 sub-columns */}
            <div className="h-px bg-white/15 my-3" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
              {/* Sub-column A: NAVIGATION */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#ffd100] mb-3.5">
                  Navigation
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="hover:text-white transition-colors">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/track-shipment" className="hover:text-white transition-colors">
                      Track shipment
                    </Link>
                  </li>
                  <li>
                    <Link href="/get-quote" className="hover:text-white transition-colors">
                      Get quote
                    </Link>
                  </li>
                  <li>
                    <Link href="/book-a-call" className="hover:text-white transition-colors">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sub-column B: EXPLORE */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#ffd100] mb-3.5">
                  Explore
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/india-to-canada"
                      className="text-white font-bold hover:text-[#ffd100] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>India ➔ Canada</span>
                      <span className="text-[9px] font-black uppercase bg-[#f05a28] text-white px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/become-a-shipping-partner"
                      className="hover:text-white transition-colors"
                    >
                      Partner Network
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/india-to-canada#quote-estimator"
                      className="hover:text-white transition-colors"
                    >
                      Rate Estimator
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Courier Import Handling
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Customs Clearance
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Warehousing
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-white transition-colors">
                      Blog &amp; Guides
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sub-column C: LEGAL & POLICIES */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#ffd100] mb-3.5">
                  Legal &amp; Policies
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="hover:text-white transition-colors"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="hover:text-white transition-colors"
                    >
                      Refund &amp; Cancellation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="hover:text-white transition-colors"
                    >
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="hover:text-white transition-colors"
                    >
                      Mandatory Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Admin Portal
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUMN 3: Office Info & Google Map (Span 3 on desktop)        */}
          {/* ============================================================== */}
          <div className="lg:col-span-3">
            <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
              Office Info
            </h3>
            {/* Divider matching Quick Links */}
            <div className="h-px bg-white/15 my-3" />

            <div className="space-y-3.5 pt-1 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone size={15} className="text-[#ffd100] shrink-0 mt-0.5" />
                <a
                  href="tel:+16729683390"
                  className="hover:text-white font-medium transition-colors"
                >
                  (672) 968-3390
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail size={15} className="text-[#ffd100] shrink-0 mt-0.5" />
                <a
                  href="mailto:info@dcwsolution.ca"
                  className="hover:text-white transition-colors break-all"
                >
                  info@dcwsolution.ca
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#ffd100] shrink-0 mt-0.5" />
                <address className="not-italic text-xs text-[#a9c2c6] leading-relaxed">
                  115-6086 Russ Baker Way,<br />
                  Richmond BC V7B 1B4, Canada
                </address>
              </div>

              {/* Interactive Google Map Preview Card */}
              <div className="pt-2">
                <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-lg h-32 sm:h-36 bg-[#071f26] group">
                  <iframe
                    title="DCW Solutions Location Map"
                    src="https://maps.google.com/maps?q=115-6086%20Russ%20Baker%20Way%2C%20Richmond%2C%20BC%20V7B%201B4&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter contrast-[1.05] opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href="https://maps.google.com/?q=115-6086+Russ+Baker+Way,+Richmond+BC+V7B+1B4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 left-2 bg-white/95 hover:bg-white text-[#0b2f3a] text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 transition-all hover:scale-105"
                    title="Open in Google Maps"
                  >
                    <span>Maps</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM STRIP: Copyright & Legal Badges                        */}
        {/* ============================================================== */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a9c2c6]">
          <span>
            © {currentYear} DCW Solutions Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>·</span>
            <span className="text-[#ffd100] font-medium">
              Delivery · Clearance · Warehousing
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
