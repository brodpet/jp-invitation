import { ViewTransition, type ReactNode } from 'react';

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
  const cls = ['chapter', tint && 'chapter-tint', className].filter(Boolean).join(' ');
  return (
    <section className={cls} id={id}>
      <div className="chapter-grid">
        <aside className="chapter-side">
          <span className="chapter-no">No. {number}</span>
          <ViewTransition name={`chapter-${id}`} share="morph" default="none">
            <h2 className="chapter-title">{title}</h2>
          </ViewTransition>
          {side}
        </aside>
        <div className="chapter-body">{children}</div>
      </div>
    </section>
  );
}
