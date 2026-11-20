"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------- Small inline icons (no extra dependency) ---------- */
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "shrink-0 text-[#ffd100]",
  "aria-hidden": true,
};

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ChatIcon = () => (
  <svg {...iconProps}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l2-5.2a8.4 8.4 0 1 1 16-4.3z" />
  </svg>
);
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    aria-hidden
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* ---------- Link data ---------- */
type FooterLink = { label: string; href: string; highlight?: boolean };
type Section = { key: string; title: string; links: FooterLink[] };

const sections: Section[] = [
  {
    key: "services",
    title: "Services",
    links: [
      { label: "Courier import handling", href: "/#services" },
      { label: "Cargo import handling", href: "/#services" },
      { label: "Customs clearance coordination", href: "/#services" },
      { label: "Warehousing", href: "/#services" },
      { label: "Last-mile delivery", href: "/#services" },
      {
        label: "India → Canada door-to-door",
        href: "/india-to-canada",
        highlight: true,
      },
    ],
  },
  {
    key: "resources",
    title: "Resources",
    links: [
      { label: "Cost estimator", href: "/#estimate" },
      { label: "How it works", href: "/#process" },
      { label: "Request a quote", href: "/request-a-quote" },
      { label: "Track a shipment", href: "/track-shipment" },
      {
        label: "Become a shipping partner",
        href: "/become-a-shipping-partner",
      },
      { label: "India to Canada Guide", href: "/india-to-canada" },
      { label: "Blog & Guides", href: "/blog" },
    ],
  },
  {
    key: "info",
    title: "Information",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

const linkClass =
  "text-[#d5dcdb] hover:text-[#ffd100] transition-colors py-0.5";
const highlightClass =
  "text-[#ffd100] font-semibold hover:text-white transition-colors py-0.5";

export default function Footer() {
  // Accordion state for mobile view
  const [open, setOpen] = useState<Record<string, boolean>>({
    services: true,
    resources: false,
    info: false,
  });
  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Column 1: Brand */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-4">
            <div className="inline-block self-start bg-white px-4 py-2.5 rounded-xl border border-[#d5dcdb]/60 shadow-sm">
              <Image
                src="/images/dcw-logo-transparent.png"
                alt="DCW Solutions Inc."
                width={220}
                height={75}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white text-[14px] font-medium leading-relaxed max-w-sm">
              Your trusted logistics partner.
            </p>
            <p className="text-[#d5dcdb] text-[13px] leading-relaxed max-w-sm">
              Connecting the world to Canada, from courier and cargo imports to
              customs clearance, warehousing and last-mile delivery.
            </p>
          </div>

          {/* Column 2: Link groups */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-4">
            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-3">
              {sections.map((s) => (
                <div key={s.key} className="flex flex-col gap-2.5">
                  <h3 className="text-[15px] font-extrabold text-white pb-2 border-b border-[#d5dcdb]/25">
                    {s.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5 text-[14px]">
                    {s.links.map((l) => (
                      <li key={s.key + l.label}>
                        <Link
                          href={l.href}
                          className={l.highlight ? highlightClass : linkClass}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile accordion (< md) */}
            <div className="flex md:hidden flex-col gap-3">
              {sections.map((s) => (
                <div
                  key={s.key}
                  className="border border-[#d5dcdb]/25 rounded-xl bg-white/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(s.key)}
                    aria-expanded={!!open[s.key]}
                    className="w-full px-4 py-3 flex items-center justify-between font-extrabold text-[15px] text-white text-left focus:outline-none"
                  >
                    <span>{s.title}</span>
                    <ChevronDown open={!!open[s.key]} />
                  </button>
                  {open[s.key] && (
                    <ul className="px-4 pb-4 pt-2 border-t border-[#d5dcdb]/15 flex flex-col gap-1 text-[13.5px]">
                      {s.links.map((l) => (
                        <li key={s.key + l.label}>
                          <Link
                            href={l.href}
                            className={`block py-1.5 ${
                              l.highlight
                                ? "text-[#ffd100] font-semibold"
                                : "text-[#d5dcdb] hover:text-[#ffd100] transition-colors"
                            }`}
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-5 lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-[15px] font-extrabold text-white pb-2 border-b border-[#d5dcdb]/25">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5">
                  <PinIcon />
                </span>
                <address className="not-italic text-[13.5px] text-[#d5dcdb] leading-relaxed">
                  115-6086 Russ Baker Way,
                  <br />
                  Richmond BC V7B 1B4
                </address>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon />
                <a href="tel:+16729683390" className={linkClass}>
                  (672) 968-3390
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon />
                <a
                  href="mailto:info@dcwsolution.ca"
                  className={`${linkClass} break-all sm:break-normal`}
                >
                  info@dcwsolution.ca
                </a>
              </div>
              <div className="flex items-center gap-3">
                <ChatIcon />
                <a
                  href="https://wa.me/16729683390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <Link
              href="/book-a-call"
              className="self-start mt-1 inline-flex items-center justify-center rounded-full bg-[#ffd100] px-5 py-2.5 text-[13.5px] font-bold text-[#1a1a1a] hover:bg-white transition-colors"
            >
              Book a call
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[#d5dcdb]/25 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[12.5px] sm:text-[13px] text-[#d5dcdb] text-center">
          <span>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">DCW Solutions Inc.</span>{" "}
            All rights reserved.
          </span>
          <span className="hidden sm:inline text-[#d5dcdb]/40">•</span>
          <span>Delivery. Clearance. Warehousing.</span>
          <span className="hidden sm:inline text-[#d5dcdb]/40">•</span>
          <Link
            href="/admin"
            className="hover:text-[#ffd100] transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
