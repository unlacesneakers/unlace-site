# UNLACE — Melbourne’s Premium Sneaker Laundry (Next.js)

## Deploy on Vercel
1. Push this folder to a GitHub repo (web upload works fine).
2. In Vercel: **Add New → Project → Import from GitHub**.
3. Keep defaults → **Deploy**.

### Environment Variables (optional for emails)
- `RESEND_API_KEY` — from https://resend.com
- `PICKUP_TO_EMAIL` — where booking emails go (e.g. hello@unlace.com.au)

### Notes
- ESLint/TS checks are disabled during build for smooth deploys (see `next.config.js`).
- Node version pinned to >= 18 in `package.json`.
