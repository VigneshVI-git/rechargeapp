// Seed script to populate sample data in MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Recharge = require('./models/Recharge');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional)
    console.log('🧹 Clearing existing data...');
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Plan.deleteMany({});
    await Recharge.deleteMany({});

    // Create sample admins
    console.log('👨💼 Creating sample admins...');
    const admins = await Admin.insertMany([
      {
        name: 'Super Admin',
        email: 'superadmin@mra.com',
        password: 'admin123',
        role: 'Super Admin',
        permissions: {
          canManageUsers: true,
          canManagePlans: true,
          canViewReports: true,
          canManageAdmins: true
        }
      },
      {
        name: 'John Manager',
        email: 'manager@mra.com',
        password: 'manager123',
        role: 'Manager',
        permissions: {
          canManageUsers: true,
          canManagePlans: true,
          canViewReports: true,
          canManageAdmins: false
        }
      }
    ]);
    console.log(`✅ Created ${admins.length} admins`);

    // Create sample users
    console.log('👥 Creating sample users...');
    const users = await User.insertMany([
      {
        name: 'Rahul Sharma',
        mobileNumber: '9876543210',
        email: 'rahul@example.com',
        password: 'user123'
      },
      {
        name: 'Priya Patel',
        mobileNumber: '9876543211',
        email: 'priya@example.com',
        password: 'user123'
      },
      {
        name: 'Amit Kumar',
        mobileNumber: '9876543212',
        email: 'amit@example.com',
        password: 'user123'
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create sample plans
    console.log('📋 Creating sample plans...');
    const plans = await Plan.insertMany([
      {
        planName: 'Basic Plan',
        amount: 199,
        validity: '28 days',
        benefits: '1GB/day, Unlimited calls, 100 SMS/day'
      },
      {
        planName: 'Premium Plan',
        amount: 399,
        validity: '56 days',
        benefits: '2GB/day, Unlimited calls, Unlimited SMS'
      },
      {
        planName: 'Super Plan',
        amount: 599,
        validity: '84 days',
        benefits: '3GB/day, Unlimited calls, Unlimited SMS, Netflix'
      }
    ]);
    console.log(`✅ Created ${plans.length} plans`);

    // Create sample recharges
    console.log('💳 Creating sample recharges...');
    const recharges = await Recharge.insertMany([
      {
        userId: users[0]._id,
        mobileNumber: users[0].mobileNumber,
        planId: plans[0]._id,
        paymentMode: 'UPI',
        status: 'Success'
      },
      {
        userId: users[1]._id,
        mobileNumber: users[1].mobileNumber,
        planId: plans[1]._id,
        paymentMode: 'Card',
        status: 'Success'
      },
      {
        userId: users[2]._id,
        mobileNumber: users[2].mobileNumber,
        planId: plans[2]._id,
        paymentMode: 'Wallet',
        status: 'Success'
      }
    ]);
    console.log(`✅ Created ${recharges.length} recharges`);

    console.log('\n🎉 Sample data seeded successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`👨💼 Admins: ${admins.length}`);
    console.log(`👥 Users: ${users.length}`);
    console.log(`📋 Plans: ${plans.length}`);
    console.log(`💳 Recharges: ${recharges.length}`);

    console.log('\n🔗 MongoDB Compass Connection:');
    console.log(`URI: ${process.env.MONGODB_URI}`);
    console.log('Database: mra_database');

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
};

// Run the seed
seedData();