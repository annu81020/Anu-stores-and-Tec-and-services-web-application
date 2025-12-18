import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <FaHeart className="empty-heart-icon" />
        <h2>Your Wishlist is Empty</h2>
        <p>Start adding products you love!</p>
        <Link to="/" className="shop-now-btn">
          {t('shopNow')}
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>
          <FaHeart className="heart-icon" /> {t('wishlist')}
        </h1>
        <p className="wishlist-count">{wishlistItems.length} items</p>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((product) => (
          <div key={product._id} className="wishlist-card">
            <div className="wishlist-image">
              <img src={product.image} alt={product.name} />
              {product.countInStock === 0 && (
                <div className="out-of-stock-badge">{t('outOfStock')}</div>
              )}
            </div>

            <div className="wishlist-details">
              <h3>{product.name}</h3>
              <p className="wishlist-category">{product.category}</p>
              <div className="wishlist-price-section">
                <span className="wishlist-price">${product.price}</span>
                {product.rating && (
                  <span className="wishlist-rating">
                    ⭐ {product.rating.toFixed(1)}
                  </span>
                )}
              </div>

              <div className="wishlist-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.countInStock === 0}
                >
                  <FaShoppingCart /> {t('addToCart')}
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
