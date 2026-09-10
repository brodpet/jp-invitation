import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { adminConfigured, isAdmin } from '@/lib/admin-auth';
import { listGuests } from '@/lib/guests';
import LoginForm from '@/components/admin/LoginForm';
import Dashboard from '@/components/admin/Dashboard';

export const metadata: Metadata = { title: 'Guests — Antonio & Axzel', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  const h = await headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  return `${proto}://${host}`;
}

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main className="admin admin-center">
        <h1 className="chapter-title">
          Admin is <em>not set up.</em>
        </h1>
        <p>
          Add <code>ADMIN_PASSWORD=your-secret</code> to <code>.env.local</code> (or to the Vercel environment
          variables) and restart.
        </p>
      </main>
    );
  }

  if (!(await isAdmin())) return <LoginForm />;

  const [guests, base] = await Promise.all([listGuests(), siteUrl()]);
  return <Dashboard guests={guests} baseUrl={base} usingSheet={Boolean(process.env.SHEETS_WEBHOOK_URL)} />;
}
