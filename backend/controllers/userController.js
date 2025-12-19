// User controller for user operations and management
const User = require('../models/User');
const Plan = require('../models/Plan');
const Recharge = require('../models/Recharge');

// User registration
const userRegister = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.status === 'Blocked') {
      return res.status(403).json({ message: 'Account is blocked' });
    }
    res.json({ message: 'Login successful', userId: user._id, user: { name: user.name, email: user.email, mobileNumber: user.mobileNumber } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View available recharge plans
const getAvailablePlans = async (req, res) => {
  try {
    const plans = await Plan.find({ status: 'Active' });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Perform mobile recharge
const performRecharge = async (req, res) => {
  try {
    const { 
      userId, 
      mobileNumber, 
      planId, 
      paymentMode, 
      operator, 
      planName, 
      amount, 
      totalAmount, 
      cashback, 
      upiId 
    } = req.body;
    
    // Validate required fields
    if (!mobileNumber || !paymentMode) {
      return res.status(400).json({ message: 'Mobile number and payment mode are required' });
    }

    // If userId is not 'guest', try to validate user
    if (userId && userId !== 'guest') {
      try {
        // Check if userId is a valid ObjectId format
        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
          const user = await User.findById(userId);
          if (user && user.status === 'Blocked') {
            return res.status(403).json({ message: 'User account is blocked' });
          }
        }
      } catch (userError) {
        console.log('User validation skipped:', userError.message);
      }
    }

    // Create recharge record with complete order summary
    const recharge = new Recharge({
      userId: userId || 'guest',
      mobileNumber,
      planId: planId || 'custom-plan',
      operator: operator || 'Unknown',
      planName: planName || 'Custom Plan',
      amount: amount || 0,
      totalAmount: totalAmount || amount || 0,
      cashback: cashback || 0,
      paymentMode: paymentMode.toUpperCase(),
      upiId: upiId || null,
      status: 'Success'
    });

    await recharge.save();
    console.log('Recharge saved to database:', recharge);
    
    res.status(201).json({ 
      message: 'Recharge successful and stored in database', 
      recharge: {
        id: recharge._id,
        mobileNumber: recharge.mobileNumber,
        operator: recharge.operator,
        planName: recharge.planName,
        amount: recharge.amount,
        totalAmount: recharge.totalAmount,
        paymentMode: recharge.paymentMode,
        status: recharge.status,
        date: recharge.rechargeDate
      }
    });
  } catch (error) {
    console.error('Recharge error:', error);
    res.status(400).json({ message: error.message });
  }
};

// View recharge history
const getRechargeHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const recharges = await Recharge.find({ userId })
      .sort({ rechargeDate: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display sample user data
const getSampleUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').limit(10);
    res.json({ message: 'Sample user data', count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post sample user data
const postSampleUsers = async (req, res) => {
  try {
    const sampleUsers = [
      { name: 'John Doe', mobileNumber: '9876543210', email: 'john@example.com', password: 'password123' },
      { name: 'Jane Smith', mobileNumber: '9876543211', email: 'jane@example.com', password: 'password123' },
      { name: 'Mike Johnson', mobileNumber: '9876543212', email: 'mike@example.com', password: 'password123' }
    ];
    
    const users = await User.insertMany(sampleUsers);
    res.status(201).json({ message: 'Sample users created', count: users.length, users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getAvailablePlans,
  performRecharge,
  getRechargeHistory,
  getSampleUsers,
  postSampleUsers
};