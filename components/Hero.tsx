import Image from 'next/image';
import { Sprig } from './LeafDefs';
import { couple, event, heroPhoto } from '@/lib/content';

export default function Hero({ guestName }: { guestName?: string }) {
  return (
    <section className="hero" id="hero">
      <Sprig className="sprig sprig-tl" />
      <Sprig className="sprig sprig-br" />

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow reveal">
            {guestName ? <>An invitation for <b className="eyebrow-name">{guestName}</b></> : 'Together with their families'}
          </p>
          <h1 className="hero-names reveal">
            <span className="name">
              {couple.groom.first} <em>{couple.groom.last}</em>
            </span>
            <span className="amp" aria-hidden="true">
              &amp;
            </span>
            <span className="name">
              {couple.bride.first} <em>{couple.bride.last}</em>
            </span>
          </h1>
          <p className="hero-lede reveal">invite you to gather in the garden as they are married.</p>
          <div className="hero-date reveal">
            <span className="date-big">{event.day}</span>
            <span className="date-stack">
              <span>{event.month}</span>
              <span>{event.year}</span>
            </span>
            <span className="date-rule" />
            <span className="date-place">
              {event.city}
              <br />
              {event.province}
            </span>
          </div>
          <div className="hero-actions reveal">
            <a className="btn btn-ink" href="#rsvp">
              Respond by December 9
            </a>
            <a className="btn btn-line" href="#details">
              The day’s details
            </a>
          </div>
        </div>

        <figure className="hero-photo reveal">
          <div className="deckle">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              width={900}
              height={1200}
              priority
              sizes="(min-width: 900px) 26rem, 90vw"
            />
          </div>
          <figcaption>{heroPhoto.caption}</figcaption>
        </figure>
      </div>

      <a className="scroll-cue" href="#story" aria-label="Scroll to our story">
        <span />
      </a>
    </section>
  );
}
