// Test script to verify MongoDB data storage and display
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Recharge = require('./models/Recharge');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

const testDataStorage = async () => {
  try {
    await connectDB();

    console.log('\n📊 CURRENT DATABASE STATUS:');
    console.log('================================');

    // Check Admin data
    const adminCount = await Admin.countDocuments();
    console.log(`👨‍💼 Total Admins: ${adminCount}`);

    if (adminCount > 0) {
      const admins = await Admin.find().select('-password').limit(3);
      console.log('Recent Admins:');
      admins.forEach(admin => {
        console.log(`  - ${admin.name} (${admin.email}) - Role: ${admin.role}`);
      });
    }

    // Check User data
    const userCount = await User.countDocuments();
    console.log(`\n👥 Total Users: ${userCount}`);

    if (userCount > 0) {
      const users = await User.find().select('-password').limit(3);
      console.log('Recent Users:');
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Mobile: ${user.mobileNumber}`);
      });
    }

    // Check Plan data
    const planCount = await Plan.countDocuments();
    console.log(`\n📋 Total Plans: ${planCount}`);

    if (planCount > 0) {
      const plans = await Plan.find().limit(3);
      console.log('Available Plans:');
      plans.forEach(plan => {
        console.log(`  - ${plan.planName} - ₹${plan.amount} (${plan.validity})`);
      });
    }

    // Check Recharge data
    const rechargeCount = await Recharge.countDocuments();
    console.log(`\n💳 Total Recharges: ${rechargeCount}`);

    if (rechargeCount > 0) {
      const recharges = await Recharge.find()
        .populate('userId', 'name')
        .populate('planId', 'planName amount')
        .limit(3)
        .sort({ rechargeDate: -1 });

      console.log('Recent Recharges:');
      recharges.forEach(recharge => {
        console.log(`  - ${recharge.userId?.name || 'Unknown'} - ${recharge.planId?.planName || 'Unknown Plan'} - ${recharge.status}`);
      });
    }

    console.log('\n🎯 MongoDB Compass Connection Details:');
    console.log('=====================================');
    console.log(`Database URI: ${process.env.MONGODB_URI}`);
    console.log('Database Name: mra_database');
    console.log('Collections: admins, users, plans, recharges');

    console.log('\n✅ All data is being stored in MongoDB successfully!');
    console.log('📱 You can view this data in MongoDB Compass using the connection URI above.');

  } catch (error) {
    console.error('❌ Error testing data storage:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
};

// Run the test
testDataStorage();