import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import { FaShoppingCart, FaBoxes, FaChartLine, FaUsers } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <FaShoppingCart /> Manage Orders
        </h1>
        <p className="admin-subtitle">View and manage all customer orders</p>
      </div>

      {/* Admin Navigation Menu */}
      <div className="admin-nav-menu">
        <Link to="/admin/dashboard" className="admin-nav-link">
          <FaChartLine /> Dashboard
        </Link>
        <Link to="/admin/products" className="admin-nav-link">
          <FaBoxes /> Products
        </Link>
        <Link to="/admin/orders" className="admin-nav-link active">
          <FaShoppingCart /> Orders
        </Link>
        <Link to="/admin/users" className="admin-nav-link">
          <FaUsers /> Users
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || 'N/A'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice?.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.isPaid ? 'status-paid' : 'status-pending'}`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
