// ===================== PLACEHOLDER IMAGE GENERATOR =====================
// Generates a self-contained inline SVG data URI so product images always
// render, even with no network access (no dependency on external image hosts).

const PH_COLORS = ["#8c52ff", "#ff9900", "#007185", "#c7511f", "#37475a", "#2e8b57", "#b12704", "#005a9e"];

function phColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PH_COLORS[hash % PH_COLORS.length];
}

function phEscapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function ph(label, w = 400, h = 400) {
  const bg = phColor(label);
  label = phEscapeXml(label);
  const fontSize = Math.max(14, Math.round(Math.min(w, h) / 12));
  const words = label.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (test.length > 16 && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);

  const lineHeight = fontSize * 1.3;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
  const textEls = lines
    .map((l, i) => `<text x="50%" y="${startY + i * lineHeight}" font-size="${fontSize}" fill="#ffffff" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${l}</text>`)
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="${bg}"/>${textEls}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ===================== DATA =====================

const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 49.99,
    img: ph("Headphones", 400, 400),
    rating: 4.3,
    reviewCount: 2148,
    description: "Enjoy rich, immersive sound with these over-ear wireless headphones. Featuring up to 30 hours of battery life, active noise cancellation, and a foldable design for easy travel.",
    bullets: [
      "Up to 30 hours of battery life on a single charge",
      "Active noise cancellation blocks out background noise",
      "Bluetooth 5.2 for a stable, low-latency connection",
      "Padded ear cups and headband for all-day comfort",
      "Built-in microphone for hands-free calls"
    ]
  },
  {
    id: 2,
    title: "Mechanical Gaming Keyboard",
    price: 89.99,
    img: ph("Keyboard", 400, 400),
    rating: 4.6,
    reviewCount: 973,
    description: "A responsive mechanical keyboard built for gaming and productivity, with per-key RGB lighting and durable switches rated for 50 million keystrokes.",
    bullets: [
      "Hot-swappable mechanical switches",
      "Per-key customizable RGB backlighting",
      "Aluminum top plate for a sturdy feel",
      "Detachable USB-C cable",
      "Dedicated media control keys"
    ]
  },
  {
    id: 3,
    title: "Ergonomic Optical Mouse",
    price: 24.99,
    img: ph("Mouse", 400, 400),
    rating: 4.1,
    reviewCount: 512,
    description: "A comfortable ergonomic mouse designed to reduce wrist strain during long work sessions, with adjustable DPI settings for precision control.",
    bullets: [
      "Adjustable DPI: 800 / 1200 / 1600 / 2400",
      "Ergonomic contoured shape",
      "Silent-click buttons",
      "2.4GHz wireless connection",
      "Up to 12 months battery life"
    ]
  },
  {
    id: 4,
    title: "4K Ultra HD Monitor 27-inch",
    price: 299.99,
    img: ph("Monitor", 400, 400),
    rating: 4.7,
    reviewCount: 1389,
    description: "A stunning 27-inch 4K UHD monitor with HDR support, perfect for creative work, gaming, and everyday productivity.",
    bullets: [
      "3840 x 2160 resolution with HDR10 support",
      "99% sRGB color accuracy",
      "144Hz refresh rate",
      "HDMI 2.1, DisplayPort, and USB-C inputs",
      "Adjustable stand with height, tilt, and swivel"
    ]
  },
  {
    id: 5,
    title: "USB-C Fast Charging Hub",
    price: 19.99,
    img: ph("USB Hub", 400, 400),
    rating: 4.0,
    reviewCount: 764,
    description: "A compact 7-in-1 USB-C hub that expands your laptop's connectivity with HDMI, USB-A, SD card, and fast charging pass-through.",
    bullets: [
      "7 ports in one compact hub",
      "4K HDMI output at 30Hz",
      "100W USB-C power delivery pass-through",
      "SD and microSD card slots",
      "Plug-and-play, no drivers required"
    ]
  }
];

// Category tiles reuse the same product-modal system with lightweight entries
const categoryItems = [
  { id: 101, title: "Jeans under $50", price: 39.99, img: ph("Jeans", 300, 300), rating: 4.2, reviewCount: 340, description: "Classic-fit denim jeans made from durable stretch cotton, built to last through every season.", bullets: ["Stretch denim for all-day comfort", "Reinforced stitching at stress points", "Machine washable", "Available in multiple washes"] },
  { id: 102, title: "Tops under $25", price: 18.5, img: ph("Tops", 300, 300), rating: 4.0, reviewCount: 210, description: "Soft, breathable everyday tops in a range of colors, perfect for layering or wearing on their own.", bullets: ["Lightweight breathable fabric", "Pre-shrunk cotton blend", "Machine washable", "Available in 6 colors"] },
  { id: 103, title: "Dresses", price: 34.99, img: ph("Dresses", 300, 300), rating: 4.4, reviewCount: 502, description: "Flattering everyday dresses designed for comfort without sacrificing style.", bullets: ["Flowy, breathable fabric", "Adjustable waist tie", "Machine washable", "True to size fit"] },
  { id: 104, title: "Shoes", price: 44.99, img: ph("Shoes", 300, 300), rating: 4.3, reviewCount: 890, description: "Comfortable everyday sneakers with cushioned soles, built for walking and light exercise.", bullets: ["Cushioned memory-foam insole", "Breathable mesh upper", "Non-slip rubber outsole", "Lightweight design"] },
  { id: 105, title: "Kitchen & Dining", price: 27.99, img: ph("Kitchen", 300, 300), rating: 4.5, reviewCount: 623, description: "Essential kitchen and dining accessories to upgrade your everyday cooking and mealtime setup.", bullets: ["Dishwasher-safe materials", "Space-saving design", "Durable, food-safe construction", "Easy to clean"] },
  { id: 106, title: "Home Decor", price: 22.0, img: ph("Decor", 300, 300), rating: 4.2, reviewCount: 275, description: "Stylish decor pieces to refresh any room, from minimalist accents to statement pieces.", bullets: ["Lightweight, easy to hang or place", "Neutral tones fit most interiors", "Durable materials", "Simple assembly"] },
  { id: 107, title: "Bedding & Bath", price: 54.99, img: ph("Bedding", 300, 300), rating: 4.4, reviewCount: 812, description: "Soft, breathable bedding and bath essentials for a comfortable, cozy home.", bullets: ["Brushed microfiber fabric", "Fade-resistant colors", "Machine washable", "Fits standard mattress sizes"] },
  { id: 108, title: "Lighting", price: 29.99, img: ph("Lighting", 300, 300), rating: 4.1, reviewCount: 198, description: "Modern lighting fixtures that bring warmth and ambiance to any space.", bullets: ["Energy-efficient LED compatible", "Dimmable brightness control", "Easy tool-free installation", "Modern minimalist design"] },
  { id: 109, title: "Cookers & Appliances", price: 129.99, img: ph("Cookers", 500, 400), rating: 4.6, reviewCount: 1042, description: "Reliable kitchen appliances built to make everyday cooking faster and easier.", bullets: ["Multiple cooking presets", "Easy-clean non-stick interior", "Compact countertop footprint", "1-year limited warranty"] },
  { id: 110, title: "Backpacks", price: 32.99, img: ph("Backpacks", 300, 300), rating: 4.5, reviewCount: 654, description: "Durable, spacious backpacks built for school, work, or travel.", bullets: ["Padded laptop compartment", "Water-resistant fabric", "Ergonomic padded straps", "Multiple organizer pockets"] },
  { id: 111, title: "Electronics", price: 15.99, img: ph("Electronics", 300, 300), rating: 4.0, reviewCount: 320, description: "Handy electronics accessories to keep you charged and connected on the go.", bullets: ["Compact and portable", "Compatible with most devices", "Durable braided cables", "1-year warranty"] },
  { id: 112, title: "Notebooks", price: 8.99, img: ph("Notebooks", 300, 300), rating: 4.3, reviewCount: 410, description: "High-quality notebooks with smooth, bleed-resistant paper for writing or sketching.", bullets: ["120 lined pages", "Durable hardcover", "Elastic closure band", "Ribbon bookmark"] },
  { id: 113, title: "Stationery", price: 6.5, img: ph("Stationery", 300, 300), rating: 4.1, reviewCount: 187, description: "A well-rounded stationery set covering all your everyday writing needs.", bullets: ["Includes pens, pencils, and erasers", "Smooth, smudge-resistant ink", "Compact carrying case", "Great for school or office"] }
];

const allItems = [...products, ...categoryItems];
const findItem = (id) => allItems.find((p) => p.id === id);

// ===================== STATE =====================

let cart = []; // [{ id, qty }]
let currentUser = null;
let checkoutData = { shipping: null, payment: null };

// ===================== INIT =====================

document.addEventListener("DOMContentLoaded", () => {
  loadSession();
  renderProducts();
  renderCategoryGrids();
  loadCart();
  updateCartUI();
  setupCartEvents();
  setupProductModalEvents();
  setupAuthEvents();
  setupCheckoutEvents();
  setupMiscEvents();
});

// ===================== RENDER: PRODUCT SLIDER =====================

function renderProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = products
    .map(
      (product) => `
    <div class="product-card" data-id="${product.id}" tabindex="0">
      <img src="${product.img}" alt="${escapeHtml(product.title)}">
      <span class="product-title">${escapeHtml(product.title)}</span>
      <span class="product-rating">${renderStars(product.rating)} <span class="rating-count">(${product.reviewCount})</span></span>
      <span class="product-price">$${product.price.toFixed(2)}</span>
      <button class="add-cart-btn" data-add="${product.id}">Add to Cart</button>
    </div>
  `
    )
    .join("");
}

function renderCategoryGrids() {
  const grids = {
    "fashion-grid": [101, 102, 103, 104],
    "home-grid": [105, 106, 107, 108],
    "school-grid": [110, 111, 112, 113]
  };

  Object.entries(grids).forEach(([elId, ids]) => {
    const el = document.getElementById(elId);
    el.innerHTML = ids
      .map((id) => {
        const item = findItem(id);
        return `
        <div class="quad-item" data-id="${item.id}" tabindex="0">
          <div class="img-box" style="background-image:url('${item.img}')"></div>
          <span>${escapeHtml(item.title)}</span>
        </div>
      `;
      })
      .join("");
  });

  const kitchen = findItem(109);
  document.getElementById("kitchen-single").outerHTML = `
    <div class="single-item" id="kitchen-single" data-id="${kitchen.id}" tabindex="0">
      <div class="img-box single-img" style="background-image:url('${kitchen.img}')"></div>
      <span>${escapeHtml(kitchen.title)}</span>
    </div>
  `;
}

function renderStars(rating) {
  const full = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= full ? "★" : "☆";
  }
  return `<span class="stars">${stars}</span>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ===================== PRODUCT DETAIL MODAL =====================

function setupProductModalEvents() {
  document.body.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      e.stopPropagation();
      addToCart(Number(addBtn.dataset.add));
      return;
    }

    const card = e.target.closest("[data-id]");
    if (card && (card.classList.contains("product-card") || card.classList.contains("quad-item") || card.classList.contains("single-item"))) {
      openProductModal(Number(card.dataset.id));
    }
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest("[data-id]");
    if (card && (card.classList.contains("product-card") || card.classList.contains("quad-item") || card.classList.contains("single-item"))) {
      openProductModal(Number(card.dataset.id));
    }
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.dataset.close));
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    });
  });
}

function openProductModal(id) {
  const item = findItem(id);
  if (!item) return;

  const content = document.getElementById("product-modal-content");
  content.innerHTML = `
    <div class="product-modal-image">
      <img src="${item.img}" alt="${escapeHtml(item.title)}">
    </div>
    <div class="product-modal-info">
      <h2>${escapeHtml(item.title)}</h2>
      <div class="product-modal-rating">
        ${renderStars(item.rating)} <span class="rating-count">${item.rating.toFixed(1)} · ${item.reviewCount} ratings</span>
      </div>
      <div class="product-modal-price">$${item.price.toFixed(2)}</div>
      <p class="product-modal-desc">${escapeHtml(item.description)}</p>
      <h4>About this item</h4>
      <ul class="product-modal-bullets">
        ${item.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
      </ul>
    </div>
    <div class="product-modal-buybox">
      <div class="buybox-price">$${item.price.toFixed(2)}</div>
      <div class="buybox-instock">In Stock</div>
      <label for="modal-qty">Quantity</label>
      <select id="modal-qty">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `<option value="${n}">${n}</option>`).join("")}
      </select>
      <div class="buybox-total" id="modal-total">Total: $${item.price.toFixed(2)}</div>
      <button class="add-cart-btn buybox-add" id="modal-add-cart">Add to Cart</button>
      <button class="buy-now-btn" id="modal-buy-now">Buy Now</button>
    </div>
  `;

  const qtySelect = content.querySelector("#modal-qty");
  const totalEl = content.querySelector("#modal-total");
  qtySelect.addEventListener("change", () => {
    const qty = Number(qtySelect.value);
    totalEl.textContent = `Total: $${(item.price * qty).toFixed(2)}`;
  });

  content.querySelector("#modal-add-cart").addEventListener("click", () => {
    const qty = Number(qtySelect.value);
    addToCart(item.id, qty);
    showToast(`Added ${qty} × ${item.title} to cart`);
  });

  content.querySelector("#modal-buy-now").addEventListener("click", () => {
    const qty = Number(qtySelect.value);
    addToCart(item.id, qty);
    closeModal("product-modal");
    openCheckout();
  });

  openModal("product-modal");
}

// ===================== GENERIC MODAL HELPERS =====================

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  if (!document.querySelector(".modal-backdrop.open") && !document.getElementById("cart-drawer").classList.contains("open")) {
    document.body.classList.remove("no-scroll");
  }
}

// ===================== CART =====================

function addToCart(productId, qty = 1) {
  const existing = cart.find((c) => c.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const entry = cart.find((c) => c.id === productId);
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) {
    cart = cart.filter((c) => c.id !== productId);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((c) => c.id !== productId);
  saveCart();
  updateCartUI();
}

function cartTotal() {
  return cart.reduce((sum, entry) => {
    const item = findItem(entry.id);
    return sum + (item ? item.price * entry.qty : 0);
  }, 0);
}

function cartItemCount() {
  return cart.reduce((sum, entry) => sum + entry.qty, 0);
}

function saveCart() {
  try {
    localStorage.setItem("brover_cart", JSON.stringify(cart));
  } catch (err) {
    /* storage unavailable, ignore */
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem("brover_cart");
    if (raw) cart = JSON.parse(raw);
  } catch (err) {
    cart = [];
  }
}

function updateCartUI() {
  document.getElementById("cart-count").innerText = cartItemCount();

  const cartBody = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("cart-total-price");

  if (cart.length === 0) {
    cartBody.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.innerText = "0.00";
    return;
  }

  cartBody.innerHTML = cart
    .map((entry) => {
      const item = findItem(entry.id);
      if (!item) return "";
      return `
      <div class="cart-item">
        <img src="${item.img}" alt="${escapeHtml(item.title)}" class="cart-item-img">
        <div class="cart-item-info">
          <strong>${escapeHtml(item.title)}</strong>
          <div>$${item.price.toFixed(2)}</div>
          <div class="qty-stepper">
            <button class="qty-btn" data-qty-down="${item.id}">−</button>
            <span class="qty-value">${entry.qty}</span>
            <button class="qty-btn" data-qty-up="${item.id}">+</button>
          </div>
        </div>
        <button class="remove-btn" data-remove="${item.id}">Remove</button>
      </div>
    `;
    })
    .join("");

  totalPriceElement.innerText = cartTotal().toFixed(2);
}

function setupCartEvents() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");

  document.getElementById("open-cart").addEventListener("click", () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("no-scroll");
  });

  document.getElementById("close-cart").addEventListener("click", closeCartDrawer);
  overlay.addEventListener("click", closeCartDrawer);

  function closeCartDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    if (!document.querySelector(".modal-backdrop.open")) {
      document.body.classList.remove("no-scroll");
    }
  }

  document.getElementById("cart-items").addEventListener("click", (e) => {
    const up = e.target.closest("[data-qty-up]");
    const down = e.target.closest("[data-qty-down]");
    const remove = e.target.closest("[data-remove]");
    if (up) changeQty(Number(up.dataset.qtyUp), 1);
    if (down) changeQty(Number(down.dataset.qtyDown), -1);
    if (remove) removeFromCart(Number(remove.dataset.remove));
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty.");
      return;
    }
    closeCartDrawer();
    openCheckout();
  });
}

// ===================== AUTH =====================

function loadSession() {
  try {
    const raw = localStorage.getItem("brover_user");
    if (raw) currentUser = JSON.parse(raw);
  } catch (err) {
    currentUser = null;
  }
  renderAccountState();
}

function renderAccountState() {
  const line1 = document.getElementById("account-line1");
  line1.textContent = currentUser ? `Hello, ${currentUser.name}` : "Hello, sign in";
}

function setupAuthEvents() {
  document.getElementById("open-auth").addEventListener("click", () => {
    if (currentUser) {
      const stay = confirm(`Signed in as ${currentUser.name}. Click OK to sign out.`);
      if (stay) {
        currentUser = null;
        localStorage.removeItem("brover_user");
        renderAccountState();
        showToast("Signed out.");
      }
      return;
    }
    openModal("auth-modal");
  });

  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}-form`).classList.add("active");
    });
  });

  document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors("signin-form");

    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value;
    let valid = true;

    if (!isValidEmail(email)) {
      setError("signin-email-error", "Enter a valid email address.");
      valid = false;
    }
    if (password.length < 6) {
      setError("signin-password-error", "Password must be at least 6 characters.");
      valid = false;
    }
    if (!valid) return;

    const name = email.split("@")[0];
    currentUser = { name: capitalize(name), email };
    localStorage.setItem("brover_user", JSON.stringify(currentUser));
    renderAccountState();
    closeModal("auth-modal");
    showToast(`Welcome back, ${currentUser.name}!`);
    e.target.reset();
  });

  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors("register-form");

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    let valid = true;

    if (name.length < 2) {
      setError("register-name-error", "Enter your full name.");
      valid = false;
    }
    if (!isValidEmail(email)) {
      setError("register-email-error", "Enter a valid email address.");
      valid = false;
    }
    if (password.length < 6) {
      setError("register-password-error", "Password must be at least 6 characters.");
      valid = false;
    }
    if (!valid) return;

    currentUser = { name, email };
    localStorage.setItem("brover_user", JSON.stringify(currentUser));
    renderAccountState();
    closeModal("auth-modal");
    showToast(`Account created. Welcome, ${currentUser.name}!`);
    e.target.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearErrors(formId) {
  document.querySelectorAll(`#${formId} .field-error`).forEach((el) => (el.textContent = ""));
}

// ===================== CHECKOUT =====================

function openCheckout() {
  goToCheckoutStep(1);
  renderOrderSummary();
  openModal("checkout-modal");
}

function renderOrderSummary() {
  const html = `
    <h3>Order Summary</h3>
    ${cart
      .map((entry) => {
        const item = findItem(entry.id);
        if (!item) return "";
        return `<div class="summary-line"><span>${escapeHtml(item.title)} × ${entry.qty}</span><span>$${(item.price * entry.qty).toFixed(2)}</span></div>`;
      })
      .join("")}
    <div class="summary-line summary-shipping"><span>Shipping</span><span>FREE</span></div>
    <div class="summary-line summary-total"><span>Order Total</span><span>$${cartTotal().toFixed(2)}</span></div>
  `;
  ["order-summary-1", "order-summary-2", "order-summary-3"].forEach((id) => {
    document.getElementById(id).innerHTML = html;
  });
}

function goToCheckoutStep(step) {
  document.querySelectorAll(".checkout-step").forEach((el) => el.classList.remove("active"));
  document.getElementById(`checkout-step-${step}`).classList.add("active");

  document.querySelectorAll(".checkout-steps .step").forEach((el) => el.classList.remove("active", "done"));
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`step-indicator-${i}`);
    if (!el) continue;
    if (i < step) el.classList.add("done");
    if (i === step) el.classList.add("active");
  }
}

function setupCheckoutEvents() {
  document.getElementById("shipping-form").addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors("shipping-form");

    const name = document.getElementById("ship-name").value.trim();
    const address = document.getElementById("ship-address").value.trim();
    const city = document.getElementById("ship-city").value.trim();
    const zip = document.getElementById("ship-zip").value.trim();
    const phone = document.getElementById("ship-phone").value.trim();
    let valid = true;

    if (name.length < 2) { setError("ship-name-error", "Enter your full name."); valid = false; }
    if (address.length < 4) { setError("ship-address-error", "Enter a valid street address."); valid = false; }
    if (city.length < 2) { setError("ship-city-error", "Enter your city."); valid = false; }
    if (!/^\d{4,10}$/.test(zip)) { setError("ship-zip-error", "Enter a valid ZIP code."); valid = false; }
    if (!/^[\d+()\-\s]{7,}$/.test(phone)) { setError("ship-phone-error", "Enter a valid phone number."); valid = false; }
    if (!valid) return;

    checkoutData.shipping = { name, address, city, zip, phone };
    goToCheckoutStep(2);
  });

  document.getElementById("card-number").addEventListener("input", (e) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    e.target.value = digits.replace(/(.{4})/g, "$1 ").trim();
  });

  document.getElementById("card-expiry").addEventListener("input", (e) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      e.target.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      e.target.value = digits;
    }
  });

  document.getElementById("card-cvv").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
  });

  document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors("payment-form");

    const name = document.getElementById("card-name").value.trim();
    const number = document.getElementById("card-number").value.replace(/\s/g, "");
    const expiry = document.getElementById("card-expiry").value.trim();
    const cvv = document.getElementById("card-cvv").value.trim();
    let valid = true;

    if (name.length < 2) { setError("card-name-error", "Enter the name on the card."); valid = false; }
    if (!/^\d{13,16}$/.test(number)) { setError("card-number-error", "Enter a valid card number."); valid = false; }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) { setError("card-expiry-error", "Enter a valid expiry (MM/YY)."); valid = false; }
    if (!/^\d{3,4}$/.test(cvv)) { setError("card-cvv-error", "Enter a valid CVV."); valid = false; }
    if (!valid) return;

    checkoutData.payment = { name, last4: number.slice(-4), expiry };
    renderReview();
    goToCheckoutStep(3);
  });

  document.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => goToCheckoutStep(Number(btn.dataset.back)));
  });

  document.getElementById("place-order-btn").addEventListener("click", placeOrder);

  document.getElementById("confirm-close-btn").addEventListener("click", () => {
    closeModal("checkout-modal");
    checkoutData = { shipping: null, payment: null };
    document.getElementById("shipping-form").reset();
    document.getElementById("payment-form").reset();
    goToCheckoutStep(1);
  });
}

function renderReview() {
  const s = checkoutData.shipping;
  const p = checkoutData.payment;

  document.getElementById("review-shipping").innerHTML = `
    <h4>Shipping to</h4>
    <p>${escapeHtml(s.name)}<br>${escapeHtml(s.address)}, ${escapeHtml(s.city)} ${escapeHtml(s.zip)}<br>${escapeHtml(s.phone)}</p>
  `;

  document.getElementById("review-payment").innerHTML = `
    <h4>Payment method</h4>
    <p>Card ending in ${escapeHtml(p.last4)} · Expires ${escapeHtml(p.expiry)}<br>${escapeHtml(p.name)}</p>
  `;
}

function placeOrder() {
  const orderId = `BRV-${Date.now().toString().slice(-8)}`;
  document.getElementById("order-id-display").textContent = `Order #${orderId}`;
  cart = [];
  saveCart();
  updateCartUI();
  goToCheckoutStep(4);
}

// ===================== MISC UI =====================

function setupMiscEvents() {
  document.getElementById("search-btn").addEventListener("click", runSearch);
  document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.open").forEach((m) => closeModal(m.id));
    }
  });
}

function runSearch() {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  if (!query) return;
  const match = allItems.find((item) => item.title.toLowerCase().includes(query));
  if (match) {
    openProductModal(match.id);
  } else {
    showToast(`No results found for "${query}".`);
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}