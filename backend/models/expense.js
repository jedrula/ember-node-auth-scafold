const mongoose = require('mongoose');

var schema = mongoose.Schema({
  date: {type: Date, required: true},
  //TODO time
  amount: {type: Number, required: true},
  description: {type: String, required: true},
  comment: {type: String, required: true},
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',  //TODO maybe this is not really needed... maybe it would rather be simply user_id ?
  }
});

var model = mongoose.model('Expense',schema);
module.exports = model;
