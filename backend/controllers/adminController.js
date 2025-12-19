// Admin controller for admin operations and management
const Admin = require('../models/Admin');
const User = require('../models/User');
const Plan = require('../models/Plan');

// Admin registration
const adminRegister = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ 
      message: 'Admin registered successfully', 
      adminId: admin._id,
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (admin.status === 'Inactive') {
      return res.status(403).json({ message: 'Admin account is inactive' });
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    res.json({ 
      message: 'Login successful', 
      adminId: admin._id,
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add recharge plan
const addPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({ message: 'Plan added successfully', plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit recharge plan
const editPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndUpdate(id, req.body, { new: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete recharge plan
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Block/unblock user
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(id, { status }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `User ${status.toLowerCase()} successfully`, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const totalPlans = await Plan.countDocuments();
    const activePlans = await Plan.countDocuments({ status: 'Active' });
    
    // Get recharge stats from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const Recharge = require('../models/Recharge');
    const recentRecharges = await Recharge.countDocuments({
      rechargeDate: { $gte: thirtyDaysAgo }
    });
    
    const totalRecharges = await Recharge.countDocuments();
    
    res.json({
      users: { total: totalUsers, active: activeUsers },
      plans: { total: totalPlans, active: activePlans },
      recharges: { total: totalRecharges, recent: recentRecharges }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all system data for admin dashboard
const getAllSystemData = async (req, res) => {
  try {
    const Recharge = require('../models/Recharge');
    
    // Get all data with populated references
    const admins = await Admin.find().select('-password');
    const users = await User.find().select('-password');
    const plans = await Plan.find();
    const recharges = await Recharge.find()
      .sort({ rechargeDate: -1 });
    
    // Calculate statistics
    const stats = {
      totalAdmins: admins.length,
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'Active').length,
      totalPlans: plans.length,
      activePlans: plans.filter(p => p.status === 'Active').length,
      totalRecharges: recharges.length,
      successfulRecharges: recharges.filter(r => r.status === 'Success').length
    };
    
    res.json({
      message: 'System data retrieved successfully',
      stats,
      data: {
        admins,
        users,
        plans,
        recharges
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};