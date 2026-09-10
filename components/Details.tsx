import Chapter from './Chapter';
import { event, schedule } from '@/lib/content';

function calendarHref() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Antonio & Axzel//Invitation//EN',
    'BEGIN:VEVENT',
    'UID:antonio-axzel-2026@invitation',
    'DTSTAMP:20260101T000000Z',
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    'SUMMARY:Antonio & Axzel — Wedding',
    `LOCATION:${schedule[0].venue}\\, ${schedule[0].address}`,
    `DESCRIPTION:${schedule.map((s) => `${s.label} ${s.time} ${s.meridiem} at ${s.venue}`).join('. ')}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
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
      <ol className="timeline">
        {schedule.map((s) => (
          <li className="timeline-item reveal" key={s.label}>
            <span className="time">
              {s.time} <small>{s.meridiem}</small>
            </span>
            <div>
              <h3>{s.label}</h3>
              <p className="venue">{s.venue}</p>
              <p className="addr">{s.address}</p>
              <a
                className="link-arrow"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`}
                target="_blank"
                rel="noopener"
              >
                Open in Maps
              </a>
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
