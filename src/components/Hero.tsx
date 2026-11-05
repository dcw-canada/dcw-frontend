import { Check } from 'lucide-react';

const shipmentStages = [
  {
    title: 'Arrived, Port of Vancouver',
    detail: 'Entry filed before arrival',
    time: 'Mon 07:40',
  },
  {
    title: 'Released by CBSA',
    detail: 'Duties and GST accounted',
    time: 'Mon 11:15',
  },
  {
    title: 'Received at DCW warehouse',
    detail: '22 pallets counted and photographed',
    time: 'Tue 09:30',
  },
  {
    title: 'Out for delivery',
    detail: '6 pallets to Surrey, 16 stored',
    time: 'Wed 08:00',
  },
];

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__layout">
          <div>
            <p className="hero__eyebrow">Delivery. Clearance. Warehousing. All under one roof.</p>
            <h1>Customs clearance, storage and delivery in Vancouver, handled by one team.</h1>
            <p className="hero__copy">
              We clear your imports through the Port of Vancouver and YVR, store them in our
              warehouse, and deliver them to you or your customers. One contact, one invoice,
              and a cost you know before you ship.
            </p>
            <div className="hero__actions">
              <a className="button" href="#contact">Get a quote</a>
              <a className="button button--outline" href="#estimate">Estimate my landed cost</a>
            </div>
            <p className="hero__assurance">Get a clear written quote before your goods move.</p>
          </div>

          <div className="shipment-card" aria-label="Example shipment moving through DCW">
            <div className="shipment-card__top">
              <div className="shipment-card__number">
                DCWU 482193 7
                <small>40&apos; container · Ningbo to Vancouver · example</small>
              </div>
              <span className="status-pill">Released by CBSA</span>
            </div>
            <ol className="shipment-stages">
              {shipmentStages.map((stage) => (
                <li key={stage.title}>
                  <span className="stage-dot" aria-hidden="true"><Check /></span>
                  <div className="stage-detail">
                    <strong>{stage.title}</strong>
                    <span>{stage.detail}</span>
                  </div>
                  <time>{stage.time}</time>
                </li>
              ))}
            </ol>
            <div className="shipment-card__foot">
              <span>Landed cost quoted</span>
              <strong>$14,820 CAD · on budget</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="capability-strip" aria-label="DCW service capabilities">
        <div className="wrap capability-strip__grid">
          <div className="capability-strip__item"><strong>Clearance</strong><span>CBSA entries, CARM, duties and taxes</span></div>
          <div className="capability-strip__item"><strong>Warehousing</strong><span>Storage, pick and pack, cross-dock</span></div>
          <div className="capability-strip__item"><strong>Freight</strong><span>Ocean, air and road, worldwide</span></div>
          <div className="capability-strip__item"><strong>Delivery</strong><span>Drayage, LTL, FTL and last mile</span></div>
        </div>
      </div>
    </>
  );
}
