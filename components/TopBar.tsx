'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { chapters } from '@/lib/chapters';

type Props = { base: string; current?: string; hasHero?: boolean };

export default function TopBar({ base, current, hasHero }: Props) {
  const [solid, setSolid] = useState(!hasHero);

  useEffect(() => {
    if (!hasHero) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { threshold: 0.2 });
    io.observe(hero);
    return () => io.disconnect();
  }, [hasHero]);

  const home = base || '/';

  return (
    <header className={`topbar${solid ? ' is-solid' : ''}`}>
      <Link className="topbar-mark" href={home} aria-label="Back to the invitation">
        A<span>&amp;</span>A
      </Link>
      <nav className="topbar-nav" aria-label="Pages">
        {!hasHero && (
          <Link href={`${home}#chapters`} className="topbar-contents">
            Contents
          </Link>
        )}
        {chapters
          .filter((c) => c.slug !== 'rsvp')
          .map((c) => (
            <Link
              key={c.slug}
              href={`${base}/${c.slug}`}
              className={current === c.slug ? 'is-active' : undefined}
              aria-current={current === c.slug ? 'page' : undefined}
            >
              {c.nav}
            </Link>
          ))}
        <Link href={`${base}/rsvp`} className="topbar-cta" aria-current={current === 'rsvp' ? 'page' : undefined}>
          RSVP
        </Link>
      </nav>
    </header>
  );
}
