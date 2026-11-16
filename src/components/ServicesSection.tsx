import Link from "next/link";
import {
  Calculator,
  PackageSearch,
  Handshake,
  PhoneCall,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    name: "Courier Import Handling",
    description:
      "End-to-end handling for international courier imports — from airline arrival and bonded transfer to clearance coordination and sorting for last-mile handover.",
    tags: ["India & Pakistan origins", "API data feeds", "No volume maximum"],
  },
  {
    name: "Cargo Import Handling",
    description:
      "Commercial cargo imports cleared and moved onward through YYZ and YVR, with deconsolidation and sorting for onward distribution.",
    tags: ["YYZ & YVR", "Deconsolidation", "No min or max"],
  },
  {
    name: "Customs Clearance Coordination",
    description:
      "Clearance coordinated through our customs brokerage partner for courier shipments, commercial cargo and e-commerce orders — typically 24–48 hours, subject to customs.",
    tags: ["Courier & cargo", "E-commerce", "Restricted goods advice"],
  },
  {
    name: "Warehousing (Vancouver & Toronto)",
    description:
      "Bonded (third-party) and non-bonded storage with labelling, repacking, sorting and palletizing. First 3 days free, then storage charges apply.",
    tags: ["Bonded storage", "Pick & pack", "Vancouver & Toronto"],
  },
  {
    name: "Last-Mile Delivery",
    description:
      "Canada-wide last-mile delivery through UPS, with tracking numbers shared. Lower rates and customized solutions compared to booking direct.",
    tags: ["UPS partner", "Canada-wide", "1–5 business days"],
  },
  {
    name: "India → Canada Door-to-Door",
    description:
      "Door-to-door courier with pickup anywhere in India and delivery anywhere in Canada, subject to service availability and terms. Launching soon.",
    tags: ["Pickup in India", "Delivery in Canada", "Competitive rates"],
  },
];

export default function ServicesSection() {
  return (
    <>
      <section className="section--tight">
        <div className="wrap">
          <div className="quick-actions" aria-label="Quick actions">
            <Link className="quick-action group" href="/request-a-quote">
              <div className="flex items-center justify-between">
                <div className="quick-action__icon">
                  <Calculator size={24} aria-hidden="true" />
                </div>
                <div className="quick-action__arrow">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </div>
              <div className="quick-action__content">
                <strong>Request a quote</strong>
                <span>Pricing tailored to your shipment</span>
              </div>
            </Link>

            <Link className="quick-action group" href="/track-shipment">
              <div className="flex items-center justify-between">
                <div className="quick-action__icon">
                  <PackageSearch size={24} aria-hidden="true" />
                </div>
                <div className="quick-action__arrow">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </div>
              <div className="quick-action__content">
                <strong>Track a shipment</strong>
                <span>Ask our team for an update</span>
              </div>
            </Link>

            <Link className="quick-action group" href="/become-a-shipping-partner">
              <div className="flex items-center justify-between">
                <div className="quick-action__icon">
                  <Handshake size={24} aria-hidden="true" />
                </div>
                <div className="quick-action__arrow">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </div>
              <div className="quick-action__content">
                <strong>Become a shipping partner</strong>
                <span>For international courier companies</span>
              </div>
            </Link>

            <Link className="quick-action group" href="/book-a-call">
              <div className="flex items-center justify-between">
                <div className="quick-action__icon">
                  <PhoneCall size={24} aria-hidden="true" />
                </div>
                <div className="quick-action__arrow">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </div>
              <div className="quick-action__content">
                <strong>Book a call</strong>
                <span>Talk to our operations team</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>What we do</h2>
              <p>
                Use one service, or let us coordinate the whole import from
                arrival to delivery.
              </p>
            </div>
            <a className="button button--outline" href="#contact">
              Talk to our team
            </a>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <a className="service-row group" href="#contact" key={service.name}>
                <h3>{service.name}</h3>
                <div>
                  <p>{service.description}</p>
                  <div className="service-row__tags">
                    {service.tags.map((tag) => (
                      <span className="service-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="service-row__link inline-flex items-center gap-1 group-hover:text-[#f05a28] transition-colors">
                  Ask about this service <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
