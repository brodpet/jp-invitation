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
              width={p.wide ? 2048 : 1365}
              height={p.wide ? 1463 : 2048}
              sizes={p.wide ? '(min-width: 720px) 66vw, 100vw' : '(min-width: 720px) 33vw, 50vw'}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </Chapter>
  );
}
