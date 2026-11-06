import Icon from './Icon';

import { LEARNER_URL } from '../contact';

const services = [
  {
    id: 'lessons',
    icon: 'car',
    heading: 'Driving Lessons',
    description: 'Professional, friendly lessons for all experience levels.',
    href: '#book-lesson',
  },
  {
    icon: 'book',
    heading: 'K53 Study Hub',
    description: 'Interactive learning tools to help you master the K53.',
    href: LEARNER_URL,
    external: true,
  },
  {
    icon: 'checklist',
    heading: 'Vehicle Hire for Test',
    description: 'Ask about vehicle hire for your driving test.',
    href: '#book-lesson',
  },
  {
    id: 'licensing',
    icon: 'document',
    heading: 'Licensing Assistance',
    description: "Get guidance with your learner’s and driver’s licence.",
    href: '#contact',
  },
];

export default function Services() {
  return (
    <section className="services-strip" aria-label="Explore YouthDrive services">
      <div className="shell services-grid">
        {services.map(({ id, icon, heading, description, href, external }) => (
          <a
            className="service-tile"
            href={href}
            key={heading}
            id={id}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="tile-icon"><Icon name={icon} size={29} /></span>
            <span className="tile-content"><strong>{heading}</strong><span>{description}</span></span>
            <span className="tile-arrow"><Icon name="chevronRight" size={19} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
