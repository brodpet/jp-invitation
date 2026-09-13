'use client';

import { useEffect, useState } from 'react';
import { event } from '@/lib/content';

const start = Date.parse(event.startIso);
const end = Date.parse(event.endIso);
const units = ['days', 'hours', 'minutes', 'seconds'] as const;

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now !== null && now >= end) {
    return (
      <p className="countdown-done">
        <em>Married.</em> Thank you for celebrating with us.
      </p>
    );
  }
  if (now !== null && now >= start) {
    return (
      <p className="countdown-done">
        <em>Today is the day.</em> See you in the garden.
      </p>
    );
  }

  const parts = now === null ? null : split(start - now);

  return (
    <div className="countdown" role="timer" aria-live="off" aria-label="Time until the wedding">
      <p className="countdown-tag">Gathering in the garden in</p>
      <div className="countdown-row">
        {units.map((u, i) => (
          <div className="countdown-unit" key={u}>
            <span className="countdown-num" data-pending={parts === null || undefined}>
              {parts === null ? '––' : String(parts[u]).padStart(2, '0')}
            </span>
            <span className="countdown-label">{u}</span>
            {i < units.length - 1 && <span className="countdown-colon" aria-hidden="true">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
