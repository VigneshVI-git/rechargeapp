require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('./models/Plan');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1);
    }
};

const plansData = [
    {
        "planName": "Test Plan API",
        "amount": 299,
        "validity": "30 days",
        "benefits": "2GB/day, Unlimited calls",
        "status": "Active"
    },
    {
        "planName": "Basic Plan",
        "amount": 199,
        "validity": "28 days",
        "benefits": "1GB/day, Unlimited calls, 100 SMS/day",
        "status": "Active"
    },
    {
        "planName": "Popular Plan",
        "amount": 299,
        "validity": "56 days",
        "benefits": "1.5GB/day, Unlimited calls, Unlimited SMS",
        "status": "Active"
    },
    {
        "planName": "Premium Plan",
        "amount": 399,
        "validity": "84 days",
        "benefits": "2GB/day, Unlimited calls, Unlimited SMS, Netflix",
        "status": "Active"
    },
    {
        "planName": "Budget Plan",
        "amount": 149,
        "validity": "28 days",
        "benefits": "1GB/day, Unlimited calls",
        "status": "Active"
    },
    {
        "planName": "Daily Plan",
        "amount": 19,
        "validity": "1 day",
        "benefits": "Unlimited data, Unlimited calls",
        "status": "Active"
    },
    {
        "planName": "Super Plan",
        "amount": 249,
        "validity": "28 days",
        "benefits": "3GB/day, Unlimited calls, Amazon Prime",
        "status": "Active"
    },
    {
        "planName": "API",
        "amount": 599,
        "validity": "48 days",
        "benefits": "2GB",
        "status": "Active"
    }
];

const seedPlans = async () => {
    try {
        await connectDB();

        console.log('🧹 Clearing existing plans...');
        await Plan.deleteMany({});

        console.log('📋 Inserting new plans...');
        await Plan.insertMany(plansData);

        console.log(`✅ Successfully seeded ${plansData.length} plans!`);

    } catch (error) {
        console.error('❌ Error seeding plans:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Connection closed');
    }
};

seedPlans();
