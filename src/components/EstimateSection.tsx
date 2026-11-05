'use client';

import { useMemo, useState } from 'react';

const money = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

const dutyOptions: { value: string; label: string; rate?: number }[] = [
  { value: 'apparel', label: 'Apparel (often 18%)', rate: 18 },
  { value: 'footwear', label: 'Footwear (often 18%)', rate: 18 },
  { value: 'auto-parts', label: 'Auto parts (often 6%)', rate: 6 },
  { value: 'electronics', label: 'Electronics and computers (often 0%)', rate: 0 },
  { value: 'machinery', label: 'Machinery and tools (often 0%)', rate: 0 },
  { value: 'custom', label: 'I know my duty rate' },
];

export default function EstimateSection() {
  const [value, setValue] = useState('25000');
  const [freight, setFreight] = useState('2800');
  const [pallets, setPallets] = useState('6');
  const [weeks, setWeeks] = useState('4');
  const [dutyChoice, setDutyChoice] = useState('apparel');
  const [customDuty, setCustomDuty] = useState('8');
  const [freeTrade, setFreeTrade] = useState(false);

  const estimate = useMemo(() => {
    const goodsValue = Math.max(0, Number(value) || 0);
    const shipmentFreight = Math.max(0, Number(freight) || 0);
    const selectedDuty = dutyOptions.find((option) => option.value === dutyChoice);
    const customRate = Math.min(100, Math.max(0, Number(customDuty) || 0));
    const rate = freeTrade ? 0 : dutyChoice === 'custom' ? customRate : selectedDuty?.rate ?? 0;
    const duty = goodsValue * rate / 100;
    const gst = (goodsValue + duty) * 0.05;
    const brokerage = goodsValue > 0 ? 95 : 0;
    const storage = Math.max(0, Number(pallets) || 0) * Math.max(0, Number(weeks) || 0) * 12;
    const lines = [
      { label: 'Freight', amount: shipmentFreight },
      { label: `Duty (${rate}%)`, amount: duty },
      { label: 'GST (5%)', amount: gst },
      { label: 'Brokerage', amount: brokerage },
      { label: 'Storage', amount: storage },
    ];

    return {
      lines,
      total: lines.reduce((sum, line) => sum + line.amount, 0),
      percentage: goodsValue > 0 ? Math.round(lines.reduce((sum, line) => sum + line.amount, 0) / goodsValue * 100) : 0,
    };
  }, [dutyChoice, customDuty, freeTrade, freight, pallets, value, weeks]);

  return (
    <section id="estimate" className="section">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <h2>Estimate your landed cost</h2>
            <p>Get a quick planning estimate for freight, duties, GST, brokerage and storage.</p>
          </div>
        </div>
        <div className="estimate-panel">
          <div className="estimate-panel__content">
            <h3>Shipment details</h3>
            <p>Adjust the values to see an approximate total in Canadian dollars.</p>
            <div className="estimate-field">
              <label htmlFor="estimate-value">Value of goods (CAD)</label>
              <input id="estimate-value" type="number" min="0" step="100" inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} />
            </div>
            <div className="estimate-grid">
              <div className="estimate-field">
                <label htmlFor="estimate-origin">Country of origin</label>
                <select id="estimate-origin" defaultValue="China">
                  <option>China</option><option>United States</option><option>Mexico</option>
                  <option>India</option><option>Vietnam</option><option>European Union</option><option>Other</option>
                </select>
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-category">Type of goods</label>
                <select id="estimate-category" value={dutyChoice} onChange={(event) => setDutyChoice(event.target.value)}>
                  {dutyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              {dutyChoice === 'custom' && (
                <div className="estimate-field">
                  <label htmlFor="estimate-duty">Duty rate (%)</label>
                  <input id="estimate-duty" type="number" min="0" max="100" step="0.5" value={customDuty} onChange={(event) => setCustomDuty(event.target.value)} />
                </div>
              )}
              <div className="estimate-field">
                <label htmlFor="estimate-freight">Freight to Vancouver (CAD)</label>
                <input id="estimate-freight" type="number" min="0" step="50" value={freight} onChange={(event) => setFreight(event.target.value)} />
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-pallets">Pallets to store</label>
                <input id="estimate-pallets" type="number" min="0" value={pallets} onChange={(event) => setPallets(event.target.value)} />
              </div>
              <div className="estimate-field">
                <label htmlFor="estimate-weeks">Storage (weeks)</label>
                <input id="estimate-weeks" type="number" min="0" value={weeks} onChange={(event) => setWeeks(event.target.value)} />
              </div>
            </div>
            <div className="estimate-field">
              <label className="estimate-checkbox">
                <input type="checkbox" checked={freeTrade} onChange={(event) => setFreeTrade(event.target.checked)} />
                {' '}Goods qualify for free-trade treatment and I have proof of origin
              </label>
            </div>
          </div>
          <aside className="estimate-total" aria-live="polite">
            <span className="estimate-total__label">Estimated landed cost</span>
            <strong className="estimate-total__amount">{money.format(estimate.total)}</strong>
            {estimate.percentage > 0 && <span className="estimate-total__label">About {estimate.percentage}% on top of your goods&apos; value</span>}
            <ul className="estimate-breakdown">
              {estimate.lines.map((line) => (
                <li key={line.label}><span>{line.label}</span><strong>{money.format(line.amount)}</strong></li>
              ))}
            </ul>
            <a className="button" href="#contact">Turn this into a firm quote</a>
            <small>
              Planning estimate only, not a quote. Duty depends on the exact HS code and origin.
              Brokerage ($95) and storage ($12 per pallet/week) are sample rates and must be confirmed.
            </small>
          </aside>
        </div>
      </div>
    </section>
  );
}
