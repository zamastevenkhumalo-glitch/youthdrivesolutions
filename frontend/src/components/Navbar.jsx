import { useEffect, useState } from 'react';
import Icon from './Icon';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Get Started', href: '#get-started' },
  { label: 'Fees', href: '#fees' },
  { label: 'K53 Academy', href: '#academy' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="shell header-inner">
        <a className="brand" href="#home" onClick={() => setIsOpen(false)} aria-label="YouthDrive Solutions home">
          <img src="/images/logo.jpg" alt="YouthDrive Solutions" />
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <Icon name={isOpen ? 'close' : 'menu'} size={27} />
        </button>
        <nav id="site-navigation" className={`main-nav${isOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setIsOpen(false)}>{label}</a>
          ))}
          <a className="nav-mobile-cta" href="#get-started" onClick={() => setIsOpen(false)}>Send an enquiry</a>
        </nav>
      </div>
    </header>
  );
}
