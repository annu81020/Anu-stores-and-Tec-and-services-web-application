import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const { addToCart } = useCart();

  const categories = ['all', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Other'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'all') params.category = category;
      if (sort) params.sort = sort;

      const response = await productsAPI.getAll(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, sort]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Product added to cart!');
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">ANU STORES TEC & SERVICES</h1>
          <p className="hero-subtitle">
            🚀 Your Future, Delivered Today - Advanced Tech Solutions
          </p>
          <div className="hero-badges">
            <span className="badge">⚡ Lightning Fast Delivery</span>
            <span className="badge">🛡️ Premium Quality</span>
            <span className="badge">🔐 Secure Payment</span>
            <span className="badge">🎁 Exclusive Deals</span>
          </div>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="features-showcase">
        <h2 className="section-title">✨ Advanced Features & Benefits</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Recommendations</h3>
            <p>Smart product suggestions based on your preferences</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Multi-Payment Options</h3>
            <p>PayPal, Credit Cards, and more payment methods</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Real-Time Order Tracking</h3>
            <p>Track your orders with live updates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 AI Chatbot Support</h3>
            <p>Instant assistance whenever you need it</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Smart Wishlist</h3>
            <p>Save and organize your favorite products</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Multi-Language Support</h3>
            <p>Shop in your preferred language</p>
          </div>
        </div>
      </div>

      {/* Special Offers Banner */}
      <div className="special-offers-banner">
        <div className="offer-content">
          <div className="offer-badge">🔥 HOT DEALS</div>
          <h3>Limited Time Offers - Up to 50% OFF!</h3>
          <p>Don't miss our exclusive tech deals and seasonal promotions</p>
          <div className="offer-timer">
            <span>⏰ Deals refresh daily at midnight</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '30px 20px' }}>

      <h2 className="products-section-title">🔥 Trending Products - Shop Now!</h2>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-filter-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={fetchProducts}>
            Search
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No products found</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </Link>
              
              <div className="product-info">
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} />
                  ))}
                  <span style={{ marginLeft: '5px', color: '#666' }}>
                    ({product.numReviews})
                  </span>
                </div>
                
                <div className="product-price">${product.price.toFixed(2)}</div>
                
                {product.stock > 0 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                    style={{ width: '100%' }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    disabled
                    style={{ width: '100%' }}
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default HomePage;
