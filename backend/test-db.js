// Test script to verify MongoDB connection and create sample data
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Plan = require('./models/Plan');

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log('✅ MongoDB Connected Successfully');

    // Create test admin
    const admin = new Admin({
      email: 'admin@mra.com',
      password: 'admin123'
    });
    await admin.save();
    console.log('✅ Test admin created');

    // Create test plan
    const plan = new Plan({
      planName: '₹199 Unlimited Plan',
      amount: 199,
      validity: '28 days',
      benefits: 'Unlimited calls, 1.5GB/day data'
    });
    await plan.save();
    console.log('✅ Test plan created');

    console.log('🎉 Test data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testDB();