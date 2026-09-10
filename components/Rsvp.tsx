'use client';

import { useState, type FormEvent } from 'react';
import Chapter from './Chapter';
import { event } from '@/lib/content';
import type { Guest } from '@/lib/guests';

type Status = 'idle' | 'sending' | 'accepted' | 'declined';

export default function Rsvp({ guest }: { guest?: Guest }) {
  const initial: Status = guest?.status === 'accepted' || guest?.status === 'declined' ? guest.status : 'idle';
  const [status, setStatus] = useState<Status>(initial);
  const [error, setError] = useState('');
  const maxSeats = guest?.seats ?? 1;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!guest) return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!data.attending) return setError('Please let us know whether you can attend.');

    setStatus('sending');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, code: guest.code }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus(data.attending === 'yes' ? 'accepted' : 'declined');
    } catch {
      setStatus('idle');
      setError('Something went wrong sending your reply. Please try again, or message us directly.');
    }
  }

  const done = status === 'accepted' || status === 'declined';

  if (!guest) {
    return (
      <Chapter
        id="rsvp"
        number="08"
        className="chapter-rsvp"
        title={
          <>
            Will you <em>join us?</em>
          </>
        }
        side={
          <p className="chapter-note">
            Kindly respond by <strong>{event.rsvpBy}</strong>. Seats are reserved by name.
          </p>
        }
      >
        <p className="rsvp-lede reveal">
          Your personal invitation has been sent. Open the link in your message to confirm your attendance.
        </p>
        <div className="rsvp-notice reveal">
          <span className="rsvp-notice-label">Have an invitation?</span>
          <p>Use the personal link sent to you to respond. If you can’t find it, message Antonio or Axzel and we’ll resend it.</p>
        </div>
      </Chapter>
    );
  }

  return (
    <Chapter
      id="rsvp"
      number="08"
      className="chapter-rsvp"
      title={
        <>
          {firstName(guest.name)}, will you <em>join us?</em>
        </>
      }
      side={
        <p className="chapter-note">
          Kindly respond by <strong>{event.rsvpBy}</strong>. We have reserved{' '}
          <strong>{guest.seats === 1 ? 'one seat' : `${guest.seats} seats`}</strong> for you.
        </p>
      }
    >
      {done ? (
        <div className="rsvp-done" tabIndex={-1}>
          <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {status === 'accepted' ? (
              <path d="M20 33l8 8 16-18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M22 22l20 20M42 22L22 42" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </svg>
          <h3>{status === 'accepted' ? 'See you there.' : 'We will miss you.'}</h3>
          <p>
            {status === 'accepted'
              ? 'Your reply has been recorded. We can’t wait to celebrate with you.'
              : 'Thank you for letting us know. You will be in our thoughts on the day.'}
          </p>
          <button className="link-arrow link-arrow-light" type="button" onClick={() => setStatus('idle')}>
            Change my reply
          </button>
        </div>
      ) : (
        <form className="rsvp-form reveal" onSubmit={onSubmit} noValidate>
          <div className="field">
            <span className="field-label">Responding as</span>
            <p className="field-static">{guest.name}</p>
          </div>
          <fieldset className="field">
            <legend>Will you attend?</legend>
            <div className="choices">
              <label>
                <input type="radio" name="attending" value="yes" required />
                <span>Joyfully accept</span>
              </label>
              <label>
                <input type="radio" name="attending" value="no" />
                <span>Regretfully decline</span>
              </label>
            </div>
          </fieldset>
          {maxSeats > 1 && (
            <div className="field field-half">
              <label htmlFor="f-guests">Seats you are confirming</label>
              <select id="f-guests" name="guests" defaultValue={String(maxSeats)}>
                {Array.from({ length: maxSeats }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="field">
            <label htmlFor="f-contact">
              Mobile or email <span className="opt">(so we can reach you)</span>
            </label>
            <input id="f-contact" name="contact" type="text" autoComplete="tel email" />
          </div>
          <div className="field">
            <label htmlFor="f-message">
              A note for the couple <span className="opt">(optional)</span>
            </label>
            <textarea id="f-message" name="message" rows={3} />
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-terracotta" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send our reply'}
          </button>
        </form>
      )}
    </Chapter>
  );
}

// "Anthony Cruz" → "Anthony". Couples ("A & B Cruz") and groups ("The Cruz Family") keep the full name.
function firstName(full: string) {
  if (full.includes('&') || /^the\s/i.test(full)) return full;
  return full.split(/\s+/)[0];
}
