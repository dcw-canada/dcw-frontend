import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="mb-4">
              <div className="inline-block bg-white px-4 py-2.5 rounded-xl border border-[#d5dcdb]/60 shadow-sm">
                <Image
                  src="/images/dcw-logo-transparent.png"
                  alt="DCW Solutions Inc."
                  width={220}
                  height={75}
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>
            <p>
              Your trusted logistics partner. Connecting the world to Canada.
            </p>
            <a href="mailto:info@dcwsolution.ca">info@dcwsolution.ca</a>
          </div>

          {/* Services */}
          <div>
            <h3>Services</h3>
            <ul className="footer-links">
              <li>
                <a href="#services">Courier import handling</a>
              </li>
              <li>
                <a href="#services">Cargo import handling</a>
              </li>
              <li>
                <a href="#services">Customs clearance coordination</a>
              </li>
              <li>
                <a href="#services">Warehousing</a>
              </li>
              <li>
                <a href="#services">Last-mile delivery</a>
              </li>
              <li>
                <a href="#services">India → Canada door-to-door</a>
              </li>
            </ul>
          </div>

          {/* Quick Resources / Tools */}
          <div>
            <h3>Resources</h3>
            <ul className="footer-links">
              <li>
                <a href="#estimate">Cost estimator</a>
              </li>
              <li>
                <a href="#process">How it works</a>
              </li>
              <li>
                <Link href="/request-a-quote">Request a quote</Link>
              </li>
              <li>
                <Link href="/track-shipment">Track a shipment</Link>
              </li>
              <li>
                <Link href="/become-a-shipping-partner">Become a shipping partner</Link>
              </li>
              <li>
                <Link href="/blog">Blog &amp; Guides</Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h3>Information</h3>
            <ul className="footer-links">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3>Contact</h3>
            <ul className="footer-links">
              <li>
                <a href="tel:+16729683390">(672) 968-3390</a>
              </li>
              <li>
                <a href="mailto:info@dcwsolution.ca">Email our team</a>
              </li>
              <li>
                <a href="https://wa.me/16729683390">WhatsApp</a>
              </li>
              <li>
                <Link href="/book-a-call">Book a call</Link>
              </li>
              <li>
                <Link href="/admin">Admin panel</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} DCW Solutions Inc. All rights reserved.
          </span>
          <div className="footer-legal-links" style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/about-us" style={{ color: "inherit", textDecoration: "underline" }}>
              About Us
            </Link>
            <span>·</span>
            <Link href="/faq" style={{ color: "inherit", textDecoration: "underline" }}>
              FAQ
            </Link>
            <span>·</span>
            <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "underline" }}>
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms-and-conditions" style={{ color: "inherit", textDecoration: "underline" }}>
              Terms &amp; Conditions
            </Link>
            <span>·</span>
            <span>Delivery. Clearance. Warehousing.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
