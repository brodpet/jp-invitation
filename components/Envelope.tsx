'use client';

import { useEffect, useState } from 'react';
import { couple } from '@/lib/content';

type Phase = 'sealed' | 'opening' | 'fading' | 'gone';

export default function Envelope({ guestName }: { guestName?: string }) {
  const [phase, setPhase] = useState<Phase>('sealed');

  useEffect(() => {
    if (phase === 'gone') {
      document.body.classList.remove('is-sealed');
      return;
    }
    document.body.classList.add('is-sealed');
    return () => document.body.classList.remove('is-sealed');
  }, [phase]);

  useEffect(() => {
    // Deep links (e.g. #rsvp shared in a message) go straight to the content.
    if (window.location.hash && window.location.hash !== '#hero') setPhase('gone');
  }, []);

  function open() {
    if (phase !== 'sealed') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return setPhase('gone');
    setPhase('opening');
    setTimeout(() => setPhase('fading'), 2300);
    setTimeout(() => setPhase('gone'), 3200);
  }

  if (phase === 'gone') return null;

  const cls = ['envelope', phase !== 'sealed' && 'is-open', phase === 'fading' && 'is-fading']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} role="dialog" aria-label="Your invitation" aria-modal="true">
      <div className="env-paper">
        {/* The card inside the envelope; rises out once the flap is open */}
        <div className="env-card" aria-hidden="true">
          <span className="env-card-mono">
            A<em>&amp;</em>A
          </span>
          <span className="env-card-line">{couple.short}</span>
          <span className="env-card-sub">09 · 01 · 2027 · Talisay City, Cebu</span>
        </div>

        <div className="env-flap">
          <div className="env-flap-face" />
        </div>

        <button className="seal" type="button" onClick={open} aria-label="Break the seal and open the invitation">
          <span className="seal-half seal-left" aria-hidden="true">
            <span className="seal-mono">
              A<em>&amp;</em>A
            </span>
          </span>
          <span className="seal-half seal-right" aria-hidden="true">
            <span className="seal-mono">
              A<em>&amp;</em>A
            </span>
          </span>
        </button>

        <div className="env-text">
          <p className="env-to">
            <span className="eyebrow">{guestName ? 'Hand-delivered to' : 'From Antonio & Axzel'}</span>
            <span className="env-name">{guestName ?? 'Our dearest guest'}</span>
          </p>
          <p className="env-invited">You’re invited</p>
          <p className="envelope-hint">Tap the seal to open</p>
        </div>

        <button className="envelope-skip" type="button" onClick={open}>
          Skip
        </button>
      </div>
    </div>
  );
}
