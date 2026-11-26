import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { chapters } from '@/lib/chapters';

export default function ChapterIndex({ base }: { base: string }) {
  return (
    <section className="index" id="chapters" aria-labelledby="index-title">
      <div className="wrap">
        <div className="index-head">
          <h2 className="section-title" id="index-title">
            Seven pages for <em>the day</em>
          </h2>
          <p className="index-lede">Our story, where to be and when, what to wear, and your reply.</p>
        </div>
        <ol className="index-grid">
          {chapters.map((c) => (
            <li className={`index-card index-card-${c.slug}`} key={c.slug}>
              <Link href={`${base}/${c.slug}`}>
                <span className="index-card-media">
                  <ViewTransition name={`photo-${c.slug}`} share="morph" default="none">
                    <Image src={c.photo} alt="" fill sizes={c.slug === 'story' || c.slug === 'rsvp' ? '(min-width: 600px) 66vw, 100vw' : '(min-width: 960px) 33vw, (min-width: 600px) 66vw, 100vw'} />
                  </ViewTransition>
                </span>
                <span className="index-card-text">
                  <span className="chapter-no">{c.number}</span>
                  <ViewTransition name={`chapter-${c.slug}`} share="morph" default="none">
                    <span className="index-card-title">
                      {c.lead} <em>{c.em}</em>
                    </span>
                  </ViewTransition>
                  <span className="index-card-blurb">{c.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
