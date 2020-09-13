const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', userSchema);
