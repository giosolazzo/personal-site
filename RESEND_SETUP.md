Where to paste your Resend API key

1) Create a file at the project root named `.env.local` (ignore this file in git).

Example `.env.local` (project root):

```
RESEND_API_KEY=sk_live_...your_real_key_here...
CONTACT_FROM_EMAIL="Your Name <you@yourdomain.com>"
```

2) The Next.js API route that sends email is at:

[src/app/api/contact/route.ts](src/app/api/contact/route.ts)

It reads `process.env.RESEND_API_KEY` and `process.env.CONTACT_FROM_EMAIL`.

3) Restart your dev server after adding `.env.local`:

```bash
npm run dev
```

4) Quick curl test (send form-like data):

```bash
curl -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: multipart/form-data" \
  -F "firstName=Test" \
  -F "lastName=User" \
  -F "email=test@example.com" \
  -F "subject=Hello" \
  -F "message=This is a test message"
```

Expect a JSON response `{ "ok": true }` on success.
