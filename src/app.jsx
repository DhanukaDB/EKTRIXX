// EKTRIXX — App root: view routing, cart state, tweaks panel

function App() {
  const [view, setView] = React.useState("landing");
  const [productId, setProductId] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  // ---- Tweaks ----
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent":  "#ff6a00",
    "grain":   true,
    "density": "loose"
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // sync tweaks → CSS / body attrs
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.body.setAttribute("data-grain", t.grain ? "on" : "off");
  }, [t.accent, t.grain]);

  // restore cart from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("ek_cart");
      if (stored) setCart(JSON.parse(stored));
    } catch {}
  }, []);
  React.useEffect(() => {
    localStorage.setItem("ek_cart", JSON.stringify(cart));
  }, [cart]);

  // toast helper
  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };

  const onNav = (v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const onOpenProduct = (id) => {
    setProductId(id);
    setView("pdp");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const onQuickAdd = (product, size) => {
    const color = product.colors[0];
    addToCart(product, size, color);
    showToast(`Added ${product.name} · ${size}`);
  };

  const addToCart = (product, size, color) => {
    const cartId = `${product.id}-${color.name}-${size}`;
    setCart(prev => {
      const idx = prev.findIndex(i => i.cartId === cartId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, {
        cartId, id: product.id, name: product.name, sku: product.sku,
        price: product.price, size, color: color.name,
        img: color.img || product.primary, qty: 1,
      }];
    });
    setCartOpen(true);
  };

  const onAddToCart = (product, size, color) => {
    addToCart(product, size, color);
    showToast(`Added ${product.name} · ${color.name} · ${size}`);
  };

  const onUpdate = (idx, qty) => {
    setCart(c => c.map((it, i) => i === idx ? { ...it, qty } : it));
  };
  const onRemove = (idx) => {
    setCart(c => c.filter((_, i) => i !== idx));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  let viewEl;
  if (view === "landing")      viewEl = <Landing onNav={onNav} />;
  else if (view === "archive") viewEl = <Archive onOpenProduct={onOpenProduct} onQuickAdd={onQuickAdd} />;
  else if (view === "pdp")     viewEl = <PDP productId={productId} onNav={onNav} onAddToCart={onAddToCart} />;
  else if (view === "societa") viewEl = <Societa />;

  return (
    <div className="app" data-screen-label={view === "landing" ? "Landing" : view === "archive" ? "Archive" : view === "pdp" ? "PDP" : "Società"}>
      <Marquee />
      <Nav view={view === "pdp" ? "archive" : view} onNav={onNav} cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main className="viewport">{viewEl}</main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onUpdate={onUpdate} onRemove={onRemove} />
      <Toast msg={toast} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent">
          <TweakColor label="Highlight" value={t.accent} onChange={v => setTweak("accent", v)}
            options={["#ff6a00", "#00d9ff", "#c8ff2c", "#ff2e63", "#f5f3ee"]} />
        </TweakSection>
        <TweakSection label="Surface">
          <TweakToggle label="Grain overlay" value={t.grain} onChange={v => setTweak("grain", v)} />
        </TweakSection>
        <TweakSection label="Demo">
          <TweakButton label="Add Soul 07 to bag (size M)" onClick={() => {
            const p = PRODUCTS[0]; onAddToCart(p, "L", p.colors[0]);
          }} />
          <TweakButton label="Clear bag" onClick={() => { setCart([]); showToast("Bag cleared"); }} />
        </TweakSection>
        <TweakSection label="Jump To">
          <TweakRadio label="View" value={view} onChange={onNav}
            options={[
              { label: "Landing", value: "landing" },
              { label: "Archive", value: "archive" },
              { label: "Società", value: "societa" },
            ]} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
