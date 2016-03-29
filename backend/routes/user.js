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

function canRud() {
  return function(req,res,next) {
    if(["*",req.params.id].indexOf(req.user.scopes.crud.user) > -1 ){
      next();
    }
    else{
      res.send(401);
    }
  };
}

function modifyHackGuard() {
  return function(req,res,next) {
    var attrs = req.body.data.attributes;
    if(!req.user.scopes.toggleAdmin) {
      delete attrs.admin; //cant patch this so make sure its deleted. would be nice to have some info that someone was actually trying to hack if thats the case
    }
    if(!req.user.scopes.toggleUsermanager) {
      delete attrs.usermanager; //cant patch this so make sure its deleted. would be nice to have some info that someone was actually trying to hack if thats the case
    }
    next();
  };
}

//TODO make sure that this uses SSL
module.exports = function (app) {
  myServerRouter.route('/').post([
    tokenUtils.expressJwtMiddleware(),
    modifyHackGuard(),
    jsonapify.create('User'),
    jsonapify.errorHandler('User')
  ]).get([
    tokenUtils.expressJwtMiddleware(),
    canRud(),  //this will work because req.params.id is undefined
    jsonapify.enumerate('User'),
    jsonapify.errorHandler('User')
  ]);


  myServerRouter.route('/:id').get([
    tokenUtils.expressJwtMiddleware(),
    canRud(),  //this will work because req.params.id is undefined
    jsonapify.read(['User', jsonapify.param('id')]),
    logErrors,
    jsonapify.errorHandler()
  ]);

  myServerRouter.route('/:id').delete([
    tokenUtils.expressJwtMiddleware(),
    canRud(),  //this will work because req.params.id is undefined
    jsonapify.remove(['User',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).patch([
    tokenUtils.expressJwtMiddleware(),
    canRud(),
    modifyHackGuard(),
    jsonapify.update(['User', jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]);

  app.use('/api/users', myServerRouter);
}
