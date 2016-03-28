"use strict";
var express = require('express');
var myServerRouter = express.Router();
var User = require('../models/user');
var encryption = require('../utils/encryption');
var async = require('async');
var tokenUtils = require('../utils/token');

//TODO make sure that this uses SSL
module.exports = function (app) {
  myServerRouter.post('/', (req, res) => {
    var payload = req.body;
    var identification = payload.identification;
    var password = payload.password;

    async.waterfall([
      (cb) =>
      {
        User.findOne({
          identification: identification
        }, (userFindErr, user) => {
          if (!user && !userFindErr) {
            userFindErr = 'User not found';
          }

          cb(userFindErr, user);
        });
      },
      (user, cb) =>
      {
        //console.log('stage 2', arguments);
        console.log('found one userr prev id: ', user.password);
        encryption.validPassword(password, user.password, (err) =>{
          cb(err,user); //pass the user further if there was no error
        });
      }
    ], (err, user) => {

      if(err) {
        console.warn('authentication error', err);
        res.status(401).json({
          err: err
        });
      }
      else {
        //TODO send roles like admin or userAdmin
        let id = user._id;
        let crudExpensesOwnedBy = user._id;
        let crudUsers = user._id;
        if(user.admin) {
          crudExpensesOwnedBy = "*";
          crudUsers = "*";
        }
        if(user.usermanager) {
          crudUsers = "*";
        }


        let obj = {
          id,
          identification: user.identification,
          admin: user.admin,
          usermanager: user.usermanager,
          scopes: {
            crud: {
              expense: crudExpensesOwnedBy,
              user: crudUsers
            }
          }

        };
        var token = tokenUtils.sign(obj);
        var json = {
          token: token
        };
        console.log('sending json back', json);
        res.status(200).json(json);
      }
    });
  });




  app.use('/api/token-auth', myServerRouter);
}
