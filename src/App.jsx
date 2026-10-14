import { useMemo, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'AeroLite 4K',
    category: 'Consumer',
    price: 1299,
    rating: 4.9,
    badge: 'Best Seller',
    icon: '🚁',
    speed: '40 mph',
    time: '38 min',
    camera: '4K/60',
    description: 'A lightweight folding drone built for smooth travel footage and weekend adventures.'
  },
  {
    id: 2,
    name: 'SkyScout Pro',
    category: 'Prosumer',
    price: 1799,
    rating: 5.0,
    badge: 'New',
    icon: '🛩️',
    speed: '52 mph',
    time: '42 min',
    camera: '6K/30',
    description: 'High-end imagery and obstacle avoidance for serious creators who need precision.'
  },
  {
    id: 3,
    name: 'LiftEdge X',
    category: 'Commercial',
    price: 3499,
    rating: 4.8,
    badge: 'Hot',
    icon: '🏗️',
    speed: '58 mph',
    time: '46 min',
    camera: '8K/30',
    description: 'Built for surveying and inspection jobs that demand stability and long-range control.'
  },
  {
    id: 4,
    name: 'Maverick Mini',
    category: 'Travel',
    price: 899,
    rating: 4.7,
    badge: 'Compact',
    icon: '🪶',
    speed: '30 mph',
    time: '31 min',
    camera: '4K/30',
    description: 'Pocket-sized flying power for creators who need a drone ready at a moment’s notice.'
  },
  {
    id: 5,
    name: 'Vector Max',
    category: 'Enterprise',
    price: 5999,
    rating: 5.0,
    badge: 'Enterprise',
    icon: '🛰️',
    speed: '62 mph',
    time: '55 min',
    camera: '8K/60',
    description: 'Advanced mission-ready drone with thermal, mapping, and autonomous route planning.'
  },
  {
    id: 6,
    name: 'Harbor Scout',
    category: 'Agriculture',
    price: 2499,
    rating: 4.9,
    badge: 'Field Ready',
    icon: '🌾',
    speed: '48 mph',
    time: '44 min',
    camera: '5K/30',
    description: 'A professional agri-drone for crop monitoring, spray planning, and field analysis.'
  }
];

const categories = ['All', 'Consumer', 'Prosumer', 'Commercial', 'Travel', 'Enterprise', 'Agriculture'];

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const cartItems = useMemo(() =>
    products
      .filter((product) => cart[product.id])
      .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length ? 29 : 0;
  const total = subtotal + shipping;

  const addToCart = (productId) => {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCart((current) => {
      if (!current[productId]) return current;
      const next = { ...current };
      if (next[productId] <= 1) {
        delete next[productId];
      } else {
        next[productId] -= 1;
      }
      return next;
    });
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">D</div>
          <div>
            <div className="brand-name">Dronely</div>
            <div className="brand-tag">Flight systems</div>
          </div>
        </div>

        <nav className="main-nav">
          <a href="#shop">Shop</a>
          <a href="#solutions">Solutions</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="nav-button" onClick={() => setCheckoutOpen(true)}>
          Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Precision flight, everyday</span>
            <h1>Fly smarter with premium drones made for work and play.</h1>
            <p>
              Explore professional-grade drones for creators, businesses, and field teams.
              From cinematic capture to industrial inspection, Dronely brings dependable
              performance to every mission.
            </p>

            <div className="hero-actions">
              <a href="#shop" className="primary-btn">Shop now</a>
              <a href="#solutions" className="secondary-btn">Explore solutions</a>
            </div>

            <div className="mini-stats">
              <div>
                <strong>12k+</strong>
                <span>happy flyers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>average rating</span>
              </div>
              <div>
                <strong>48h</strong>
                <span>shipping</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="drone-card">
              <div className="drone-glow" aria-hidden="true" />
              <div className="drone-emoji">🚁</div>
              <div className="drone-meta">
                <span>AirOne Pro</span>
                <strong>{formatPrice(1799)}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-strip" id="solutions">
          <div>
            <span>4K+</span>
            <p>Crystal-clear camera systems</p>
          </div>
          <div>
            <span>38-55 min</span>
            <p>Long battery life</p>
          </div>
          <div>
            <span>GPS + AI</span>
            <p>Smart stability and tracking</p>
          </div>
          <div>
            <span>24/7</span>
            <p>Expert support</p>
          </div>
        </section>

        <section className="catalog" id="shop">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured collection</span>
              <h2>Find the right drone for your mission.</h2>
            </div>
            <div className="category-filter" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'filter active' : 'filter'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-badge">{product.badge}</div>
                <div className="product-art">{product.icon}</div>
                <div className="product-info">
                  <div className="product-header">
                    <span>{product.category}</span>
                    <span>⭐ {product.rating}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <ul>
                    <li>{product.speed}</li>
                    <li>{product.time}</li>
                    <li>{product.camera}</li>
                  </ul>
                  <div className="product-footer">
                    <strong>{formatPrice(product.price)}</strong>
                    <button onClick={() => addToCart(product.id)}>Add to cart</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience">
          <div className="experience-copy">
            <span className="eyebrow">Why professionals choose Dronely</span>
            <h2>Reliable performance backed by real-world support.</h2>
            <p>
              Whether you’re shooting cinematic aerial footage or inspecting infrastructure,
              Dronely helps you move faster with safer flight controls, intuitive software,
              and expert guidance from day one.
            </p>
            <ul>
              <li>AI-assisted auto tracking and obstacle avoidance</li>
              <li>Enterprise-ready fleet management and analytics</li>
              <li>Fast setup, premium support, and safety training</li>
            </ul>
          </div>

          <div className="experience-panel">
            <div className="panel-box">
              <span className="panel-label">Mission success</span>
              <strong>96.4%</strong>
              <small>average customer satisfaction</small>
            </div>
            <div className="panel-box secondary">
              <span className="panel-label">Pilot academy</span>
              <strong>7-week</strong>
              <small>practical learning path</small>
            </div>
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="section-heading center">
            <span className="eyebrow">Customer feedback</span>
            <h2>Trusted by creators, teams, and field specialists.</h2>
          </div>

          <div className="review-grid">
            <blockquote>
              “We switched our inspection process to Dronely and cut field time by almost half.”
              <footer>— Sophia M., Civil Engineer</footer>
            </blockquote>
            <blockquote>
              “The flight stability and 4K footage are so good, it feels like a premium studio drone.”
              <footer>— Aaron T., Content Creator</footer>
            </blockquote>
            <blockquote>
              “Their support team helped us build a drone workflow for our agriculture team in a week.”
              <footer>— Priya R., Farm Operations Lead</footer>
            </blockquote>
          </div>
        </section>

        <section className="contact" id="contact">
          <div>
            <span className="eyebrow">Need help choosing?</span>
            <h2>Talk to a drone specialist.</h2>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Email address" />
            <textarea placeholder="Tell us what you want to fly"></textarea>
            <button type="button" className="primary-btn">Book a consultation</button>
          </form>
        </section>
      </main>

      <aside className={checkoutOpen ? 'cart-panel open' : 'cart-panel'}>
        <div className="cart-header">
          <h3>Cart</h3>
          <button onClick={() => setCheckoutOpen(false)} aria-label="Close cart">×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button onClick={() => setCheckoutOpen(false)} className="secondary-btn">Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-main">
                    <span className="cart-icon">{item.icon}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{formatPrice(item.price)} each</small>
                    </div>
                  </div>
                  <div className="cart-controls">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item.id)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="totals">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Shipping</span><strong>{formatPrice(shipping)}</strong></div>
              <div className="grand-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            </div>

            <button className="primary-btn checkout-btn">Secure checkout with Stripe</button>
          </>
        )}
      </aside>
    </div>
  );
}
