/**
 * Antonio & Axzel — invitation backend (Google Apps Script)
 *
 * Sheet layout (tab "Guests"), row 1 = headers:
 *   A Code | B Name | C Seats | D Link | E Status | F Replied At | G Seats Confirmed | H Contact | I Message
 * Tab "Replies" is an append-only log of every submission.
 *
 * Setup: see docs/SHEETS-SETUP.md
 */

const SITE_URL = 'https://YOUR-SITE.vercel.app'; // ← change after your first deploy
const GUESTS = 'Guests';
const REPLIES = 'Replies';

// ── Spreadsheet menu ───────────────────────────────────────────────────
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
      let code;
      do code = makeCode(); while (used.has(code));
      used.add(code);
      r[0] = code;
      changed++;
    }
    if (!r[2]) r[2] = 1;
    r[3] = SITE_URL.replace(/\/$/, '') + '/i/' + r[0];
  });
  range.setValues(rows);
  SpreadsheetApp.getActive().toast(changed + ' new code(s) generated. Links refreshed.', 'Invitations');
}

function makeCode() {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'; // no i, l, o, 0, 1
  let s = '';
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

// ── Web app endpoints ──────────────────────────────────────────────────
// GET ?code=xxxx  → { ok, guest: { code, name, seats, status } }
function doGet(e) {
  const code = String((e.parameter && e.parameter.code) || '').trim().toLowerCase();
  if (!code) return json({ ok: false, error: 'missing_code' });
  const found = findGuest(code);
  if (!found) return json({ ok: false, error: 'not_found' });
  const r = found.row;
  return json({
    ok: true,
    guest: { code: r[0], name: r[1], seats: Number(r[2]) || 1, status: String(r[4] || '') },
  });
}

// POST JSON { code?, name, attending: 'yes'|'no', guests, contact, message }
function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad_json' });
  }

  const attending = body.attending === 'yes' ? 'accepted' : body.attending === 'no' ? 'declined' : null;
  if (!attending) return json({ ok: false, error: 'bad_attending' });

  const now = new Date();
  const code = String(body.code || '').trim().toLowerCase();
  let name = String(body.name || '').trim();

  if (code) {
    const found = findGuest(code);
    if (!found) return json({ ok: false, error: 'not_found' });
    name = found.row[1];
    const sh = sheet(GUESTS);
    // E Status | F Replied At | G Seats Confirmed | H Contact | I Message
    sh.getRange(found.index, 5, 1, 5).setValues([[
      attending,
      now,
      attending === 'accepted' ? Number(body.guests) || 1 : 0,
      String(body.contact || ''),
      String(body.message || ''),
    ]]);
  }

  sheet(REPLIES).appendRow([
    now,
    code,
    name,
    attending,
    attending === 'accepted' ? Number(body.guests) || 1 : 0,
    String(body.contact || ''),
    String(body.message || ''),
  ]);

  return json({ ok: true });
}

// ── Helpers ────────────────────────────────────────────────────────────
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
