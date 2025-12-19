// Test recharge API with complete order summary data
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

const testRechargeAPI = async () => {
  console.log('🧪 Testing Recharge API with Order Summary Data...\n');

  try {
    const rechargeData = {
      userId: 'guest',
      mobileNumber: '9876543210',
      planId: 'test-plan-123',
      paymentMode: 'UPI',
      operator: 'Airtel',
      planName: 'Premium Plan',
      amount: 399,
      totalAmount: 379, // After 5% cashback
      cashback: 20,
      upiId: 'user@paytm'
    };

    console.log('📤 Sending recharge data:', rechargeData);

    const response = await axios.post(`${BASE_URL}/user/recharge`, rechargeData);

    if (response.status === 201) {
      console.log('✅ Recharge API Success!');
      console.log('📋 Response:', response.data);
      console.log('\n🎉 Order summary data stored in MongoDB!');
      console.log('📊 Check MongoDB Compass → recharges collection');
    }

  } catch (error) {
    console.error('❌ Recharge API Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data.message);
    } else {
      console.error('Error:', error.message);
    }
  }
};

console.log('🚀 Testing Recharge API...');
console.log('Make sure backend server is running on port 5000\n');

testRechargeAPI();