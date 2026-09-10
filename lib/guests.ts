import { promises as fs } from 'fs';
import path from 'path';

export type Guest = {
  code: string;
  name: string;
  seats: number;
  status?: 'accepted' | 'declined' | '';
  repliedAt?: string;
  seatsConfirmed?: number;
  contact?: string;
  message?: string;
};

export type Reply = {
  code: string;
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  contact: string;
  message: string;
};

const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL;
const ADMIN_SECRET = process.env.SHEETS_ADMIN_SECRET ?? '';
const DEV_FILE = path.join(process.cwd(), 'data', 'guests.dev.json');

export function isValidCode(code: string) {
  return /^[a-z0-9]{4,12}$/i.test(code);
}

// ── Guest lookup (public, by code) ────────────────────────────────────────
export async function getGuest(code: string): Promise<Guest | null> {
  if (!isValidCode(code)) return null;

  if (SHEETS_URL) {
    const data = await sheetsGet({ code });
    return data.ok && data.guest ? normalize(data.guest) : null;
  }

  const list = await readDev();
  const g = list.find((x) => x.code.toLowerCase() === code.toLowerCase());
  return g ? normalize(g) : null;
}

// ── Reply (public, by code) ───────────────────────────────────────────────
export async function saveReply(reply: Reply): Promise<void> {
  if (SHEETS_URL) {
    const data = await sheetsPost({ action: 'reply', ...reply });
    if (!data.ok) throw new Error(data.error || 'Sheets rejected the reply');
    return;
  }

  const list = await readDev();
  const g = list.find((x) => x.code.toLowerCase() === reply.code.toLowerCase());
  if (g) {
    g.status = reply.attending === 'yes' ? 'accepted' : 'declined';
    g.repliedAt = new Date().toISOString();
    g.seatsConfirmed = reply.attending === 'yes' ? reply.guests : 0;
    g.contact = reply.contact;
    g.message = reply.message;
    await writeDev(list);
  }
}

// ── Admin: list + add ─────────────────────────────────────────────────────
export async function listGuests(): Promise<Guest[]> {
  if (SHEETS_URL) {
    const data = await sheetsGet({ action: 'list', secret: ADMIN_SECRET });
    if (!data.ok) throw new Error(data.error || 'Could not list guests');
    return (data.guests ?? []).map(normalize);
  }
  return (await readDev()).map(normalize);
}

export async function addGuest(name: string, seats: number): Promise<Guest> {
  name = name.trim().slice(0, 120);
  seats = Math.max(1, Math.min(20, Math.round(seats) || 1));
  if (!name) throw new Error('Name is required');

  if (SHEETS_URL) {
    const data = await sheetsPost({ action: 'add', secret: ADMIN_SECRET, name, seats });
    if (!data.ok || !data.guest) throw new Error(data.error || 'Could not add guest');
    return normalize(data.guest);
  }

  const list = await readDev();
  const used = new Set(list.map((g) => g.code));
  let code = makeCode();
  while (used.has(code)) code = makeCode();
  const guest: Guest = { code, name, seats, status: '' };
  list.push(guest);
  await writeDev(list);
  return guest;
}

// ── Internals ─────────────────────────────────────────────────────────────
type SheetsResponse = { ok: boolean; error?: string; guest?: Guest; guests?: Guest[] };

async function sheetsGet(params: Record<string, string>): Promise<SheetsResponse> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${SHEETS_URL}?${qs}`, { cache: 'no-store', redirect: 'follow' });
  if (!res.ok) throw new Error(`Sheets request failed: ${res.status}`);
  return (await res.json()) as SheetsResponse;
}

async function sheetsPost(body: Record<string, unknown>): Promise<SheetsResponse> {
  const res = await fetch(SHEETS_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids CORS preflight quirks in Apps Script
    body: JSON.stringify(body),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`Sheets write failed: ${res.status}`);
  return (await res.json().catch(() => ({ ok: false, error: 'Invalid response from Sheets' }))) as SheetsResponse;
}

async function readDev(): Promise<Guest[]> {
  const raw = await fs.readFile(DEV_FILE, 'utf8').catch(() => '[]');
  return JSON.parse(raw) as Guest[];
}

async function writeDev(list: Guest[]) {
  await fs.writeFile(DEV_FILE, JSON.stringify(list, null, 2));
}

function makeCode() {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

function normalize(raw: Guest): Guest {
  // Sheets returns blank cells as '' and dates as strings; coerce defensively.
  const g = raw as Omit<Guest, 'seatsConfirmed'> & { seatsConfirmed?: number | string };
  return {
    code: String(g.code),
    name: String(g.name).trim(),
    seats: Math.max(1, Number(g.seats) || 1),
    status: g.status === 'accepted' || g.status === 'declined' ? g.status : '',
    repliedAt: g.repliedAt ? String(g.repliedAt) : undefined,
    seatsConfirmed: g.seatsConfirmed !== undefined && g.seatsConfirmed !== '' ? Number(g.seatsConfirmed) : undefined,
    contact: g.contact ? String(g.contact) : undefined,
    message: g.message ? String(g.message) : undefined,
  };
}
