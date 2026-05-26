// EKTRIXX — Product Detail Page

function PDP({ productId, onNav, onAddToCart }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [colorIdx, setColorIdx] = React.useState(0);
  const [size, setSize] = React.useState(null);
  const [openAcc, setOpenAcc] = React.useState("fabric");
  const color = product.colors[colorIdx];
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
        <a onClick={() => onNav("landing")}>Home</a> / <a onClick={() => onNav("archive")}>Archive</a> / <span style={{color:"var(--fg)"}}>{product.name}</span>
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
              <span className="accent" style={{cursor:"pointer"}}>Size Guide →</span>
            </div>
            <div className="size-grid">
              {product.sizes.map(sz => {
                const cls = sz.stock === 0 ? "is-out" : sz.stock <= 3 ? "is-low" : "";
                return (
                  <button key={sz.s} className={"size-pill " + cls + (size === sz.s ? " is-active" : "")}
                    onClick={() => sz.stock > 0 && setSize(sz.s)}>
                    {sz.s}
                  </button>
                );
              })}
            </div>
            {size && (() => {
              const sz = product.sizes.find(s => s.s === size);
              return <div style={{marginTop:10,fontFamily:"'JetBrains Mono'",fontSize:11,letterSpacing:"0.18em",color: sz.stock <= 3 ? "var(--accent)" : "var(--fg-dim)",textTransform:"uppercase"}}>
                {sz.stock <= 3 ? `◉ ONLY ${sz.stock} LEFT IN ${size}` : `◉ ${sz.stock} IN STOCK · SIZE ${size}`}
              </div>;
            })()}
          </div>

          <div className="pdp__cta">
            <button className="btn btn--primary btn--lg" onClick={handleAdd} disabled={!size}>
              {size ? `Add to Bag — ${fmt(product.price)}` : "Select size"}
            </button>
            <button className="btn btn--ghost btn--lg" title="Wishlist"><I.Heart /></button>
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
    </section>
  );
}

Object.assign(window, { PDP });
