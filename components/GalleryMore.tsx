'use client';

import { useState } from 'react';
import Image from 'next/image';
import { shootPhotos } from '@/lib/shoot';

export default function GalleryMore() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="shoot" id="more-photos">
          {shootPhotos.map((p, i) => (
            <figure className="shoot-photo" key={p.src}>
              <Image
                src={p.src}
                alt={`Antonio and Axzel’s photoshoot, photo ${i + 1} of ${shootPhotos.length}`}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1100px) 22rem, (min-width: 720px) 33vw, 50vw"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}
      <div className="shoot-toggle">
        <button
          type="button"
          className="btn btn-line"
          aria-expanded={open}
          aria-controls="more-photos"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'View more'}
        </button>
      </div>
    </>
  );
}
