const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admins'
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
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('menus', MenuSchema);
