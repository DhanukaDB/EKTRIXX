// EKTRIXX — Archive view (catalog + filtering)

function Archive({ onOpenProduct, onQuickAdd }) {
  const [cat, setCat] = React.useState("All");
  const [fit, setFit] = React.useState("All Fits");
  const [sort, setSort] = React.useState("Newest");
  const [flagFilter, setFlagFilter] = React.useState(null);

  const flags = React.useMemo(() => {
    const s = new Set();
    PRODUCTS.forEach(p => p.flags?.forEach(f => s.add(f)));
    return [...s];
  }, []);

  const filtered = React.useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (cat === "All" || p.category === cat) &&
      (fit === "All Fits" || p.fit === fit) &&
      (!flagFilter || p.flags?.includes(flagFilter))
    );
    if (sort === "Price ↑") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price ↓") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, fit, sort, flagFilter]);

  return (
    <section className="archive fade-in">
      <div className="archive__head">
        <div className="archive__title">
          <div className="archive__crumb">Home / Archive / Drop 03</div>
          <h1>The <span className="outline">Archive</span></h1>
        </div>
        <div className="archive__meta">
          <div>◉ {filtered.length} STYLES · LIVE</div>
          <div style={{marginTop: 4}}>UPDATED: 27.05.2026</div>
        </div>
      </div>

      <div className="filters">
        <aside className="filters__side">
          <div className="filters__group">
            <div className="filters__h"><span>Category</span><span>{CATEGORIES.length}</span></div>
            <div className="filters__chips">
              {CATEGORIES.map(c => (
                <button key={c} className={"chip " + (cat === c ? "is-active" : "")} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="filters__group">
            <div className="filters__h"><span>Concept Fit</span><span>{FITS.length}</span></div>
            <div className="filters__chips">
              {FITS.map(f => (
                <button key={f} className={"chip " + (fit === f ? "is-active" : "")} onClick={() => setFit(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="filters__group">
            <div className="filters__h"><span>Print Style</span><span>{flags.length}</span></div>
            <div className="filters__chips">
              <button className={"chip " + (flagFilter === null ? "is-active" : "")} onClick={() => setFlagFilter(null)}>Any</button>
              {flags.map(f => (
                <button key={f} className={"chip " + (flagFilter === f ? "is-active" : "")} onClick={() => setFlagFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="filters__group" style={{borderBottom: 0}}>
            <div className="filters__h"><span>Color</span><span>—</span></div>
            <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
              {["#0a0a0a","#f1ede2","#ff6a00","#3b4a66","#b5a98a","#00d9ff","#c8ff2c","#3a3f44"].map((c, i) => (
                <span key={i} className="swatch" style={{width: 22, height: 22, background: c, cursor: "pointer"}} />
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="filters__sort">
            <span style={{color: "var(--fg-mute)"}}>SORT:</span>
            {SORTS.map(s => (
              <button key={s} className={"chip " + (sort === s ? "is-active" : "")} onClick={() => setSort(s)}>{s}</button>
            ))}
            <span style={{marginLeft: "auto", color: "var(--fg-mute)"}}>SHOWING {filtered.length} / {PRODUCTS.length}</span>
          </div>
          <div className="pgrid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onQuickAdd={onQuickAdd} eagerLoad={i < 4} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{padding: 80, textAlign: "center", color: "var(--fg-mute)", border: "1px dashed var(--line)", marginTop: 16}}>
              <div style={{fontFamily:"'Archivo Black'",fontSize:32,color:"var(--fg)",marginBottom:12,textTransform:"uppercase"}}>NOTHING IN RANGE</div>
              <button className="btn btn--ghost" onClick={() => { setCat("All"); setFit("All Fits"); setFlagFilter(null); }}>Reset Filters</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Archive });
