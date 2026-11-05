import { CalendarDays, FileUp, MapPin, WalletCards } from 'lucide-react';

const services = [
  {
    name: 'Customs Clearance',
    description:
      'We prepare your entry, classify your goods, account for duties and taxes, and get your shipment released by CBSA without surprises.',
    tags: ['Commercial entries', 'CARM support', 'Duties and taxes'],
  },
  {
    name: 'Warehousing',
    description:
      'Secure storage close to the port and airport, with receiving, pick and pack, cross-docking and inventory support.',
    tags: ['Pallet storage', 'Pick and pack', 'Cross-docking'],
  },
  {
    name: 'Freight Forwarding',
    description:
      'Ocean and air freight from anywhere in the world to Vancouver, booked, documented and tracked by one team.',
    tags: ['Ocean FCL and LCL', 'Air freight', 'Consolidation'],
  },
  {
    name: 'Transportation & Distribution',
    description:
      'Container drayage, LTL and full truckload across BC and Western Canada, and last-mile delivery to your customers.',
    tags: ['Port drayage', 'LTL and FTL', 'Last mile'],
  },
  {
    name: 'Supply Chain Solutions',
    description:
      'We plan the route, coordinate suppliers, clear, store and deliver—so your import keeps moving from factory to customer.',
    tags: ['Import planning', 'Landed-cost modelling', 'Vendor coordination'],
  },
];

export default function ServicesSection() {
  return (
    <>
      <section className="section--tight">
        <div className="wrap">
          <div className="quick-actions" aria-label="Quick actions">
            <a className="quick-action" href="#contact">
              <WalletCards aria-hidden="true" />
              <strong>Ask about duty payments</strong>
              <span>Get help with a DCW shipment</span>
            </a>
            <a className="quick-action" href="#contact">
              <MapPin aria-hidden="true" />
              <strong>Request a tracking update</strong>
              <span>Ask our team where your goods are</span>
            </a>
            <a className="quick-action" href="#contact">
              <FileUp aria-hidden="true" />
              <strong>Ask about sending documents</strong>
              <span>Invoices, bills of lading, permits</span>
            </a>
            <a className="quick-action" href="#contact">
              <CalendarDays aria-hidden="true" />
              <strong>Book a call</strong>
              <span>Talk to a logistics specialist</span>
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>What we do</h2>
              <p>Use one service, or let us run the whole import from port to door.</p>
            </div>
            <a className="button button--outline" href="#contact">Talk to our team</a>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <a className="service-row" href="#contact" key={service.name}>
                <h3>{service.name}</h3>
                <div>
                  <p>{service.description}</p>
                  <div className="service-row__tags">
                    {service.tags.map((tag) => <span className="service-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <span className="service-row__link">Ask about this service <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
