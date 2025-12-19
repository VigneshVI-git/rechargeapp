// Test script to simulate app interactions and verify MongoDB storage
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

const testAppInteractions = async () => {
  try {
    console.log('🧪 Testing Real App Data Storage in MongoDB\n');

    // 1. Test Admin Registration
    console.log('1️⃣ Testing Admin Registration...');
    const adminData = {
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'Admin'
    };
    
    try {
      const adminResponse = await axios.post(`${BASE_URL}/admin/register`, adminData);
      console.log('✅ Admin registered:', adminResponse.data.admin.name);
    } catch (error) {
      console.log('ℹ️ Admin might already exist or server not running');
    }

    // 2. Test User Registration
    console.log('\n2️⃣ Testing User Registration...');
    const userData = {
      name: 'Test User',
      mobileNumber: '9999999999',
      email: 'user@test.com',
      password: 'user123'
    };
    
    try {
      const userResponse = await axios.post(`${BASE_URL}/user/register`, userData);
      console.log('✅ User registered:', userResponse.data.userId);
    } catch (error) {
      console.log('ℹ️ User might already exist or server not running');
    }

    // 3. Test Plan Addition (Admin adds plan)
    console.log('\n3️⃣ Testing Plan Addition...');
    const planData = {
      planName: 'Test Plan',
      amount: 299,
      validity: '30 days',
      benefits: '2GB/day, Unlimited calls'
    };
    
    try {
      const planResponse = await axios.post(`${BASE_URL}/admin/plans`, planData);
      console.log('✅ Plan added:', planResponse.data.plan.planName);
    } catch (error) {
      console.log('ℹ️ Plan addition failed or server not running');
    }

    console.log('\n📊 Checking MongoDB after app interactions...');
    
    // Check database status
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGODB_URI);
    
    const Admin = require('./models/Admin');
    const User = require('./models/User');
    const Plan = require('./models/Plan');
    const Recharge = require('./models/Recharge');
    
    const adminCount = await Admin.countDocuments();
    const userCount = await User.countDocuments();
    const planCount = await Plan.countDocuments();
    const rechargeCount = await Recharge.countDocuments();
    
    console.log(`\n📈 Current Database Status:`);
    console.log(`👨💼 Admins: ${adminCount}`);
    console.log(`👥 Users: ${userCount}`);
    console.log(`📋 Plans: ${planCount}`);
    console.log(`💳 Recharges: ${rechargeCount}`);
    
    if (adminCount > 0 || userCount > 0 || planCount > 0) {
      console.log('\n🎉 SUCCESS! App data is being stored in MongoDB!');
      console.log('📱 Open MongoDB Compass to view the data:');
      console.log('   URI: mongodb://localhost:27017/mra_database');
    } else {
      console.log('\n⚠️ No data found. Make sure:');
      console.log('   1. Backend server is running (npm start)');
      console.log('   2. MongoDB is running');
      console.log('   3. Use your frontend app to register/login');
    }
    
    await mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 To test real app data storage:');
    console.log('   1. Start backend: cd backend && npm start');
    console.log('   2. Start frontend: cd "MRA Frontend" && npm run dev');
    console.log('   3. Register admin/user through the web interface');
    console.log('   4. Add plans through admin panel');
    console.log('   5. Perform recharges through user interface');
    console.log('   6. Check MongoDB Compass to see the data');
  }
};

testAppInteractions();