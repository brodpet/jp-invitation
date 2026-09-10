'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#story', label: 'Story' },
  { href: '#details', label: 'Details' },
  { href: '#attire', label: 'Attire' },
  { href: '#entourage', label: 'Entourage' },
  { href: '#gallery', label: 'Gallery' },
];

export default function TopBar() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const heroIo = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { threshold: 0.2 });
    heroIo.observe(hero);

    const sectionIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    [...links, { href: '#rsvp' }].forEach((l) => {
      const s = document.querySelector(l.href);
      if (s) sectionIo.observe(s);
    });
    return () => {
      heroIo.disconnect();
      sectionIo.disconnect();
    };
  }, []);

  return (
    <header className={`topbar${solid ? ' is-solid' : ''}`}>
      <a className="topbar-mark" href="#hero">
        A<span>&amp;</span>A
      </a>
      <nav className="topbar-nav" aria-label="Sections">
        {links.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : undefined}>
            {l.label}
          </a>
        ))}
        <a href="#rsvp" className="topbar-cta">
          RSVP
        </a>
      </nav>
    </header>
  );
}
