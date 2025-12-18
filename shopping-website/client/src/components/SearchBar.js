import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import api from '../utils/api';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        try {
          const response = await api.get(`/products?search=${query}`);
          setSuggestions(response.data.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Search error:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <form className="search-bar" onSubmit={handleSearch}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder={t('searchProducts')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
          className="search-input"
        />
        {query && (
          <button type="button" onClick={clearSearch} className="clear-btn">
            <FaTimes />
          </button>
        )}
      </form>

      {showSuggestions && (
        <div className="search-suggestions">
          {isLoading ? (
            <div className="loading-suggestions">
              <div className="spinner"></div>
              <span>Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <div className="suggestions-header">{t('searchSuggestions')}</div>
              {suggestions.map((product) => (
                <div
                  key={product._id}
                  className="suggestion-item"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="suggestion-info">
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-category">{product.category}</span>
                  </div>
                  <span className="suggestion-price">${product.price}</span>
                </div>
              ))}
              <div className="view-all-results" onClick={handleSearch}>
                {t('viewAll')} →
              </div>
            </>
          ) : (
            <div className="no-suggestions">
              {t('noResults')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
