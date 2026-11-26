import { event } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <p className="foot-names">
          Antonio <em>&amp;</em> Axzel
        </p>
        <p className="foot-quote">
          “A family is a risky venture, because the greater the love, the greater the loss. But still, we
          persevere.”
        </p>
        <div className="foot-line">
          <span>
            {event.dateLabel} · {event.city}, {event.province}
          </span>
          <span>
            Photographs by{' '}
            <a className="link-line" href="https://www.facebook.com/PHOTOILLUSTRISIMO" target="_blank" rel="noopener noreferrer">
              PHOTO I illustrisimo
            </a>
          </span>
          <span>By order of the Patalinghug family</span>
        </div>
      </div>
    </footer>
  );
}
