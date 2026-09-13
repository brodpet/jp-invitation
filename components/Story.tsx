import Chapter from './Chapter';
import { storyBeats } from '@/lib/content';

export default function Story() {
  return (
    <Chapter
      id="story"
      number="01"
      title={
        <>
          Our <em>Story</em>
        </>
      }
      side={<p className="chapter-note">Eight years, five chapters, one garden.</p>}
    >
      <p className="drop reveal">
        Theirs is a story of quiet meetings and unspoken understanding — two people who found in each
        other a stillness the world could not offer.
      </p>
      <ol className="beats">
        {storyBeats.map((b) => (
          <li className="beat reveal" key={b.year + b.title}>
            <span className="beat-year">{b.year}</span>
            <div>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="sign reveal">— Antonio &amp; Axzel</p>
    </Chapter>
  );
}
