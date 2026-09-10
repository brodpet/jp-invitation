import Chapter from './Chapter';

export default function GiftNote() {
  return (
    <Chapter
      id="gift"
      number="07"
      title={
        <>
          A Note <em>from Us</em>
        </>
      }
    >
      <blockquote className="note-card reveal">
        <p>
          Your presence fills our hearts and makes our day complete. Should you wish to honor us with a
          gift, a monetary contribution would be gratefully received and will help us build a beautiful
          future together.
        </p>
        <p>More than anything, thank you for your love, your support, and for being part of this moment in our lives.</p>
        <footer>
          With love, <em>Antonio &amp; Axzel</em>
        </footer>
      </blockquote>
    </Chapter>
  );
}
