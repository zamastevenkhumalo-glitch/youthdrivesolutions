import { HERO_SLIDES } from '../heroSlides';

export default function HeroBackgroundSlideshow({ activeSlide = 0 }) {
  return (
    <div className="site-background-slideshow" aria-hidden="true">
      {HERO_SLIDES.map((slide, index) => (
        <div
          className={`background-slide${index === activeSlide ? ' is-active' : ''}`}
          key={slide.image}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}
    </div>
  );
}
