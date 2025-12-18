const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getAnalytics,
  getAllUsers,
  deleteUser,
  updateUserRole
} = require('../controllers/adminController');

// All routes are admin only
router.use(protect, admin);

router.get('/analytics', getAnalytics);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

module.exports = router;
