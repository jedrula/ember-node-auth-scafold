const mongoose = require('mongoose');
const jsonapify = require('jsonapify');
const encryption = require('../utils/encryption');

//var Entry = require('./entry');

const schema = mongoose.Schema({
    identification: {type: String, required: true, unique: true},
    admin: {type: Boolean, default: false},
    usermanager: {type: Boolean, default: false},
    password: {type: String, required: true},    //TODO select false wasnt working for me but maybe there is some way?
    expenses: [{ type: mongoose.Schema.ObjectId, ref: 'Expense'}]
});

//TODO maybe it would be better if we moved that to middleware to decouple? Although its small enough i think its fine here
schema.pre('save', function(next, done) {
  var user = this;
  //TODO make sure password is not too weak
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    next();
  }
  else{
    encryption.cryptPassword(user.password,(err, hash) => {
      if (err) {
        next(err);
      }
      else {
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      }
    });
  }
});

var userModel = mongoose.model('User',schema);

module.exports = userModel;
