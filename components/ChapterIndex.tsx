import Link from 'next/link';
import { ViewTransition } from 'react';
import { chapters } from '@/lib/chapters';

export default function ChapterIndex({ base }: { base: string }) {
  return (
    <section className="index" id="chapters" aria-labelledby="index-title">
      <div className="index-head">
        <p className="eyebrow reveal">Inside this invitation</p>
        <h2 className="chapter-title reveal" id="index-title">
          Turn the <em>pages</em>
        </h2>
        <p className="index-lede reveal">
          Everything you need for the day, one page at a time. Start with our story, or go straight to
          the details.
        </p>
      </div>
      <ol className="index-grid">
        {chapters.map((c) => (
          <li className={`index-card reveal${c.slug === 'rsvp' ? ' index-card-rsvp' : ''}`} key={c.slug}>
            <Link href={`${base}/${c.slug}`}>
              <span className="chapter-no">No. {c.number}</span>
              <ViewTransition name={`chapter-${c.slug}`} share="morph" default="none">
                <span className="index-card-title">
                  {c.lead} <em>{c.em}</em>
                </span>
              </ViewTransition>
              <span className="index-card-blurb">{c.blurb}</span>
              <span className="index-card-go" aria-hidden="true">
                Open <i>→</i>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
