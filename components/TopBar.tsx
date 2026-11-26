'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { chapters } from '@/lib/chapters';

type Props = { base: string; current?: string; hasHero?: boolean };

export default function TopBar({ base, current, hasHero }: Props) {
  const [solid, setSolid] = useState(!hasHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasHero) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { threshold: 0, rootMargin: '-72px 0px 0px 0px' });
    io.observe(hero);
    return () => io.disconnect();
  }, [hasHero]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const home = base || '/';
  const close = () => setOpen(false);

  return (
    <header className={`topbar${solid || open ? ' is-solid' : ''}${current ? ' on-photo' : ''}`}>
      <div className="wrap topbar-inner">
        <Link className="topbar-mark" href={home} aria-label="Back to the invitation" onClick={close}>
          A<span>&amp;</span>A
        </Link>
        <nav className={`topbar-nav${open ? ' is-open' : ''}`} id="site-menu" aria-label="Pages">
          {current && (
            <Link href={`${home}#chapters`} onClick={close}>
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
                onClick={close}
              >
                {c.nav}
              </Link>
            ))}
        </nav>
        <div className="topbar-end">
          <Link href={`${base}/rsvp`} className="btn btn-ink btn-sm" aria-current={current === 'rsvp' ? 'page' : undefined} onClick={close}>
            RSVP
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
