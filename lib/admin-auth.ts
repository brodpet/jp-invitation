import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE = 'aa_admin';
const PASSWORD = process.env.ADMIN_PASSWORD ?? '';

export function adminConfigured() {
  return PASSWORD.length > 0;
}

function token() {
  return createHmac('sha256', PASSWORD).update('admin-session').digest('hex');
}

export function passwordMatches(input: string) {
  if (!adminConfigured()) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value ?? '';
  const expected = token();
  return value.length === expected.length && timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function setAdminCookie() {
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearAdminCookie() {
  (await cookies()).delete(COOKIE);
}
