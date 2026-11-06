import { useMemo } from 'react';

function monthsBack(n = 6) {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const month = new Date(now.getFullYear(), now.getMonth() + i - (n - 1), 1);
    const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
    return { key, label: month.toLocaleDateString('en-ZA', { month: 'short' }) };
  });
}

// A cubic Bézier interpolates between genuine monthly values. It rounds corners;
// it never manufactures extra customers or fictitious intermediate observations.
function curve(values, max, x0=46, y0=24, width=650, height=210) {
  const points = values.map((n, i) => ({ x: x0 + i * width / Math.max(1, values.length - 1), y: y0 + height - n / max * height }));
  const clamp = y => Math.max(y0, Math.min(y0 + height, y));
  const parts = [`M ${points[0].x} ${points[0].y}`];
  for (let i=0; i<points.length-1; i++) {
    const previous = points[Math.max(0,i-1)], a=points[i], b=points[i+1], next=points[Math.min(points.length-1,i+2)];
    parts.push(`C ${a.x + (b.x-previous.x)/6} ${clamp(a.y+(b.y-previous.y)/6)}, ${b.x-(next.x-a.x)/6} ${clamp(b.y-(next.y-a.y)/6)}, ${b.x} ${b.y}`);
  }
  return { points, path:parts.join(' ') };
}

export function calculateCustomerMonths(payments) {
  const verified = payments.filter(p=>p.status === 'Verified').slice().sort((a,b)=>a.date.localeCompare(b.date));
  const firstMonth = new Map();
  verified.forEach(p=>{if(!firstMonth.has(p.customerId)) firstMonth.set(p.customerId,p.date.slice(0,7));});
  return monthsBack().map(m=>{
    const monthCustomers = new Set(verified.filter(p=>p.date.startsWith(m.key)).map(p=>p.customerId));
    let newClients = 0, returning = 0;
    for (const id of monthCustomers) {
      if (firstMonth.get(id) === m.key) newClients++;
      else returning++;
    }
    return {...m, unique:monthCustomers.size, firstTime:newClients, returning};
  });
}

export default function CustomerTrendChart({payments}) {
  const rows = useMemo(()=>calculateCustomerMonths(payments),[payments]);
  const max = Math.max(3, ...rows.map(x=>x.unique + 1));
  const colors = {unique:'#1e6047',firstTime:'#8fca41',returning:'#eea84c'};
  const labels = {unique:'Unique paying customers',firstTime:'First-time customers',returning:'Returning customers'};
  return <div className="crm-chart">
    <svg viewBox="0 0 744 286" className="trend-svg" role="img" aria-label="Smooth monthly lines showing unique paying customers, first-time customers, and returning customers, from fictional demo data">
      {[0,1,2,3,4].map(i=><g key={i}><line x1="46" x2="696" y1={24+i*52.5} y2={24+i*52.5} stroke="#e6eee6" strokeDasharray="5 5"/><text x="34" y={28+i*52.5} textAnchor="end" className="chart-label">{Math.round(max*(1-i/4))}</text></g>)}
      {Object.keys(labels).map(key=>{
        const {path,points}=curve(rows.map(r=>r[key]),max);
        return <g key={key}><path d={path} fill="none" stroke={colors[key]} strokeWidth={key==='unique'?3.6:2.7} strokeLinecap="round" strokeLinejoin="round"/>
          {points.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4.4" fill={colors[key]} stroke="#fff" strokeWidth="1.6"><title>{rows[i].label}: {rows[i][key]} {labels[key].toLowerCase()}</title></circle>)}</g>;
      })}
      {rows.map((r,i)=><text key={r.key} x={46+i*650/5} y="261" textAnchor="middle" className="chart-label">{r.label}</text>)}
    </svg>
    <div className="crm-legend">{Object.keys(labels).map(key=><span key={key}><i style={{background:colors[key]}}/>{labels[key]}</span>)}</div>
    <p className="crm-footnote">One customer is counted only once in each month. First-time means their first verified purchase; returning means they had purchased in an earlier month. Counts are demonstration data.</p>
  </div>;
}
