// EKTRIXX — Società community hub

function Societa({ user, onSignIn, onSignOut }) {
  const tiers = [
    {
      rank: "TIER 01", name: "Initiate", pts: "0 – 500 PTS", isCurrent: false,
      perks: ["Free shipping on every order", "Birthday bonus drop credit", "Newsletter & early lookbook"],
    },
    {
      rank: "TIER 02", name: "Operator", pts: "500 – 2,000 PTS", isCurrent: !user, badge: user ? null : "YOU",
      perks: ["+24h early access to every drop", "5% credit on all orders", "Members-only colorways", "Free returns island-wide"],
    },
    {
      rank: "TIER 03", name: "Archivist", pts: "2,000+ PTS", isCurrent: false,
      perks: ["+72h ultra-early access", "10% credit + free express shipping", "Annual archival drop invite", "1-on-1 styling consult"],
    },
  ];

  // ── Signed-in view ────────────────────────────────────────────────────────
  if (user) {
    const initials = (user.given_name || user.name || "?")[0].toUpperCase();
    return (
      <section className="societa fade-in">
        <div className="societa__head">
          <div className="societa__eyebrow">◉ MEMBERS-ONLY ECOSYSTEM</div>
          <h1 className="societa__h1">
            Welcome back,{" "}
            <span className="accent">{user.given_name || user.name}.</span>
          </h1>
          <div className="societa__lede">
            You're in the frequency. Your access tiers are active and your drops are unlocked.
          </div>
        </div>

        {/* Signed-in identity card */}
        <div className="societa__identity fade-in">
          <div className="societa__id-avatar">
            {user.picture
              ? <img src={user.picture} alt={user.given_name} referrerPolicy="no-referrer" />
              : <div className="societa__id-initials">{initials}</div>
            }
            <div className="societa__id-badge">OPERATOR</div>
          </div>
          <div className="societa__id-body">
            <div className="societa__id-name">{user.name}</div>
            <div className="societa__id-email">{user.email}</div>
            <div className="societa__id-meta">
              <span className="societa__id-chip">◉ TIER 02 · OPERATOR</span>
              <span className="societa__id-chip">ID · EK-{String(user.sub || "0000").slice(-4).toUpperCase()}-OP</span>
            </div>
          </div>
          <button className="btn btn--ghost societa__signout-btn" onClick={onSignOut}>
            ✕ &nbsp;Sign Out
          </button>
        </div>

        {/* Tier grid */}
        <div className="tiers">
          {tiers.map(t => (
            <div key={t.rank} className={"tier " + (t.isCurrent ? "is-current" : "")}>
              {t.badge && <div className="tier__badge">★ {t.badge}</div>}
              <div className="tier__rank">{t.rank}</div>
              <div className={"tier__name " + (t.isCurrent ? "accent" : "")}>{t.name}</div>
              <div className="tier__pts">{t.pts}</div>
              <ul className="tier__perks">
                {t.perks.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Live dashboard */}
        <div className="dash">
          <div className="dash__head">
            <div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.24em", color: "var(--fg-mute)", textTransform: "uppercase", marginBottom: 8 }}>
                MEMBER DASHBOARD · LIVE
              </div>
              <h3>Operator console.</h3>
            </div>
            <div className="dash__user">
              <div className="avatar" style={{ overflow: "hidden", padding: 0 }}>
                {user.picture
                  ? <img src={user.picture} alt={user.given_name} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : initials
                }
              </div>
              <div className="meta">
                <div className="name">{user.name.split(" ")[0].toUpperCase()} {user.name.split(" ").slice(1).map(n => n[0]).join("").toUpperCase() + "."}</div>
                <div className="id">ID · EK-{String(user.sub || "0000").slice(-4).toUpperCase()}-OP</div>
              </div>
            </div>
          </div>

          <div className="dash__grid">
            <div className="dash__card">
              <div className="lbl">Tier Progress</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 6 }}>
                <div className="val" style={{ margin: 0 }}>1,420</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.14em" }}>/ 2,000 PTS</div>
              </div>
              <div className="dash__progress" style={{ "--rem": "29%" }} />
              <div className="dash__progress-meta">
                <span>OPERATOR</span>
                <span style={{ color: "var(--accent)" }}>580 TO ARCHIVIST</span>
              </div>
            </div>

            <div className="dash__card">
              <div className="lbl">Credit Balance</div>
              <div className="val">LKR 2,150</div>
              <div className="sub">EXPIRES 31.12.2026</div>
            </div>

            <div className="dash__card">
              <div className="lbl">Drops Unlocked</div>
              <div className="val">04 / 12</div>
              <div className="sub">NEXT: DROP 04 · 6D 14H</div>
            </div>
          </div>

          <div style={{ marginTop: 16, padding: "22px", border: "1px solid var(--accent)", background: "linear-gradient(135deg, rgba(255,106,0,0.10), transparent)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.24em", color: "var(--accent)", textTransform: "uppercase" }}>◉ SECRET DROP ACCESS</div>
                <div style={{ fontFamily: "'Archivo Black'", fontSize: 24, marginTop: 8, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Archive Re-Issue: Soul 02 Returns.</div>
                <div style={{ color: "var(--fg-dim)", fontSize: 13, marginTop: 6 }}>48 pieces. Members-only. Opens in 3 days.</div>
              </div>
              <button className="btn btn--primary">Reserve Slot <I.Arrow /></button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Signed-out view ───────────────────────────────────────────────────────
  return (
    <section className="societa fade-in">
      <div className="societa__head">
        <div className="societa__eyebrow">◉ MEMBERS-ONLY ECOSYSTEM</div>
        <h1 className="societa__h1">
          Join the <span className="outline">Società.</span>
        </h1>
        <div className="societa__lede">
          A closed circuit for the long-rotation. Early drops, archival re-issues, and members-only colorways — for the people who actually live in the fits.
        </div>
      </div>

      <div className="tiers">
        {tiers.map(t => (
          <div key={t.rank} className={"tier " + (t.isCurrent ? "is-current" : "")}>
            {t.badge && <div className="tier__badge">★ {t.badge}</div>}
            <div className="tier__rank">{t.rank}</div>
            <div className={"tier__name " + (t.isCurrent ? "accent" : "")}>{t.name}</div>
            <div className="tier__pts">{t.pts}</div>
            <ul className="tier__perks">
              {t.perks.map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="signup">
        <div className="signup__left">
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.32em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14 }}>
            — STEP 01 / SIGN-IN
          </div>
          <h3>Drop your signal.<br />Get the frequency.</h3>
          <p>Members unlock early access to every drop, secret archival re-issues, and members-only colorways — before the gate opens to the public.</p>
          <div className="signup__benefits">
            <div><span>◉</span> +24H EARLY ACCESS · EVERY DROP</div>
            <div><span>◉</span> ARCHIVE RE-ISSUE INVITES</div>
            <div><span>◉</span> 5% CREDIT ON ALL ORDERS</div>
            <div><span>◉</span> NO SPAM · UNSUBSCRIBE ANYTIME</div>
          </div>
        </div>

        {/* Google Sign In */}
        <div className="signup__auth-col">
          <div className="signup__auth-label">
            <div className="signup__auth-step">STEP 01 / 01</div>
            <div className="signup__auth-title">Authenticate your signal.</div>
            <div className="signup__auth-sub">
              One tap. No passwords. Your Google account secures the connection.
            </div>
          </div>
          <GoogleSignInButton onSignIn={onSignIn} />
          <div className="signup__auth-divider">
            <span>OR CONTINUE WITH</span>
          </div>
          <button className="signup__auth-email-btn" onClick={() => {}}>
            <I.User style={{ marginRight: 10 }} />
            Email &amp; Password
          </button>
          <div className="signup__auth-terms">
            By signing in you agree to our{" "}
            <span style={{ color: "var(--accent)" }}>Terms of Service</span>{" "}
            and{" "}
            <span style={{ color: "var(--accent)" }}>Privacy Policy</span>.
          </div>
        </div>
      </div>

      {/* Dashboard preview (blurred teaser) */}
      <div className="dash dash--locked">
        <div className="dash__lock-overlay">
          <div className="dash__lock-icon"><I.Lock /></div>
          <div className="dash__lock-title">SIGN IN TO UNLOCK</div>
          <div className="dash__lock-sub">Your operator console awaits.</div>
          <button className="btn btn--primary" style={{ marginTop: 20 }} onClick={() => document.querySelector(".signup").scrollIntoView({ behavior: "smooth" })}>
            Enter the Società <I.Arrow />
          </button>
        </div>
        <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none" }}>
          <div className="dash__head">
            <div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.24em", color: "var(--fg-mute)", textTransform: "uppercase", marginBottom: 8 }}>MEMBER DASHBOARD · PREVIEW</div>
              <h3>Operator console.</h3>
            </div>
            <div className="dash__user">
              <div className="avatar">A</div>
              <div className="meta">
                <div className="name">A. PERERA</div>
                <div className="id">ID · EK-0247-OP</div>
              </div>
            </div>
          </div>
          <div className="dash__grid">
            <div className="dash__card">
              <div className="lbl">Tier Progress</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 6 }}>
                <div className="val" style={{ margin: 0 }}>1,420</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.14em" }}>/ 2,000 PTS</div>
              </div>
              <div className="dash__progress" style={{ "--rem": "29%" }} />
              <div className="dash__progress-meta"><span>OPERATOR</span><span style={{ color: "var(--accent)" }}>580 TO ARCHIVIST</span></div>
            </div>
            <div className="dash__card"><div className="lbl">Credit Balance</div><div className="val">LKR 2,150</div><div className="sub">EXPIRES 31.12.2026</div></div>
            <div className="dash__card"><div className="lbl">Drops Unlocked</div><div className="val">04 / 12</div><div className="sub">NEXT: DROP 04 · 6D 14H</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Societa });
