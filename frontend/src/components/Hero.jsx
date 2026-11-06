import Icon from './Icon';
import { LEARNER_URL } from '../contact';
import { HERO_SLIDES } from '../heroSlides';
import '../hero-messages.css';

export default function Hero({ activeSlide = 0 }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <div className="hero-message-stack">
            {HERO_SLIDES.map((slide, index) => (
              <div
                className={`hero-message-panel${index === activeSlide ? ' is-active' : ''}`}
                key={slide.image}
                aria-hidden={index !== activeSlide}
              >
                <p className="eyebrow">{slide.eyebrow}</p>
                <h1 id={index === activeSlide ? 'hero-heading' : undefined}>
                  {slide.heading[0]}<br />{slide.heading[1]}
                  <span className="lime-dot">.</span>
                </h1>
                <p className="hero-description">
                  {slide.description[0]}
                  <br className="desktop-only" /> {slide.description[1]}
                </p>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#book-lesson">
              Explore Lessons <Icon name="arrowRight" size={21} />
            </a>
            <a className="button button-glass" href={LEARNER_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="book" size={22} /> Launch K53 App
            </a>
          </div>
        </div>
      </div>

      <a className="next-step-card" href="#book-lesson" aria-label="Go to lesson enquiry">
        <span className="next-step-icon"><Icon name="calendar" size={27} /></span>
        <span className="next-step-copy"><small>NEXT STEP</small><strong>Book your first lesson</strong></span>
        <Icon name="chevronRight" size={20} className="next-step-arrow" />
      </a>
    </section>
  );
}
