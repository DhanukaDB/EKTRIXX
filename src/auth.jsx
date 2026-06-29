// EKTRIXX — Google Identity Services Authentication
//
// SETUP REQUIRED — replace the placeholder below with your real OAuth 2.0 Client ID.
//
//   1. Visit  https://console.cloud.google.com
//   2. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
//   3. Application type: Web application
//   4. Authorized JavaScript origins: http://localhost:3000
//   5. Copy the Client ID and paste it below.

const GOOGLE_CLIENT_ID = "469057102780-3arur8b179c66qp88raa1vqs8ru5jf3f.apps.googleusercontent.com";

const GIS_CONFIGURED = !GOOGLE_CLIENT_ID.startsWith("YOUR_");

const { useState, useEffect, useRef } = React;

// Decode JWT payload — display-only; server-side verification required in production
function decodeJwt(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

// Poll until google.accounts.id is ready (GIS loads async)
function useGoogleReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.google?.accounts?.id) { setReady(true); return; }
    const poll = setInterval(() => {
      if (window.google?.accounts?.id) { setReady(true); clearInterval(poll); }
    }, 150);
    return () => clearInterval(poll);
  }, []);
  return ready;
}

function GoogleSignInButton({ onSignIn }) {
  const btnRef = useRef(null);
  const ready = useGoogleReady();
  const cb = useRef(onSignIn);
  cb.current = onSignIn;

  useEffect(() => {
    if (!ready || !btnRef.current || !GIS_CONFIGURED) return;

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: ({ credential }) => {
        const p = decodeJwt(credential);
        if (p) cb.current({
          name: p.name,
          email: p.email,
          picture: p.picture,
          given_name: p.given_name,
          sub: p.sub,
        });
      },
      auto_select: false,
      cancel_on_tap_outside: false,
    });

    google.accounts.id.renderButton(btnRef.current, {
      theme: "filled_black",
      size: "large",
      width: Math.min(btnRef.current.getBoundingClientRect().width || (window.innerWidth - 64), 420),
      text: "continue_with",
      shape: "square",
      logo_alignment: "left",
    });
  }, [ready]);

  // ── Not configured ────────────────────────────────────────────────────────
  if (!GIS_CONFIGURED) {
    return (
      <div className="auth-config-notice">
        <div className="auth-config-icon">⚙</div>
        <div>
          <div className="auth-config-title">Google Auth · Setup Required</div>
          <div className="auth-config-body">
            Open <code>src/auth.jsx</code> and replace <code>GOOGLE_CLIENT_ID</code> with your OAuth 2.0 Client ID.
          </div>
          <a
            className="auth-config-link"
            href="https://console.cloud.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Client ID → console.cloud.google.com
          </a>
        </div>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (!ready) {
    return (
      <div className="google-btn-loading">
        <span className="google-btn-loading-dot" />
        <span className="google-btn-loading-dot" />
        <span className="google-btn-loading-dot" />
        <span style={{ marginLeft: 12, fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.16em", color: "var(--fg-mute)", textTransform: "uppercase" }}>
          Loading secure sign-in…
        </span>
      </div>
    );
  }

  // ── Ready ─────────────────────────────────────────────────────────────────
  return (
    <div className="google-btn-outer">
      <div className="google-btn-eyebrow">◉ VERIFIED SIGN-IN</div>
      <div ref={btnRef} className="google-btn-wrap" />
      <div className="google-btn-footer">
        <I.Lock style={{ verticalAlign: "-2px", marginRight: 6 }} />
        OAuth 2.0 · No password stored · GDPR / DPA compliant
      </div>
    </div>
  );
}

function signOutGoogle() {
  if (window.google?.accounts?.id) {
    google.accounts.id.disableAutoSelect();
  }
}

Object.assign(window, { GoogleSignInButton, decodeJwt, signOutGoogle, GIS_CONFIGURED });
