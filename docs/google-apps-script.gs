/**
 * Antonio & Axzel — invitation backend (Google Apps Script)
 *
 * Sheet layout (tab "Guests"), row 1 = headers:
 *   A Code | B Name | C Seats | D Link | E Status | F Replied At | G Seats Confirmed | H Contact | I Message
 * Tab "Replies" is an append-only log of every submission.
 *
 * Endpoints (deploy as Web app, execute as Me, access Anyone):
 *   GET  ?code=xxxx                         → public guest lookup
 *   GET  ?action=list&secret=…              → admin: all guests
 *   POST {action:'reply', code, attending, guests, contact, message}   → public RSVP
 *   POST {action:'add', secret, name, seats}                            → admin: create guest + code
 *
 * Setup: see docs/SHEETS-SETUP.md
 */

const SITE_URL = 'https://YOUR-SITE.vercel.app'; // ← change after your first deploy
const ADMIN_SECRET = 'CHANGE-ME-to-a-long-random-string'; // ← must match SHEETS_ADMIN_SECRET in Vercel
const GUESTS = 'Guests';
const REPLIES = 'Replies';

// ── Spreadsheet menu (optional; the /admin page does the same) ─────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Invitations')
    .addItem('Fill missing codes & links', 'fillCodes')
    .addToUi();
}

function fillCodes() {
  const sh = sheet(GUESTS);
  const last = sh.getLastRow();
  if (last < 2) return;
  const range = sh.getRange(2, 1, last - 1, 4);
  const rows = range.getValues();
  const used = new Set(rows.map((r) => String(r[0]).trim()).filter(Boolean));
  let changed = 0;
  rows.forEach((r) => {
    const name = String(r[1]).trim();
    if (!name) return;
    if (!r[0]) {
      r[0] = uniqueCode(used);
      changed++;
    }
    if (!r[2]) r[2] = 1;
    r[3] = linkFor(r[0]);
  });
  range.setValues(rows);
  SpreadsheetApp.getActive().toast(changed + ' new code(s) generated. Links refreshed.', 'Invitations');
}

// ── Web app: GET ───────────────────────────────────────────────────────
function doGet(e) {
  const p = (e && e.parameter) || {};

  if (p.action === 'list') {
    if (!authorized(p.secret)) return json({ ok: false, error: 'unauthorized' });
    return json({ ok: true, guests: allGuests() });
  }

  const code = String(p.code || '').trim().toLowerCase();
  if (!code) return json({ ok: false, error: 'missing_code' });
  const found = findGuest(code);
  if (!found) return json({ ok: false, error: 'not_found' });
  return json({ ok: true, guest: toGuest(found.row) });
}

// ── Web app: POST ──────────────────────────────────────────────────────
function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad_json' });
  }

  if (body.action === 'add') return addGuest(body);
  return recordReply(body); // default / action === 'reply'
}

function addGuest(body) {
  if (!authorized(body.secret)) return json({ ok: false, error: 'unauthorized' });
  const name = String(body.name || '').trim();
  const seats = Math.max(1, Math.min(20, Number(body.seats) || 1));
  if (!name) return json({ ok: false, error: 'name_required' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet(GUESTS);
    const used = new Set(allGuests().map((g) => g.code));
    const code = uniqueCode(used);
    sh.appendRow([code, name, seats, linkFor(code), '', '', '', '', '']);
    return json({ ok: true, guest: { code: code, name: name, seats: seats, status: '' } });
  } finally {
    lock.releaseLock();
  }
}

function recordReply(body) {
  const attending = body.attending === 'yes' ? 'accepted' : body.attending === 'no' ? 'declined' : null;
  if (!attending) return json({ ok: false, error: 'bad_attending' });

  const code = String(body.code || '').trim().toLowerCase();
  if (!code) return json({ ok: false, error: 'missing_code' });
  const found = findGuest(code);
  if (!found) return json({ ok: false, error: 'not_found' });

  const now = new Date();
  const seats = attending === 'accepted' ? Number(body.guests) || 1 : 0;
  const contact = String(body.contact || '');
  const message = String(body.message || '');

  // E Status | F Replied At | G Seats Confirmed | H Contact | I Message
  sheet(GUESTS).getRange(found.index, 5, 1, 5).setValues([[attending, now, seats, contact, message]]);
  sheet(REPLIES).appendRow([now, code, found.row[1], attending, seats, contact, message]);
  return json({ ok: true });
}

// ── Helpers ────────────────────────────────────────────────────────────
function authorized(secret) {
  return ADMIN_SECRET && String(secret || '') === ADMIN_SECRET;
}

function linkFor(code) {
  return SITE_URL.replace(/\/$/, '') + '/i/' + code;
}

function uniqueCode(used) {
  let code;
  do code = makeCode(); while (used.has(code));
  used.add(code);
  return code;
}

function makeCode() {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'; // no i, l, o, 0, 1
  let s = '';
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

function allGuests() {
  const sh = sheet(GUESTS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  return sh
    .getRange(2, 1, last - 1, 9)
    .getValues()
    .filter((r) => String(r[0]).trim() && String(r[1]).trim())
    .map(toGuest);
}

function toGuest(r) {
  return {
    code: String(r[0]).trim(),
    name: String(r[1]).trim(),
    seats: Number(r[2]) || 1,
    status: String(r[4] || ''),
    repliedAt: r[5] instanceof Date ? r[5].toISOString() : String(r[5] || ''),
    seatsConfirmed: r[6] === '' ? '' : Number(r[6]),
    contact: String(r[7] || ''),
    message: String(r[8] || ''),
  };
}

function findGuest(code) {
  const sh = sheet(GUESTS);
  const last = sh.getLastRow();
  if (last < 2) return null;
  const rows = sh.getRange(2, 1, last - 1, 9).getValues();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim().toLowerCase() === code) return { index: i + 2, row: rows[i] };
  }
  return null;
}

function sheet(name) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (name === GUESTS) sh.appendRow(['Code', 'Name', 'Seats', 'Link', 'Status', 'Replied At', 'Seats Confirmed', 'Contact', 'Message']);
    if (name === REPLIES) sh.appendRow(['Timestamp', 'Code', 'Name', 'Status', 'Seats', 'Contact', 'Message']);
  }
  return sh;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
