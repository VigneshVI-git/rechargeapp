// Plan routes for recharge plan API endpoints
const express = require('express');
const {
  getAllPlans,
  getActivePlans,
  getPlanById
} = require('../controllers/planController');

const router = express.Router();

// Plan operations
router.get('/', getAllPlans);
router.get('/active', getActivePlans);
router.get('/:id', getPlanById);

module.exports = router;