"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Calculator,
  FileText,
  Search,
  Handshake,
  PhoneCall,
  Info,
  HelpCircle,
  Truck,
  Layers,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="wrap utility-bar__inner">
          <Link href="/get-quote">Get instant quote</Link>
          <Link href="/track-shipment">Track shipment</Link>
          <Link href="/book-a-call">Talk to our team</Link>
          <a href="tel:+16729683390">(672) 968-3390</a>
          <a href="mailto:info@dcwsolution.ca">info@dcwsolution.ca</a>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap site-header__inner" ref={dropdownRef}>
          <Link className="site-brand" href="/" onClick={closeMenu}>
            <Image
              src="/images/dcw-logo-transparent.png"
              alt="DCW Solutions Inc."
              width={165}
              height={56}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <nav
            id="primary-navigation"
            className={`site-nav transition-all duration-300 ease-in-out${
              menuOpen ? " site-nav--open opacity-100 translate-y-0" : ""
            }`}
          >
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleDropdown("services")}
                onMouseEnter={() => setActiveDropdown("services")}
                className="flex items-center gap-1.5 font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-3.5 py-2 rounded-lg w-full text-left cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180 text-[#f05a28]" : "text-[#51626a]"
                  }`}
                />
              </button>

              {activeDropdown === "services" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="dropdown-menu-popover lg:absolute lg:top-full lg:left-0 lg:mt-1 lg:w-72 bg-white rounded-xl shadow-xl lg:border lg:border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <Link
                    href="/#services"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <Truck size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        All Services
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Clearance, warehousing &amp; domestic dispatch
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/#process"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <Layers size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        How It Works
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Step-by-step import pipeline
                      </div>
                    </div>
                  </Link>

                  <div className="my-1 border-t border-gray-100"></div>

                  <Link
                    href="/become-a-shipping-partner"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <Handshake size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        Become a Partner
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        B2B courier agency &amp; linehaul agreements
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Shipping Tools Dropdown */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleDropdown("tools")}
                onMouseEnter={() => setActiveDropdown("tools")}
                className="flex items-center gap-1.5 font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-3.5 py-2 rounded-lg w-full text-left cursor-pointer"
              >
                <span>Shipping Tools</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "tools" ? "rotate-180 text-[#f05a28]" : "text-[#51626a]"
                  }`}
                />
              </button>

              {activeDropdown === "tools" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="dropdown-menu-popover lg:absolute lg:top-full lg:left-0 lg:mt-1 lg:w-72 bg-white rounded-xl shadow-xl lg:border lg:border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <Link
                    href="/get-quote"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <Calculator size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        Instant Quote Calculator
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Quick rate check by state &amp; weight
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/request-a-quote"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <FileText size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        Custom Freight Quote
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Commercial cargo &amp; bulk bag shipments
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/track-shipment"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <Search size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        Track Shipment
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Real-time AWB &amp; clearance milestone lookup
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleDropdown("company")}
                onMouseEnter={() => setActiveDropdown("company")}
                className="flex items-center gap-1.5 font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-3.5 py-2 rounded-lg w-full text-left cursor-pointer"
              >
                <span>Company</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "company" ? "rotate-180 text-[#f05a28]" : "text-[#51626a]"
                  }`}
                />
              </button>

              {activeDropdown === "company" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="dropdown-menu-popover lg:absolute lg:top-full lg:left-0 lg:mt-1 lg:w-72 bg-white rounded-xl shadow-xl lg:border lg:border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <Link
                    href="/about-us"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <Info size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        About Us
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Our Canadian facilities &amp; core mission
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/faq"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <HelpCircle size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        FAQ
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Answers to customs &amp; delivery questions
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/book-a-call"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <PhoneCall size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        Book a Call
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Schedule a consultation with operations
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/#contact"
                    onClick={closeMenu}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#eef1f0] transition-colors group/item"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-[#0b2f3a]/5 text-[#0b2f3a] group-hover/item:bg-[#f05a28]/10 group-hover/item:text-[#f05a28] transition-colors">
                      <ArrowRight size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0b2f3a] group-hover/item:text-[#f05a28]">
                        Contact Us
                      </div>
                      <div className="text-xs text-[#51626a] leading-tight mt-0.5">
                        Direct dispatch office contacts
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Blog Link */}
            <Link
              href="/blog"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-3.5 py-2 rounded-lg flex items-center gap-1.5"
            >
              <BookOpen size={16} className="text-[#51626a] hidden sm:inline" />
              <span>Blog</span>
            </Link>

            {/* Primary CTA Button */}
            <Link
              href="/book-shipment"
              onClick={closeMenu}
              className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl lg:ml-2 font-bold shadow-sm hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-block text-center whitespace-nowrap"
            >
              Book Shipment
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
