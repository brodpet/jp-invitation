import Chapter from './Chapter';
import { event, schedule, venues } from '@/lib/content';

function calendarHref() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Antonio & Axzel//Invitation//EN',
    'BEGIN:VEVENT',
    'UID:antonio-axzel-2027@invitation',
    'DTSTAMP:20260910T000000Z',
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    'SUMMARY:Antonio & Axzel — Wedding',
    `LOCATION:${venues[0].venue}\\, ${venues[0].address}`,
    `DESCRIPTION:${venues.map((s) => `${s.label} ${s.time} ${s.meridiem} at ${s.venue}`).join('. ')}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}

function mapsHref(q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export default function Details() {
  return (
    <Chapter
      id="details"
      number="02"
      tint
      title={
        <>
          The <em>Day</em>
        </>
      }
      side={
        <>
          <p className="chapter-note">{event.dateLabel}</p>
          <a className="link-arrow" href={calendarHref()} download="antonio-axzel-wedding.ics">
            Add to calendar
          </a>
        </>
      }
    >
      <div className="venues reveal">
        {venues.map((v) => (
          <a className="venue-card" href={mapsHref(v.mapsQuery!)} target="_blank" rel="noopener" key={v.label}>
            <span className="venue-card-label">{v.label}</span>
            <span className="venue-card-name">{v.venue}</span>
            <span className="venue-card-addr">{v.address}</span>
            <span className="link-arrow">Open in Maps</span>
          </a>
        ))}
      </div>

      <h3 className="sub reveal">Order of the day</h3>
      <ol className="timeline">
        {schedule.map((s) => (
          <li className="timeline-item reveal" key={s.time + s.label}>
            <span className="time">
              {s.time} <small>{s.meridiem}</small>
            </span>
            <div>
              <h3>{s.label}</h3>
              {s.venue && <p className="venue">{s.venue}</p>}
              {s.note && <p className="addr">{s.note}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div className="notice reveal">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        </svg>
        <p>
          The reception is open-air and not air-conditioned. Bring a hand fan, wear breathable fabrics,
          and drink water. We’ll have plenty.
        </p>
      </div>
    </Chapter>
  );
}
