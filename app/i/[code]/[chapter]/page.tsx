import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChapterPage from '@/components/ChapterPage';
import { getChapter } from '@/lib/chapters';
import { getGuestCached } from '@/lib/guests';

type Props = { params: Promise<{ code: string; chapter: string }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code, chapter } = await params;
  const [guest, c] = await Promise.all([getGuestCached(code), getChapter(chapter)]);
  if (!guest || !c) return {};
  return { title: `${c.lead} ${c.em} — for ${guest.name}` };
}

export default async function PersonalChapter({ params }: Props) {
  const { code, chapter } = await params;
  const c = getChapter(chapter);
  if (!c) notFound();
  const guest = await getGuestCached(code);
  if (!guest) notFound();
  return <ChapterPage chapter={c} guest={guest} />;
}
