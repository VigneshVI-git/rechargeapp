// Admin schema for admin authentication and management
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Admin', 'Manager'],
    default: 'Admin'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  lastLogin: {
    type: Date
  },
  permissions: {
    canManageUsers: { type: Boolean, default: true },
    canManagePlans: { type: Boolean, default: true },
    canViewReports: { type: Boolean, default: true },
    canManageAdmins: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);