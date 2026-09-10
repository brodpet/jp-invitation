'use client';

import { useEffect, useRef, useState } from 'react';
import { couple } from '@/lib/content';

type Phase = 'sealed' | 'opening' | 'gone';

export default function Envelope({ guestName }: { guestName?: string }) {
  const [phase, setPhase] = useState<Phase>('sealed');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isGone = phase === 'gone';

  useEffect(() => {
    // Personal RSVP links should still go straight to their destination.
    if (window.location.hash && window.location.hash !== '#hero') {
      setPhase('gone');
      return;
    }
    if (isGone) return;

    const dialog = dialogRef.current;
    document.body.classList.add('is-sealed');
    dialog?.showModal();
    dialog?.focus({ preventScroll: true });

    return () => {
      dialog?.close();
      document.body.classList.remove('is-sealed');
    };
  }, [isGone]);

  useEffect(() => {
    if (phase !== 'opening') return;
    // Match the reference: lift for 1.8s, then dissolve into the invitation.
    // A fallback also completes the intro if animation events are interrupted.
    const timeout = window.setTimeout(() => setPhase('gone'), 2300);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (isGone && (!window.location.hash || window.location.hash === '#hero')) {
      const main = document.getElementById('main');
      main?.focus({ preventScroll: true });
    }
  }, [isGone]);

  function open() {
    if (phase !== 'sealed') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return setPhase('gone');
    setPhase('opening');
  }

  if (phase === 'gone') return null;

  return (
    <dialog
      ref={dialogRef}
      className={`envelope${phase === 'opening' ? ' is-open' : ''}`}
      aria-label={`Your invitation from ${couple.short}`}
      aria-describedby="envelope-hint"
      onCancel={(event) => {
        event.preventDefault();
        setPhase('gone');
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'envelope-reveal') {
          setPhase('gone');
        }
      }}
    >
      <div className="envelope-paper" aria-hidden="true" />
      <div className="envelope-shadow" aria-hidden="true" />
      <div className="envelope-perspective">
        <div className="envelope-flap">
          <div className="envelope-flap-paper" aria-hidden="true" />
          <button
            className="seal"
            type="button"
            onClick={open}
            aria-disabled={phase === 'opening'}
            aria-label="Lift the seal and open the invitation"
          >
            <span className="seal-rim" aria-hidden="true">
              <span className="seal-mono"><span>A</span><span>A</span></span>
              <svg className="seal-flourish" viewBox="0 0 100 100" fill="none">
                <path d="M24 61C7 47 40 46 58 66S91 73 79 55M26 29C57 14 78 47 60 58S25 79 27 56M33 71C24 88 17 65 43 53" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="envelope-address">
        <p className="envelope-invited">You are invited</p>
        {guestName && <p className="envelope-guest">{guestName}</p>}
      </div>
      <p className="envelope-hint" id="envelope-hint">Tap the seal to open</p>
      <button className="envelope-skip" type="button" onClick={() => setPhase('gone')}>
        Skip
      </button>
    </dialog>
  );
}
