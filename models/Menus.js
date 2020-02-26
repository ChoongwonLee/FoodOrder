const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  foodImage: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('menus', MenuSchema);
