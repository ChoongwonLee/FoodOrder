const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  menus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menus',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  customer: {
    type: String,
    required: true
  },
  menuTitle: {
    type: String,
    required: true
  },
  menuImage: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'ordered'
  }
});

module.exports = mongoose.model('order', OrderSchema);
