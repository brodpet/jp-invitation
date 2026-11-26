import Intro from './Intro';
import TopBar from './TopBar';
import Hero from './Hero';
import SaveTheDate from './SaveTheDate';
import ChapterIndex from './ChapterIndex';
import Close from './Close';
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
      <main id="main" tabIndex={-1} className="page">
        <Hero guestName={guest?.name} base={base} />
        <SaveTheDate />
        <ChapterIndex base={base} />
        <Close base={base} />
      </main>
      <Footer />
    </>
  );
}
