import { useMemo, useState } from 'react';
import youthdriveLogo from '../../logo.jpg';
import CustomerTrendChart from './CustomerTrendChart.jsx';
import CRM from './CRM.jsx';
import './crm.css';
import {
  ageDays, demoCustomers, demoEnquiries, demoPayments, demoVehicles,
  fmtDate, fmtMoney, services, statusOptions, vehicleStatusOptions,
} from './data.js';

const icons = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  requests: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  car: <><path d="m5 17-1 3m15-3 1 3M5 17H3V9h2l2-5h10l2 5h2v8h-2M5 17h14M3 9h18M7 13h.01M17 13h.01"/></>,
  wallet: <><rect x="2" y="6" width="20" height="15" rx="2"/><path d="M2 10h20M6 6V4a2 2 0 0 1 2-2h12"/></>,
  chart: <><path d="M3 3v18h18M6 15l5-5 4 3 5-7"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  arrow: <path d="m7 17 10-10M7 7h10v10"/>,
  download: <><path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/></>,
  close: <path d="M18 6 6 18M6 6l12 12"/>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  credit: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  filter: <><path d="M3 5h18M6 12h12M9 19h6"/></>,
};
function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{icons[name] || icons.info}</svg>;
}
const navItems = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'customers', label: 'Customers', icon: 'users' },
  { id: 'crm', label: 'CRM & follow-ups', icon: 'chart' },
  { id: 'requests', label: 'Service requests', icon: 'requests' },
  { id: 'vehicles', label: 'Vehicle enquiries', icon: 'car' },
  { id: 'payments', label: 'Payments', icon: 'credit' },
];
const timespans = [
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '180', label: 'Last 180 days' },
  { value: 'all', label: 'All time' },
];
const headings = {
  overview: ['Business overview', 'A clear view of customers, operations and growth.'],
  customers: ['Customers', 'One place to view your customer relationships.'],
  crm: ['CRM & follow-ups', 'Customer milestones, targeted follow-ups and service histories.'],
  requests: ['Service requests', 'Manage enquiries from your website and other channels.'],
  vehicles: ['Vehicle sourcing', 'Track interest, matching progress and outcomes.'],
  payments: ['Payments', 'Review transaction states and service revenue.'],
};
const tone = (status) => {
  if (['Completed', 'Verified', 'Closed won'].includes(status)) return 'success';
  if (['Cancelled', 'Closed lost', 'Failed'].includes(status)) return 'danger';
  if (['Quoted', 'Matching', 'Options shared', 'Booked'].includes(status)) return 'warning';
  return 'neutral';
};
function Status({ value }) { return <span className={`status status-${tone(value)}`}>{value}</span>; }
const matches = (value, search) => String(value ?? '').toLowerCase().includes(search.toLowerCase().trim());
const inPeriod = (record, span, field) => span === 'all' || ageDays(record[field]) <= Number(span);
function csvDownload(filename, headers, rows) {
  const escape = (x) => `"${String(x ?? '').replaceAll('"', '""')}"`;
  const csv = [headers, ...rows].map((r) => r.map(escape).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}
function monthId(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }
function sixMonths() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { key: monthId(d), label: d.toLocaleDateString('en-ZA', { month: 'short' }) };
  });
}
function LineChart({ records }) {
  const points = sixMonths().map((month) => ({
    ...month,
    received: records.filter((r) => r.submitted.slice(0, 7) === month.key).length,
    completed: records.filter((r) => r.submitted.slice(0, 7) === month.key && r.status === 'Completed').length,
  }));
  const max = Math.max(4, ...points.map((p) => p.received + 1));
  const left = 42, top = 22, w = 660, h = 220;
  const position = (i, n) => `${left + i * w / (points.length - 1)},${top + h - n / max * h}`;
  const pathFor = (key) => {
    const coords=points.map((p,i)=>({x:left + i*w/(points.length-1),y:top+h - p[key]/max*h}));
    const clamp=y=>Math.max(top,Math.min(top+h,y));
    const parts=[`M ${coords[0].x} ${coords[0].y}`];
    for(let i=0;i<coords.length-1;i++){
      const before=coords[Math.max(0,i-1)],a=coords[i],b=coords[i+1],after=coords[Math.min(i+2,coords.length-1)];
      parts.push(`C ${a.x+(b.x-before.x)/6} ${clamp(a.y+(b.y-before.y)/6)}, ${b.x-(after.x-a.x)/6} ${clamp(b.y-(after.y-a.y)/6)}, ${b.x} ${b.y}`);
    }
    return parts.join(' ');
  };
  return <div className="graph-wrap">
    <svg className="trend-svg" viewBox="0 0 744 290" role="img" aria-label="Line chart comparing sample service requests and completed requests during the last six months">
      {[0,1,2,3,4].map((i) => {
        const y = top + i * h / 4;
        return <g key={i}><line x1={left} x2={left+w} y1={y} y2={y} stroke="#e6eee6" strokeDasharray="5 5"/><text x={left-13} y={y+4} textAnchor="end" className="chart-label">{Math.round(max * (1 - i/4))}</text></g>;
      })}
      <path d={pathFor('received')} fill="none" stroke="#81bb37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pathFor('completed')} fill="none" stroke="#153c31" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p,i) => <g key={p.key}>
        <circle cx={left + i*w/5} cy={top+h-p.received/max*h} r="5" fill="#81bb37" stroke="white" strokeWidth="2"><title>{p.label}: {p.received} new enquiries</title></circle>
        <circle cx={left + i*w/5} cy={top+h-p.completed/max*h} r="4.5" fill="#153c31" stroke="white" strokeWidth="2"><title>{p.label}: {p.completed} completed enquiries</title></circle>
        <text x={left+i*w/5} y={top+h+25} textAnchor="middle" className="chart-label">{p.label}</text>
      </g>)}
    </svg>
    <div className="legend"><span><i className="legend-dot lime"/>New enquiries</span><span><i className="legend-dot green"/>Completed requests</span></div>
  </div>;
}
function ServiceBars({ records }) {
  const counts = services.map((name) => ({ name, count: records.filter((r) => r.service === name).length })).filter((r) => r.count).sort((a,b) => b.count-a.count).slice(0,5);
  const max = Math.max(1, ...counts.map((s)=>s.count));
  return <div className="bars">{counts.length ? counts.map((item) => <div className="bar-item" key={item.name}>
    <div className="bar-head"><span>{item.name}</span><strong>{item.count}</strong></div>
    <div className="bar-track"><div className="bar-fill" style={{width:`${item.count/max*100}%`}}/></div>
  </div>) : <p className="muted">No requests in this date range.</p>}</div>;
}
function Card({ icon, label, value, meta, accent }) { return <div className="metric-card">
  <div className="metric-top"><span>{label}</span><span className={`metric-icon ${accent ? 'metric-accent' : ''}`}><Icon name={icon} size={21}/></span></div>
  <div className="metric-value">{value}</div><div className="metric-meta">{meta}</div>
</div>; }
function SectionCard({ title, subtitle, action, children, className='' }) { return <section className={`panel ${className}`}>
  <div className="panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}
</section>; }
function EmptyState({ text = 'No records match your filters.' }) { return <div className="empty-state"><Icon name="search" size={27}/><h3>No results found</h3><p>{text}</p></div>; }
function TableShell({ children }) { return <div className="table-scroller"><table className="data-table">{children}</table></div>; }

function NewEnquiryDialog({ onClose, onAdd }) {
  const [customer, setCustomer] = useState('Sample Customer 012');
  const [service, setService] = useState(services[0]);
  const [channel, setChannel] = useState('Website');
  const handleSubmit = (event) => { event.preventDefault(); if (!customer.trim()) return; onAdd({customer: customer.trim(), service, channel}); };
  return <div className="dialog-backdrop" onMouseDown={(e)=>{if(e.target===e.currentTarget) onClose();}}>
    <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <div className="dialog-title"><div><p className="eyebrow">DEMONSTRATION ONLY</p><h2 id="enquiry-title">Add sample service request</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close"/></button></div>
      <p className="dialog-warning">Use fictional details only. This preview does not store real customer data or submit enquiries.</p>
      <form onSubmit={handleSubmit} className="dialog-form">
        <label>Sample customer name<input autoFocus maxLength="80" required value={customer} onChange={(e)=>setCustomer(e.target.value)} placeholder="Sample Customer"/></label>
        <label>Service<select value={service} onChange={(e)=>setService(e.target.value)}>{services.map((s)=><option key={s}>{s}</option>)}</select></label>
        <label>Enquiry source<select value={channel} onChange={(e)=>setChannel(e.target.value)}>{['Website','WhatsApp','Phone','Walk-in'].map((s)=><option key={s}>{s}</option>)}</select></label>
        <div className="form-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-primary" type="submit"><Icon name="plus" size={17}/> Add demo request</button></div>
      </form>
    </section>
  </div>;
}

export default function App() {
  const [page, setPage] = useState('overview');
  const [span, setSpan] = useState('90');
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState(demoCustomers);
  const [enquiries, setEnquiries] = useState(demoEnquiries);
  const [vehicles, setVehicles] = useState(demoVehicles);
  const [payments] = useState(demoPayments);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const selectPage = (id) => { setPage(id); setSearch(''); setMessage(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const rangeCustomers = useMemo(()=>customers.filter((r)=>inPeriod(r,span,'joined')), [customers,span]);
  const rangeEnquiries = useMemo(()=>enquiries.filter((r)=>inPeriod(r,span,'submitted')), [enquiries,span]);
  const rangeVehicles = useMemo(()=>vehicles.filter((r)=>inPeriod(r,span,'submitted')), [vehicles,span]);
  const rangePayments = useMemo(()=>payments.filter((r)=>inPeriod(r,span,'date')), [payments,span]);
  const displayName = (id) => customers.find((c)=>c.id===id)?.name || id;
  const revenue = rangePayments.filter((r)=>r.status==='Verified').reduce((sum,r)=>sum+r.amount,0);
  const paidCount = new Set(rangePayments.filter((r)=>r.status==='Verified').map((r)=>r.customerId)).size;
  const firstPurchase = new Map();
  [...payments].filter(r=>r.status==='Verified').sort((a,b)=>a.date.localeCompare(b.date)).forEach(r=>{if(!firstPurchase.has(r.customerId))firstPurchase.set(r.customerId,r.date);});
  const firstTimePaid = [...firstPurchase.values()].filter(date=>span==='all'||ageDays(date)<=Number(span)).length;
  const returningPaid = new Set(rangePayments.filter(r=>r.status==='Verified' && firstPurchase.get(r.customerId).slice(0,7)<r.date.slice(0,7)).map(r=>r.customerId)).size;
  const lookup = (q, values) => values.some((v)=>matches(v,q));
  const filteredCustomers = rangeCustomers.filter((r)=>lookup(search,[r.id,r.name,r.channel]));
  const filteredEnquiries = rangeEnquiries.filter((r)=>lookup(search,[r.id,displayName(r.customerId),r.service,r.status]));
  const filteredVehicles = rangeVehicles.filter((r)=>lookup(search,[r.id,displayName(r.customerId),r.type,r.status]));
  const filteredPayments = rangePayments.filter((r)=>lookup(search,[r.id,displayName(r.customerId),r.service,r.status]));
  const updateCustomerMilestone=(id,milestone)=>{setCustomers(current=>current.map(c=>c.id===id?{...c,milestone}:c));setMessage('Demo milestone updated for this session only.');};
  const updateEnquiry = (id,status) => { setEnquiries((current)=>current.map((e)=>e.id===id?{...e,status}:e)); setMessage('Demo status updated in this browser session. Refreshing resets all changes.'); };
  const updateVehicle = (id,status) => { setVehicles((current)=>current.map((e)=>e.id===id?{...e,status}:e)); setMessage('Demo vehicle status updated. No real system was changed.'); };
  const addEnquiry = ({customer,service,channel}) => {
    const nextC = `C-${String(Math.max(0,...customers.map((r)=>Number(r.id.replace('C-',''))||0))+1).padStart(3,'0')}`;
    const nextE = `YD-${Math.max(100,...enquiries.map((r)=>Number(r.id.replace('YD-',''))||0))+1}`;
    const today = new Date(); const date = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    setCustomers((r)=>[{id:nextC,name:customer,channel,joined:date,contact:'Demo record'},...r]);
    setEnquiries((r)=>[{id:nextE,customerId:nextC,service,status:'New',submitted:date},...r]);
    setModalOpen(false); setMessage(`Demo request ${nextE} added. Nothing was submitted or saved to a server.`); selectPage('requests');
    setMessage(`Demo request ${nextE} added. Nothing was submitted or saved to a server.`);
  };
  const exportPage = () => {
    if (page==='customers') csvDownload('youthdrive-demo-customers.csv',['ID','Sample customer','Source','Joined'],filteredCustomers.map((r)=>[r.id,r.name,r.channel,r.joined]));
    else if (page==='requests') csvDownload('youthdrive-demo-requests.csv',['ID','Customer','Service','Status','Submitted'],filteredEnquiries.map((r)=>[r.id,displayName(r.customerId),r.service,r.status,r.submitted]));
    else if (page==='vehicles') csvDownload('youthdrive-demo-vehicles.csv',['ID','Customer','Vehicle type','Budget ZAR','Status','Submitted'],filteredVehicles.map((r)=>[r.id,displayName(r.customerId),r.type,r.budget,r.status,r.submitted]));
    else if (page==='payments') csvDownload('youthdrive-demo-payments.csv',['ID','Customer','Service','Amount ZAR','Payment state','Date'],filteredPayments.map((r)=>[r.id,displayName(r.customerId),r.service,r.amount,r.status,r.date]));
  };
  const recentRequests = [...rangeEnquiries].sort((a,b)=>b.submitted.localeCompare(a.submitted)).slice(0,5);
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand" aria-label="YouthDrive Solutions administration dashboard">
        <img className="brand-logo" src={youthdriveLogo} alt="YouthDrive Solutions" />
        <span className="brand-admin-label">ADMINISTRATION DASHBOARD</span>
      </div>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="side-nav" aria-label="Admin navigation">{navItems.map((item)=><button key={item.id} type="button" className={`nav-item ${page===item.id?'selected':''}`} onClick={()=>selectPage(item.id)} aria-current={page===item.id?'page':undefined}><Icon name={item.icon}/><span>{item.label}</span>{page===item.id && <Icon name="chevron" size={16}/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-callout"><Icon name="shield" size={20}/><strong>Staff-only system</strong><p>Authentication will be added before any live deployment.</p></div><div className="sidebar-foot">MERAVUNO · DEVELOPMENT PREVIEW</div></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="topbar-breadcrumb">YouthDrive <span>/</span> {headings[page][0]}</div><div className="topbar-actions"><span className="topbar-demo"><span className="pulse"/> Demo environment</span><div className="avatar" title="Development preview, not a logged-in staff account">YD</div></div></header>
      <main className="main-content">
        <div className="notice" role="note"><Icon name="info" size={19}/><span><strong>Prototype with fictional data.</strong> No login, database, payment gateway or real customer information is connected. Changes reset on refresh. Do not enter real personal data.</span></div>
        <div className="page-title"><div><div className="eyebrow">YOUTHDRIVE BUSINESS OPERATIONS</div><h1>{headings[page][0]}</h1><p>{headings[page][1]}</p></div><div className="title-actions"><button type="button" className="btn btn-primary" onClick={()=>setModalOpen(true)}><Icon name="plus" size={19}/> New sample request</button></div></div>
        <div className="toolbar"><div className="toolbar-label"><Icon name="calendar" size={17}/> Reporting period</div><select aria-label="Reporting period" value={span} onChange={(e)=>setSpan(e.target.value)}>{timespans.map((o)=><option value={o.value} key={o.value}>{o.label}</option>)}</select>{page!=='overview' && page!=='crm' && <><label className="searchbox"><Icon name="search" size={18}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={`Search ${page}...`} aria-label={`Search ${page}`}/></label><button className="btn btn-outline" onClick={exportPage}><Icon name="download" size={18}/> Export demo CSV</button></>}</div>
        {message && <div role="status" className="message">{message}<button type="button" onClick={()=>setMessage('')} aria-label="Dismiss"><Icon name="close" size={15}/></button></div>}
        {page==='overview' && <>
          <div className="metrics-grid">
            <Card icon="users" label="First-time clients" value={firstTimePaid} meta="First verified purchase in period" accent/>
            <Card icon="users" label="Returning clients" value={returningPaid} meta="Purchased more than once"/>
            <Card icon="wallet" label="Verified payments" value={fmtMoney(revenue)} meta={`${paidCount} paying customers in period`}/>
            <Card icon="car" label="Vehicle enquiries" value={rangeVehicles.length} meta={`${rangeVehicles.filter((r)=>r.status==='New').length} new sourcing leads`}/>
          </div>
          <div className="two-column wide-left">
            <SectionCard title="Client growth: unique, first-time & returning" subtitle="Monthly distinct paying customers · fictional demonstration data"><CustomerTrendChart payments={payments}/></SectionCard>
            <SectionCard title="Most requested services" subtitle="From the selected reporting period"><ServiceBars records={rangeEnquiries}/></SectionCard>
          </div>
          <div className="two-column wide-left">
            <SectionCard title="Enquiry & service activity" subtitle="Sample monthly activity over the last six months"><LineChart records={enquiries}/></SectionCard>
            <SectionCard title="Service request volume" subtitle={`${rangeEnquiries.length} incoming requests in selected period`}><div className="crm-mini-volume"><strong>{rangeEnquiries.length}</strong><span>{rangeEnquiries.filter(r=>r.status==='New').length} need first response</span><p>Separate from unique paying clients. One customer may submit several enquiries.</p></div></SectionCard>
          </div>
          <div className="two-column wide-left">
            <SectionCard title="Recent service requests" subtitle="Latest enquiries recorded" action={<button type="button" className="text-action" onClick={()=>selectPage('requests')}>View all <Icon name="arrow" size={16}/></button>}>
              <div className="activity-list">{recentRequests.length ? recentRequests.map((r)=><div className="activity-row" key={r.id}><div className="activity-avatar"><Icon name="requests" size={18}/></div><div><strong>{r.service}</strong><small>{displayName(r.customerId)} · {fmtDate(r.submitted)}</small></div><Status value={r.status}/></div>):<EmptyState/>}</div>
            </SectionCard>
            <SectionCard title="What this dashboard can tell you" subtitle="When connected to real business records"><div className="insights"><div><Icon name="chart"/><span><strong>Track growth</strong><small>Compare customer enquiries and verified sales over time.</small></span></div><div><Icon name="users"/><span><strong>Understand customers</strong><small>See repeat clients and where enquiries originated.</small></span></div><div><Icon name="car"/><span><strong>Monitor vehicle sourcing</strong><small>Follow vehicle interest through to a recorded outcome.</small></span></div></div></SectionCard>
          </div>
        </>}
        {page==='crm' && <CRM customers={customers} enquiries={enquiries} vehicles={vehicles} payments={payments} onUpdateCustomer={updateCustomerMilestone}/>}
        {page==='customers' && <SectionCard title={`Customer directory · ${filteredCustomers.length}`} subtitle="Demo profiles, including website and offline channels">
          {filteredCustomers.length ? <TableShell><thead><tr><th>Customer</th><th>Reference</th><th>Source</th><th>Date added</th><th>Requests</th></tr></thead><tbody>{[...filteredCustomers].sort((a,b)=>b.joined.localeCompare(a.joined)).map((r)=><tr key={r.id}><td><div className="cell-name"><span className="mini-avatar">{r.id.slice(-2)}</span><strong>{r.name}</strong></div></td><td className="mono">{r.id}</td><td>{r.channel}</td><td>{fmtDate(r.joined)}</td><td>{enquiries.filter((e)=>e.customerId===r.id).length}</td></tr>)}</tbody></TableShell>:<EmptyState/>}
        </SectionCard>}
        {page==='requests' && <SectionCard title={`Service requests · ${filteredEnquiries.length}`} subtitle="Change demo statuses to see the dashboard update">
          {filteredEnquiries.length ? <TableShell><thead><tr><th>Reference</th><th>Customer</th><th>Service</th><th>Date received</th><th>Current status</th><th>Update status</th></tr></thead><tbody>{[...filteredEnquiries].sort((a,b)=>b.submitted.localeCompare(a.submitted)).map((r)=><tr key={r.id}><td className="mono"><strong>{r.id}</strong></td><td>{displayName(r.customerId)}</td><td>{r.service}</td><td>{fmtDate(r.submitted)}</td><td><Status value={r.status}/></td><td><select className="status-select" aria-label={`Update status of ${r.id}`} value={r.status} onChange={(e)=>updateEnquiry(r.id,e.target.value)}>{statusOptions.map((s)=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></TableShell>:<EmptyState/>}
        </SectionCard>}
        {page==='vehicles' && <SectionCard title={`Vehicle sourcing requests · ${filteredVehicles.length}`} subtitle="Track prospective buyers independently of driving lesson orders">
          {filteredVehicles.length ? <TableShell><thead><tr><th>Lead</th><th>Customer</th><th>Vehicle preference</th><th>Indicative budget</th><th>Submitted</th><th>Status</th></tr></thead><tbody>{[...filteredVehicles].sort((a,b)=>b.submitted.localeCompare(a.submitted)).map((r)=><tr key={r.id}><td className="mono"><strong>{r.id}</strong></td><td>{displayName(r.customerId)}</td><td>{r.type}</td><td>{fmtMoney(r.budget)}</td><td>{fmtDate(r.submitted)}</td><td><select className="status-select" aria-label={`Update vehicle request ${r.id}`} value={r.status} onChange={(e)=>updateVehicle(r.id,e.target.value)}>{vehicleStatusOptions.map((s)=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></TableShell>:<EmptyState/>}
          <p className="footnote">Customer budgets are not revenue. Vehicle sale proceeds and YouthDrive referral fees must be tracked separately.</p>
        </SectionCard>}
        {page==='payments' && <SectionCard title={`Payment records · ${filteredPayments.length}`} subtitle="Fictional transaction examples — not connected to a payment provider">
          {filteredPayments.length ? <TableShell><thead><tr><th>Reference</th><th>Customer</th><th>Service</th><th>Amount</th><th>Date</th><th>State</th></tr></thead><tbody>{[...filteredPayments].sort((a,b)=>b.date.localeCompare(a.date)).map((r)=><tr key={r.id}><td className="mono"><strong>{r.id}</strong></td><td>{displayName(r.customerId)}</td><td>{r.service}</td><td><strong>{fmtMoney(r.amount)}</strong></td><td>{fmtDate(r.date)}</td><td><Status value={r.status}/></td></tr>)}</tbody></TableShell>:<EmptyState/>}
          <p className="footnote">Only server-verified transactions should contribute to real revenue. An ordinary browser must never be allowed to mark a payment as verified.</p>
        </SectionCard>}
        <footer className="workspace-footer"><span>© {new Date().getFullYear()} YouthDrive Solutions · Admin concept</span><span>Designed as a development prototype for MERAVUNO</span></footer>
      </main>
    </div>
    {modalOpen && <NewEnquiryDialog onClose={()=>setModalOpen(false)} onAdd={addEnquiry}/>}
  </div>;
}
