import type { CSSProperties } from 'react';
import Image from 'next/image';
import Chapter from './Chapter';
import { looks, palette } from '@/lib/content';

export default function Attire() {
  return (
    <Chapter
      id="attire"
      number="03"
      title={
        <>
          What to <em>Wear</em>
        </>
      }
      side={<p className="chapter-note">Garden formal. Comfortable enough to dance in, dressed enough for a wedding.</p>}
    >
      <p className="drop reveal">
        Garden formal, with a 1920s lean. Think linen suits, waistcoats, flat caps, tea-length and
        flowing gowns. Encouraged, never required.
      </p>
      <div className="palette reveal" role="list" aria-label="Suggested colour palette">
        {palette.map((c) => (
          <div className="swatch" role="listitem" key={c.name}>
            <span style={{ '--c': c.hex, '--b': c.border } as CSSProperties} />
            <b>{c.name}</b>
          </div>
        ))}
      </div>
      <h3 className="sub reveal">Outfit inspiration</h3>
      <ul className="looks reveal">
        {looks.map((l) => (
          <li className="look" key={l.src}>
            <Image src={l.src} alt={l.alt} width={600} height={800} sizes="(min-width: 720px) 12rem, 45vw" loading="lazy" />
            <span>{l.label}</span>
          </li>
        ))}
      </ul>
      <p className="fine reveal">Please avoid white and ivory — those are for the bride.</p>
    </Chapter>
  );
}
