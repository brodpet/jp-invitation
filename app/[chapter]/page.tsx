import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChapterPage from '@/components/ChapterPage';
import { chapters, getChapter } from '@/lib/chapters';

type Props = { params: Promise<{ chapter: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getChapter((await params).chapter);
  return c ? { title: `${c.lead} ${c.em} — Antonio & Axzel` } : {};
}

export default async function Page({ params }: Props) {
  const c = getChapter((await params).chapter);
  if (!c) notFound();
  return <ChapterPage chapter={c} />;
}
