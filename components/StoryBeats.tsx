'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { storyBeats } from '@/lib/content';

export default function StoryBeats() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('[data-beat]');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.beat)));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="story">
      <div className="story-frame" aria-hidden="true">
        {storyBeats.map((b, i) => (
          <div className={`story-frame-photo${i === active ? ' is-on' : ''}`} key={b.photo}>
            <Image src={b.photo} alt="" fill sizes="(min-width: 900px) 45vw, 1px" />
          </div>
        ))}
        <span className="story-frame-year">{storyBeats[active].year}</span>
      </div>
      <ol className="beats" ref={listRef}>
        {storyBeats.map((b, i) => (
          <li className={`beat${i === active ? ' is-on' : ''}`} data-beat={i} key={b.year + b.title}>
            <div className="beat-photo">
              <Image src={b.photo} alt="" fill sizes="(max-width: 899px) 100vw, 1px" />
            </div>
            <span className="beat-year">{b.year}</span>
            <h2>{b.title}</h2>
            <p>{b.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
