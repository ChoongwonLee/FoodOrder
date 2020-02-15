const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('customer', CustomerSchema);
