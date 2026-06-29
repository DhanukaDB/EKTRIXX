# EKTRIXX — Progress Notes

## Google OAuth Setup

### Completed
- OAuth 2.0 client created in Google Cloud Console (30 Jun 2026)
- Client ID wired into `src/auth.jsx`
- Client secret JSON removed from repo; `client_secret*.json` added to `.gitignore`

### Blocked — Error 400: origin_mismatch
The production domain is not whitelisted in the OAuth client settings.

**Fix:**
1. Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click the OAuth 2.0 client (`609348947538-...`)
3. Under **Authorized JavaScript origins**, add:
   - `https://ektrixx.vercel.app`
4. Under **Authorized redirect URIs**, add:
   - `https://ektrixx.vercel.app`
5. Save — changes propagate in ~5 minutes.

Also add `http://localhost:7821` (or whichever local port you use) for local dev.
