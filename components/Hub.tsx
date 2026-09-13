import Intro from './Intro';
import TopBar from './TopBar';
import RevealObserver from './RevealObserver';
import LeafDefs from './LeafDefs';
import Hero from './Hero';
import ChapterIndex from './ChapterIndex';
import Footer from './Footer';
import type { Guest } from '@/lib/guests';

export default function Hub({ guest }: { guest?: Guest }) {
  const base = guest ? `/i/${guest.code}` : '';
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to invitation
      </a>
      <Intro guest={guest} />
      <TopBar base={base} hasHero />
      <RevealObserver />
      <main id="main" tabIndex={-1} className="page">
        <Hero guestName={guest?.name} base={base} />
        <ChapterIndex base={base} />
      </main>
      <Footer />
      <LeafDefs />
    </>
  );
}
