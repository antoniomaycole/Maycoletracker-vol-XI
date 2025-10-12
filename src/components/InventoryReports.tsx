import React, { useMemo, useState } from 'react';
import { aggregateByPeriod, InventoryRecord } from '../lib/reports';
import { add, multiply, divide } from '../lib/operations';
import { industries, getIndustryById } from '../config/industries';
import { summarizeReport, speakText, downloadTextFile } from '../services/analyticsAgent';
import styles from './InventoryReports.module.css';

function buildSampleDataForIndustry(industryId: string): InventoryRecord[] {
  const cfg = getIndustryById(industryId);
  const now = Date.now();
  // produce three sample records: today, yesterday, 7 days ago
  return cfg.commonItems.map((it, idx) => ({
    id: `${industryId}-${it.sku}-${idx}`,
    timestamp: new Date(now - idx * 1000 * 60 * 60 * 24).toISOString(),
    item: it.name,
    quantity: (idx + 1) * 5,
    unitPrice: 2.5,
  }));
}

export const InventoryReports: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [industry, setIndustry] = useState<string>(industries[0].id);
  const records = useMemo(() => buildSampleDataForIndustry(industry), [industry]);
  const reports = useMemo(() => aggregateByPeriod(records, period), [records, period]);
  const [reportText, setReportText] = useState<string>('');

  return (
    <section aria-labelledby="inventory-reports">
      <h2 id="inventory-reports">Inventory Reports</h2>
  <div className={styles.controls}>
        <label>
          <input type="radio" name="period" checked={period === 'daily'} onChange={() => setPeriod('daily')} /> Daily
        </label>
        <label>
          <input type="radio" name="period" checked={period === 'weekly'} onChange={() => setPeriod('weekly')} /> Weekly
        </label>
        <label>
          <input type="radio" name="period" checked={period === 'monthly'} onChange={() => setPeriod('monthly')} /> Monthly
        </label>
      </div>

  <div className={styles.industrySelect}>
        <label htmlFor="industry-select">Industry: </label>
        <select id="industry-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          {industries.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {reports.length === 0 ? (
          <p>No records for selected period.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Total Items</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.period}>
                  <td>{r.period}</td>
                  <td>{r.totalItems}</td>
                  <td>{typeof r.totalValue === 'number' ? `$${r.totalValue.toFixed(2)}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

  <div className={styles.reportActions}>
        <button
          onClick={() => {
            const txt = summarizeReport(reports, getIndustryById(industry).name);
            setReportText(txt);
          }}
        >
          Generate Written Report
        </button>
        <button
          onClick={() => {
            const txt = summarizeReport(reports, getIndustryById(industry).name);
            speakText(txt);
          }}
        >
          Speak Report
        </button>
        <button
          onClick={() => {
            const txt = summarizeReport(reports, getIndustryById(industry).name);
            downloadTextFile(`${industry}-inventory-report.txt`, txt);
          }}
        >
          Download Report
        </button>
        {reportText && (
          <pre className={styles.reportPre}>{reportText}</pre>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Arithmetic sanity checks</h3>
        <p>Add 2 + 3 = {String(add(2, 3))}</p>
        <p>Multiply 4 * 5 = {String(multiply(4, 5))}</p>
        <p>Divide 10 / 2 = {String(divide(10, 2))}</p>
      </div>
    </section>
  );
};

export default InventoryReports;
