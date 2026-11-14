"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="utility-bar">
        <div className="wrap utility-bar__inner">
          <a href="#estimate">Estimate import costs</a>
          <a href="#contact">Talk to our team</a>
          <a href="tel:+16729683390">(672) 968-3390</a>
          <a href="mailto:info@dcwsolution.ca">info@dcwsolution.ca</a>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap site-header__inner">
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
            <a
              href="#services"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-4 py-2 rounded-lg"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-4 py-2 rounded-lg"
            >
              How it works
            </a>
            <Link
              href="/get-quote"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-4 py-2 rounded-lg"
            >
              Get Quote
            </Link>
            <Link
              href="/blog"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-4 py-2 rounded-lg"
            >
              Blog
            </Link>
            <a
              href="#contact"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] hover:text-[#f05a28] hover:bg-[#eef1f0] transition-all duration-200 px-4 py-2 rounded-lg"
            >
              Contact
            </a>
            <Link
              href="/book-shipment"
              onClick={closeMenu}
              className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl ml-2 font-bold shadow-sm hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-block text-center"
            >
              Book Shipment
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
