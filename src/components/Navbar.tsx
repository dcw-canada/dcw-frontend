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
            className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
          >
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
            <a href="#process" onClick={closeMenu}>
              How it works
            </a>
            <Link
              href="/get-quote"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] px-4 py-2 rounded-lg"
            >
              Get Quote
            </Link>
            <Link
              href="/blog"
              onClick={closeMenu}
              className="font-bold text-[#0b2f3a] px-4 py-2 rounded-lg"
            >
              Blog
            </Link>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
            <Link
              href="/book-shipment"
              onClick={closeMenu}
              className="bg-[#f05a28] text-white px-5 py-2.5 rounded-xl ml-2 font-bold shadow-sm"
            >
              Book Shipment
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
