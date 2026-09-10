import Image from 'next/image';
import Chapter from './Chapter';
import { photos } from '@/lib/content';

export default function Gallery() {
  return (
    <Chapter
      id="gallery"
      number="06"
      tint
      title={
        <>
          The <em>Photoshoot</em>
        </>
      }
    >
      <div className="photos">
        {photos.map((p) => (
          <figure className={`photo reveal ${p.wide ? 'p-wide' : 'p-tall'}`} key={p.src}>
            <Image
              src={p.src}
              alt={p.alt}
              width={p.wide ? 1200 : 800}
              height={p.wide ? 800 : 1200}
              sizes={p.wide ? '(min-width: 720px) 34rem, 100vw' : '(min-width: 720px) 17rem, 50vw'}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </Chapter>
  );
}
