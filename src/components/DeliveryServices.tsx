const steps = [
  {
    title: 'Tell us about the shipment',
    description: 'Send the invoice and arrival details. We confirm costs before anything moves.',
  },
  {
    title: 'We clear it with CBSA',
    description: 'Entry filed before arrival, duties and GST accounted, release sent to you.',
  },
  {
    title: 'We store or cross-dock it',
    description: 'Received at our warehouse, counted, photographed and ready to ship.',
  },
  {
    title: 'We deliver it',
    description: 'To your site, your stores or your customers, with proof of delivery.',
  },
];

export default function DeliveryServices() {
  return (
    <section id="process" className="section section--dark">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <h2>How an import moves with DCW</h2>
            <p>Each step is handed to the next by the same team, so nothing waits in an inbox.</p>
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
