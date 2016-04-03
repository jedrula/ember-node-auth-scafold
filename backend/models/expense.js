const mongoose = require('mongoose');

var schema = mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
  	type: String,
  	required: true,
  	index : "text"
  },
  title: {
  	type: String,
  	required: true
  },
  href: {
  	type: String,
  	required: true
  },
  currency: {
  	type: String,
  	required: true
  },
  unverified: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',  //TODO maybe this is not really needed... maybe it would rather be simply user_id ?
  }
});

var model = mongoose.model('Expense',schema);
module.exports = model;
