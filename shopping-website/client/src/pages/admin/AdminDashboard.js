import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import { FaDollarSign, FaShoppingCart, FaUsers, FaBoxes, FaChartLine, FaTrophy } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <FaChartLine /> Admin Dashboard
        </h1>
        <p className="admin-subtitle">Welcome to your command center</p>
      </div>

      {/* Admin Navigation Menu */}
      <div className="admin-nav-menu">
        <Link to="/admin/dashboard" className="admin-nav-link active">
          <FaChartLine /> Dashboard
        </Link>
        <Link to="/admin/products" className="admin-nav-link">
          <FaBoxes /> Products
        </Link>
        <Link to="/admin/orders" className="admin-nav-link">
          <FaShoppingCart /> Orders
        </Link>
        <Link to="/admin/users" className="admin-nav-link">
          <FaUsers /> Users
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card revenue-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <div className="stat-value">${analytics?.totalRevenue?.toFixed(2) || '0.00'}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat-trend positive">+12.5%</div>
        </div>

        <div className="stat-card orders-card">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <div className="stat-value">{analytics?.totalOrders || 0}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-trend positive">+8.3%</div>
        </div>

        <div className="stat-card users-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <div className="stat-value">{analytics?.totalUsers || 0}</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-trend positive">+15.2%</div>
        </div>

        <div className="stat-card products-card">
          <div className="stat-icon">
            <FaBoxes />
          </div>
          <div className="stat-content">
            <div className="stat-value">{analytics?.totalProducts || 0}</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat-trend neutral">0%</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-card sales-chart-card">
          <h2 className="card-title">
            <FaTrophy /> Monthly Sales
          </h2>
          <div className="chart-container">
            {analytics?.monthlySales?.map((month, index) => (
              <div key={index} className="chart-bar-wrapper">
                <div className="chart-bar-label">{month.month}</div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{ 
                      height: `${(month.revenue / Math.max(...analytics.monthlySales.map(m => m.revenue)) * 100) || 10}%` 
                    }}
                  >
                    <span className="chart-bar-value">${month.revenue?.toFixed(0) || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
