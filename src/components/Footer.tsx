import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h3>DCW Solutions Inc.</h3>
            <p>Delivery. Clearance. Warehousing. One team to help move your imports from port to door.</p>
            <a href="mailto:info@dcwsolution.ca">info@dcwsolution.ca</a>
          </div>
          <div>
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="#services">Customs clearance</a></li>
              <li><a href="#services">Warehousing</a></li>
              <li><a href="#services">Freight forwarding</a></li>
              <li><a href="#services">Transportation</a></li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#estimate">Landed-cost estimator</a></li>
              <li><a href="#process">How it works</a></li>
              <li><a href="#contact">Get a quote</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul className="footer-links">
              <li><a href="tel:+16729683390">(672) 968-3390</a></li>
              <li><a href="mailto:info@dcwsolution.ca">Email our team</a></li>
              <li><Link href="/admin">Admin panel</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} DCW Solutions Inc. All rights reserved.</span>
          <span>Delivery. Clearance. Warehousing.</span>
        </div>
      </div>
    </footer>
  );
}
