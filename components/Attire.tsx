import type { CSSProperties } from 'react';
import Chapter from './Chapter';
import { palette } from '@/lib/content';

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
      <p className="fine reveal">Please avoid white and ivory — those are for the bride.</p>
    </Chapter>
  );
}
