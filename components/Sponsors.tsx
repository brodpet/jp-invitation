import Chapter from './Chapter';
import { principalSponsors, secondarySponsors } from '@/lib/content';

export default function Sponsors() {
  return (
    <Chapter
      id="sponsors"
      number="05"
      title={
        <>
          Our <em>Sponsors</em>
        </>
      }
      side={
        <p className="chapter-note">
          With deep gratitude to those who have blessed this union with their love and generosity.
        </p>
      }
    >
      <h3 className="sub reveal">Principal Sponsors</h3>
      <ul className="couples reveal">
        {principalSponsors.map(([a, b]) => (
          <li key={a + b}>
            {a} <span>&amp;</span> {b}
          </li>
        ))}
      </ul>
      <h3 className="sub reveal">Secondary Sponsors</h3>
      <ul className="couples couples-secondary reveal">
        {secondarySponsors.map((s) => (
          <li key={s.role}>
            <b>{s.role}</b>
            <span>
              {s.pair[0]} <span>&amp;</span> {s.pair[1]}
            </span>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}
