import Chapter from './Chapter';

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
    >
      <p className="drop reveal">
        Theirs is a story of quiet meetings and unspoken understanding — two people who found in each
        other a stillness the world could not offer.
      </p>
      <p className="reveal">
        What began in ordinary moments became something extraordinary. The kind of love that asks
        nothing and offers everything.
      </p>
      <p className="sign reveal">— Antonio &amp; Axzel</p>
    </Chapter>
  );
}
