'use client';

import { useEffect, useRef, useState } from 'react';
import { couple } from '@/lib/content';

type Phase = 'sealed' | 'opening' | 'gone';
const OPENED = 'envelope-opened';

export default function Envelope({ guestName, onDone }: { guestName?: string; onDone?: () => void }) {
  const [phase, setPhase] = useState<Phase>('sealed');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isGone = phase === 'gone';

  useEffect(() => {
    // Deep links go straight to their destination, and the envelope only opens once per visit.
    if ((window.location.hash && window.location.hash !== '#hero') || sessionStorage.getItem(OPENED)) {
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
    if (!isGone) return;
    if (!window.location.hash || window.location.hash === '#hero') {
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGone]);

  function open() {
    if (phase !== 'sealed') return;
    try {
      sessionStorage.setItem(OPENED, '1');
    } catch {}
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
    </dialog>
  );
}
