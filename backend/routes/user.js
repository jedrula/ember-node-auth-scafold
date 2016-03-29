var express = require('express');
var jsonapify = require('jsonapify');
var _ = require('lodash');
var myServerRouter = express.Router();
var User = require('../models/user');
var tokenUtils = require('../utils/token');
require('../resources/user');

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

/**
 * removes fields which cannot be modified if user does not have rights like admin or usermanager
 */
function modifyHackGuard() {
  return function(req,res,next) {
    var attrs = req.body.data.attributes;
    if(!_.get(req,'user.scopes.toggleAdmin')) {
      delete attrs.admin; //cant patch this so make sure its deleted. would be nice to have some info that someone was actually trying to hack if thats the case
    }
    if(!_.get(req,'user.scopes.toggleUsermanager')) {
      delete attrs.usermanager; //cant patch this so make sure its deleted. would be nice to have some info that someone was actually trying to hack if thats the case
    }
    next();
  };
}

//TODO make sure that this uses SSL
module.exports = function (app) {
  myServerRouter.route('/').post([
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
