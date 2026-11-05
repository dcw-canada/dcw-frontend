"use client";

import { useMemo, useState } from "react";

const money = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

const serviceOptions: { value: string; label: string; rate?: number }[] = [
  { value: "courier", label: "Courier Import Handling", rate: 0 },
  { value: "cargo", label: "Cargo Import Handling", rate: 0 },
  { value: "customs", label: "Customs Clearance Coordination", rate: 0 },
  { value: "warehousing", label: "Warehousing (Vancouver / Toronto)", rate: 0 },
  { value: "last-mile", label: "Last-Mile Delivery (UPS)", rate: 0 },
  { value: "india-canada", label: "India → Canada Door-to-Door", rate: 0 },
  { value: "custom", label: "Multiple / Custom solution" },
];

const originOptions = [
  "India",
  "Pakistan",
  "Sri Lanka",
  "United States",
  "United Kingdom",
  "UAE",
  "Other",
];

export default function EstimateSection() {
  const [declaredValue, setDeclaredValue] = useState("25000");
  const [weight, setWeight] = useState("50");
  const [pieces, setPieces] = useState("6");
  const [storageWeeks, setStorageWeeks] = useState("2");
  const [origin, setOrigin] = useState("India");
  const [serviceChoice, setServiceChoice] = useState("courier");
  const [dutyRate, setDutyRate] = useState("8");

  const estimate = useMemo(() => {
    const goodsValue = Math.max(0, Number(declaredValue) || 0);
    const shipmentWeight = Math.max(0, Number(weight) || 0);
    const shipmentPieces = Math.max(0, Number(pieces) || 0);
    const weeks = Math.max(0, Number(storageWeeks) || 0);
    const rate = Math.min(100, Math.max(0, Number(dutyRate) || 0));
    const duty = (goodsValue * rate) / 100;
    const gst = (goodsValue + duty) * 0.05;
    const brokerage = goodsValue > 0 ? 95 : 0;
    const storage = shipmentPieces * weeks * 12;
    const handling = shipmentWeight * 0.85; // indicative handling, not a quote
    const lines = [
      { label: `Duty (${rate}%) — estimate`, amount: duty },
      { label: "GST (5%)", amount: gst },
      { label: "Brokerage coordination", amount: brokerage },
      { label: "Handling (indicative)", amount: handling },
      { label: "Storage", amount: storage },
    ];

    return {
      lines,
      total: lines.reduce((sum, line) => sum + line.amount, 0),
      percentage:
        goodsValue > 0
          ? Math.round(
              (lines.reduce((sum, line) => sum + line.amount, 0) / goodsValue) *
                100,
            )
          : 0,
    };
  }, [declaredValue, weight, pieces, storageWeeks, dutyRate]);

  return (
    <section id="estimate" className="section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <h2>Estimate your import costs</h2>
            <p>
              Get a quick planning estimate for duties, GST, brokerage
              coordination, handling and storage.
            </p>
          </div>
        </div>
        <div className="estimate-panel">
          <div className="estimate-panel__content">
            <h3>Shipment details</h3>
            <p>
              Adjust the values to see an approximate total in Canadian dollars.
            </p>
            <div className="estimate-field">
              <label htmlFor="estimate-value">
                Declared value of goods (CAD)
              </label>
              <input
                id="estimate-value"
                type="number"
                min="0"
                step="100"
                inputMode="decimal"
                value={declaredValue}
                onChange={(event) => setDeclaredValue(event.target.value)}
              />
            </div>
            <div className="estimate-grid">
              <div className="estimate-field">
                <label htmlFor="estimate-origin">Country of origin</label>
                <select
                  id="estimate-origin"
                  value={origin}
                  onChange={(event) => setOrigin(event.target.value)}
                >
                  {originOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-service">Service required</label>
                <select
                  id="estimate-service"
                  value={serviceChoice}
                  onChange={(event) => setServiceChoice(event.target.value)}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-weight">Total weight (kg)</label>
                <input
                  id="estimate-weight"
                  type="number"
                  min="0"
                  step="1"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-pieces">Pieces / parcels</label>
                <input
                  id="estimate-pieces"
                  type="number"
                  min="0"
                  value={pieces}
                  onChange={(event) => setPieces(event.target.value)}
                />
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-duty">Duty rate (%)</label>
                <input
                  id="estimate-duty"
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={dutyRate}
                  onChange={(event) => setDutyRate(event.target.value)}
                />
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-weeks">Storage (weeks)</label>
                <input
                  id="estimate-weeks"
                  type="number"
                  min="0"
                  value={storageWeeks}
                  onChange={(event) => setStorageWeeks(event.target.value)}
                />
              </div>
            </div>
          </div>
          <aside className="estimate-total" aria-live="polite">
            <span className="estimate-total__label">
              Estimated import costs
            </span>
            <strong className="estimate-total__amount">
              {money.format(estimate.total)}
            </strong>
            {estimate.percentage > 0 && (
              <span className="estimate-total__label">
                About {estimate.percentage}% on top of your goods&apos; value
              </span>
            )}
            <ul className="estimate-breakdown">
              {estimate.lines.map((line) => (
                <li key={line.label}>
                  <span>{line.label}</span>
                  <strong>{money.format(line.amount)}</strong>
                </li>
              ))}
            </ul>
            <a className="button" href="#contact">
              Turn this into a firm quote
            </a>
            <small>
              Planning estimate only, not a quote. Duty depends on the exact HS
              code and origin. Brokerage, handling and storage figures are
              indicative and must be confirmed. Rates are tailored to shipment
              volumes and service requirements.
            </small>
          </aside>
        </div>
      </div>
    </section>
  );
}
