// EKTRIXX — Società community hub

function Societa() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const tiers = [
    {
      rank: "TIER 01", name: "Initiate", pts: "0 – 500 PTS", isCurrent: false,
      perks: ["Free shipping on every order", "Birthday bonus drop credit", "Newsletter & early lookbook"],
    },
    {
      rank: "TIER 02", name: "Operator", pts: "500 – 2,000 PTS", isCurrent: true, badge: "YOU",
      perks: ["+24h early access to every drop", "5% credit on all orders", "Members-only colorways", "Free returns island-wide"],
    },
    {
      rank: "TIER 03", name: "Archivist", pts: "2,000+ PTS", isCurrent: false,
      perks: ["+72h ultra-early access", "10% credit + free express shipping", "Annual archival drop invite", "1-on-1 styling consult"],
    },
  ];

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
          <div style={{fontFamily:"'JetBrains Mono'",fontSize:11,letterSpacing:"0.32em",color:"var(--accent)",textTransform:"uppercase",marginBottom:14}}>
            — STEP 01 / SIGN-IN
          </div>
          <h3>Drop your signal.<br/>Get the frequency.</h3>
          <p>Members unlock early access to every drop, secret archival re-issues, and members-only colorways — before the gate opens to the public.</p>
          <div className="signup__benefits">
            <div><span>◉</span> +24H EARLY ACCESS · EVERY DROP</div>
            <div><span>◉</span> ARCHIVE RE-ISSUE INVITES</div>
            <div><span>◉</span> 5% CREDIT ON ALL ORDERS</div>
            <div><span>◉</span> NO SPAM · UNSUBSCRIBE ANYTIME</div>
          </div>
        </div>
        <div>
          {!submitted ? (
            <form className="signup__form" onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}>
              <label htmlFor="se">Email address</label>
              <input id="se" type="email" placeholder="you@signal.io" value={email} onChange={e => setEmail(e.target.value)} required />
              <label style={{marginTop: 8}} htmlFor="sn">Display handle</label>
              <input id="sn" type="text" placeholder="@operator" />
              <button className="btn btn--primary btn--lg" type="submit" style={{marginTop: 12}}>
                Enter the Società <I.Arrow />
              </button>
              <div style={{fontFamily:"'JetBrains Mono'",fontSize:10,letterSpacing:"0.18em",color:"var(--fg-mute)",textTransform:"uppercase",marginTop:8}}>
                <I.Lock style={{verticalAlign:"-2px",marginRight:6}} /> Encrypted · GDPR / DPA compliant
              </div>
            </form>
          ) : (
            <div className="signup__success fade-in">
              <div className="signup__success-h">SIGNAL <span className="accent">RECEIVED.</span></div>
              <p style={{color:"var(--fg-dim)",marginTop:14,lineHeight:1.55}}>
                Welcome, Operator. Your access tiers are unlocking now.
              </p>
              <div className="signup__unlock">
                <div className="signup__unlock-row"><span className="check">✓</span> EARLY ACCESS — DROP 04 (UNLOCKED)</div>
                <div className="signup__unlock-row"><span className="check">✓</span> ARCHIVE RE-ISSUE INVITES (UNLOCKED)</div>
                <div className="signup__unlock-row"><span className="check">✓</span> WELCOME CREDIT · LKR 1,500 (CLAIMED)</div>
                <div className="signup__unlock-row is-pending"><span style={{color:"var(--fg-mute)"}}>◌</span> ARCHIVIST INVITATION · 2,000 PTS REQUIRED</div>
              </div>
              <button className="btn btn--ghost" style={{marginTop:20}} onClick={() => setSubmitted(false)}>Reset Demo</button>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard preview */}
      <div className="dash">
        <div className="dash__head">
          <div>
            <div style={{fontFamily:"'JetBrains Mono'",fontSize:11,letterSpacing:"0.24em",color:"var(--fg-mute)",textTransform:"uppercase",marginBottom:8}}>
              MEMBER DASHBOARD · PREVIEW
            </div>
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
            <div style={{display:"flex",alignItems:"baseline",gap:14,marginTop:6}}>
              <div className="val" style={{margin:0}}>1,420</div>
              <div style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:"var(--fg-dim)",letterSpacing:"0.14em"}}>/ 2,000 PTS</div>
            </div>
            <div className="dash__progress" style={{"--rem": "29%"}} />
            <div className="dash__progress-meta">
              <span>OPERATOR</span>
              <span style={{color:"var(--accent)"}}>580 TO ARCHIVIST</span>
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

        <div style={{marginTop:16,padding:"22px",border:"1px solid var(--accent)",background:"linear-gradient(135deg, rgba(255,106,0,0.10), transparent)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontFamily:"'JetBrains Mono'",fontSize:11,letterSpacing:"0.24em",color:"var(--accent)",textTransform:"uppercase"}}>◉ SECRET DROP ACCESS</div>
              <div style={{fontFamily:"'Archivo Black'",fontSize:24,marginTop:8,textTransform:"uppercase",letterSpacing:"-0.01em"}}>Archive Re-Issue: Soul 02 Returns.</div>
              <div style={{color:"var(--fg-dim)",fontSize:13,marginTop:6}}>48 pieces. Members-only. Opens in 3 days.</div>
            </div>
            <button className="btn btn--primary">Reserve Slot <I.Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Societa });
