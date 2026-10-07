# ICE Castle — Next.js landing page

Next.js 16 (App Router, TypeScript) port of the ICE Castle landing page, with the
"Check capacity and pricing" form saving to Supabase.

## Structure

```
app/
  layout.tsx                  fonts (next/font), nav, footer, client effects
  page.tsx                    landing page (/)
  blog/page.tsx               blog index (/blog)        — was #/blog
  blog/[slug]/page.tsx        articles (/blog/<slug>)   — was #/blog/<slug>, statically generated
  api/quote-requests/route.ts POST handler → validates → inserts into Supabase
  globals.css                 original stylesheet (hash-router rules removed)
components/
  Calculator.tsx              fleet cost estimator (React state)
  QuoteForm.tsx               quote form with client + server validation, honeypot
  SiteEffects.tsx             reveal-on-scroll, counters, scroll scrubs, hero particles
  Nav.tsx / Footer.tsx
lib/
  quote-schema.ts             zod schema shared by form and API
  supabase-admin.ts           server-only Supabase client
  articles.tsx                blog content
supabase/migrations/          SQL for the quote_requests table
```

## Setup

1. **Install**

   ```bash
   npm install
   ```

2. **Create the table.** In the Supabase dashboard → SQL Editor, run
   `supabase/migrations/20261005000000_create_quote_requests.sql`
   (or `supabase db push` if you use the Supabase CLI).

3. **Environment.** Copy `.env.example` to `.env.local` and fill in:

   | Variable | Where to find it |
   | --- | --- |
   | `SUPABASE_URL` | Project Settings → API → Project URL |
   | `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API Keys → `service_role` key, or a new `sb_secret_…` secret key |

   The key is only read inside the API route (guarded by `server-only`), so it never
   reaches the browser. Do **not** rename it with a `NEXT_PUBLIC_` prefix.

4. **Run**

   ```bash
   npm run dev      # http://localhost:3000
   npm run build && npm start
   ```

## How submission works

1. `QuoteForm` validates with the shared zod schema and POSTs JSON to `/api/quote-requests`.
2. The route re-validates (email, GPU count 1–1,000,000, GPU type / timing from the
   allowed lists, notes ≤ 2,000 chars), drops honeypot submissions silently, and inserts
   into `public.quote_requests` along with the referring page and user agent.
3. Responses: `201` saved · `422` validation errors (per-field messages shown under inputs)
   · `500` database error (user sees a fallback pointing to hello@icecastle.ai).

The table has RLS enabled with no policies, so the public `anon` key can't read or write
it; only the server route can insert. View submissions in Table Editor → `quote_requests`
(the `status` column defaults to `new` for triage).

## Deploying (Vercel)

Import the repo, add the two environment variables in Project Settings → Environment
Variables, and deploy.

## Possible next steps

- Email/Slack notifications on new requests: a Supabase Database Webhook on
  `quote_requests` inserts.
- Rate limiting on `/api/quote-requests` (e.g. Upstash Ratelimit or Vercel Firewall rules)
  if the honeypot isn't enough.
# icecastle-landing-page
