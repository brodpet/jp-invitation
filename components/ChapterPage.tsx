import Link from 'next/link';
import TopBar from './TopBar';
import RevealObserver from './RevealObserver';
import LeafDefs from './LeafDefs';
import Footer from './Footer';
import Story from './Story';
import Details from './Details';
import Attire from './Attire';
import Entourage from './Entourage';
import Sponsors from './Sponsors';
import Gallery from './Gallery';
import GiftNote from './GiftNote';
import Rsvp from './Rsvp';
import { neighbours, type Chapter } from '@/lib/chapters';
import type { Guest } from '@/lib/guests';

function Body({ slug, guest }: { slug: string; guest?: Guest }) {
  switch (slug) {
    case 'story':
      return <Story />;
    case 'details':
      return <Details />;
    case 'attire':
      return <Attire />;
    case 'entourage':
      return (
        <>
          <Entourage />
          <Sponsors />
        </>
      );
    case 'gallery':
      return <Gallery />;
    case 'gifts':
      return <GiftNote />;
    case 'rsvp':
      return <Rsvp guest={guest} />;
    default:
      return null;
  }
}

export default function ChapterPage({ chapter, guest }: { chapter: Chapter; guest?: Guest }) {
  const base = guest ? `/i/${guest.code}` : '';
  const { prev, next } = neighbours(chapter.slug);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar base={base} current={chapter.slug} />
      <RevealObserver />
      <main id="main" tabIndex={-1} className="page page-chapter">
        <Body slug={chapter.slug} guest={guest} />
        <nav className="chapter-nav" aria-label="Other pages">
          {prev ? (
            <Link className="chapter-nav-link chapter-nav-prev" href={`${base}/${prev.slug}`}>
              <span className="chapter-nav-dir">← Previous</span>
              <span className="chapter-nav-title">
                {prev.lead} <em>{prev.em}</em>
              </span>
            </Link>
          ) : (
            <span />
          )}
          <Link className="chapter-nav-home" href={`${base}/#chapters`}>
            All pages
          </Link>
          {next ? (
            <Link className="chapter-nav-link chapter-nav-next" href={`${base}/${next.slug}`}>
              <span className="chapter-nav-dir">Next →</span>
              <span className="chapter-nav-title">
                {next.lead} <em>{next.em}</em>
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
      <LeafDefs />
    </>
  );
}
