// Recharge transaction schema for tracking all recharge transactions
const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed to String to handle guest users
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  planId: {
    type: String, // Changed to String to handle custom plans
    required: true
  },
  operator: {
    type: String,
    required: false
  },
  planName: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: false
  },
  cashback: {
    type: Number,
    default: 0
  },
  rechargeDate: {
    type: Date,
    default: Date.now
  },
  paymentMode: {
    type: String,
    enum: ['UPI', 'NETBANKING', 'WALLET'],
    required: true
  },
  upiId: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Success'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recharge', rechargeSchema);