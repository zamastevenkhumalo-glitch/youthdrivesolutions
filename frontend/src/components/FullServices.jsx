import Icon from './Icon';
const catalogue = [
  { name: 'Learner’s & driver training', icon: 'car', details: 'Learner preparation, driving lessons and practical test support.', target: '#get-started' },
  { name: 'Licensing assistance', icon: 'document', details: 'Learner’s licences, driving licences and renewals.', target: '#get-started' },
  { name: 'Queue for you Registration', icon: 'checklist', details: 'Queue, vehicle registration and documentation assistance.', target: '#get-started' },
  { name: 'PrDP assistance', icon: 'document', details: 'Professional Driving Permit applications and enquiries.', target: '#get-started' },
  { name: 'Roadside assistance', icon: 'pin', details: 'Contact our team for roadside assistance enquiries.', target: '#get-started' },
  { name: 'Vehicle sourcing & sales', icon: 'car', details: 'Tell us about the car you are looking for.', target: '#vehicles' },
  { name: 'K53 learning', icon: 'book', details: 'Practice questions, study resources and progress tools.', target: '#academy' },
  { name: 'Community development', icon: 'document', details: 'Youth empowerment, road safety, outreach and strategic partnerships.', target: '#community' },
];
export default function FullServices() {return <section className="yd-section yd-services" id="services" aria-labelledby="services-heading"><div className="shell"><div className="yd-section-top"><div><p className="yd-kicker">WHAT YOUTHDRIVE OFFERS</p><h2 id="services-heading">Driving &amp; licensing support,<br/><span>all in one place.</span></h2></div><p className="yd-section-intro">From your first driving lesson to vehicle sourcing, explore the services available through YouthDrive Solutions.</p></div><div className="yd-service-grid">{catalogue.map((item,index)=><a href={item.target} className="yd-service-card" key={item.name}><span className="yd-service-card-top"><span className="yd-icon-puck"><Icon name={item.icon} size={26}/></span><span className="yd-card-number">{String(index+1).padStart(2,'0')}</span></span><h3>{item.name}</h3><p>{item.details}</p><span className="yd-service-cta">Explore service <Icon name="arrowRight" size={17}/></span></a>)}</div></div></section>}
