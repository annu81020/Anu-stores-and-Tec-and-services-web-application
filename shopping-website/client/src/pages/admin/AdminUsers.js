import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import { FaUsers, FaBoxes, FaChartLine, FaShoppingCart } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <FaUsers /> Manage Users
        </h1>
        <p className="admin-subtitle">View and manage all registered users</p>
      </div>

      {/* Admin Navigation Menu */}
      <div className="admin-nav-menu">
        <Link to="/admin/dashboard" className="admin-nav-link">
          <FaChartLine /> Dashboard
        </Link>
        <Link to="/admin/products" className="admin-nav-link">
          <FaBoxes /> Products
        </Link>
        <Link to="/admin/orders" className="admin-nav-link">
          <FaShoppingCart /> Orders
        </Link>
        <Link to="/admin/users" className="admin-nav-link active">
          <FaUsers /> Users
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.isAdmin ? 'status-admin' : 'status-user'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
