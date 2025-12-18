import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../utils/api';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PaymentConfirmation from '../components/PaymentConfirmation';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      if (value.length > 5) value = value.substring(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const validateShipping = () => {
    const { street, city, postalCode, country } = shippingAddress;
    if (!street || !city || !postalCode || !country) {
      setError('Please fill in all shipping address fields');
      return false;
    }
    return true;
  };

  const validateCardDetails = () => {
    const { cardNumber, cardName, expiryDate, cvv } = cardDetails;
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError('Please fill in all card details');
      return false;
    }

    const cardNumOnly = cardNumber.replace(/\s/g, '');
    if (cardNumOnly.length < 15 || cardNumOnly.length > 16) {
      setError('Invalid card number');
      return false;
    }

    if (cvv.length < 3) {
      setError('Invalid CVV');
      return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      setError('Invalid expiry month');
      return false;
    }

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      setError('Card has expired');
      return false;
    }

    return true;
  };

  const createOrder = async (paymentInfo = {}) => {
    if (!validateShipping()) {
      throw new Error('Invalid shipping address');
    }

    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress,
      paymentMethod,
      totalPrice: getCartTotal(),
      ...paymentInfo
    };

    try {
      const response = await ordersAPI.create(orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateShipping()) {
      return;
    }

    if (!validateCardDetails()) {
      return;
    }

    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order with card payment info
      const order = await createOrder({
        isPaid: true,
        paidAt: new Date().toISOString(),
        paymentResult: {
          id: 'CARD_' + Date.now(),
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'card-payment@shop.com'
        }
      });

      // Update order to paid
      await ordersAPI.updateToPaid(order._id, {
        id: 'CARD_' + Date.now(),
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: 'card-payment@shop.com'
      });
      
      // Show payment confirmation
      setConfirmedOrder({
        orderId: order._id,
        orderDetails: {
          totalPrice: getCartTotal(),
          items: cartItems
        },
        paymentInfo: {
          method: 'Credit Card',
          transactionId: 'CARD_' + Date.now(),
          cardLast4: cardDetails.cardNumber.slice(-4)
        }
      });
      setShowConfirmation(true);
      
      clearCart();
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
      setError('Payment failed. Please try again.');
      console.error('Card payment error:', error);
    }
  };

  const onApprove = async (data) => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const order = await createOrder({
        isPaid: true,
        paidAt: new Date().toISOString(),
        paymentResult: {
          id: data.orderID,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: data.payer.email_address
        }
      });
      
      await ordersAPI.updateToPaid(order._id, {
        id: data.orderID,
        status: 'COMPLETED',
        update_time: new Date().toISOString(),
        email_address: data.payer.email_address
      });
      
      // Show payment confirmation
      setConfirmedOrder({
        orderId: order._id,
        orderDetails: {
          totalPrice: getCartTotal(),
          items: cartItems
        },
        paymentInfo: {
          method: 'PayPal',
          transactionId: data.orderID,
          email: data.payer.email_address
        }
      });
      setShowConfirmation(true);
      
      clearCart();
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('PayPal payment error:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '30px 20px', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to proceed with checkout.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px 20px' }}>
      <h1>Checkout</h1>
      
      {error && (
        <div className="alert alert-error" style={{ marginTop: '20px' }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '30px' }}>
        <div>
          {/* Shipping Address */}
          <div className="card">
            <h2>Shipping Address</h2>
            <div className="form-group">
              <label>Street Address *</label>
              <input type="text" name="street" value={shippingAddress.street} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city" value={shippingAddress.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Postal Code *</label>
              <input type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <input type="text" name="country" value={shippingAddress.country} onChange={handleChange} required />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="card" style={{ marginTop: '20px' }}>
            <h2>Payment Method</h2>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                PayPal
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CreditCard"
                  checked={paymentMethod === 'CreditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                Credit/Debit Card
              </label>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'CreditCard' && (
              <form onSubmit={handleCardPayment}>
                <div className="form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="card">
            <h3>Order Summary</h3>
            <div style={{ marginTop: '15px', marginBottom: '15px' }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '15px' }}>
              <strong>Total:</strong>
              <strong>${getCartTotal().toFixed(2)}</strong>
            </div>
            
            {/* PayPal Buttons */}
            {paymentMethod === 'PayPal' && (
              <div style={{ marginTop: '20px' }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    if (!validateShipping()) {
                      return Promise.reject(new Error('Please fill in shipping address'));
                    }
                    return actions.order.create({
                      purchase_units: [{
                        amount: { value: getCartTotal().toFixed(2) }
                      }]
                    });
                  }}
                  onApprove={onApprove}
                  onError={(err) => {
                    setError('PayPal payment failed. Please try again.');
                    console.error('PayPal error:', err);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showConfirmation && confirmedOrder && (
        <PaymentConfirmation
          orderId={confirmedOrder.orderId}
          orderDetails={confirmedOrder.orderDetails}
          paymentInfo={confirmedOrder.paymentInfo}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
