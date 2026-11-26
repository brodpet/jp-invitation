import Image from 'next/image';
import Link from 'next/link';
import Countdown from './Countdown';
import { couple, event, heroPhoto } from '@/lib/content';

export default function Hero({ guestName, base }: { guestName?: string; base: string }) {
  return (
    <section className="hero" id="hero" data-enter>
      <div className="hero-media">
        <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="100vw" />
      </div>

      <div className="hero-top wrap">
        <p className="eyebrow enter">
          {guestName ? <>An invitation for <b className="eyebrow-name">{guestName}</b></> : 'Together with their families'}
        </p>
        <h1 className="hero-names enter">
          Antonio <em>&amp;</em> Axzel
        </h1>
        <p className="hero-lede enter">
          {couple.groom.first} {couple.groom.last} and {couple.bride.first} {couple.bride.last} invite you
          to the garden as they are married.
        </p>
      </div>

      <div className="hero-bottom wrap">
        <p className="hero-fact enter">
          <span>{event.dateLabel}</span>
          <span>
            {event.city}, {event.province}
          </span>
        </p>
        <div className="enter">
          <Countdown />
        </div>
        <div className="hero-actions enter">
          <Link className="btn btn-ink" href={`${base}/rsvp`}>
            Respond by December 9
          </Link>
          <Link className="btn btn-glass" href={`${base}/details`}>
            See the day’s plan
          </Link>
        </div>
      </div>
    </section>
  );
}
