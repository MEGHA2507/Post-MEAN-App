const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true   // ❗ remove unique here
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);