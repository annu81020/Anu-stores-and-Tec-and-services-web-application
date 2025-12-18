import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaCreditCard, FaTruck, FaEnvelope } from 'react-icons/fa';
import './PaymentConfirmation.css';

const PaymentConfirmation = ({ 
  orderId, 
  orderDetails, 
  paymentInfo, 
  onClose 
}) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Animate progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const handleViewOrder = () => {
    navigate(`/orders/${orderId}`);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="payment-confirmation-overlay">
      <div className="payment-confirmation-modal">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="checkmark-circle">
            <FaCheckCircle className="checkmark-icon" />
          </div>
          <div className="success-ripple"></div>
        </div>

        {/* Success Message */}
        <h1 className="confirmation-title">Payment Successful!</h1>
        <p className="confirmation-subtitle">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Progress Bar */}
        <div className="confirmation-progress">
          <div 
            className="confirmation-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Order Details Card */}
        <div className="confirmation-details-card">
          <div className="detail-row">
            <div className="detail-icon-wrapper">
              <FaShoppingBag className="detail-icon" />
            </div>
            <div className="detail-content">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">{orderId?.substring(0, 12).toUpperCase()}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon-wrapper">
              <FaCreditCard className="detail-icon" />
            </div>
            <div className="detail-content">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">{paymentInfo?.method || 'Credit Card'}</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon-wrapper">
              <FaTruck className="detail-icon" />
            </div>
            <div className="detail-content">
              <span className="detail-label">Estimated Delivery</span>
              <span className="detail-value">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon-wrapper">
              <FaEnvelope className="detail-icon" />
            </div>
            <div className="detail-content">
              <span className="detail-label">Confirmation Email</span>
              <span className="detail-value">Sent to your email</span>
            </div>
          </div>
        </div>

        {/* Amount Paid */}
        <div className="confirmation-amount">
          <span className="amount-label">Total Amount Paid</span>
          <span className="amount-value">${orderDetails?.totalPrice?.toFixed(2)}</span>
        </div>

        {/* Transaction Details */}
        <div className="transaction-details">
          <div className="transaction-item">
            <span>Transaction ID</span>
            <span>{paymentInfo?.transactionId || `TXN${Date.now()}`}</span>
          </div>
          <div className="transaction-item">
            <span>Date & Time</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
          <div className="transaction-item">
            <span>Status</span>
            <span className="status-badge">
              <span className="status-dot"></span>
              CONFIRMED
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirmation-actions">
          <button 
            className="btn-primary-confirm" 
            onClick={handleViewOrder}
          >
            View Order Details
          </button>
          <button 
            className="btn-secondary-confirm" 
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>

        {/* Additional Info */}
        <div className="confirmation-footer">
          <p>
            🎉 You've earned <strong>50 reward points</strong> with this purchase!
          </p>
          <p className="footer-note">
            Track your order anytime from the Orders page
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
