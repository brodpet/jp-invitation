import { event, venues } from './content';

export function calendarHref() {
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
    `LOCATION:${venues[0].venue}\, ${venues[0].address}`,
    `DESCRIPTION:${venues.map((s) => `${s.label} ${s.time} ${s.meridiem} at ${s.venue}`).join('. ')}.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}

export function mapsHref(q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
