// Plan controller for recharge plan management
const Plan = require('../models/Plan');

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active plans
const getActivePlans = async (req, res) => {
  try {
    const plans = await Plan.find({ status: 'Active' });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get plan by ID
const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPlans,
  getActivePlans,
  getPlanById
};