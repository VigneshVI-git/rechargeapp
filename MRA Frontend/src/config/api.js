// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// For production deployment, set VITE_API_URL to your Render backend URL
// Example: https://your-backend-app.onrender.com/api

export const API_ENDPOINTS = {
  // User endpoints
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_REGISTER: `${API_BASE_URL}/user/register`,
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  
  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
  ADMIN_DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
  
  // Plans endpoints
  GET_PLANS: `${API_BASE_URL}/plans`,
  GET_PLANS_BY_OPERATOR: `${API_BASE_URL}/plans/operator`,
  
  // Recharge endpoints
  CREATE_RECHARGE: `${API_BASE_URL}/recharges`,
  GET_RECHARGE_HISTORY: `${API_BASE_URL}/recharges/history`,
  GET_RECHARGE_STATUS: `${API_BASE_URL}/recharges/status`
};

export default API_BASE_URL;