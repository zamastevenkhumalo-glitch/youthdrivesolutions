import { useState } from 'react';
import Icon from './Icon';

const stakeholderEmail = 'business@youthdrivesolutions.co.za';

const principles = [
  { title: 'We Empower', description: 'Driver education, youth development and practical skills that can open pathways to opportunity.' },
  { title: 'We Develop', description: 'Community engagement, road-safety awareness and programmes built around local needs.' },
  { title: 'We Connect', description: 'Bringing schools, organisations, communities and potential partners into conversation.' },
];

const areas = [
  {
    id: 'community-impact',
    number: '01',
    title: 'Corporate Social Responsibility & Social Impact',
    summary: 'Community upliftment and practical opportunities for young people, grounded in safer roads and useful skills.',
    focus: [
      'Youth empowerment, driver education and skills development',
      'Community road-safety awareness and scholar patrol initiatives',
      'Training support for disadvantaged youth and employment-readiness pathways',
      'Collaboration opportunities with schools, NGOs and local organisations',
    ],
  },
  {
    id: 'community-outreach',
    number: '02',
    title: 'Marketing, Public Relations & Community Relations',
    summary: 'Building trust by meeting communities where they are and sharing genuine activities and outcomes.',
    focus: [
      'Community activations and roadshows, including potential outreach in Soweto, Langlaagte and Southdale',
      'Road-safety campaigns and public awareness events',
      'Documented community stories, photos and testimonials',
      'Local media, radio and community communication',
    ],
  },
  {
    id: 'community-partnerships',
    number: '03',
    title: 'Business Development & Strategic Partnerships',
    summary: 'Creating opportunities for programmes, institutional collaboration, sponsorship and shared community impact.',
    focus: [
      'Corporate training and youth-development partnerships',
      'Potential collaboration with government programmes, NYDA and transport-sector stakeholders',
      'TVET colleges, schools, training providers and community organisations',
      'Sponsorship, funding and programme-development discussions',
    ],
  },
];

const pathways = [
  { title: 'Youth & skills development', description: 'Support learning, practical training and routes towards workplace readiness.' },
  { title: 'Road safety & scholar patrols', description: 'Explore school and community safety education, equipment and awareness activities.' },
  { title: 'Institutional programmes', description: 'Discuss projects with schools, NGOs, companies and public-sector organisations.' },
];

const enquiryTypes = [
  'Community outreach programme',
  'Youth skills development',
  'Road safety or scholar patrol',
  'Sponsorship or funding',
  'Corporate or institutional partnership',
  'Media or community relations',
  'Other collaboration',
];

export default function CommunityDevelopment() {
  const [name, setName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');

  function prepareEnquiry(event) {
    event.preventDefault();
    const subject = `YDS stakeholder enquiry: ${interest}`;
    const body = [
      'Hello Youth Drive Solutions,',
      '',
      'I would like to discuss a community development or partnership opportunity.',
      '',
      `Name: ${name.trim()}`,
      `Organisation: ${organisation.trim() || 'Individual'}`,
      `Email: ${email.trim()}`,
      `Area of interest: ${interest}`,
      '',
      `Enquiry: ${message.trim()}`,
      '',
      'Kind regards,',
      name.trim(),
    ].join('\n');
    window.location.href = `mailto:${stakeholderEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="yd-section yd-community" id="community" aria-labelledby="community-heading">
      <div className="shell">
        <div className="yd-section-top yd-community-heading">
          <div>
            <p className="yd-kicker">COMMUNITY DEVELOPMENT &amp; STAKEHOLDER ENGAGEMENT</p>
            <h2 id="community-heading">Finding a way forward, <span>together.</span></h2>
          </div>
          <p className="yd-section-intro">Youth Drive Solutions connects driver education with youth empowerment, road safety and opportunities for meaningful collaboration.</p>
        </div>

        <div className="yd-community-principles" aria-label="Our approach">
          {principles.map((item, index) => (
            <article key={item.title} className="yd-community-principle">
              <span className="yd-community-principle-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <nav className="yd-community-nav" aria-label="Explore community development">
          <a href="#community-impact">Social impact</a>
          <a href="#community-outreach">Outreach programmes</a>
          <a href="#community-youth">Youth development</a>
          <a href="#community-road-safety">Road safety</a>
          <a href="#community-stories">Community stories</a>
          <a href="#community-partnerships">Strategic partnerships</a>
          <a href="#community-sponsorship">Sponsorship</a>
          <a href="#community-enquiry">Become a partner</a>
        </nav>

        <div className="yd-community-areas">
          {areas.map((area) => (
            <article className="yd-community-area" id={area.id} key={area.id}>
              <span className="yd-community-area-number">{area.number} / COMMUNITY DEVELOPMENT</span>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <ul>{area.focus.map((item) => <li key={item}><Icon name="check" size={17}/><span>{item}</span></li>)}</ul>
            </article>
          ))}
        </div>

        <div className="yd-community-programmes" id="community-youth">
          <div className="yd-community-programmes-heading">
            <p className="yd-kicker">YOUTH DEVELOPMENT &amp; ROAD SAFETY</p>
            <h3>Community-centred <span>programmes.</span></h3>
            <p>Explore programme areas where YouthDrive and participating organisations can build practical initiatives together.</p>
          </div>
          <div className="yd-community-programme-list" id="community-road-safety">
            {pathways.map((pathway) => (
              <article key={pathway.title}>
                <h4>{pathway.title}</h4>
                <p>{pathway.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="yd-community-story" id="community-stories">
          <figure>
            <img src="/images/gallery3.jpg" alt="Group of young people at a licensing centre" loading="lazy" />
            <figcaption>Community moments · Licensing-centre visit</figcaption>
          </figure>
          <div className="yd-community-story-copy">
            <p className="yd-kicker">COMMUNITY STORIES &amp; TESTIMONIALS</p>
            <h3>People are at the heart of <span>the journey.</span></h3>
            <p>We believe community programmes should be shown through real people, documented activities and genuine feedback—not just promises.</p>
            <p>Explore YouthDrive's photographic gallery and get in touch to share a community experience or discuss an outreach initiative.</p>
            <a href="#fleet" className="yd-text-link">Explore our gallery <Icon name="arrowRight" size={18}/></a>
          </div>
        </div>

        <div className="yd-community-measure" aria-label="Community impact measurement areas">
          <div>
            <p className="yd-kicker">MEASURING WHAT MATTERS</p>
            <h3>Meaningful impact deserves <span>evidence.</span></h3>
            <p>Programme reports can track these outcomes as activities are delivered and verified.</p>
          </div>
          <ul>
            <li>People trained or reached</li>
            <li>Road-safety sessions delivered</li>
            <li>Community and school engagements</li>
            <li>Skills and programme outcomes</li>
          </ul>
        </div>

        <div className="yd-community-sponsorship" id="community-sponsorship">
          <div>
            <p className="yd-kicker">SPONSORSHIP &amp; FUNDING OPPORTUNITIES</p>
            <h3>Build a programme with <span>purpose.</span></h3>
            <p>Schools, companies, development organisations and potential sponsors can speak to YouthDrive about training support, road-safety projects and community initiatives.</p>
          </div>
          <a className="button button-primary" href="#community-enquiry">Explore a partnership <Icon name="arrowUpRight" size={18}/></a>
        </div>

        <div className="yd-community-enquiry" id="community-enquiry">
          <div className="yd-community-enquiry-intro">
            <p className="yd-kicker">LET'S TALK PARTNERSHIP</p>
            <h3>Become part of <span>the way forward.</span></h3>
            <p>Tell us about your organisation and the opportunity you'd like to explore. The YouthDrive team can discuss whether a suitable collaboration is possible.</p>
            <a href={`mailto:${stakeholderEmail}`}>{stakeholderEmail}</a>
          </div>
          <form onSubmit={prepareEnquiry} className="yd-community-enquiry-form">
            <div className="yd-community-form-row">
              <label>Your name <input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} maxLength={100} placeholder="Contact person" autoComplete="name" /></label>
              <label>Organisation (optional) <input value={organisation} onChange={(event) => setOrganisation(event.target.value)} maxLength={150} placeholder="Organisation or institution" autoComplete="organization" /></label>
            </div>
            <label>Email address <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={160} placeholder="you@example.com" autoComplete="email" /></label>
            <label>Area of interest <select required value={interest} onChange={(event) => setInterest(event.target.value)}>
              <option value="" disabled>Select an area</option>
              {enquiryTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select></label>
            <label>How would you like to collaborate? <textarea value={message} onChange={(event) => setMessage(event.target.value)} required minLength={10} maxLength={1500} rows={4} placeholder="Briefly describe the proposed programme or partnership" /></label>
            <button type="submit" className="button button-primary">Prepare partnership enquiry <Icon name="arrowUpRight" size={18}/></button>
            <p className="yd-community-email-note">Your email application will open with a prepared message. Review and send it to complete your enquiry.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
