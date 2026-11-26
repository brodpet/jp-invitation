import { calendarHref } from '@/lib/calendar';
import { event, venues } from '@/lib/content';

export default function SaveTheDate() {
  return (
    <section className="date-moment" aria-labelledby="date-title">
      <div className="wrap">
        <h2 className="date-moment-title" id="date-title">
          <span className="date-moment-month">{event.month}</span>
          <span className="date-moment-day">{event.day.padStart(2, '0')}</span>
          <span className="date-moment-year">{event.year}</span>
        </h2>
        <ul className="date-moment-facts">
          {venues.map((v) => (
            <li key={v.label}>
              <span className="label">{v.label}</span>
              <b>
                {v.time} {v.meridiem}
              </b>
              <span>{v.venue}</span>
            </li>
          ))}
          <li>
            <span className="label">Reply</span>
            <b>By {event.rsvpBy.replace(', 2026', '')}</b>
            <a className="link-line" href={calendarHref()} download="antonio-axzel-wedding.ics">
              Add the day to your calendar
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
