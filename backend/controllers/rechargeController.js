// Recharge controller for transaction management
const Recharge = require('../models/Recharge');

// Get all recharge transactions (for admin)
const getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .sort({ rechargeDate: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recharge by ID
const getRechargeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recharge = await Recharge.findById(id);
    
    if (!recharge) {
      return res.status(404).json({ message: 'Recharge not found' });
    }
    res.json(recharge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recharge statistics
const getRechargeStats = async (req, res) => {
  try {
    const totalRecharges = await Recharge.countDocuments();
    const successfulRecharges = await Recharge.countDocuments({ status: 'Success' });
    const failedRecharges = await Recharge.countDocuments({ status: 'Failed' });
    
    res.json({
      totalRecharges,
      successfulRecharges,
      failedRecharges,
      successRate: totalRecharges > 0 ? ((successfulRecharges / totalRecharges) * 100).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRecharges,
  getRechargeById,
  getRechargeStats
};