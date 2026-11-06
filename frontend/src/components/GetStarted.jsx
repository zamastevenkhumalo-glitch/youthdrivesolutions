import { useState } from 'react';
import Icon from './Icon';
import { whatsappLink } from '../contact';

const serviceChoices = [
  ['Learner’s & driver training','Practical driving lessons and learner preparation'],
  ['Queue for you Registration','Queue, vehicle registration and document assistance'],
  ['PrDP assistance','Professional driving permit enquiries'],
  ['Licence booking or renewal','Learner and driver licence services'],
  ['Vehicle hire for test','Enquire about an available test vehicle'],
  ['Roadside assistance','Help with roadside services'],
  ['Vehicle sourcing / sales','Tell us which car you are looking for'],
  ['Community programmes & partnerships','Youth development, road safety or stakeholder engagement enquiries'],
];

export default function GetStarted() {
  const [service, setService] = useState(serviceChoices[0][0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const current = serviceChoices.find(([title]) => title === service);

  function submit(event) {
    event.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, '').length < 9) {
      setError('Please enter your name and a valid contact number.');
      return;
    }
    setError('');
    const content = [
      'Hello YouthDrive Solutions, I would like to enquire about a service.',
      `Service: ${service}`,
      `Name: ${name.trim()}`,
      `Contact number: ${phone.trim()}`,
      message.trim() ? `Additional details: ${message.trim()}` : '',
    ].filter(Boolean).join('\n');
    window.open(whatsappLink(content), '_blank', 'noopener,noreferrer');
  }

  return <section className="yd-section yd-start" id="get-started" aria-labelledby="start-heading">
    <div className="shell yd-start-layout">
      <div className="yd-start-copy">
        <p className="yd-kicker">GET STARTED</p>
        <h2 id="start-heading">Tell us what you <span>need help with.</span></h2>
        <p>Choose a service and send your request directly to the YouthDrive team. We'll help you understand the next steps.</p>
        <div className="yd-steps-mini"><span>01 <strong>Choose a service</strong></span><span>02 <strong>Send your request</strong></span></div>
      </div>
      <form className="yd-start-card" onSubmit={submit}>
        <div className="yd-start-title"><strong>Service enquiry</strong><span>Talk to YouthDrive</span></div>
        <div className="yd-choice-list" role="radiogroup" aria-label="Choose YouthDrive service">
          {serviceChoices.map(([title]) => <label className={`yd-choice${service === title ? ' is-selected' : ''}`} key={title}>
            <input type="radio" name="ydService" value={title} checked={service === title} onChange={() => setService(title)} />
            <span>{title}</span>{service === title && <Icon name="check" size={20} />}
          </label>)}
        </div>
        <div className="yd-selected-service"><span className="yd-selected-label">SELECTED SERVICE</span><strong>{service}</strong><p>{current?.[1]}</p></div>
        <div className="yd-form-grid">
          <label>Your name <input autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={e => setName(e.target.value)} placeholder="Full name" /></label>
          <label>Phone number <input type="tel" autoComplete="tel" required maxLength={25} value={phone} onChange={e => setPhone(e.target.value)} placeholder="Contact number" /></label>
          <label className="yd-form-wide">Tell us more (optional) <textarea maxLength={500} value={message} onChange={e => setMessage(e.target.value)} placeholder="Preferred area, licence code or what you need" rows={3}/></label>
        </div>
        {error && <p className="yd-form-error" role="alert">{error}</p>}
        <button type="submit" className="button button-primary yd-full-button">Send enquiry on WhatsApp <Icon name="arrowUpRight" size={19} /></button>
        <p className="yd-form-note">Your message opens in WhatsApp for review before sending. Your enquiry is not a confirmed booking.</p>
      </form>
    </div>
  </section>;
}
