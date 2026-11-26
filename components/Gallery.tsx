import Chapter from './Chapter';
import GalleryGrid from './GalleryGrid';
import GalleryMusic from './GalleryMusic';

export default function Gallery() {
  return (
    <Chapter
      id="gallery"
      number="06"
      title={
        <>
          The <em>Photoshoot</em>
        </>
      }
    >
      <GalleryGrid />
      <GalleryMusic />
    </Chapter>
  );
}
