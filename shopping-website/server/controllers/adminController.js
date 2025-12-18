const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    // Total revenue
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Total orders
    const totalOrders = orders.length;

    // Total users
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Total products
    const totalProducts = await Product.countDocuments();

    // Recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    // Sales by category
    const products = await Product.find({});
    const salesByCategory = {};
    
    for (let order of orders) {
      for (let item of order.orderItems) {
        const product = products.find(p => p._id.toString() === item.product.toString());
        if (product) {
          if (!salesByCategory[product.category]) {
            salesByCategory[product.category] = 0;
          }
          salesByCategory[product.category] += item.price * item.quantity;
        }
      }
    }

    // Monthly sales (last 6 months)
    const monthlySales = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const nextDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
      
      const monthOrders = await Order.find({
        isPaid: true,
        paidAt: {
          $gte: date,
          $lt: nextDate
        }
      });
      
      const monthRevenue = monthOrders.reduce((acc, order) => acc + order.totalPrice, 0);
      
      monthlySales.push({
        month: date.toLocaleString('default', { month: 'short' }),
        revenue: monthRevenue,
        orders: monthOrders.length
      });
    }

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .sort({ stock: 1 })
      .limit(10);

    res.json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      recentOrders,
      salesByCategory,
      monthlySales,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Cannot delete admin user' });
      }
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
