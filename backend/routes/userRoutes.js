// User routes for user-related API endpoints
const express = require('express');
const {
  userRegister,
  userLogin,
  getAvailablePlans,
  performRecharge,
  getRechargeHistory,
  getSampleUsers,
  postSampleUsers
} = require('../controllers/userController');

const router = express.Router();

// User authentication
router.post('/register', userRegister);
router.post('/login', userLogin);

// Recharge operations
router.get('/plans', getAvailablePlans);
router.post('/recharge', performRecharge);
router.get('/:userId/recharge-history', getRechargeHistory);

// Sample data
router.get('/sample-data', getSampleUsers);
router.post('/sample-data', postSampleUsers);

module.exports = router;