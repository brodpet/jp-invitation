import { promises as fs } from 'fs';
import path from 'path';

export type Guest = {
  code: string;
  name: string;
  seats: number;
  status?: 'accepted' | 'declined' | '';
};

export type Reply = {
  code?: string;
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  contact: string;
  message: string;
};

const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL;
const DEV_FILE = path.join(process.cwd(), 'data', 'guests.dev.json');

export function isValidCode(code: string) {
  return /^[a-z0-9]{4,12}$/i.test(code);
}

export async function getGuest(code: string): Promise<Guest | null> {
  if (!isValidCode(code)) return null;

  if (SHEETS_URL) {
    const res = await fetch(`${SHEETS_URL}?code=${encodeURIComponent(code)}`, {
      cache: 'no-store',
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`Sheets lookup failed: ${res.status}`);
    const data = (await res.json()) as { ok: boolean; guest?: Guest };
    return data.ok && data.guest ? normalize(data.guest) : null;
  }

  // Local development fallback: data/guests.dev.json
  const raw = await fs.readFile(DEV_FILE, 'utf8').catch(() => '[]');
  const list = JSON.parse(raw) as Guest[];
  const g = list.find((x) => x.code.toLowerCase() === code.toLowerCase());
  return g ? normalize(g) : null;
}

export async function saveReply(reply: Reply): Promise<void> {
  if (SHEETS_URL) {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids CORS preflight quirks in Apps Script
      body: JSON.stringify(reply),
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`Sheets write failed: ${res.status}`);
    const data = (await res.json().catch(() => ({ ok: false }))) as { ok: boolean; error?: string };
    if (!data.ok) throw new Error(data.error || 'Sheets rejected the reply');
    return;
  }

  // Local development fallback: update status in the dev file and log the reply.
  const raw = await fs.readFile(DEV_FILE, 'utf8').catch(() => '[]');
  const list = JSON.parse(raw) as Guest[];
  const g = reply.code ? list.find((x) => x.code.toLowerCase() === reply.code!.toLowerCase()) : undefined;
  if (g) {
    g.status = reply.attending === 'yes' ? 'accepted' : 'declined';
    await fs.writeFile(DEV_FILE, JSON.stringify(list, null, 2));
  }
  console.info('[rsvp] (dev, no SHEETS_WEBHOOK_URL) reply:', JSON.stringify(reply));
}

function normalize(g: Guest): Guest {
  return {
    code: String(g.code),
    name: String(g.name).trim(),
    seats: Math.max(1, Number(g.seats) || 1),
    status: g.status === 'accepted' || g.status === 'declined' ? g.status : '',
  };
}
