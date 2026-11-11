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
          <Link
            className="site-brand"
            href="/"
            aria-label="DCW Solutions home"
            onClick={closeMenu}
          >
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
            aria-controls="primary-navigation"
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
            <a href="#estimate" onClick={closeMenu}>
              Cost estimator
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>

          </nav>
        </div>
      </header>
    </>
  );
}
