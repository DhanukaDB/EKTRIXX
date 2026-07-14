# EKTRIXX — Progress Notes

## Google OAuth Setup

### Completed
- OAuth 2.0 client created in Google Cloud Console (30 Jun 2026)
- Client ID wired into `src/auth.jsx`
- Client secret JSON removed from repo; `client_secret*.json` added to `.gitignore`

### Resolved — Error 400: origin_mismatch (15 Jul 2026)
Root cause: `src/auth.jsx` was wired to a client ID (`469057102780-...`) that didn't belong to the
"EKTRIXX" Google Cloud project at all — neither of the two real clients there (`609348947538-...`)
matched the code. Fixed by switching to the real client:

- `GOOGLE_CLIENT_ID` in `src/auth.jsx` is now `609348947538-tibajmo8otg8m8mk6v3h9nlu59v1l4n6.apps.googleusercontent.com`
  (the "EKTRIXX" client in Google Cloud Console).
- Its **Authorized JavaScript origins** include `http://localhost:5174` and `https://ektrixx.vercel.app`.
- This app signs in via Google Identity Services' button flow (`google.accounts.id`), which only checks
  **Authorized JavaScript origins** — there's no redirect-based flow here, so "Authorized redirect URIs"
  doesn't need an entry.

If this ever needs a new client ID again, update both `src/auth.jsx` and this note together so they can't drift.

## Session Log — 15 Jul 2026

What changed, uncommitted as of this writing:

- **Hero countdown clipping (fixed)** — `.hero` was capped to `height: calc(100vh - 90px)` with
  `overflow: hidden`. On wide-but-short browser windows, `hero__h1`'s viewport-width-driven font size
  needed more vertical room than that height formula allowed, so the countdown row (`DAYS/HOURS/MIN/SEC`)
  got silently clipped at the bottom. Switched `.hero` to `display:flex` + `min-height` and `.hero__content`
  to `flex:1`, so the section grows to fit content instead of cutting it off. (`styles.css`)
- **Boot preloader (added)** — a 2-second branded splash (`EKGlyph` mark, animated progress bar,
  "ATTITUDE IN EVERY FIT" tagline) shown while the app boots, matching the site's existing visual
  language. Respects `prefers-reduced-motion`. (`src/app.jsx`, `styles.css`)
- **Google sign-in (fixed)** — see "Resolved — Error 400: origin_mismatch" above.
- **Pre-order feature — designed, not built yet** — spec written to
  `Docs/2026-07-15-preorder-feature-design.md`. Covers a Drop 04 waitlist CTA in the hero, a
  "Pre-order This Size" flow on out-of-stock PDP sizes, a new Vercel serverless function
  (`/api/preorder`), a Vercel Postgres table, and Resend for confirmation/notification emails.
  **Nothing in this spec has been implemented yet** — no `/api` directory, no database, no email
  sending exists in the codebase today.
- **Archive mobile layout (fixed)** — real bug, not just a polish pass: `.filters` collapses to a
  single-column CSS Grid on mobile, but its grid items (`.filters__side` and the new `.filters__main`)
  never got `min-width: 0`. Grid/flex items default to `min-width: auto`, so the horizontally-scrolling
  chip rows inside them forced the *entire grid* to blow out to ~1226px wide and silently overflow
  off-screen (hidden by `body{overflow-x:hidden}`, so no scrollbar ever appeared) — product cards were
  only ever showing their leftmost ~30%. Fixed by adding `min-width: 0` to those grid items. Also
  reworked the sort bar (`src/archive.jsx`) so "SORT: + chips" scroll horizontally as their own row
  (`.filters__sort-row`) with "SHOWING X/X" (`.filters__sort-count`) on a separate right-aligned line,
  and condensed the PUFF PRINT/GSM/discount flag badges into one row on mobile instead of stacking
  vertically. (`styles.css`, `src/archive.jsx`)
- **Favicon (added)** — `favicon.svg` (source), `favicon-32.png`, `apple-touch-icon.png`, all reusing
  the `EKGlyph` brand mark thickened up for legibility at small sizes. Wired up in `index.html`.

Still open from earlier in the project (not started):
- Hero background particle animation (canvas overlay, ambient drift).
- Implementation of the pre-order spec above.

## Known Mocks / Not-Yet-Real Functionality

Things that look real in the UI but are placeholder, static, or otherwise not wired up. Worth
checking this list before assuming something works end-to-end:

- **All product data is fabricated** (`src/data.jsx` literally starts `// EKTRIXX product mock data`)
  — prices, SKUs, stock counts, "drop" labels are all made up, not sourced from a real inventory system.
- **5 products have no real photography** — they render a diagonal-stripe placeholder (`.ph`) with a
  text label instead of an image (cargo pants, performance tee, cap, camp-collar shirt, washed tee).
- **Checkout is inert** — the cart's "Checkout" button, Apple Pay button, and Google Pay button in
  `CartDrawer` (`src/components.jsx`) have no `onClick` at all. Adding to bag works (localStorage-backed
  state), but there is no path from cart → order. No payment processor is integrated anywhere.
- **Split Pay (KOKO / MintPay / Cards) is display-only** — the three-installment breakdown on the PDP
  is computed client-side from the price for show; there's no real integration with either provider.
- **Wishlist heart button is inert** — `pdp.jsx`'s wishlist button has no `onClick`.
- **Nav search icon is inert** — no search functionality exists behind it.
- **Archive filter color swatches are inert** — the color dots under "Color" in the filter sidebar
  don't filter anything; only Category/Fit/Print Style chips actually filter the grid.
- **Drop 04 countdown is not a real deadline** — `landing.jsx`'s countdown target is computed as
  `Date.now() + fixed offset` on every page load, so it always shows "6 days, 14 hours..." from
  whenever you happen to load the page, not a fixed calendar date.
- **Auth has no server-side verification** — Google sign-in decodes the ID token entirely client-side
  (`decodeJwt` in `src/auth.jsx`); there's no backend validating the token signature. Fine for this
  stage, but not something to trust for anything sensitive without adding real server-side verification.
- **No backend exists at all** — this is a 100% static site (plain React via CDN + Babel Standalone,
  no bundler). Cart and user session live only in `localStorage`. The pre-order spec above is the first
  feature that would require adding one.
