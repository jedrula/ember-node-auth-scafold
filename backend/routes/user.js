var express = require('express');
var myServerRouter = express.Router();
var User = require('../models/user');
var encryption = require('../utils/encryption');
var async = require('async');
var tokenUtils = require('../utils/token');
var jsonapify = require('jsonapify');
require('../resources/user');
//TODO remove debug logger
var logger = require('../utils/logger');
var debugbody = logger.debugbody;
var logErrors = logger.logErrors;



//TODO make sure that this uses SSL
module.exports = function (app) {
  myServerRouter.route('/').post([
    debugbody('posting'),
    jsonapify.create('User'),
    function(err, req, res, next) {
                console.log('errror in jsonapify', err);
                next(err);
        },
    jsonapify.errorHandler('User')
  ]).get([
    jsonapify.enumerate('User'),
    jsonapify.errorHandler('User')
  ]);



  //TODO manage rights to this resource
  myServerRouter.route('/:id').get([
    (req,res,next) => {
     console.log(jsonapify.param('id'), jsonapify.param('_id'), 'jsonapify params ');
     next();
    },
    //debugbody('get id'),
    jsonapify.read(['User', jsonapify.param('id')]),
    logErrors,
    jsonapify.errorHandler()
  ]);


  //TODO allow only for admin and userManager
  myServerRouter.route('/:id').delete([
    jsonapify.remove(['User',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).patch([
    (req,res) => {
      var attributes = {};
      var id = req.params.id;
      try {
        attributes = req.body.data.attributes;
        User.update({ _id: id }, { $set: attributes}, (err,updateResult) =>{
          //updateResult.nModified === 0 <- is also true when there were no changes
          if(updateResult.n === 0) {
            res.status(404).end();
          }
          else {
            res.status(204).end();
          }
        });
      }
      catch(e) {
        res.status(400).end();
      }
      //req.body.data.attributes
      //TODO check why jsonapify.modify does not work - seems like sth wrong with jsonpatch
     // debugger;

      //TODO update and send 204 with no content when updated
    }
  ]);


  app.use('/api/users', myServerRouter);
}
