import Image from 'next/image';
import { ViewTransition, type ReactNode } from 'react';
import { getChapter } from '@/lib/chapters';

type Props = {
  id: string;
  number: string;
  title: ReactNode;
  side?: ReactNode;
  tint?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Chapter({ id, number, title, side, tint, className, children }: Props) {
  const photo = getChapter(id)?.photo;
  const Heading = photo ? 'h1' : 'h2';
  const cls = ['chapter', tint && 'chapter-tint', className].filter(Boolean).join(' ');
  const heading = (
    <>
      <span className="chapter-no enter">{number}</span>
      <ViewTransition name={`chapter-${id}`} share="morph" default="none">
        <Heading className="chapter-title enter">{title}</Heading>
      </ViewTransition>
      {side && <div className="chapter-side enter">{side}</div>}
    </>
  );

  return (
    <section className={cls} id={id}>
      {photo ? (
        <header className="chapter-hero" id="hero" data-enter>
          <div className="chapter-hero-media">
            <ViewTransition name={`photo-${id}`} share="morph" default="none">
              <Image src={photo} alt="" fill priority sizes="100vw" />
            </ViewTransition>
          </div>
          <div className="wrap chapter-hero-text">{heading}</div>
        </header>
      ) : (
        <div className="wrap chapter-head">{heading}</div>
      )}
      <div className="wrap chapter-body">{children}</div>
    </section>
  );
}
