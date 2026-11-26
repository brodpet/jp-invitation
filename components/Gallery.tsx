import Chapter from './Chapter';
import GalleryGrid from './GalleryGrid';
import GalleryMusic from './GalleryMusic';

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
      <GalleryGrid />
      <GalleryMusic />
      <p className="photo-credit">
        Photos by{' '}
        <a href="https://www.facebook.com/PHOTOILLUSTRISIMO" target="_blank" rel="noopener noreferrer">
          PHOTO I illustrisimo
        </a>
      </p>
    </Chapter>
  );
}
