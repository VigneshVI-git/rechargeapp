// Admin routes for admin-related API endpoints
const express = require('express');
const {
  adminRegister,
  adminLogin,
  addPlan,
  editPlan,
  deletePlan,
  getAllUsers,
  toggleUserStatus,
  getAllAdmins,
  getDashboardStats,
  getAllSystemData
} = require('../controllers/adminController');

const router = express.Router();

// Admin authentication
router.post('/register', adminRegister);
router.post('/login', adminLogin);

// Plan management
router.post('/plans', addPlan);
router.put('/plans/:id', editPlan);
router.delete('/plans/:id', deletePlan);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/status', toggleUserStatus);

// Admin management
router.get('/admins', getAllAdmins);
router.get('/dashboard/stats', getDashboardStats);
router.get('/system/data', getAllSystemData);

module.exports = router;