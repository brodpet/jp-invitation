# Antonio & Axzel — Wedding Invitation (Garden Letterpress)

A restyle of the same single-page invitation concept as clyde-kathy-invitation.vercel.app,
built with Next.js 16 (App Router) and TypeScript. See `docs/AUDIT.md` for the audit of the original.

## Run locally
    npm install
    npm run dev          # http://localhost:3000
    npm run build        # production build check

## Personal invitations
Every guest gets their own link: `/i/<code>`. The page greets them by name, the RSVP is locked to
their name and seat count, and their accept/decline is written back to the Google Sheet.
Setup: `docs/SHEETS-SETUP.md`. Locally, without the sheet configured, guests come from
`data/guests.dev.json` — try http://localhost:3000/i/k7m2pq

## Structure
- `app/layout.tsx` — fonts (next/font: Fraunces + Figtree), metadata
- `app/page.tsx` — composes the sections
- `app/globals.css` — the whole design system
- `app/i/[code]/page.tsx` — personal invitation, loads the guest by code
- `app/api/rsvp/route.ts` — receives RSVP replies and writes them to the sheet
- `lib/guests.ts` — guest lookup + reply storage (Google Sheet, or local JSON in dev)
- `components/` — one file per section; only Envelope, TopBar, RevealObserver and Rsvp are client components
- `lib/content.ts` — all names, dates, venues and photo lists. Edit here, not in components.
- `public/gallery/` — photo placeholders

## Before deploying
1. Drop the real photos into `public/gallery/` and update the paths in `lib/content.ts`
   (export ~1200px on the long edge; next/image handles resizing and WebP/AVIF).
2. Add `app/opengraph-image.jpg` (1200×630) for link previews.
3. Follow `docs/SHEETS-SETUP.md` and set `SHEETS_WEBHOOK_URL` in Vercel env vars.

## Deploy
    vercel
