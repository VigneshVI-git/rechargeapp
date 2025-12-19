// Test script to verify API endpoints are working
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

const testAPI = async () => {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Admin Registration
    console.log('1️⃣ Testing Admin Registration...');
    try {
      const adminResponse = await axios.post(`${BASE_URL}/admin/register`, {
        name: 'Test Admin',
        email: 'testadmin@example.com',
        password: 'admin123'
      });
      console.log('✅ Admin Registration:', adminResponse.data.message);
    } catch (error) {
      console.log('❌ Admin Registration Error:', error.response?.data?.message || error.message);
    }

    // Test 2: Admin Login
    console.log('\n2️⃣ Testing Admin Login...');
    try {
      const loginResponse = await axios.post(`${BASE_URL}/admin/login`, {
        email: 'testadmin@example.com',
        password: 'admin123'
      });
      console.log('✅ Admin Login:', loginResponse.data.message);
    } catch (error) {
      console.log('❌ Admin Login Error:', error.response?.data?.message || error.message);
    }

    // Test 3: Add Plan
    console.log('\n3️⃣ Testing Add Plan...');
    try {
      const planResponse = await axios.post(`${BASE_URL}/admin/plans`, {
        planName: 'Test Plan API',
        amount: 299,
        validity: '30 days',
        benefits: '2GB/day, Unlimited calls'
      });
      console.log('✅ Add Plan:', planResponse.data.message);
    } catch (error) {
      console.log('❌ Add Plan Error:', error.response?.data?.message || error.message);
    }

    // Test 4: Get Plans
    console.log('\n4️⃣ Testing Get Plans...');
    try {
      const plansResponse = await axios.get(`${BASE_URL}/plans`);
      console.log('✅ Get Plans:', `Found ${plansResponse.data.length} plans`);
    } catch (error) {
      console.log('❌ Get Plans Error:', error.response?.data?.message || error.message);
    }

    // Test 5: User Registration
    console.log('\n5️⃣ Testing User Registration...');
    try {
      const userResponse = await axios.post(`${BASE_URL}/user/register`, {
        name: 'Test User',
        mobileNumber: '9999999999',
        email: 'testuser@example.com',
        password: 'user123'
      });
      console.log('✅ User Registration:', userResponse.data.message);
    } catch (error) {
      console.log('❌ User Registration Error:', error.response?.data?.message || error.message);
    }

    // Test 6: User Login
    console.log('\n6️⃣ Testing User Login...');
    try {
      const userLoginResponse = await axios.post(`${BASE_URL}/user/login`, {
        email: 'testuser@example.com',
        password: 'user123'
      });
      console.log('✅ User Login:', userLoginResponse.data.message);
    } catch (error) {
      console.log('❌ User Login Error:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.error('❌ General Error:', error.message);
  }
};

// Run the test
console.log('🚀 Starting API Tests...');
console.log('Make sure the backend server is running on port 5000\n');

testAPI();