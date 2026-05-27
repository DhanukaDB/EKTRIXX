// EKTRIXX — Landing view (hero, brand-synthesizer grid, ticker, lookbook)

function useCountdown(targetMs) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Hero({ onShop }) {
  // Target: 6 days, 14h from "now" — feels like a live drop
  const target = React.useMemo(() => Date.now() + (6 * 86400 + 14 * 3600 + 27 * 60) * 1000, []);
  const t = useCountdown(target);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="hero">
      <div className="hero__bg" style={{ backgroundImage: "url('assets/hero-orange-tee.png')" }} />
      <div className="hero__grid" />
      <div className="hero__content">
        <div className="hero__topline">
          <span>LIVE · DROP 03 / ARCHIVE</span>
          <span>COL · 06° 56′ N · 79° 51′ E</span>
        </div>
        <div className="hero__title">
          <div className="hero__eyebrow">Next Limited Drop</div>
          <h1 className="hero__h1">
            ATTITUDE<br />
            <span className="outline">IN EVERY</span> <span className="accent">FIT.</span>
          </h1>
          <div className="hero__sub">
            <div className="hero__lede">
              Heavyweight cotton. Industrial print. A wardrobe built on the line between performance and the archive — engineered for the long rotation, not the season.
            </div>
            <div className="hero__cta-group">
              <button className="btn btn--primary btn--lg" onClick={onShop}>Enter Archive <I.Arrow /></button>
              <button className="btn btn--lg">Notify Me</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 32 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.24em", color: "var(--fg-mute)", textTransform: "uppercase", marginBottom: 12 }}>
              ◉ Drop 04 unlocks in
            </div>
            <div className="countdown">
              <div className="countdown__cell"><div className="countdown__num">{pad(t.d)}</div><div className="countdown__label">Days</div></div>
              <div className="countdown__cell"><div className="countdown__num">{pad(t.h)}</div><div className="countdown__label">Hours</div></div>
              <div className="countdown__cell"><div className="countdown__num">{pad(t.m)}</div><div className="countdown__label">Min</div></div>
              <div className="countdown__cell"><div className="countdown__num">{pad(t.s)}</div><div className="countdown__label">Sec</div></div>
            </div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: "0.24em", color: "var(--fg-mute)", textAlign: "right", textTransform: "uppercase" }}>
            <div>SS25 / CHAPTER III</div>
            <div style={{ marginTop: 6, color: "var(--accent)" }}>07 LOOKS · 19 SKUs</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandSynthesizer({ onShop }) {
  const cells = [
    { id: "perf", cat: "01 / Performance", name: "Move", count: "06 STYLES", cls: "synth__cell--lg", img: "assets/ek sample black.png" },
    { id: "utility", cat: "02 / Utility Street", name: "Build", count: "08 STYLES", cls: "synth__cell--md", img: "assets/lookbook-couple.jpeg" },
    { id: "archive", cat: "03 / Retro Archive", name: "Decay", count: "05 STYLES", cls: "synth__cell--sm", img: "assets/ek sample black1.png" },
    { id: "tees", cat: "04 / Heavy Tees", name: "Layer", count: "11 STYLES", cls: "synth__cell--sm", img: "assets/ek sample white.png" },
    { id: "acc", cat: "05 / Hardware", name: "Equip", count: "04 STYLES", cls: "synth__cell--sm", img: "assets/product-soul07-white.png" },
  ];
  return (
    <section className="synth">
      <div className="synth__head">
        <div>
          <div className="synth__mono">◢ THE COLLECTION MATRIX</div>
          <h2 className="synth__h2" style={{ marginTop: 18 }}>Three signals.<br /><span className="accent">One frequency.</span></h2>
        </div>
        <div className="synth__mono">[ FILED · COLOMBO · 2025 ]</div>
      </div>
      <div className="synth__grid">
        {cells.map((c, i) => (
          <div key={c.id} className={"synth__cell " + c.cls} onClick={onShop}>
            {c.img ? <div className="synth__bg" style={{ backgroundImage: `url('${c.img}')` }} /> :
              <div className="ph" style={{ position: "absolute", inset: 0 }}>{c.ph}</div>}
            <div className="synth__overlay" />
            <div className="synth__corner">{String(i + 1).padStart(2, "0")}</div>
            <div className="synth__corner synth__corner-r">→ VIEW</div>
            <div className="synth__label">
              <div className="synth__cat">{c.cat}</div>
              <div className="synth__name">{c.name}</div>
              <div className="synth__count">{c.count}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Ticker() {
  const items = ["EKTRIXX", "·", "ATTITUDE IN EVERY FIT", "·", "260 GSM", "·", "MADE IN SRI LANKA", "·", "DROP 03", "·"];
  const loop = [...items, ...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker__row">
        {loop.map((t, i) => (
          <span key={i} className={t === "·" ? "dot" : (i % 4 === 0 ? "outline" : "")}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Lookbook({ onShop }) {
  return (
    <section className="lookbook">
      <div className="lookbook__img-wrap">
        <img className="lookbook__img" src="assets/couple_live_lookbook.png" alt="EKTRIXX lookbook" />
        <div className="lookbook__corners" />
        <div style={{ position: "absolute", top: 18, left: 18, padding: "6px 10px", background: "rgba(10,10,10,0.7)", backdropFilter: "blur(8px)", border: "1px solid var(--line-2)" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: "0.22em", color: "var(--accent)", textTransform: "uppercase" }}>◉ LIVE LOOKBOOK</div>
        </div>
      </div>
      <div className="lookbook__copy">
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.32em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 18 }}>
          — Chapter III / Archive
        </div>
        <h3>Built for the <span className="accent">long</span><br />rotation.</h3>
        <p>EKTRIXX is engineered to outlast trend cycles. Every piece is graded for an oversized silhouette, garment-dyed in small batches, and finished by hand. Wear it loose, wear it stacked, wear it ten years from now — it gets better with time.</p>
        <button className="btn btn--ghost" style={{ marginTop: 28 }} onClick={onShop}>Read the Manifesto <I.Arrow /></button>
        <div className="lookbook__meta">
          <div className="lookbook__meta-cell"><div className="num">260</div><div className="lbl">GSM Cotton</div></div>
          <div className="lookbook__meta-cell"><div className="num">07</div><div className="lbl">Looks / Drop</div></div>
          <div className="lookbook__meta-cell"><div className="num">∞</div><div className="lbl">Rotation</div></div>
        </div>
      </div>
    </section>
  );
}

function Landing({ onNav }) {
  return (
    <div className="fade-in">
      <Hero onShop={() => onNav("archive")} />
      <BrandSynthesizer onShop={() => onNav("archive")} />
      <Ticker />
      <Lookbook onShop={() => onNav("societa")} />
    </div>
  );
}

Object.assign(window, { Landing });
