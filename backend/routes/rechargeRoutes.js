// Recharge routes for transaction API endpoints
const express = require('express');
const {
  getAllRecharges,
  getRechargeById,
  getRechargeStats
} = require('../controllers/rechargeController');

const router = express.Router();

// Recharge operations
router.get('/', getAllRecharges);
router.get('/stats', getRechargeStats);
router.get('/:id', getRechargeById);

module.exports = router;