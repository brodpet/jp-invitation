'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { addGuest, logout, type AddState } from '@/app/admin/actions';
import type { Guest } from '@/lib/guests';

type Props = { guests: Guest[]; baseUrl: string; usingSheet: boolean; loadError?: string };

export default function Dashboard({ guests, baseUrl, usingSheet, loadError }: Props) {
  const [state, action, pending] = useActionState<AddState | undefined, FormData>(addGuest, undefined);
  const [filter, setFilter] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.guest) formRef.current?.reset();
  }, [state]);

  const link = (code: string) => `${baseUrl}/i/${code}`;
  const q = filter.trim().toLowerCase();
  const rows = guests.filter((g) => !q || g.name.toLowerCase().includes(q) || g.code.includes(q));

  const accepted = guests.filter((g) => g.status === 'accepted');
  const declined = guests.filter((g) => g.status === 'declined');
  const pending_ = guests.filter((g) => !g.status);
  const seatsConfirmed = accepted.reduce((n, g) => n + (g.seatsConfirmed ?? g.seats), 0);

  return (
    <main className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow">Antonio &amp; Axzel</p>
          <h1 className="chapter-title">
            Guest <em>list</em>
          </h1>
        </div>
        <form action={logout}>
          <button className="btn btn-line" type="submit">
            Sign out
          </button>
        </form>
      </header>

      {loadError && (
        <p className="admin-banner admin-banner-error" role="alert">
          <strong>Could not load the guest list from Google Sheets.</strong> {loadError}
        </p>
      )}

      {!usingSheet && (
        <p className="admin-banner">
          Local mode: guests are saved to <code>data/guests.dev.json</code>. Set <code>SHEETS_WEBHOOK_URL</code> to use the
          Google Sheet.
        </p>
      )}

      <section className="admin-stats" aria-label="Summary">
        <div>
          <b>{guests.length}</b>
          <span>invited</span>
        </div>
        <div className="is-good">
          <b>{accepted.length}</b>
          <span>accepted</span>
        </div>
        <div className="is-bad">
          <b>{declined.length}</b>
          <span>declined</span>
        </div>
        <div>
          <b>{pending_.length}</b>
          <span>no reply yet</span>
        </div>
        <div>
          <b>{seatsConfirmed}</b>
          <span>seats confirmed</span>
        </div>
      </section>

      <section className="admin-add">
        <h2>Add a guest</h2>
        <form ref={formRef} action={action} className="admin-add-form">
          <div className="field">
            <label htmlFor="name">Name as it should appear</label>
            <input id="name" name="name" type="text" placeholder="Anthony Cruz  ·  Marianne & Paul  ·  The Villanueva Family" required />
          </div>
          <div className="field">
            <label htmlFor="seats">Seats</label>
            <input id="seats" name="seats" type="number" min={1} max={20} defaultValue={1} required />
          </div>
          <button className="btn btn-terracotta" type="submit" disabled={pending}>
            {pending ? 'Saving…' : 'Add & generate link'}
          </button>
        </form>
        {state?.error && (
          <p className="admin-error" role="alert">
            {state.error}
          </p>
        )}
        {state?.guest && (
          <div className="admin-result" role="status">
            <p>
              <strong>{state.guest.name}</strong> added with {state.guest.seats} seat{state.guest.seats > 1 && 's'}. Send them this link:
            </p>
            <LinkRow url={link(state.guest.code)} big />
          </div>
        )}
      </section>

      <section className="admin-list">
        <div className="admin-list-head">
          <h2>
            All guests <span>({rows.length})</span>
          </h2>
          <input
            type="search"
            placeholder="Search name or code"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Search guests"
          />
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Replied</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((g) => (
                <tr key={g.code}>
                  <td>
                    <div className="admin-name">{g.name}</div>
                    {(g.contact || g.message) && (
                      <div className="admin-meta">
                        {g.contact && <span>{g.contact}</span>}
                        {g.message && <em>“{g.message}”</em>}
                      </div>
                    )}
                  </td>
                  <td>
                    {g.status === 'accepted' && g.seatsConfirmed !== undefined ? `${g.seatsConfirmed} / ${g.seats}` : g.seats}
                  </td>
                  <td>
                    <span className={`pill pill-${g.status || 'pending'}`}>{g.status || 'pending'}</span>
                  </td>
                  <td className="admin-date">{g.repliedAt ? formatDate(g.repliedAt) : '—'}</td>
                  <td>
                    <LinkRow url={link(g.code)} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="admin-empty">
                    {guests.length === 0 ? 'No guests yet. Add the first one above.' : 'No matches.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function LinkRow({ url, big }: { url: string; big?: boolean }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.prompt('Copy this link', url);
    }
  }
  return (
    <div className={`linkrow${big ? ' is-big' : ''}`}>
      <a href={url} target="_blank" rel="noopener">
        {url.replace(/^https?:\/\//, '')}
      </a>
      <button type="button" onClick={copy} className={copied ? 'is-copied' : undefined}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-PH', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
