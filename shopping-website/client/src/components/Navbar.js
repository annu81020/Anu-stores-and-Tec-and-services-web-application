import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { FaShoppingCart, FaUser, FaStore, FaHeart } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { t } = useLanguage();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Anu Stores</span>
          <span className="logo-subtitle">Tec & Services</span>
        </Link>
        
        <div className="navbar-search">
          <SearchBar />
        </div>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              {t('home')}
            </Link>
          </li>
          
          <li className="navbar-item">
            <Link to="/wishlist" className="navbar-link">
              <FaHeart className="wishlist-icon" />
              {t('wishlist')}
              {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </Link>
          </li>
          
          <li className="navbar-item">
            <Link to="/store-locator" className="navbar-link">
              <FaStore /> {t('storeLocator')}
            </Link>
          </li>
          
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link">
              <FaShoppingCart />
              {t('cart')}
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          
          <li className="navbar-item">
            <LanguageSwitcher />
          </li>

          <li className="navbar-item">
            <ThemeToggle />
          </li>
          
          {user ? (
            <>
              {isAdmin && (
                <li className="navbar-item">
                  <Link to="/admin/dashboard" className="navbar-link">
                    {t('admin')}
                  </Link>
                </li>
              )}
              
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  <FaUser /> {user.name}
                </Link>
              </li>
              
              <li className="navbar-item">
                <button onClick={logout} className="btn btn-secondary">
                  {t('logout')}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="btn btn-primary">
                  {t('login')}
                </Link>
              </li>
              
              <li className="navbar-item">
                <Link to="/register" className="btn btn-secondary">
                  {t('register')}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
