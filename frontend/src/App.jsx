import { useEffect, useState } from 'react';
import { HERO_SLIDES, HERO_SLIDE_DURATION_MS } from './heroSlides';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import HeroBackgroundSlideshow from './components/HeroBackgroundSlideshow';
import FullServices from './components/FullServices';
import GetStarted from './components/GetStarted';
import PriceGuide from './components/PriceGuide';
import MoreSections from './components/MoreSections';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, LEARNER_URL } from './contact';
import './App.css';
import './sections.css';

export default function App(){
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let cancelled = false;
    let intervalId;

    // Decode each slide before starting the timer so the photo cannot appear
    // later than its matching headline on the first rotation.
    const preload = (src) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        if (typeof image.decode === 'function') {
          image.decode().then(() => resolve(true)).catch(() => resolve(true));
        } else {
          resolve(true);
        }
      };
      image.onerror = () => resolve(false);
      image.src = src;
    });

    Promise.all(HERO_SLIDES.map((slide) => preload(slide.image))).then((results) => {
      if (cancelled || results.includes(false)) return;
      intervalId = window.setInterval(() => {
        setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
      }, HERO_SLIDE_DURATION_MS);
    });

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return <><Navbar/><main>
  <HeroBackgroundSlideshow activeSlide={activeSlide}/><Hero activeSlide={activeSlide}/><Services/><Booking/>
  <div className="business-content"><FullServices/><GetStarted/><PriceGuide/><MoreSections/></div>
</main><footer className="site-footer"><div className="shell expanded-footer"><div><img className="footer-logo" src="/images/logo.jpg" alt="YouthDrive Solutions" loading="lazy"/><p>Driving today for a brighter tomorrow.</p><a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a></div><div><strong>Explore</strong><a href="#services">Services</a><a href="#get-started">Get started</a><a href="#fees">Pricing</a><a href="#vehicles">Vehicle sourcing</a><a href="#fleet">Fleet &amp; gallery</a><a href="#community">Community development</a></div><div><strong>Learning &amp; support</strong><a href={LEARNER_URL}>K53 learner portal</a><a href="#about">About YouthDrive</a><a href="#contact">Contact</a></div></div><div className="shell footer-copyright">© {new Date().getFullYear()} YouthDrive Solutions. All rights reserved.</div></footer></>}
