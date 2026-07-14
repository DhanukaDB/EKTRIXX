# Pre-order Feature — Design

Date: 2026-07-15

## Problem

EKTRIXX has no way to capture demand ahead of a drop, or to recover interest when a
size sells out. The hero countdown ("DROP 04 UNLOCKS IN...") is decorative only —
there's no way for a signed-in customer to act on it. Similarly, an out-of-stock size
on a PDP is a dead end (`is-out`, disabled, no follow-up).

## Goals

- Let a signed-in customer pre-order:
  1. The upcoming **Drop 04** (no real product/SKU exists yet — this is a waitlist).
  2. A specific **Archive product/size/color** that's currently out of stock.
- No payment is collected at pre-order time.
- Customer receives a confirmation email; the brand receives a notification email.
- Pre-order records persist somewhere reviewable (not just email) for fulfillment later.

## Non-goals (explicitly out of scope for this version)

- Payment collection (Stripe/KOKO/MintPay integration).
- An admin UI for managing pre-orders — review/update happens directly against the
  database (Vercel Postgres data browser or SQL) until volume justifies more tooling.
- Rate-limiting or bot/spam protection beyond requiring a signed-in Google identity.

## Current state (context for implementers)

- Static site, no build step: plain React 18 (UMD) + Babel Standalone, served via
  `bunx serve`. No bundler, no npm dependencies beyond dev tooling.
- Auth: Google Identity Services button flow (`src/auth.jsx`), client-side only,
  ID token decoded in-browser, no server session. `App` holds `user` state
  (`src/app.jsx`), persisted to `localStorage` under `ek_user`.
- No backend exists today — everything is static HTML/CSS/JS + `localStorage`.
  Deployed on Vercel (`vercel.json`: static output, security headers only).
- Cart/checkout is UI-only; Split Pay / KOKO / MintPay are display badges, not
  integrated payment providers.

## Design

### 1. Entry points

- **Hero (Drop 04)** — `src/landing.jsx`: a "Pre-order Drop 04" button next to the
  countdown. Opens `PreorderModal` in **waitlist mode**: no product attached, just
  name/email (prefilled from the signed-in Google account), an optional size
  preference, and an optional free-text note.
- **PDP (Archive restock)** — `src/pdp.jsx`: a size pill with `stock === 0`
  (currently `is-out`, disabled) instead renders **"Pre-order This Size"**. Opens
  `PreorderModal` in **product mode**, prefilled with that product's id/sku/name/
  price/color and the selected size.
- **Auth gate** — both entry points check `user` (from `App`). If not signed in,
  clicking either CTA routes to Società (`onNav("societa")`) instead of opening the
  modal — pre-order requires a Google-authenticated identity.

### 2. Frontend

- New `PreorderModal` component, styled as a bottom sheet (same visual pattern as
  the existing `.size-guide-sheet` in `styles.css`: fixed to viewport bottom,
  slide-up transition, scrim backdrop).
- Single component handles both modes via a `mode: "drop04" | "restock"` prop plus
  optional `product`/`size`/`color` props.
- On submit, `POST /api/preorder` with:
  ```json
  {
    "email": "string (from signed-in user)",
    "name": "string (from signed-in user)",
    "source": "drop04 | restock",
    "productId": "string | null",
    "sku": "string | null",
    "productName": "string | null",
    "size": "string | null",
    "color": "string | null",
    "note": "string | null"
  }
  ```
- Success state: "You're on the list — check your email." Failure: inline error,
  form stays open so the customer can retry.

### 3. Backend — `/api/preorder.js` (Vercel serverless function)

- Validates the payload (email format, required fields per `source`).
- Inserts one row into the `preorders` table (Vercel Postgres — see schema below).
- Sends two emails via **Resend**:
  - **Customer confirmation** — subject varies by source:
    - Drop 04: "You're on the list for Drop 04"
    - Restock: "You're on the list for {productName} · {size}"
    - Body explains no payment has been taken; a follow-up email will arrive when
      it's ready to ship/pay.
  - **Brand notification** — to `BRAND_NOTIFY_EMAIL`, same details, so new
    pre-orders are visible in-inbox in addition to the database.
- Returns `201` with the created record id, or `4xx`/`5xx` with an error message the
  frontend surfaces inline.

### 4. Data model — Vercel Postgres

```sql
create table preorders (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  email        text not null,
  name         text not null,
  source       text not null check (source in ('drop04', 'restock')),
  product_id   text,
  sku          text,
  product_name text,
  size         text,
  color        text,
  note         text,
  status       text not null default 'pending'
               check (status in ('pending', 'fulfilled', 'cancelled'))
);
```

- `status` defaults to `pending`; fulfillment is a manual `UPDATE` against the DB
  for now (no admin UI in this version).

### 5. External setup required (user action, not code)

- **Vercel Postgres**: provision a database in the Vercel project dashboard; Vercel
  injects the connection string as an env var automatically.
- **Resend**: create an account, verify a sending domain (or use their shared test
  domain during development), generate an API key.
- **Env vars** to add in Vercel: `RESEND_API_KEY`, `BRAND_NOTIFY_EMAIL`, plus
  whatever Vercel Postgres names its connection string env var.

## Open questions / risks

- Resend's shared test domain (if used before a custom domain is verified) may land
  in spam for some recipients — fine for development, should be resolved before
  relying on this for real customers.
- No de-duplication: nothing stops the same signed-in user from pre-ordering the
  same size twice. Acceptable for v1 given no payment is involved; revisit if it
  causes confusion in the (manual) fulfillment process.
