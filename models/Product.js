const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0,
    required: true
  },
  owner: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
