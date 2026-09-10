# Google Sheet setup (guest list + RSVP tracking)

The site has an admin page at **/admin** where you add guests, get their links, and watch replies.
The Google Sheet is the storage behind it. Setup takes about ten minutes, once.

## 1. Create the sheet
1. Go to sheets.new and name it "Antonio & Axzel — Guests".
2. Rename the first tab to **Guests**. Put these headers in row 1:

   | A | B | C | D | E | F | G | H | I |
   |---|---|---|---|---|---|---|---|---|
   | Code | Name | Seats | Link | Status | Replied At | Seats Confirmed | Contact | Message |

3. Add a second tab named **Replies** (leave it empty; the script fills headers).

## 2. Add the script
1. Extensions → Apps Script. Delete the sample code.
2. Paste the contents of `docs/google-apps-script.gs`.
3. At the top of the script, set two values:
   - `SITE_URL` — your deployed site, e.g. `https://jp-invitation.vercel.app`
   - `ADMIN_SECRET` — any long random string (a password manager can generate one). Keep it; you need it in step 4.
4. Save (Ctrl+S).
5. Authorize once: in the editor toolbar, choose **onOpen** in the function dropdown and click **Run**.
   Accept the "Authorization required" prompt (Review permissions → your account → Advanced →
   Go to project (unsafe) → Allow). Google skips the menu silently until this is done.
6. Reload the spreadsheet; an **Invitations** menu appears next to Help. (Optional; the /admin page does the same job.)

If the menu still does not show: confirm you opened the editor from **Extensions → Apps Script**
inside this sheet (not from script.google.com), and that the editor shows no red error underline.

## 3. Deploy as a web app
1. In Apps Script: Deploy → New deployment → type **Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Deploy, authorize, and copy the Web app URL (ends in `/exec`).

Whenever you edit the script later: Deploy → Manage deployments → pencil → Version: **New version** → Deploy.
The URL stays the same.

## 4. Environment variables
In Vercel → Project → Settings → Environment Variables (and in `.env.local` for local work):

| Variable | Value |
|---|---|
| `SHEETS_WEBHOOK_URL` | the `/exec` URL from step 3 |
| `SHEETS_ADMIN_SECRET` | the same string you put in `ADMIN_SECRET` |
| `ADMIN_PASSWORD` | the password you will type at /admin |
| `NEXT_PUBLIC_SITE_URL` | optional, e.g. `https://jp-invitation.vercel.app`; used to build links in /admin |

Redeploy after adding them.

## Daily use
1. Open **/admin** and sign in.
2. Type the guest's name and seat count, click **Add & generate link**. The row is written to the sheet with a
   random 6-character code, and the link appears with a Copy button.
3. Send the link. When the guest responds, the dashboard and the sheet both show `accepted` or `declined`,
   the time, seats confirmed, contact and message. Every submission is also logged in the Replies tab.

Guests can reopen their link and change their reply; the Guests row shows the latest, Replies keeps the history.

## Notes
- Codes are random and unguessable, so a guest cannot open or answer someone else's invitation.
- The public site only ever looks up a single code or records a reply. Listing and adding guests require the
  admin secret, which never leaves the server.
- The generic page at `/` shows the invitation but no RSVP form; it asks the guest to use their personal link.
- If the sheet is unreachable the site returns an error to the guest instead of silently losing the reply.
- Locally, without `SHEETS_WEBHOOK_URL`, everything works against `data/guests.dev.json` so you can try /admin first.
