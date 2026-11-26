'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { photos } from '@/lib/content';
import { shootPhotos } from '@/lib/shoot';

const featured = photos.map((p) => ({
  ...p,
  width: p.wide ? 2048 : 1365,
  height: p.wide ? 1463 : 2048,
}));

const shoot = shootPhotos.map((p, i) => ({
  ...p,
  alt: `Antonio and Axzel’s photoshoot, photo ${i + 1} of ${shootPhotos.length}`,
}));

const slides = [...featured, ...shoot];

export default function GalleryGrid() {
  const [showMore, setShowMore] = useState(false);
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="photos">
        {featured.map((p, i) => (
          <figure className={`photo reveal ${p.wide ? 'p-wide' : 'p-tall'}`} key={p.src}>
            <button type="button" className="photo-open" onClick={() => setIndex(i)} aria-label={`View larger: ${p.alt}`}>
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes={p.wide ? '(min-width: 720px) 66vw, 100vw' : '(min-width: 720px) 33vw, 50vw'}
                loading="lazy"
              />
            </button>
          </figure>
        ))}
      </div>

      {showMore && (
        <div className="shoot" id="more-photos">
          {shoot.map((p, i) => (
            <figure className="shoot-photo" key={p.src}>
              <button
                type="button"
                className="photo-open"
                onClick={() => setIndex(featured.length + i)}
                aria-label={`View larger: ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1100px) 22rem, (min-width: 720px) 33vw, 50vw"
                  loading="lazy"
                />
              </button>
            </figure>
          ))}
        </div>
      )}

      <div className="shoot-toggle">
        <button
          type="button"
          className="btn btn-line"
          aria-expanded={showMore}
          aria-controls="more-photos"
          onClick={() => setShowMore((v) => !v)}
        >
          {showMore ? 'Show less' : 'View more'}
        </button>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
