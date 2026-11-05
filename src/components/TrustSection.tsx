const audiences = [
  [
    "International courier companies",
    "A dependable Canadian partner to handle inbound courier and e-commerce shipments, coordinate clearance, and arrange final delivery.",
  ],
  [
    "Freight forwarders",
    "Canadian handling, clearance coordination and delivery support for your inbound shipments.",
  ],
  [
    "Local importers from India",
    "Import support for businesses shipping goods from India into Canada.",
  ],
  [
    "Canadian businesses & commercial importers",
    "Cargo handling, clearance coordination, warehousing and delivery for commercial imports.",
  ],
  [
    "E-commerce sellers & logistics providers",
    "Recurring shipment volume support for e-commerce and consolidated courier imports.",
  ],
  [
    "Individuals & families",
    "Door-to-door courier services from India to Canada, with pickup anywhere in India.",
  ],
];

const reasons = [
  [
    "One operational point of contact",
    "Shipment handling, customs clearance coordination, warehousing and final delivery are coordinated together — with clearer communication.",
  ],
  [
    "Experience with time-sensitive courier imports",
    "We understand courier import workflows and keep shipments moving efficiently through arrival, clearance and delivery.",
  ],
  [
    "Close brokerage & delivery partner relationships",
    "A close relationship with a customs brokerage and delivery partners such as UPS helps keep shipments moving.",
  ],
  [
    "Practical, responsive support",
    "Support tailored to each partner's shipment volumes and requirements, with competitive rates.",
  ],
];

const resources = [
  [
    "COURIER IMPORTS",
    "How courier imports move through Canada",
    "Arrival notice, bonded transfer, clearance coordination, sorting and last-mile handover.",
  ],
  [
    "CUSTOMS",
    "Customs clearance coordination explained",
    "What clearance coordination involves and what documentation is needed.",
  ],
  [
    "WAREHOUSING",
    "Warehousing in Vancouver and Toronto",
    "Bonded and non-bonded storage, labelling, repacking, sorting and palletizing.",
  ],
];

export default function TrustSection() {
  return (
    <>
      <section className="section section--paper">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>Who we work with</h2>
            </div>
          </div>
          <div className="industry-grid">
            {audiences.map(([title, description]) => (
              <article className="industry-item" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Why partners choose DCW</h2>
          <div className="reasons-grid">
            {reasons.map(([title, description]) => (
              <article className="reason" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap coverage-layout">
          <div>
            <h2>Where we work</h2>
            <p className="lead">
              Warehousing in Vancouver and Toronto, with Canada-wide delivery
              through our delivery partners. We also have partners in India,
              Pakistan and Sri Lanka.
            </p>
            <ul className="coverage-list">
              <li>
                <i aria-hidden="true" />
                <span>
                  <strong>Warehousing</strong> · Vancouver &amp; Toronto
                </span>
              </li>
              <li>
                <i aria-hidden="true" />
                <span>
                  <strong>Delivery</strong> · Canada-wide via UPS
                </span>
              </li>
              <li>
                <i aria-hidden="true" />
                <span>
                  <strong>International partners</strong> · India, Pakistan, Sri
                  Lanka
                </span>
              </li>
            </ul>
          </div>
          <div
            className="coverage-map"
            role="img"
            aria-label="Illustration showing DCW warehousing in Vancouver and Toronto with Canada-wide delivery"
          >
            <span className="coverage-map__label coverage-map__label--port">
              Vancouver &amp; Toronto · Warehousing
            </span>
            <span className="coverage-map__label coverage-map__label--warehouse">
              Canada-wide delivery
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>Guides for shipping partners</h2>
            </div>
            <a className="button button--outline" href="#contact">
              Ask a question
            </a>
          </div>
          <div className="resource-grid">
            {resources.map(([kind, title, description]) => (
              <a className="resource-card" href="#contact" key={title}>
                <span className="resource-card__kind">{kind}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <strong>
                  Ask our team <span aria-hidden="true">→</span>
                </strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
