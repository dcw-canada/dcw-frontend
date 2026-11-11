import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero__content">
            <p className="hero__eyebrow">Delivery · Clearance · Warehousing</p>
            <h1>
              Your Canadian partner for courier and cargo handling, customs
              clearance coordination, warehousing, and final delivery.
            </h1>
            <p className="hero__copy">
              DCW Solutions Inc. specializes in international courier imports,
              supporting shipping partners and businesses from arrival through
              final delivery. We coordinate customs clearance through a
              brokerage partner, offer warehousing in Vancouver and Toronto, and
              deliver Canada-wide through our trusted delivery partners.
            </p>
            <div className="hero__actions">
              <a className="button" href="#contact">
                Request a quote
                <ArrowRight size={16} />
              </a>
              <a className="button button--outline" href="#services">
                Explore services
              </a>
            </div>
            <div className="hero__assurance">
              <ShieldCheck size={18} className="hero__assurance-icon" />
              <span>
                Competitive rates backed by dependable service, direct tracking, and responsive local Canadian support.
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="capability-strip" aria-label="DCW service capabilities">
        <div className="wrap capability-strip__grid">
          <div className="capability-strip__item">
            <strong>Courier &amp; Cargo Import</strong>
            <span>Handling &amp; clearance coordination</span>
          </div>
          <div className="capability-strip__item">
            <strong>Warehousing</strong>
            <span>Vancouver &amp; Toronto</span>
          </div>
          <div className="capability-strip__item">
            <strong>Last-Mile Delivery</strong>
            <span>Canada-wide via UPS</span>
          </div>
          <div className="capability-strip__item">
            <strong>India → Canada</strong>
            <span>Door-to-door courier (launching)</span>
          </div>
        </div>
      </div>
    </>
  );
}
