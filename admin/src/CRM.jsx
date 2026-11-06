import { useMemo, useState } from 'react';

const segments = [
  {value:'all',label:'All customers'},
  {value:'learner',label:"Learner's licence obtained"},
  {value:'driver',label:"Driver's licence obtained"},
  {value:'vehicles',label:'Vehicle sourcing enquiries'},
  {value:'no-milestone',label:'No recorded licensing milestone'},
];
const template = (segment) => segment === 'learner'
  ? "Hello, YouthDrive Solutions here. Congratulations on your learner's licence! If you're ready for practical driving lessons, reply to this message and we can discuss options."
  : segment === 'driver'
  ? "Hello from YouthDrive Solutions. Congratulations on obtaining your driver's licence! If you're looking for vehicle sourcing assistance, we'd be happy to explain our service."
  : segment === 'vehicles'
  ? 'Hello, YouthDrive Solutions here. We are following up on your vehicle sourcing enquiry. Please let us know if you would still like assistance.'
  : 'Hello from YouthDrive Solutions. We are checking in to see if you need further help with any of our driving or licensing services.';
const matchesSegment=(customer, segment, enquiries)=>{
  if(segment==='learner') return customer.milestone==='Learner licence obtained';
  if(segment==='driver') return customer.milestone==='Driver licence obtained';
  if(segment==='vehicles') return enquiries.some(e=>e.customerId===customer.id && e.service==='Vehicle sourcing');
  if(segment==='no-milestone') return !customer.milestone;
  return true;
};
const csvQuote = s=>'"'+String(s ?? '').replaceAll('"','""')+'"';
function saveDemoCSV(customers){
  const lines=[['Reference','Sample name','Milestone','Consent to marketing'],...customers.map(c=>[c.id,c.name,c.milestone||'',c.marketingConsent?'Yes':'No'])];
  const blob=new Blob([lines.map(l=>l.map(csvQuote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='youthdrive-demo-crm-segment.csv';a.click();URL.revokeObjectURL(url);
}

export default function CRM({customers,enquiries,vehicles,payments,onUpdateCustomer}) {
  const [segment,setSegment]=useState('all');
  const [selected,setSelected]=useState([]);
  const [draft,setDraft]=useState(template('all'));
  const [focus,setFocus]=useState(customers[0]?.id ?? '');
  const [note,setNote]=useState('');
  const [notes,setNotes]=useState({});
  const [notice,setNotice]=useState('');
  const eligible=useMemo(()=>customers.filter(c=>matchesSegment(c,segment,enquiries)),[customers,segment,enquiries]);
  const optedIn=eligible.filter(c=>c.marketingConsent===true);
  const chosen=optedIn.filter(c=>selected.includes(c.id));
  const customer=customers.find(c=>c.id===focus)||customers[0];
  const history=customer ? [
    ...enquiries.filter(e=>e.customerId===customer.id).map(e=>({date:e.submitted,label:`${e.service} · ${e.status}`})),
    ...vehicles.filter(e=>e.customerId===customer.id).map(e=>({date:e.submitted,label:`Vehicle sourcing · ${e.type} · ${e.status}`})),
    ...payments.filter(e=>e.customerId===customer.id).map(e=>({date:e.date,label:`Payment · ${e.service} · ${e.status}`})),
  ].sort((a,b)=>b.date.localeCompare(a.date)):[];
  function chooseSegment(next){setSegment(next);setSelected([]);setDraft(template(next));setNotice('');}
  async function copyMessage(){try{await navigator.clipboard.writeText(draft);setNotice('Message copied. No customer messages have been sent.');}catch{setNotice('Clipboard unavailable. Select and copy the draft manually.');}}
  function addNote(e){e.preventDefault();if(!customer||!note.trim())return;setNotes(old=>({...old,[customer.id]:[...(old[customer.id]||[]),note.trim()]}));setNote('');setNotice('Sample note added for this session only.');}
  return <div className="crm-stack">
    <div className="crm-summary-grid"><div><span>Profiles</span><strong>{customers.length}</strong><small>Fictional customer records</small></div><div><span>Recorded learner milestones</span><strong>{customers.filter(c=>c.milestone==='Learner licence obtained').length}</strong><small>Confirmed by staff in a real system</small></div><div><span>Recorded driver milestones</span><strong>{customers.filter(c=>c.milestone==='Driver licence obtained').length}</strong><small>Not inferred from lessons</small></div><div><span>Sample marketing opt-ins</span><strong>{customers.filter(c=>c.marketingConsent).length}</strong><small>Consent is required before campaigns</small></div></div>
    <section className="crm-surface"><div className="crm-head"><div><p className="eyebrow">SEGMENT & FOLLOW UP</p><h2>Targeted customer communication</h2><p>Filter by customer milestone, select eligible contacts and prepare a follow-up. This demo never sends messages.</p></div></div>
      <div className="crm-controls"><label>Customer segment<select value={segment} onChange={e=>chooseSegment(e.target.value)}>{segments.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}</select></label><div className="crm-figures"><span>{eligible.length} matched</span><span>{optedIn.length} opted in</span><span>{chosen.length} selected</span></div></div>
      <div className="crm-segment-tools"><button type="button" className="btn btn-outline" onClick={()=>setSelected(optedIn.map(c=>c.id))}>Select all opted-in</button><button type="button" className="btn btn-ghost" onClick={()=>setSelected([])}>Clear selection</button><button type="button" className="btn btn-outline" onClick={()=>saveDemoCSV(chosen)}>Export selected demo records</button></div>
      <div className="crm-recipient-list">{eligible.map(c=><label key={c.id} className={`crm-recipient ${!c.marketingConsent?'ineligible':''}`}><input type="checkbox" disabled={!c.marketingConsent} checked={selected.includes(c.id)} onChange={e=>setSelected(old=>e.target.checked?[...old,c.id]:old.filter(id=>id!==c.id))}/><span><strong>{c.name}</strong><small>{c.milestone||'No recorded milestone'} · {c.id}</small></span><span className={`crm-consent ${c.marketingConsent?'yes':'no'}`}>{c.marketingConsent?'Opted in':'No consent'}</span></label>)}</div>
      <label className="crm-draft-label">Message draft<textarea value={draft} maxLength={1200} rows={5} onChange={e=>setDraft(e.target.value)}/></label>
      <div className="crm-action-bar"><button type="button" className="btn btn-primary" onClick={copyMessage} disabled={!draft.trim()}>Copy message draft</button><button type="button" className="btn btn-outline" disabled title="Requires server-side consent verification, approved messaging provider, delivery logs and unsubscribe support">Send selected messages (not connected)</button></div>
      <p className="crm-footnote">The live system will need verified consent, opt-out handling, a provider such as an approved WhatsApp Business API/SMS service, server-side permissions, message logs and sending limits. The 'select all' action does not override consent.</p>
    </section>
    {customer&&<section className="crm-surface"><div className="crm-head"><div><p className="eyebrow">CUSTOMER RELATIONSHIP HISTORY</p><h2>Service timeline & follow-up notes</h2><p>Track a customer's enquiries, verified transactions and milestones together.</p></div></div>
      <label className="crm-profile-picker">Choose sample profile<select value={focus} onChange={e=>{setFocus(e.target.value);setNote('');}}>{customers.map(c=><option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}</select></label>
      <div className="crm-profile-head"><strong>{customer.name}</strong><span>{customer.milestone||'Milestone not yet recorded'}</span></div>
      <div className="crm-profile-edit"><label>Recorded licensing milestone (demo)<select value={customer.milestone||''} onChange={e=>onUpdateCustomer(customer.id,e.target.value)}><option value="">Not recorded</option><option value="Learner licence obtained">Learner's licence obtained</option><option value="Driver licence obtained">Driver's licence obtained</option></select></label><span>Promotional consent is not editable here. In production it must be backed by a recorded customer opt-in and withdrawal history.</span></div>
      <div className="crm-events">{history.length?history.map((event,i)=><div key={`${event.label}-${i}`}><time>{event.date}</time><p>{event.label}</p></div>):<p className="muted">No activity recorded.</p>}{(notes[customer.id]||[]).map((text,i)=><div key={`n-${i}`}><time>Session note</time><p>{text}</p></div>)}</div>
      <form className="crm-note-form" onSubmit={addNote}><label>Internal follow-up note (demo only)<input value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. Ask about a suitable driving lesson package" maxLength={200}/></label><button className="btn btn-primary" type="submit" disabled={!note.trim()}>Add sample note</button></form>
    </section>}
    {notice&&<p className="crm-notice" role="status">{notice}</p>}
  </div>;
}
