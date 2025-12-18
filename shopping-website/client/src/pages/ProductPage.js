import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        
        <div>
          <h1>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} />
              ))}
            </div>
            <span>({product.numReviews} reviews)</span>
          </div>
          
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>
            ${product.price.toFixed(2)}
          </h2>
          
          <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>{product.description}</p>
          
          <div style={{ marginBottom: '20px' }}>
            <strong>Category:</strong> {product.category}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </div>
          
          {product.stock > 0 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  style={{ fontSize: '18px', padding: '15px 40px', flex: 1 }}
                >
                  Add to Cart
                </button>
                
                <button
                  className="btn-wishlist"
                  onClick={handleWishlistToggle}
                  style={{
                    fontSize: '18px',
                    padding: '15px 30px',
                    background: isInWishlist(product._id) ? '#ff4757' : 'transparent',
                    border: '2px solid #ff4757',
                    color: isInWishlist(product._id) ? 'white' : '#ff4757',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
                  {isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
