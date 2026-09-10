import Envelope from './Envelope';
import TopBar from './TopBar';
import RevealObserver from './RevealObserver';
import LeafDefs from './LeafDefs';
import Hero from './Hero';
import Story from './Story';
import Details from './Details';
import Attire from './Attire';
import Entourage from './Entourage';
import Sponsors from './Sponsors';
import Gallery from './Gallery';
import GiftNote from './GiftNote';
import Rsvp from './Rsvp';
import Footer from './Footer';
import type { Guest } from '@/lib/guests';

export default function Invitation({ guest }: { guest?: Guest }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to invitation
      </a>
      <Envelope guestName={guest?.name} />
      <TopBar />
      <RevealObserver />
      <main id="main" tabIndex={-1}>
        <Hero guestName={guest?.name} />
        <Story />
        <Details />
        <Attire />
        <Entourage />
        <Sponsors />
        <Gallery />
        <GiftNote />
        <Rsvp guest={guest} />
      </main>
      <Footer />
      <LeafDefs />
    </>
  );
}
