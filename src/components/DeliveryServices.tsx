const steps = [
  {
    title: "Arrival notice received",
    description:
      "We receive the arrival notice from the airline and arrange transfer in bond to a sufferance warehouse.",
  },
  {
    title: "Clearance coordinated",
    description:
      "Clearance is coordinated through our customs brokerage partner. Restricted goods are flagged to clients right away.",
  },
  {
    title: "Handled & sorted",
    description:
      "Shipments are counted, sorted and prepared for handover — with warehousing available in Vancouver and Toronto.",
  },
  {
    title: "Delivered",
    description:
      "Handed to our last-mile delivery partner (UPS) for Canada-wide delivery, with tracking shared.",
  },
];

export default function DeliveryServices() {
  return (
    <section id="process" className="section section--dark">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <h2>How a courier import moves with DCW</h2>
            <p>
              Each step is coordinated by the same team, with one operational
              point of contact.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <div className="process-step__number">{index + 1}</div>
              <div className="process-step__rule" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
