// ── Config ────────────────────────────────────────────────────────────────
// Where RSVP replies are POSTed as JSON. Point this at a Formspree / Google
// Apps Script / Vercel function endpoint. Leave empty to test the UI only.
const RSVP_ENDPOINT = '';

const EVENT = {
  title: 'Clyde & Kathy — Wedding',
  start: '20260725T060000Z', // 2:00 PM PHT
  end: '20260725T130000Z',   // 9:00 PM PHT
  location: 'San Isidro Labrador Parish, Talisay City, Cebu',
  description: 'Ceremony 2:00 PM at San Isidro Labrador Parish. Reception 4:30 PM at Kishanta Clubhouse.',
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Envelope intro ────────────────────────────────────────────────────────
const envelope = document.getElementById('envelope');
const params = new URLSearchParams(location.search);
const guest = params.get('guest');

if (guest) {
  const safe = guest.replace(/[<>]/g, '').slice(0, 60);
  document.getElementById('envelope-name').textContent = safe;
  document.getElementById('f-name').value = safe;
}

function openInvitation() {
  if (!envelope || envelope.classList.contains('is-gone')) return;
  document.body.classList.remove('is-sealed');
  if (reduceMotion) {
    envelope.classList.add('is-gone');
    return;
  }
  envelope.classList.add('is-open');
  setTimeout(() => envelope.classList.add('is-fading'), 900);
  setTimeout(() => envelope.classList.add('is-gone'), 1700);
}

if (envelope) {
  document.body.classList.add('is-sealed');
  document.getElementById('open-seal').addEventListener('click', openInvitation);
  document.getElementById('skip-intro').addEventListener('click', openInvitation);
  // Deep links (e.g. #rsvp from a message) skip straight to the content.
  if (location.hash && location.hash !== '#hero') openInvitation();
}

// ── Scroll reveal (progressive enhancement; content is visible without it) ─
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  document.body.classList.add('has-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealEls.forEach((el) => io.observe(el));
}

// ── Top bar: solid after hero, active section highlight ───────────────────
const topbar = document.getElementById('topbar');
const hero = document.getElementById('hero');
const navLinks = [...document.querySelectorAll('.topbar-nav a')];

if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    topbar.classList.toggle('is-solid', !e.isIntersecting);
  }, { threshold: 0.2 }).observe(hero);

  const sectionIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  navLinks.forEach((a) => {
    const s = document.querySelector(a.getAttribute('href'));
    if (s) sectionIo.observe(s);
  });
}

// ── Add to calendar (.ics) ────────────────────────────────────────────────
const ics = [
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Clyde & Kathy//Invitation//EN',
  'BEGIN:VEVENT',
  `UID:clyde-kathy-2026@invitation`,
  `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}`,
  `DTSTART:${EVENT.start}`, `DTEND:${EVENT.end}`,
  `SUMMARY:${EVENT.title}`, `LOCATION:${EVENT.location}`, `DESCRIPTION:${EVENT.description}`,
  'END:VEVENT', 'END:VCALENDAR',
].join('\r\n');
document.getElementById('add-to-calendar').href =
  'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);

// ── RSVP form ─────────────────────────────────────────────────────────────
const form = document.getElementById('rsvp-form');
const errorEl = document.getElementById('form-error');
const doneEl = document.getElementById('rsvp-done');
const submitBtn = document.getElementById('rsvp-submit');

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  errorEl.hidden = true;

  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name?.trim()) return showError('Please tell us your name.');
  if (!data.attending) return showError('Please let us know whether you can attend.');

  data.submittedAt = new Date().toISOString();
  if (guest) data.inviteParam = guest;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    if (RSVP_ENDPOINT) {
      const res = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Server replied ${res.status}`);
    } else {
      // No endpoint configured yet: keep the reply locally so nothing is lost.
      const saved = JSON.parse(localStorage.getItem('rsvp-replies') || '[]');
      saved.push(data);
      localStorage.setItem('rsvp-replies', JSON.stringify(saved));
      console.info('[rsvp] RSVP_ENDPOINT is empty; reply stored in localStorage:', data);
    }
    form.hidden = true;
    doneEl.hidden = false;
    if (data.attending === 'no') {
      document.getElementById('rsvp-done-msg').textContent =
        'We will miss you. Thank you for letting us know.';
    }
    doneEl.focus?.();
  } catch (err) {
    showError('Something went wrong sending your reply. Please try again, or message us directly.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send our reply';
  }
});
