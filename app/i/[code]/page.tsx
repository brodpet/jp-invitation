import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hub from '@/components/Hub';
import { event } from '@/lib/content';
import { getGuestCached } from '@/lib/guests';

type Props = { params: Promise<{ code: string }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const guest = await getGuestCached(code);
  if (!guest) return {};
  return {
    title: `For ${guest.name} — Antonio & Axzel`,
    openGraph: {
      title: `${guest.name}, you're invited`,
      description: `Antonio & Axzel · January 9, 2027 · ${event.city}, ${event.province}. Open to respond.`,
    },
  };
}

export default async function PersonalInvitation({ params }: Props) {
  const { code } = await params;
  const guest = await getGuestCached(code);
  if (!guest) notFound();
  return <Hub guest={guest} />;
}
