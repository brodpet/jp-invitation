import { NextResponse } from 'next/server';
import { getGuest, isValidCode, saveReply, type Reply } from '@/lib/guests';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const code = typeof body.code === 'string' && isValidCode(body.code) ? body.code : undefined;
  const attending = body.attending === 'yes' || body.attending === 'no' ? body.attending : null;
  let name = String(body.name ?? '').trim().slice(0, 120);
  let guests = Math.max(1, Math.min(10, Number(body.guests) || 1));

  if (!attending) {
    return NextResponse.json({ error: 'Attendance is required' }, { status: 400 });
  }

  if (code) {
    // Personal link: the guest record is the source of truth for name and seat cap.
    const guest = await getGuest(code);
    if (!guest) return NextResponse.json({ error: 'Unknown invitation code' }, { status: 404 });
    name = guest.name;
    guests = Math.min(guests, guest.seats);
  } else if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const reply: Reply = {
    code,
    name,
    attending,
    guests: attending === 'yes' ? guests : 0,
    contact: String(body.contact ?? '').slice(0, 200),
    message: String(body.message ?? '').slice(0, 1000),
  };

  try {
    await saveReply(reply);
  } catch (err) {
    console.error('[rsvp] save failed', err);
    return NextResponse.json({ error: 'Could not record reply' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
