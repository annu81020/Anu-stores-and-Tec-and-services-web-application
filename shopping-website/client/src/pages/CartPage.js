import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleRemove = (itemId, itemName) => {
    if (window.confirm(`Remove ${itemName} from cart?`)) {
      removeFromCart(itemId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ marginBottom: '20px' }}>Add some products to get started!</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px 20px' }}>
      <h1>Shopping Cart</h1>
      
      <div style={{ marginTop: '30px' }}>
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />
            
            <div>
              <h3>{item.name}</h3>
              <p style={{ color: '#666' }}>{item.category}</p>
            </div>
            
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
              >
                -
              </button>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>
            
            <div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                ${item.price.toFixed(2)}
              </p>
            </div>
            
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(item._id, item.name)}
                title="Remove from cart"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="card" style={{ marginTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Total: ${getCartTotal().toFixed(2)}</h2>
              <p style={{ color: '#666' }}>{cartItems.length} items</p>
            </div>
            
            <button
              className="btn btn-success"
              onClick={() => navigate('/checkout')}
              style={{ fontSize: '18px', padding: '15px 30px' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
