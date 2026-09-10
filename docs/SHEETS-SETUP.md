# Google Sheet setup (guest list + RSVP tracking)

Ten minutes, once.

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
3. Save. Reload the spreadsheet; an **Invitations** menu appears.

## 3. Deploy as a web app
1. In Apps Script: Deploy → New deployment → type **Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Deploy, authorize, and copy the Web app URL (ends in `/exec`).
4. In Vercel → Project → Settings → Environment Variables, add
   `SHEETS_WEBHOOK_URL` = that URL. Redeploy.
   Locally, put the same line in `.env.local`.

## 4. Point links at your site
In the script, set `SITE_URL` to your deployed domain, then Deploy → Manage deployments → edit → New version.

## Daily use
- Type a guest's **Name** and **Seats** in the Guests tab. Leave Code and Link empty.
- Invitations → **Fill missing codes & links**. Each row gets a 6-character code and a ready-to-send link like `https://your-site.vercel.app/i/k7m2pq`.
- Send the link. When the guest responds, **Status** becomes `accepted` or `declined`, with the time, seats confirmed, contact and message. Every submission is also logged in Replies.
- Guests can reopen their link and change their reply; the Guests row shows the latest, Replies keeps the history.

## Notes
- Codes are random and unguessable, so a guest cannot open or answer someone else's invitation.
- The generic page at `/` still works for anyone without a link; those replies land in Replies with an empty code.
- If the sheet is unreachable the site returns an error to the guest instead of silently losing the reply.
