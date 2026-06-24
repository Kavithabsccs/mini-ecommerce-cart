import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 1299, emoji: "🎧", category: "Electronics" },
  { id: 2, name: "Running Shoes", price: 899, emoji: "👟", category: "Fashion" },
  { id: 3, name: "Coffee Mug", price: 249, emoji: "☕", category: "Kitchen" },
  { id: 4, name: "Notebook Set", price: 349, emoji: "📓", category: "Stationery" },
  { id: 5, name: "Sunglasses", price: 599, emoji: "🕶️", category: "Fashion" },
  { id: 6, name: "Bluetooth Speaker", price: 1599, emoji: "🔊", category: "Electronics" },
  { id: 7, name: "Yoga Mat", price: 749, emoji: "🧘", category: "Fitness" },
  { id: 8, name: "Water Bottle", price: 399, emoji: "💧", category: "Fitness" },
];

export default function App() {
  const [cart, setCart] = useState({});
  const [tab, setTab] = useState("shop");

  function addToCart(product) {
    setCart((prev) => ({
      ...prev,
      [product.id]: { ...product, qty: (prev[product.id]?.qty || 0) + 1 },
    }));
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  function updateQty(id, change) {
    setCart((prev) => {
      const item = prev[id];
      const newQty = item.qty + change;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  }

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div style={styles.app}>

      {/* ===== HEADER ===== */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🛒 <span style={styles.logoAccent}>ShopQuick</span></span>
          <span style={styles.tagline}>Best deals, Fast delivery</span>
        </div>
        <nav style={styles.nav}>
          <button style={tab === "shop" ? styles.activeTab : styles.tabBtn} onClick={() => setTab("shop")}>🏠 Home</button>
          <button style={tab === "shop" ? styles.activeTab : styles.tabBtn} onClick={() => setTab("shop")}>🛍️ Shop</button>
          <button style={tab === "cart" ? styles.activeTab : styles.tabBtn} onClick={() => setTab("cart")}>
            🛒 Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </button>
        </nav>
      </header>

      {/* ===== HERO BANNER ===== */}
      {tab === "shop" && (
        <div style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>🔥 Big Sale is Live!</h1>
            <p style={styles.heroSub}>Top products at unbeatable prices. Shop now before stock runs out!</p>
            <button style={styles.heroBtn}>Shop Now →</button>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main style={styles.main}>

        {/* SHOP TAB */}
        {tab === "shop" && (
          <>
            <h2 style={styles.sectionTitle}>All Products</h2>
            <div style={styles.grid}>
              {PRODUCTS.map((p) => (
                <div key={p.id} style={styles.card}>
                  <div style={styles.cardBadge}>{p.category}</div>
                  <div style={styles.emoji}>{p.emoji}</div>
                  <div style={styles.productName}>{p.name}</div>
                  <div style={styles.price}>₹{p.price}</div>
                  <button style={cart[p.id] ? styles.addedBtn : styles.addBtn} onClick={() => addToCart(p)}>
                    {cart[p.id] ? `✓ Added (${cart[p.id].qty})` : "+ Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CART TAB */}
        {tab === "cart" && (
          <div style={styles.cartPage}>
            <h2 style={styles.sectionTitle}>Your Cart</h2>
            {cartItems.length === 0 ? (
              <div style={styles.empty}>
                <div style={{ fontSize: 60 }}>🛒</div>
                <p style={{ fontSize: 18, color: "#666", margin: "12px 0" }}>Your cart is empty!</p>
                <button style={styles.addBtn} onClick={() => setTab("shop")}>Browse Products</button>
              </div>
            ) : (
              <div style={styles.cartLayout}>
                {/* Cart Items */}
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <span style={{ fontSize: 32 }}>{item.emoji}</span>
                      <div style={{ flex: 1, marginLeft: 14 }}>
                        <div style={styles.productName}>{item.name}</div>
                        <div style={{ color: "#888", fontSize: 13 }}>₹{item.price} each</div>
                      </div>
                      <div style={styles.qtyRow}>
                        <button style={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                        <span style={{ margin: "0 12px", fontWeight: 700, fontSize: 16 }}>{item.qty}</span>
                        <button style={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <div style={{ marginLeft: 16, fontWeight: 700, color: "#f97316", minWidth: 70, textAlign: "right" }}>
                        ₹{item.price * item.qty}
                      </div>
                      <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div style={styles.summary}>
                  <div style={styles.summaryTitle}>Order Summary</div>
                  <div style={styles.summaryRow}>
                    <span>Subtotal ({cartCount} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>GST (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span>Delivery</span>
                    <span style={{ color: "#22c55e" }}>FREE</span>
                  </div>
                  <hr style={{ borderColor: "#2a2a2a", margin: "16px 0" }} />
                  <div style={styles.totalRow}>
                    <span>Total</span>
                    <span style={{ color: "#f97316" }}>₹{total}</span>
                  </div>
                  <button
                    style={{ ...styles.addBtn, width: "100%", padding: 14, fontSize: 16, marginTop: 8 }}
                    onClick={() => alert(`✅ Order Placed!\nTotal: ₹${total}\nThank you for shopping! 🎉`)}
                  >
                    Checkout →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>

          {/* Brand */}
          <div>
            <div style={styles.footerLogo}>🛒 ShopQuick</div>
            <p style={styles.footerDesc}>
              Your one-stop shop for the best deals. Fast delivery, easy returns, and 24/7 support.
            </p>
            <div style={styles.socialRow}>
              <a href="#" style={styles.socialBtn}>📘 Facebook</a>
              <a href="#" style={styles.socialBtn}>📸 Instagram</a>
              <a href="#" style={styles.socialBtn}>🐦 Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={styles.footerHeading}>Quick Links</div>
            <div style={styles.footerLinks}>
              <a href="#" style={styles.footerLink}>🏠 Home</a>
              <a href="#" style={styles.footerLink}>🛍️ Shop</a>
              <a href="#" style={styles.footerLink}>🛒 Cart</a>
              <a href="#" style={styles.footerLink}>❤️ Wishlist</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <div style={styles.footerHeading}>Support</div>
            <div style={styles.footerLinks}>
              <a href="#" style={styles.footerLink}>📞 Contact Us</a>
              <a href="#" style={styles.footerLink}>❓ FAQ</a>
              <a href="#" style={styles.footerLink}>🔄 Returns</a>
              <a href="#" style={styles.footerLink}>🚚 Shipping Info</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={styles.footerHeading}>Contact</div>
            <div style={styles.footerLinks}>
              <span style={styles.footerLink}>📧 support@shopquick.com</span>
              <span style={styles.footerLink}>📞 +91 98765 43210</span>
              <span style={styles.footerLink}>📍 Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.footerBottom}>
          <span>© 2026 ShopQuick. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  app: { fontFamily: "sans-serif", background: "#0f0f0f", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" },

  // HEADER
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", background: "#1a1a1a", borderBottom: "1px solid #2a2a2a", position: "sticky", top: 0, zIndex: 100 },
  headerLeft: { display: "flex", flexDirection: "column" },
  logo: { fontSize: 22, fontWeight: 800 },
  logoAccent: { color: "#f97316" },
  tagline: { fontSize: 11, color: "#555", marginTop: 2 },
  nav: { display: "flex", gap: 8 },
  tabBtn: { padding: "8px 18px", borderRadius: 8, border: "none", background: "transparent", color: "#888", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  activeTab: { padding: "8px 18px", borderRadius: 8, border: "none", background: "#f97316", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  badge: { background: "#fff", color: "#f97316", borderRadius: "50%", fontSize: 11, fontWeight: 800, padding: "1px 6px", marginLeft: 6 },

  // HERO
  hero: { background: "linear-gradient(135deg, #1a1a1a 0%, #2a1500 100%)", padding: "60px 32px", textAlign: "center", borderBottom: "1px solid #2a2a2a" },
  heroContent: { maxWidth: 600, margin: "0 auto" },
  heroTitle: { fontSize: 36, fontWeight: 800, color: "#fff", margin: "0 0 12px" },
  heroSub: { fontSize: 16, color: "#888", margin: "0 0 24px" },
  heroBtn: { background: "#f97316", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" },

  // MAIN
  main: { flex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", padding: "32px 24px" },
  sectionTitle: { fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#fff" },

  // PRODUCTS
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 },
  card: { background: "#1a1a1a", borderRadius: 14, padding: 20, border: "1px solid #2a2a2a", textAlign: "center", position: "relative" },
  cardBadge: { position: "absolute", top: 12, right: 12, background: "#2a2a2a", color: "#888", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6 },
  emoji: { fontSize: 44, marginBottom: 12 },
  productName: { fontWeight: 600, fontSize: 15, marginBottom: 6, color: "#fff" },
  price: { color: "#f97316", fontWeight: 700, fontSize: 18, marginBottom: 14 },
  addBtn: { background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  addedBtn: { background: "transparent", color: "#f97316", border: "1px solid #f97316", borderRadius: 8, padding: "9px 18px", fontWeight: 600, cursor: "pointer", fontSize: 14 },

  // CART
  cartPage: { maxWidth: 900, margin: "0 auto" },
  cartLayout: { display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 },
  cartItem: { display: "flex", alignItems: "center", background: "#1a1a1a", borderRadius: 12, padding: "14px 18px", marginBottom: 12, border: "1px solid #2a2a2a" },
  qtyRow: { display: "flex", alignItems: "center" },
  qtyBtn: { background: "#2a2a2a", color: "#f97316", border: "none", borderRadius: 6, width: 32, height: 32, fontSize: 18, cursor: "pointer", fontWeight: 700 },
  removeBtn: { background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16, marginLeft: 14 },
  summary: { background: "#1a1a1a", borderRadius: 14, padding: 24, border: "1px solid #2a2a2a", position: "sticky", top: 80, height: "fit-content" },
  summaryTitle: { fontSize: 17, fontWeight: 700, marginBottom: 18, color: "#fff" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "#888" },
  totalRow: { display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, color: "#fff" },
  empty: { textAlign: "center", padding: "80px 0" },

  // FOOTER
  footer: { background: "#111", borderTop: "1px solid #2a2a2a", padding: "48px 32px 0" },
  footerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, maxWidth: 1100, margin: "0 auto", paddingBottom: 32 },
  footerLogo: { fontSize: 20, fontWeight: 800, color: "#f97316", marginBottom: 12 },
  footerDesc: { color: "#555", fontSize: 13, lineHeight: 1.7, marginBottom: 16 },
  socialRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  socialBtn: { background: "#1a1a1a", color: "#888", border: "1px solid #2a2a2a", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, textDecoration: "none", cursor: "pointer" },
  footerHeading: { fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 16 },
  footerLinks: { display: "flex", flexDirection: "column", gap: 10 },
  footerLink: { color: "#555", fontSize: 13, textDecoration: "none", cursor: "pointer" },
  footerBottom: { borderTop: "1px solid #2a2a2a", padding: "20px 0", display: "flex", justifyContent: "space-between", color: "#444", fontSize: 13, maxWidth: 1100, margin: "0 auto" },
};