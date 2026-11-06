import Icon from './Icon';
const categories = [
  {title:'Learner’s licences', items:['Learner’s licence bookings','Test preparation','Learner’s licence assistance']},
  {title:'Driver’s licences', items:['Code B driving lessons','Driving test bookings','Driving licence renewals']},
  {title:'Other licensing services', items:['Professional driving permits (PrDP)','Duplicate licence cards','Temporary driving licences']},
];
export default function PriceGuide() {
  return <section className="yd-section yd-prices" id="fees" aria-labelledby="fees-heading"><div className="shell">
    <div className="yd-section-top"><div><p className="yd-kicker">PRICING &amp; FEES</p><h2 id="fees-heading">Know your <span>next step.</span></h2></div><p className="yd-section-intro">Service costs depend on the licence type, location and assistance required. Contact YouthDrive for an accurate quote before proceeding.</p></div>
    <div className="yd-price-categories">{categories.map(cat=><article className="yd-price-category" key={cat.title}><h3>{cat.title}</h3><ul>{cat.items.map(v=><li key={v}><Icon name="check" size={17}/>{v}</li>)}</ul><a className="yd-text-link" href="#get-started">Request a quote <Icon name="arrowRight" size={18}/></a></article>)}</div>
    <p className="yd-price-note">Official licensing fees and YouthDrive service charges may be separate. Confirm the applicable costs before payment.</p>
  </div></section>;
}
