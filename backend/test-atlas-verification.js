const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Recharge = require('./models/Recharge');

const verifyAtlasCollections = async () => {
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is undefined in .env');
        }
        console.log(`   Target URI: ${uri.split('@')[1] || '...hidden...'}`); // Log part of URI to confirm load

        await mongoose.connect(uri, { family: 4 });
        console.log('✅ Successfully connected to MongoDB');

        // 1. Verify/Create User
        console.log('\n👤 Verifying "users" collection...');
        const testUser = {
            name: 'Atlas Test User',
            email: `atlas.test.${Date.now()}@example.com`,
            mobileNumber: `9${Date.now().toString().slice(-9)}`, // Random valid-looking number
            password: 'password123',
            status: 'Active'
        };

        let newUser;
        try {
            newUser = await User.create(testUser);
            console.log('✅ User created successfully:', newUser._id);
        } catch (e) {
            console.log('⚠️  User creation skipped/failed (might exist):', e.message);
            newUser = await User.findOne({ email: testUser.email }) || testUser; // Fallback for reference
        }

        // 2. Verify/Create Admin
        console.log('\n🛡️ Verifying "admins" collection...');
        const testAdmin = {
            name: 'Atlas Test Admin',
            email: `atlas.admin.${Date.now()}@example.com`,
            password: 'password123',
            role: 'Admin',
            status: 'Active'
        };

        try {
            const newAdmin = await Admin.create(testAdmin);
            console.log('✅ Admin created successfully:', newAdmin._id);
        } catch (e) {
            console.log('⚠️  Admin creation skipped/failed:', e.message);
        }

        // 3. Verify/Create Recharge
        console.log('\n💳 Verifying "recharges" collection...');
        if (newUser._id) {
            const testRecharge = {
                userId: newUser._id.toString(),
                mobileNumber: newUser.mobileNumber,
                planId: 'test-api-plan',
                operator: 'Jio',
                planName: 'Atlas Verification Plan',
                amount: 100,
                paymentMode: 'UPI',
                status: 'Success'
            };
            try {
                const newRecharge = await Recharge.create(testRecharge);
                console.log('✅ Recharge created successfully:', newRecharge._id);
            } catch (e) {
                console.log('⚠️  Recharge creation skipped/failed:', e.message);
            }
        } else {
            console.log('⚠️  Skipping recharge creation as User creation failed');
        }

        // 4. Verify Counts
        console.log('\n📊 Current Collection Counts in Atlas:');
        const userCount = await User.countDocuments();
        console.log(`   Users (users): ${userCount}`);

        const adminCount = await Admin.countDocuments();
        console.log(`   Admins (admins): ${adminCount}`);

        const rechargeCount = await Recharge.countDocuments();
        console.log(`   Recharges (recharges): ${rechargeCount}`);

        console.log('\n✅ VERIFICATION COMPLETE');

    } catch (error) {
        console.error('\n❌ Verification Failed DETAILS:', error);
        if (error.message.includes('whitelist') || error.message.includes('bad auth')) {
            console.log('\n👉 ACTION REQUIRED: Please check your MongoDB Atlas IP Whitelist settings.');
        }
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Disconnected');
    }
};

verifyAtlasCollections();
