'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { event } from '@/lib/content';
import type { Guest } from '@/lib/guests';

export const PROMPT_SKIPPED = 'rsvp-prompt-skipped';

type Status = 'idle' | 'sending' | 'accepted' | 'declined';

export default function RsvpPrompt({ guest, onClose }: { guest: Guest; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');
  const [seats, setSeats] = useState(guest.seats);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const base = `/i/${guest.code}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  function skip() {
    try {
      sessionStorage.setItem(PROMPT_SKIPPED, '1');
    } catch {}
    onClose();
  }

  async function submit() {
    if (!attending) return setError('Please choose one so we can plan your seat.');
    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: guest.code, attending, guests: seats, contact: '', message: '' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus(attending === 'yes' ? 'accepted' : 'declined');
    } catch {
      setStatus('idle');
      setError('Something went wrong sending your reply. You can try again, or respond later from the RSVP page.');
    }
  }

  const done = status === 'accepted' || status === 'declined';

  return (
    <dialog
      ref={dialogRef}
      className="prompt"
      aria-labelledby="prompt-title"
      onCancel={(e) => {
        e.preventDefault();
        if (done) onClose();
        else skip();
      }}
    >
      <div className="prompt-card">
        {done ? (
          <>
            <span className="chapter-no">Reply received</span>
            <h2 className="prompt-title" id="prompt-title">
              {status === 'accepted' ? (
                <>
                  See you <em>there.</em>
                </>
              ) : (
                <>
                  We will <em>miss you.</em>
                </>
              )}
            </h2>
            <p className="prompt-lede">
              {status === 'accepted'
                ? 'Your seat is saved. Leave us a note or a contact number any time on the RSVP page.'
                : 'Thank you for letting us know. If plans change, you can update your reply on the RSVP page.'}
            </p>
            <div className="prompt-actions">
              <button className="btn btn-terracotta" type="button" onClick={onClose} autoFocus>
                Open the invitation
              </button>
              <Link className="link-arrow link-arrow-light" href={`${base}/rsvp`} onClick={onClose}>
                Add a note
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="chapter-no">Before you begin</span>
            <h2 className="prompt-title" id="prompt-title">
              {firstName(guest.name)}, will you <em>join us?</em>
            </h2>
            <p className="prompt-lede">
              {event.dateLabel} in Talisay City. We have reserved{' '}
              <strong>{guest.seats === 1 ? 'one seat' : `${guest.seats} seats`}</strong> for you. Kindly reply by{' '}
              {event.rsvpBy}.
            </p>

            <div className="prompt-choices" role="radiogroup" aria-label="Will you attend?">
              <button
                type="button"
                role="radio"
                aria-checked={attending === 'yes'}
                className={attending === 'yes' ? 'is-on' : undefined}
                onClick={() => setAttending('yes')}
              >
                <b>Joyfully accept</b>
                <span>We will be there</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={attending === 'no'}
                className={attending === 'no' ? 'is-on' : undefined}
                onClick={() => setAttending('no')}
              >
                <b>Regretfully decline</b>
                <span>We cannot make it</span>
              </button>
            </div>

            {attending === 'yes' && guest.seats > 1 && (
              <label className="prompt-seats">
                <span>Seats you are confirming</span>
                <select value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
                  {Array.from({ length: guest.seats }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <div className="prompt-actions">
              <button className="btn btn-terracotta" type="button" onClick={submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send my reply'}
              </button>
              <button className="link-arrow link-arrow-light" type="button" onClick={skip}>
                Decide later
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

function firstName(full: string) {
  if (full.includes('&') || /^the\s/i.test(full)) return full;
  return full.split(/\s+/)[0];
}
