const industries = [
  ['Retail & e-commerce', 'Import support for products moving into stores, fulfilment centres and customer orders.'],
  ['Apparel & footwear', 'Coordinate freight, customs clearance, storage and distribution for seasonal goods.'],
  ['Automotive & parts', 'Keep parts and components moving with clear shipment milestones and delivery planning.'],
  ['Food & consumer goods', 'Manage import documentation, receiving and onward delivery with one logistics contact.'],
  ['Manufacturing', 'Bring raw materials, equipment and components from port to your operation.'],
  ['Growing importers', 'Add logistics capacity as your business expands into Canada and new markets.'],
];

const reasons = [
  ['One team from port to door', 'Clearance, storage and delivery are coordinated together, so your goods are not handed between companies.'],
  ['Know the costs up front', 'We work to explain duties, taxes, brokerage and storage before your shipment moves.'],
  ['Local to Vancouver ports', 'A Lower Mainland team can coordinate shipments through the Port of Vancouver and YVR.'],
  ['A named point of contact', 'Work with a logistics specialist who understands your shipment and can help keep it moving.'],
];

const resources = [
  ['IMPORT BASICS', 'A practical guide to importing into Canada', 'Understand the documents and key steps involved in bringing goods into Canada.'],
  ['CUSTOMS', 'Duties, taxes and customs clearance', 'Learn what goes into a customs entry and how import costs are determined.'],
  ['WAREHOUSING', 'Choosing a storage and distribution plan', 'Explore storage, cross-docking and delivery options for your inventory.'],
];

export default function TrustSection() {
  return (
    <>
      <section className="section section--paper">
        <div className="wrap">
          <div className="section-heading">
            <div><h2>Who we work with</h2></div>
          </div>
          <div className="industry-grid">
            {industries.map(([title, description]) => (
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
          <h2>Why importers choose DCW</h2>
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
              Based in the Lower Mainland, coordinating imports through the Port of Vancouver
              and YVR, with delivery across British Columbia and Western Canada.
            </p>
            <ul className="coverage-list">
              <li><i aria-hidden="true" /><span><strong>DCW warehouse</strong> · Lower Mainland</span></li>
              <li><i aria-hidden="true" /><span><strong>Port and airport</strong> · Vancouver and YVR</span></li>
              <li><i aria-hidden="true" /><span><strong>Delivery lanes</strong> · Lower Mainland and Western Canada</span></li>
            </ul>
          </div>
          <div className="coverage-map" role="img" aria-label="Illustration showing DCW's warehouse near the Port of Vancouver and YVR">
            <span className="coverage-map__label coverage-map__label--port">Port of Vancouver · YVR</span>
            <span className="coverage-map__label coverage-map__label--warehouse">DCW warehouse</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-heading">
            <div><h2>Guides for importers</h2></div>
            <a className="button button--outline" href="#contact">Ask a question</a>
          </div>
          <div className="resource-grid">
            {resources.map(([kind, title, description]) => (
              <a className="resource-card" href="#contact" key={title}>
                <span className="resource-card__kind">{kind}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <strong>Ask our team <span aria-hidden="true">→</span></strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
