import Chapter from './Chapter';
import StoryBeats from './StoryBeats';

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
      <p className="drop">
        Theirs is a story of quiet meetings and unspoken understanding — two people who found in each
        other a stillness the world could not offer.
      </p>
      <StoryBeats />
      <p className="sign">— Antonio &amp; Axzel</p>
    </Chapter>
  );
}
