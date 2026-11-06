import { useState } from 'react';
import Icon from './Icon';
import { whatsappLink } from '../contact';

const todayLocal = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  return `${yyyy}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
};

export default function Booking() {
  const [licence, setLicence] = useState('');
  const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  function submit(event) {
    event.preventDefault();
    const message = `Hello YouthDrive Solutions, I'd like to request a driving lesson.\nLicence code: ${licence}\nPreferred area: ${area.trim()}\nPreferred date: ${date}\nPlease let me know the available times and pricing.`;
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
  }
  return <section className="booking-section" id="book-lesson" aria-labelledby="booking-heading">
    <div className="shell booking-panel">
      <div className="booking-intro"><span className="booking-map-icon"><Icon name="pin" size={29}/></span><span><small>GET STARTED TODAY</small><h2 id="booking-heading">Find a lesson near you</h2></span></div>
      <form className="booking-form" onSubmit={submit}>
        <label className="booking-field" htmlFor="lesson-type"><span>Licence Type</span><select id="lesson-type" value={licence} onChange={e=>setLicence(e.target.value)} required><option value="" disabled>Select licence type</option><option>Code B</option><option>Other / enquire</option></select></label>
        <label className="booking-field" htmlFor="area"><span>Area</span><input id="area" type="text" placeholder="Enter your area" required maxLength={80} value={area} onChange={e=>setArea(e.target.value)} /></label>
        <label className="booking-field" htmlFor="preferred-date"><span>Preferred Date</span><input id="preferred-date" type="date" required min={todayLocal()} value={date} onChange={e=>setDate(e.target.value)} /></label>
        <button className="button booking-submit" type="submit">Request Lesson <Icon name="arrowRight" size={22}/></button>
      </form>
    </div>
  </section>;
}
