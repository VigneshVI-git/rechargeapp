// Seed default plans to database
require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('./models/Plan');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

const seedDefaultPlans = async () => {
  try {
    await connectDB();

    console.log('📋 Adding default plans...');
    
    const defaultPlans = [
      {
        planName: 'Basic Plan',
        amount: 199,
        validity: '28 days',
        benefits: '1GB/day, Unlimited calls, 100 SMS/day'
      },
      {
        planName: 'Popular Plan',
        amount: 299,
        validity: '56 days',
        benefits: '1.5GB/day, Unlimited calls, Unlimited SMS'
      },
      {
        planName: 'Premium Plan',
        amount: 399,
        validity: '84 days',
        benefits: '2GB/day, Unlimited calls, Unlimited SMS, Netflix'
      },
      {
        planName: 'Budget Plan',
        amount: 149,
        validity: '28 days',
        benefits: '1GB/day, Unlimited calls'
      },
      {
        planName: 'Daily Plan',
        amount: 19,
        validity: '1 day',
        benefits: 'Unlimited data, Unlimited calls'
      },
      {
        planName: 'Super Plan',
        amount: 249,
        validity: '28 days',
        benefits: '3GB/day, Unlimited calls, Amazon Prime'
      }
    ];

    // Check if plans already exist
    for (const planData of defaultPlans) {
      const existingPlan = await Plan.findOne({ planName: planData.planName });
      if (!existingPlan) {
        const plan = new Plan(planData);
        await plan.save();
        console.log(`✅ Added: ${planData.planName}`);
      } else {
        console.log(`⏭️  Skipped: ${planData.planName} (already exists)`);
      }
    }

    console.log('\n🎉 Default plans seeded successfully!');
    
    const totalPlans = await Plan.countDocuments();
    console.log(`📊 Total plans in database: ${totalPlans}`);

  } catch (error) {
    console.error('❌ Error seeding plans:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
};

seedDefaultPlans();