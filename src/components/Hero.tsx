import { Check } from "lucide-react";

const shipmentStages = [
  {
    title: "Arrived, Canada",
    detail: "Arrival notice received from airline",
    time: "Mon 07:40",
  },
  {
    title: "Customs clearance coordinated",
    detail: "Clearance arranged through brokerage partner",
    time: "Mon 11:15",
  },
  {
    title: "Received at DCW facility",
    detail: "Shipment counted, sorted and ready",
    time: "Tue 09:30",
  },
  {
    title: "Out for last-mile delivery",
    detail: "Handed to UPS for final delivery",
    time: "Wed 08:00",
  },
];

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__layout">
          <div>
            <p className="hero__eyebrow">Delivery. Clearance. Warehousing.</p>
            <h1>
              Your Canadian partner for courier and cargo handling, customs
              clearance coordination, warehousing, and final delivery.
            </h1>
            <p className="hero__copy">
              DCW Solutions Inc. specializes in international courier imports,
              supporting shipping partners and businesses from arrival through
              final delivery. We coordinate customs clearance through a
              brokerage partner, offer warehousing in Vancouver and Toronto, and
              deliver Canada-wide through our delivery partners.
            </p>
            <div className="hero__actions">
              <a className="button" href="#contact">
                Request a quote
              </a>
              <a className="button button--outline" href="#services">
                Explore services
              </a>
            </div>
            <p className="hero__assurance">
              Competitive rates backed by dependable service and responsive
              support.
            </p>
          </div>

          <div
            className="shipment-card"
            aria-label="Example shipment moving through DCW"
          >
            <div className="shipment-card__top">
              <div className="shipment-card__number">
                DCW 482193 7
                <small>Courier import · India to Canada · example</small>
              </div>
              <span className="status-pill">Clearance coordinated</span>
            </div>
            <ol className="shipment-stages">
              {shipmentStages.map((stage) => (
                <li key={stage.title}>
                  <span className="stage-dot" aria-hidden="true">
                    <Check />
                  </span>
                  <div className="stage-detail">
                    <strong>{stage.title}</strong>
                    <span>{stage.detail}</span>
                  </div>
                  <time>{stage.time}</time>
                </li>
              ))}
            </ol>
            <div className="shipment-card__foot">
              <span>Single point of contact</span>
              <strong>Arrival to delivery · coordinated</strong>
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
