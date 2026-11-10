import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
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
                <a href="#contact">Request a quote</a>
              </li>
              <li>
                <a href="#contact">Become a shipping partner</a>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </div>
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
                <Link href="/admin">Admin panel</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} DCW Solutions Inc. All rights reserved.
          </span>
          <div className="footer-legal-links" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "underline" }}>
              Privacy Policy
            </Link>
            <span>·</span>
            <span>Delivery. Clearance. Warehousing.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
