import {
  Globe2,
  Ship,
  Store,
  Building2,
  ShoppingBag,
  Users2,
  LucideIcon,
} from "lucide-react";

interface AudienceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const audiences: AudienceItem[] = [
  {
    title: "International courier companies",
    description:
      "A dependable Canadian partner to handle inbound courier and e-commerce shipments, coordinate clearance, and arrange final delivery.",
    icon: Globe2,
  },
  {
    title: "Freight forwarders",
    description:
      "Canadian handling, clearance coordination and delivery support for your inbound shipments.",
    icon: Ship,
  },
  {
    title: "Local importers from India",
    description:
      "Import support for businesses shipping goods from India into Canada.",
    icon: Store,
  },
  {
    title: "Canadian businesses & commercial importers",
    description:
      "Cargo handling, clearance coordination, warehousing and delivery for commercial imports.",
    icon: Building2,
  },
  {
    title: "E-commerce sellers & logistics providers",
    description:
      "Recurring shipment volume support for e-commerce and consolidated courier imports.",
    icon: ShoppingBag,
  },
  {
    title: "Individuals & families",
    description:
      "Door-to-door courier services from India to Canada, with pickup anywhere in India.",
    icon: Users2,
  },
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
              <p>Specialized logistics solutions adapted to your shipment type and volume.</p>
            </div>
          </div>
          <div className="industry-grid">
            {audiences.map(({ title, description, icon: Icon }) => (
              <article className="industry-item group" key={title}>
                <div className="w-12 h-12 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#f05a28] group-hover:text-white group-hover:scale-110">
                  <Icon size={24} />
                </div>
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
              <a className="resource-card group" href="#contact" key={title}>
                <span className="resource-card__kind">{kind}</span>
                <h3 className="group-hover:text-[#f05a28] transition-colors duration-200">{title}</h3>
                <p>{description}</p>
                <strong className="inline-flex items-center gap-1 group-hover:text-[#f05a28] transition-colors duration-200">
                  Ask our team <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
