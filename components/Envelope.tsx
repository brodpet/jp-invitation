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
    setTimeout(() => setPhase('fading'), 900);
    setTimeout(() => setPhase('gone'), 1700);
  }

  if (phase === 'gone') return null;

  const cls = ['envelope', phase !== 'sealed' && 'is-open', phase === 'fading' && 'is-fading']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} role="dialog" aria-label="Your invitation" aria-modal="true">
      <div className="envelope-inner">
        <p className="envelope-addressee">
          <span className="eyebrow">{guestName ? 'Hand-delivered to' : 'You are invited'}</span>
          <span className="envelope-name">{guestName ?? couple.short}</span>
        </p>
        <div className="env">
          <div className="env-back" />
          <div className="env-card">
            <span className="env-card-line">{couple.short}</span>
            <span className="env-card-sub">25 · 07 · 2026</span>
          </div>
          <div className="env-front" />
          <div className="env-flap" />
          <button
            className="seal"
            type="button"
            onClick={open}
            aria-label="Break the seal and open the invitation"
          >
            <span className="seal-mono">
              A<em>&amp;</em>A
            </span>
          </button>
        </div>
        <p className="envelope-hint">Tap the seal to open</p>
        <button className="envelope-skip" type="button" onClick={open}>
          Skip
        </button>
      </div>
    </div>
  );
}
