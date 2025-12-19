// Recharge plan schema for managing different recharge plans
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);