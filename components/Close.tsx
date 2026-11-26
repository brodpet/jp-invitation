import Image from 'next/image';
import Link from 'next/link';
import { event } from '@/lib/content';

export default function Close({ base }: { base: string }) {
  return (
    <section className="close" aria-labelledby="close-title">
      <div className="close-media">
        <Image src="/gallery/shoot/dsc09156.jpg" alt="Antonio and Axzel embracing under a clear sky" fill sizes="100vw" />
      </div>
      <div className="wrap close-inner">
        <h2 className="close-title" id="close-title">
          Will you <em>join us?</em>
        </h2>
        <p>Seats are reserved by name. Kindly reply by {event.rsvpBy}.</p>
        <Link className="btn btn-ink" href={`${base}/rsvp`}>
          Send your reply
        </Link>
      </div>
    </section>
  );
}
