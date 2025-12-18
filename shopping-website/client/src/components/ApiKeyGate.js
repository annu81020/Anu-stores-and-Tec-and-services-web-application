import React, { useState, useEffect } from 'react';
import { FaKey, FaLock } from 'react-icons/fa';
import './ApiKeyGate.css';

const ApiKeyGate = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if API key is stored
    const storedKey = localStorage.getItem('siteApiKey');
    const keyExpiry = localStorage.getItem('siteApiKeyExpiry');
    
    if (storedKey && keyExpiry) {
      const expiryTime = new Date(keyExpiry);
      if (expiryTime > new Date()) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('siteApiKey');
        localStorage.removeItem('siteApiKeyExpiry');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API key validation (you can add backend validation)
    setTimeout(() => {
      // For demo: accept key "ANU2025TECH" or any key that starts with "ANU"
      if (apiKey.toUpperCase().startsWith('ANU') && apiKey.length >= 8) {
        // Store key with 24-hour expiry
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 24);
        
        localStorage.setItem('siteApiKey', apiKey);
        localStorage.setItem('siteApiKeyExpiry', expiryTime.toISOString());
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid API Key. Please contact administrator for access.');
      }
      setLoading(false);
    }, 1000);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="api-gate-overlay">
      <div className="api-gate-stars"></div>
      <div className="api-gate-container">
        <div className="api-gate-card">
          <div className="api-gate-icon-wrapper">
            <FaLock className="api-gate-lock-icon" />
          </div>
          
          <h1 className="api-gate-title">Anu Stores Tec & Services</h1>
          <p className="api-gate-subtitle">Advanced Technology Platform</p>
          
          <div className="api-gate-divider"></div>
          
          <form onSubmit={handleSubmit} className="api-gate-form">
            <div className="api-gate-input-group">
              <FaKey className="api-gate-input-icon" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                className="api-gate-input"
                required
              />
            </div>
            
            {error && (
              <div className="api-gate-error">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="api-gate-button"
              disabled={loading}
            >
              {loading ? (
                <span className="api-gate-loading">Validating...</span>
              ) : (
                'Access Platform'
              )}
            </button>
          </form>
          
          <div className="api-gate-info">
            <p>🔐 Secure Access Required</p>
            <p className="api-gate-hint">Demo Key: ANU2025TECH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyGate;
