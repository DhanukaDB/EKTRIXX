// EKTRIXX — Product Detail Page

function PDP({ productId, onNav, onAddToCart }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [colorIdx, setColorIdx] = React.useState(0);
  const [size, setSize] = React.useState(null);
  const [openAcc, setOpenAcc] = React.useState("fabric");
  const [sizeGuideOpen, setSizeGuideOpen] = React.useState(false);
  const [stickyVisible, setStickyVisible] = React.useState(false);
  const ctaRef = React.useRef(null);
  const color = product.colors[colorIdx];

  // Sticky ATC: show when native CTA scrolls out of view
  React.useEffect(() => {
    if (!ctaRef.current) return;
    const obs = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { threshold: 0 });
    obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);
  const installments = [
    { n: "1ST · TODAY", v: Math.round(product.price / 3) },
    { n: "30 DAYS",     v: Math.round(product.price / 3) },
    { n: "60 DAYS",     v: product.price - 2 * Math.round(product.price / 3) },
  ];

  const handleAdd = () => {
    if (!size) { return; }
    onAddToCart(product, size, color);
  };

  const mainImg = color.img || product.primary;
  const altImg = product.alt || mainImg;

  const acc = (id, title, body) => {
    const isOpen = openAcc === id;
    return (
      <div className={"acc__item " + (isOpen ? "is-open" : "")}>
        <button className="acc__btn" onClick={() => setOpenAcc(isOpen ? null : id)}>
          <span>{title}</span><span className="plus">+</span>
        </button>
        <div className="acc__body"><div className="acc__body-inner">{body}</div></div>
      </div>
    );
  };

  return (
    <section className="pdp fade-in">
      <div className="pdp__crumb">
        <a onClick={() => onNav("landing")} style={{padding:"8px 4px",display:"inline-flex",alignItems:"center"}}>Home</a>
        {" / "}
        <a onClick={() => onNav("archive")} style={{padding:"8px 4px",display:"inline-flex",alignItems:"center"}}>Archive</a>
        {" / "}
        <span style={{color:"var(--fg)"}}>{product.name}</span>
      </div>

      <div className="pdp__layout">
        <div className="pdp__media">
          {mainImg ? <div className="pdp__media-cell"><img src={mainImg} alt={product.name} /></div>
                   : <div className="pdp__media-cell ph">FRONT · 01</div>}
          {altImg ?  <div className="pdp__media-cell"><img src={altImg} alt={product.name + " back"} /></div>
                   : <div className="pdp__media-cell ph">BACK · 02</div>}
          <div className="pdp__media-cell pdp__media-cell--tall ph">DETAIL · FABRIC · 260 GSM</div>
          <div className="pdp__media-cell ph">FIT · ON-MODEL · 03</div>
          <div className="pdp__media-cell ph">STYLED · 04</div>
        </div>

        <aside className="pdp__details">
          <div className="pdp__sku">SKU · {product.sku} · {product.drop}</div>
          <h1 className="pdp__name">{product.name}</h1>
          <div className="pdp__cat">{product.category} · {product.fit}</div>

          <div className="pdp__price-row">
            <div className="pdp__price">{fmt(product.price)}</div>
            {product.compare && <>
              <div className="pdp__price-strike">{fmt(product.compare)}</div>
              <div className="pdp__save">SAVE {fmt(product.compare - product.price)}</div>
            </>}
          </div>
          <p className="pdp__returns-note"><I.Refresh size={11} /> Free returns · 14-day exchange</p>

          <div className="splitpay">
            <div className="splitpay__head">
              <span>SPLIT PAY · 3 INSTALLMENTS</span>
              <span className="accent">0% INTEREST</span>
            </div>
            <div className="splitpay__row">
              {installments.map((i, idx) => (
                <div key={idx} className={"splitpay__cell " + (idx === 0 ? "is-now" : "")}>
                  <div className="n">{i.n}</div>
                  <div className="v">{fmt(i.v)}</div>
                </div>
              ))}
            </div>
            <div className="splitpay__providers">
              <span className="splitpay__provider">KOKO</span>
              <span className="splitpay__provider">MINTPAY</span>
              <span className="splitpay__provider">CARDS</span>
            </div>
          </div>

          <div className="pdp__group">
            <div className="pdp__group-h"><span>COLOR — {color.name}</span><span>{colorIdx + 1} / {product.colors.length}</span></div>
            <div className="pdp__color-row">
              {product.colors.map((c, i) => (
                <button key={i} className={"color-pill " + (i === colorIdx ? "is-active" : "")} onClick={() => setColorIdx(i)} title={c.name}>
                  <div className="color-pill__chip" style={{background: c.hex}} />
                </button>
              ))}
            </div>
          </div>

          <div className="pdp__group">
            <div className="pdp__group-h">
              <span>SIZE</span>
              <button type="button" className="pdp__size-guide-btn" onClick={() => setSizeGuideOpen(true)}>Size Guide →</button>
            </div>
            <div className="size-grid">
              {product.sizes.map(sz => {
                const stockCls = sz.stock === 0 ? "is-out" : sz.stock === 1 ? "is-last" : sz.stock <= 3 ? "is-low" : "";
                return (
                  <button type="button" key={sz.s} className={"size-pill " + stockCls + (size === sz.s ? " is-active" : "")}
                    onClick={() => sz.stock > 0 && setSize(sz.s)}>
                    {sz.s}
                  </button>
                );
              })}
            </div>
            <span className="pdp__model-note"><I.User size={11} /> Model is 185cm / 6'1", wearing L</span>
            {size && (() => {
              const sz = product.sizes.find(s => s.s === size);
              return <div style={{marginTop:8,fontFamily:"'JetBrains Mono'",fontSize:11,letterSpacing:"0.18em",color: sz.stock <= 3 ? "var(--accent)" : "var(--fg-dim)",textTransform:"uppercase"}}>
                {sz.stock === 1 ? `◉ LAST ONE IN ${size}` : sz.stock <= 3 ? `◉ ONLY ${sz.stock} LEFT IN ${size}` : `◉ ${sz.stock} IN STOCK · SIZE ${size}`}
              </div>;
            })()}
          </div>

          <div className="pdp__cta" ref={ctaRef}>
            <button type="button" className="btn btn--primary btn--lg" onClick={handleAdd} disabled={!size}>
              {size ? `Add to Bag — ${fmt(product.price)}` : "Select size"}
            </button>
            <button type="button" className="btn btn--ghost btn--lg" title="Wishlist" aria-label="Add to wishlist"><I.Heart /></button>
          </div>

          {/* Sticky ATC bar — appears when native CTA scrolls off screen */}
          <div className={"pdp__sticky-atc " + (stickyVisible ? "is-visible" : "")}>
            <div className="pdp__sticky-atc-info">
              <span className="pdp__sticky-atc-name">{product.name}</span>
              <span className="pdp__sticky-atc-meta">{size ? `Size ${size} selected` : "Select a size"}</span>
            </div>
            <button type="button" className="btn btn--primary" onClick={handleAdd} disabled={!size}>
              {size ? "Add to Bag" : "Select Size"}
            </button>
          </div>

          <div className="pdp__shipping">
            <div><span className="ico"><I.Truck /></span> ISLAND-WIDE · 3–5 DAYS</div>
            <div><span className="ico"><I.Shield /></span> 14-DAY EXCHANGE</div>
          </div>

          <div className="acc">
            {acc("fabric", "Fabric & Care",
              <dl>
                {Object.entries(product.fabric).map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt>{k.replace(/([A-Z])/g, " $1")}</dt><dd>{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
            )}
            {acc("fit", "Fit Guide",
              <div>
                <p style={{margin:"0 0 12px"}}>{product.fit === "Oversized" ? "Boxy oversized silhouette. Dropped shoulder, wide body, cropped hem. Take your TTS for the relaxed cut, or size down once for an athletic drape." : "True to size with athletic taper. Built for layering under a shirt or wearing solo."}</p>
                <dl>
                  <dt>Model</dt><dd>6'1" / 75kg wearing L</dd>
                  <dt>Chest (M)</dt><dd>112 cm flat</dd>
                  <dt>Length (M)</dt><dd>72 cm shoulder to hem</dd>
                  <dt>Sleeve (M)</dt><dd>26 cm</dd>
                </dl>
              </div>
            )}
            {acc("ship", "Shipping & Returns",
              <div>
                <p style={{margin:"0 0 12px"}}>Island-wide delivery in 3–5 working days. Free shipping on orders over LKR 15,000.</p>
                <p style={{margin:0}}>Unused items can be exchanged within 14 days. Drop pieces are final sale.</p>
              </div>
            )}
            {acc("auth", "Authenticity & Origin",
              <div>
                <p style={{margin:"0 0 12px"}}>Designed in Colombo. Cut and sewn in Sri Lanka. Every garment is QC-graded and tagged with a serialized care label.</p>
                <p style={{margin:0,fontFamily:"'JetBrains Mono'",fontSize:11,letterSpacing:"0.18em",color:"var(--fg-mute)",textTransform:"uppercase"}}>SERIAL · {product.sku}-{Math.floor(Math.random()*9000+1000)} / 200</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Size Guide Bottom Sheet */}
      <div className={"size-guide-scrim " + (sizeGuideOpen ? "is-open" : "")} onClick={() => setSizeGuideOpen(false)} />
      <div className={"size-guide-sheet " + (sizeGuideOpen ? "is-open" : "")} role="dialog" aria-modal="true" aria-label="Size guide">
        <div className="size-guide-sheet__head">
          <span className="size-guide-sheet__title">Size Guide</span>
          <button type="button" className="size-guide-sheet__close" aria-label="Close size guide" onClick={() => setSizeGuideOpen(false)}><I.X /></button>
        </div>
        <div className="size-guide-sheet__model">◉ &nbsp;Model is 185cm / 6'1", wearing size L</div>
        <table className="size-guide-table">
          <thead>
            <tr><th>Size</th><th>Chest (cm)</th><th>Length (cm)</th><th>Shoulder (cm)</th></tr>
          </thead>
          <tbody>
            {[
              ["XS", "96–101", "65", "43"],
              ["S",  "101–106","68", "45"],
              ["M",  "106–111","71", "47"],
              ["L",  "111–116","74", "49"],
              ["XL", "116–121","77", "51"],
              ["XXL","121–126","80", "53"],
              ["3XL","126–131","83", "55"],
            ].map(([sz, chest, len, sh]) => (
              <tr key={sz}><td>{sz}</td><td>{chest}</td><td>{len}</td><td>{sh}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

Object.assign(window, { PDP });
