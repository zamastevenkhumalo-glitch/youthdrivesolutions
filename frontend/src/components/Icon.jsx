export default function Icon({ name, size = 22, strokeWidth = 1.9, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };

  const icons = {
    arrowRight: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    arrowUpRight: <><path d="M6 18 18 6" /><path d="M8 6h10v10" /></>,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>,
    car: <><path d="m5 11 1.8-5a2 2 0 0 1 1.9-1.4h6.6A2 2 0 0 1 17.2 6l1.8 5" /><path d="M5 17H4a1 1 0 0 1-1-1v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1H5Z" /><path d="M6 17v2h2v-2m8 0v2h2v-2M7 14h.01M17 14h.01" /></>,
    book: <><path d="M12 6C9.5 4 6.5 3.6 3 4v14c3.5-.4 6.5 0 9 2" /><path d="M12 6c2.5-2 5.5-2.4 9-2v14c-3.5-.4-6.5 0-9 2V6Z" /></>,
    checklist: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9zM8.5 11l1.5 1.5 2.4-2.5M14.5 11H16M8.5 16l1.5 1.5 2.4-2.5M14.5 16H16" /></>,
    document: <><path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M8 15h.01M12 15h.01M16 15h.01" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return <svg {...common}>{icons[name] || icons.arrowRight}</svg>;
}
