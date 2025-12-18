import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { WishlistProvider } from './context/WishlistContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ApiKeyGate from './components/ApiKeyGate';
import AIChatbot from './components/AIChatbot';

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import StoreLocatorPage from './pages/StoreLocatorPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

import './App.css';
import './theme.css';

function App() {
  const paypalOptions = {
    'client-id': 'test', // Will be loaded dynamically
    currency: 'USD',
    intent: 'capture'
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <PayPalScriptProvider options={paypalOptions}>
                <ApiKeyGate>
                  <Router>
                    <div className="App">
                      <Navbar />
                      <main className="main-content">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/product/:id" element={<ProductPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route path="/store-locator" element={<StoreLocatorPage />} />
                          
                          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                          <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                          <Route path="/orders/:id" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                          <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
                          
                          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                        </Routes>
                      </main>
                      <AIChatbot />
                      <Footer />
                    </div>
                  </Router>
                </ApiKeyGate>
              </PayPalScriptProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
