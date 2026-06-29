// EKTRIXX — shell components: nav, marquee, footer, cart drawer, product card
const { useState, useEffect, useRef, useMemo } = React;

/* ============ MARQUEE ============ */
function Marquee() {
  const items = [
    "FREE SHIPPING ON ORDERS OVER LKR 15,000",
    "DROP 03 — ARCHIVE OPEN NOW",
    "PAY IN 3 WITH KOKO · MINTPAY",
    "ATTITUDE IN EVERY FIT",
    "ISLAND-WIDE COD AVAILABLE",
    "MEMBERS UNLOCK EARLY ACCESS",
  ];
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {loop.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

/* ============ NAV ============ */
function Nav({ view, onNav, cartCount, onCart, user, onSignOut }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!accountOpen) return;
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setAccountOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [accountOpen]);

  const links = [
    ["Drops", "landing"],
    ["Archive", "archive"],
    ["Performance", "archive"],
    ["Società", "societa"],
  ];

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* Mobile menu toggle (visible only on mobile) */}
        <div className="nav__mobile-toggle">
          <button type="button" className="nav__icon-btn" aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)}>
            <I.Menu />
          </button>
        </div>

        <nav className="nav__links">
          {links.map(([label, v]) => (
            <a key={label} className={"nav__link " + (view === v ? "is-active" : "")}
               onClick={() => onNav(v)}>{label}</a>
          ))}
        </nav>
        <div className="nav__brand" onClick={() => onNav("landing")}>
          <EKGlyph size={26} />
          <span>EKTRIXX</span>
        </div>
        <div className="nav__right">
          <button className="nav__icon-btn" title="Search"><I.Search /></button>

          {/* Account / User button */}
          <div className="nav__account-wrap" ref={menuRef}>
            <button
               className={"nav__icon-btn nav__account-btn" + (user ? " is-signed-in" : "")}
               title={user ? user.name : "Account"}
               onClick={() => user ? setAccountOpen(o => !o) : onNav("societa")}
            >
              {user ? (
                user.picture
                  ? <img className="nav__user-avatar" src={user.picture} alt={user.given_name} referrerPolicy="no-referrer" />
                  : <div className="nav__user-initials">{(user.given_name || user.name || "?")[0].toUpperCase()}</div>
              ) : (
                <I.User />
              )}
            </button>

            {user && accountOpen && (
              <div className="nav__account-menu fade-in">
                <div className="nav__account-menu-user">
                  {user.picture
                    ? <img className="nav__menu-avatar" src={user.picture} alt={user.given_name} referrerPolicy="no-referrer" />
                    : <div className="nav__menu-initials">{(user.given_name || user.name || "?")[0].toUpperCase()}</div>
                  }
                  <div>
                    <div className="nav__menu-name">{user.name}</div>
                    <div className="nav__menu-email">{user.email}</div>
                  </div>
                </div>
                <div className="nav__account-menu-divider" />
                <button className="nav__menu-item" onClick={() => { setAccountOpen(false); onNav("societa"); }}>
                  ◉ &nbsp;My Società
                </button>
                <button className="nav__menu-item nav__menu-item--danger" onClick={() => { setAccountOpen(false); onSignOut(); }}>
                  ✕ &nbsp;Sign Out
                </button>
              </div>
            )}
          </div>

          <button className="nav__icon-btn" title="Bag" onClick={onCart}>
            <I.Bag />
            {cartCount > 0 && <span className="nav__cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={"nav__mobile-scrim " + (mobileMenuOpen ? "is-open" : "")} onClick={() => setMobileMenuOpen(false)} />
      <aside role="dialog" aria-modal="true" aria-label="Navigation menu" className={"nav__mobile-drawer " + (mobileMenuOpen ? "is-open" : "")}>
        <div className="nav__mobile-drawer-head">
          <div className="nav__mobile-drawer-title">EKTRIXX</div>
          <button type="button" className="nav__mobile-drawer-close" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)}>
            <I.X />
          </button>
        </div>
        <div className="nav__mobile-drawer-links">
          {links.map(([label, v]) => (
            <button type="button" key={label} className={"nav__mobile-drawer-link " + (view === v ? "is-active" : "")}
               onClick={() => { setMobileMenuOpen(false); onNav(v); }}>
              {label}
            </button>
          ))}
          <div className="nav__mobile-drawer-divider" />
          {user ? (
            <div className="nav__mobile-drawer-user">
              <div className="nav__mobile-drawer-user-info">
                {user.picture && <img className="nav__mobile-drawer-avatar" src={user.picture} alt={user.given_name} />}
                <div>
                  <div className="nav__mobile-drawer-name">{user.name}</div>
                  <div className="nav__mobile-drawer-email">{user.email}</div>
                </div>
              </div>
              <button type="button" className="btn btn--ghost btn--block" style={{ marginTop: 12 }} onClick={() => { setMobileMenuOpen(false); onNav("societa"); }}>
                ◉ Go to Dashboard
              </button>
              <button type="button" className="btn btn--ghost btn--block nav__menu-item--danger" style={{ marginTop: 8 }} onClick={() => { setMobileMenuOpen(false); onSignOut(); }}>
                ✕ Sign Out
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn--primary btn--block" style={{ marginTop: 16 }} onClick={() => { setMobileMenuOpen(false); onNav("societa"); }}>
              Enter the Società <I.Arrow />
            </button>
          )}
        </div>
      </aside>
    </header>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <div>
          <div className="foot__big">
            <span>ATTITUDE</span><br/>
            <span className="outline">IN EVERY</span><br/>
            <span style={{color: "var(--accent)"}}>FIT.</span>
          </div>
          <div style={{marginTop: 24, fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.22em", color: "var(--fg-mute)", textTransform: "uppercase"}}>
            Est. 2025 · Colombo · Sri Lanka
          </div>
        </div>
        <div className="foot__col">
          <h4>Shop</h4>
          <ul><li>Tees</li><li>Cargoes</li><li>Performance</li><li>Accessories</li><li>Sale</li></ul>
        </div>
        <div className="foot__col">
          <h4>Support</h4>
          <ul><li>Shipping</li><li>Returns & Exchange</li><li>Sizing Guide</li><li>Contact</li><li>FAQ</li></ul>
        </div>
        <div className="foot__col">
          <h4>Connect</h4>
          <ul><li>Instagram</li><li>TikTok</li><li>YouTube</li><li>Società Hub</li></ul>
        </div>
      </div>
      <div className="foot__bot">
        <span>© 2025 EKTRIXX · ALL RIGHTS RESERVED</span>
        <span>PRIVACY · TERMS · COOKIES</span>
      </div>
    </footer>
  );
}

/* ============ CART DRAWER ============ */
function CartDrawer({ open, onClose, items, onUpdate, onRemove }) {
  const FREE_THRESHOLD = 15000;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const remaining = Math.max(0, FREE_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_THRESHOLD) * 100);
  const shipping = subtotal >= FREE_THRESHOLD ? 0 : subtotal === 0 ? 0 : 750;

  return (
    <>
      <div className={"cart-scrim " + (open ? "is-open" : "")} onClick={onClose} />
      <aside className={"cart " + (open ? "is-open" : "")}>
        <div className="cart__head">
          <div>
            <h2>The Bag</h2>
            <div className="count">{items.length} item{items.length === 1 ? "" : "s"}</div>
          </div>
          <button className="cart__close" onClick={onClose}><I.X /></button>
        </div>

        <div className="cart__shipping">
          {subtotal >= FREE_THRESHOLD ? (
            <div className="cart__shipping-line">
              <span><I.Truck style={{marginRight: 8, verticalAlign: "-2px"}} />Free shipping unlocked</span>
              <span className="accent">✓ COMPLETE</span>
            </div>
          ) : (
            <div className="cart__shipping-line">
              <span>{fmt(remaining)} until free shipping</span>
              <span className="accent">{Math.round(pct)}%</span>
            </div>
          )}
          <div className="cart__bar"><div className="cart__bar-fill" style={{width: pct + "%"}} /></div>
        </div>

        <div className="cart__items">
          {items.length === 0 ? (
            <div className="cart__empty">
              <div className="big">Empty.</div>
              <div style={{fontFamily: "'JetBrains Mono'", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase"}}>
                Build a fit. Start the rotation.
              </div>
              <button className="btn btn--primary" style={{marginTop: 28}} onClick={onClose}>Browse Archive</button>
            </div>
          ) : items.map((it, idx) => (
            <div key={it.cartId} className="citem">
              <div className="citem__img">
                {it.img ? <img src={it.img} alt={it.name} /> : <div className="ph" style={{width:"100%",height:"100%"}}>EKTRIXX</div>}
              </div>
              <div className="citem__body">
                <div className="citem__name">{it.name}</div>
                <div className="citem__meta">{it.color} · Size {it.size} · {it.sku}</div>
                <div className="citem__bottom">
                  <div className="citem__qty">
                    <button onClick={() => onUpdate(idx, Math.max(1, it.qty - 1))}>−</button>
                    <span className="n">{it.qty}</span>
                    <button onClick={() => onUpdate(idx, it.qty + 1)}>+</button>
                  </div>
                  <div className="citem__price">{fmt(it.price * it.qty)}</div>
                </div>
                <button type="button" className="citem__remove" onClick={() => onRemove(idx)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <>
            <div className="cart__express-pay">
              <button type="button" className="cart__express-btn cart__express-btn--apple" aria-label="Pay with Apple Pay">
                <svg width="14" height="17" viewBox="0 0 56 68" fill="#000" style={{marginRight:7,flexShrink:0}}>
                  <path d="M47.7 14.5c.4-5.1-1.4-10.3-4.8-14C39.5 1 34.4-.7 29.6.1c-.5 4.7 1.6 9.7 5 12.9 3.5 3.4 8.5 5.2 13.1 1.5z"/>
                  <path d="M28 18.2c-4.8 0-9.3 2.7-12.1 2.7-2.9 0-7.3-2.6-12.1-2.6C-.5 18.3-6.3 22.9-9.5 29.4-16 42.7-11.6 63-4.8 74c3.4 5 7.4 10.6 12.7 10.4 5.1-.2 7.1-3.3 13.3-3.3 6.3 0 8 3.3 13.3 3.2 5.4-.1 8.9-5.2 12.3-10.2 3.8-5.7 5.4-11.2 5.5-11.5-.1-.1-10.7-4.1-10.8-16.2-.1-10.2 8.3-15 8.7-15.3-4.8-7-12.2-7.9-14.2-7.9z" transform="translate(14,0)"/>
                </svg>
                <span style={{fontFamily:"system-ui",fontWeight:600,fontSize:13}}>Apple Pay</span>
              </button>
              <button type="button" className="cart__express-btn cart__express-btn--google" aria-label="Pay with Google Pay">
                <span style={{fontFamily:"system-ui",fontSize:13,fontWeight:700}}>
                  <span style={{color:"#4285f4"}}>G</span><span style={{color:"#ea4335"}}>o</span><span style={{color:"#fbbc05"}}>o</span><span style={{color:"#4285f4"}}>g</span><span style={{color:"#34a853"}}>l</span><span style={{color:"#ea4335"}}>e</span>
                </span>
                <span style={{fontFamily:"system-ui",fontWeight:500,fontSize:13,marginLeft:5,color:"#000"}}>Pay</span>
              </button>
              <div className="cart__express-divider">— OR —</div>
            </div>
            <div className="cart__foot">
              <div className="cart__totals">
                <div className="row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className="row"><span>Shipping</span><span>{shipping === 0 ? "FREE" : fmt(shipping)}</span></div>
                <div className="row total"><span>Total</span><span className="v">{fmt(subtotal + shipping)}</span></div>
              </div>
              <button type="button" className="btn btn--primary btn--block btn--lg">Checkout <I.Arrow /></button>
              <div style={{marginTop: 12, fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: "0.18em", color: "var(--fg-mute)", textAlign: "center", textTransform: "uppercase"}}>
                <I.Lock style={{verticalAlign: "-2px", marginRight: 6}} />
                Secure checkout · Koko · Mintpay · Cards
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ============ PRODUCT CARD ============ */
function ProductCard({ product, onOpen, onQuickAdd, eagerLoad }) {
  const lowest = Math.min(...product.sizes.filter(s => s.stock > 0).map(s => s.stock));
  return (
    <button type="button" className="pcard" onClick={() => onOpen(product.id)}>
      <div className="pcard__img">
        {product.primary ? (
          <>
            <img src={product.primary} alt={product.name} className="primary" loading={eagerLoad ? "eager" : "lazy"} decoding="async" />
            <img src={product.alt || product.primary} alt={product.name + " alt"} className="alt" loading="lazy" decoding="async" />
          </>
        ) : (
          <div className="ph" style={{position:"absolute",inset:0}}>{product.placeholder || "EKTRIXX"}</div>
        )}
        <div className="pcard__flags">
          {product.flags?.map(f => <span key={f} className="flag">{f}</span>)}
          {product.compare && <span className="flag flag--danger">-{Math.round((1 - product.price / product.compare) * 100)}%</span>}
        </div>
        <div className="pcard__corner">{product.sku}</div>
        <div className="pcard__quick" onClick={(e) => e.stopPropagation()}>
          <div className="pcard__quick-head">
            <span>Quick Add</span>
            <span>{lowest <= 3 ? "LOW STOCK" : "IN STOCK"}</span>
          </div>
          <div className="size-row">
            {product.sizes.map(sz => {
              const cls = sz.stock === 0 ? "is-out" : sz.stock === 1 ? "is-last" : sz.stock <= 3 ? "is-low" : "";
              return (
                <button type="button" key={sz.s} className={"size-pill " + cls}
                  onClick={() => sz.stock > 0 && onQuickAdd(product, sz.s)}>
                  {sz.s}
                </button>
              );
            })}
          </div>
        </div>
        {/* Mobile-only tap CTA — hover quick-add is unavailable on touch; opens PDP for size selection */}
        <button type="button" className="pcard__mobile-atc" aria-label={`Add ${product.name} to bag`}
          onClick={(e) => { e.stopPropagation(); onOpen(product.id); }}>
          +
        </button>
      </div>
      <div className="pcard__info">
        <div>
          <div className="pcard__name">{product.name}</div>
          <div className="pcard__sub">{product.fit} · {product.category}</div>
          <div className="pcard__swatches" aria-hidden="true">
            {product.colors.map((c, i) => <span key={i} className="swatch" style={{background: c.hex}} title={c.name} />)}
          </div>
        </div>
        <div className="pcard__price">
          {product.compare && <span className="strike">{fmt(product.compare)}</span>}
          {fmt(product.price)}
        </div>
      </div>
    </button>
  );
}

/* ============ TOAST ============ */
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast fade-in" key={msg}>{msg}</div>;
}

Object.assign(window, { Marquee, Nav, Footer, CartDrawer, ProductCard, Toast });
