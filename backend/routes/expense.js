"use strict";
const express = require('express');
const _ = require('lodash');
const myServerRouter = express.Router();
const Expense = require('../models/expense');
var tokenUtils = require('../utils/token');
var jsonapify = require('jsonapify');
require('../resources/expense');
//TODO remove debug logger
var logger = require('../utils/logger');
var debugbody = logger.debugbody;
var logErrors = logger.logErrors;

function canCreate() {
  return function(req,res,next) {
    const ownerId = _.get(req,'body.data.relationships.user.data.id');
    if(["*",ownerId].indexOf(req.user.scopes.crud.expense) > -1 ){
      next();
    }
    else{
      res.send(401);
    }
  };
}

function canGetUserExpenses() {
  return function(req,res,next) {
    const ownerId = req.query.user_id;
    if(["*",ownerId].indexOf(req.user.scopes.crud.expense) > -1 ){
      next();
    }
    else{
      res.send(401);
    }
  };
}

//TODO we could optimize canRud for expenses further - if we make an owner check we could use the found object for further processing instead of using subsequent call with jsonapify
function canRud() {
  return function(req,res,next) {
    const expenseScope = req.user.scopes.crud.expense;
    if(expenseScope === "*"){ //we know straight away this user can do whatever he wants with these expenses
      next();
    }
    else {
      var expenseId = _.get(req,'params.id');
      Expense.findById(expenseId, function (err, found) {
        if(found && !found.user.equals(expenseScope)) {
          res.send(401);
        }
        else {
          next();
        }
      });
    }
  }
}

/**
 * removes fields which cannot be modified if user does not have rights like unverified
 */
function modifyHackGuard() {
  return function(req,res,next) {
    var attrs = req.body.data.attributes;
    if(!_.get(req,'user.scopes.toggleAdmin')) {
      //TODO this sort of works but the socpe is gibrish map of toggleAdmin to unverified
      delete attrs.unverified; //cant patch this so make sure its deleted. would be nice to have some info that someone was actually trying to hack if thats the case
    }
    next();
  };
}

module.exports = function (app) {
  myServerRouter.route('/').post([
    tokenUtils.expressJwtMiddleware(),
    modifyHackGuard(),
    canCreate(),
    jsonapify.create('Expense'),
    jsonapify.errorHandler('Expense')
  ]).get([
    tokenUtils.expressJwtMiddleware(),
    canGetUserExpenses(),
    function (req, res, next) {
      var description = jsonapify.query('description');

      var mongoQuery = {
          user: jsonapify.query('user_id')
      };

      if(req.query['description']) {
        //mongoQuery.$text = { $search : description }; //this doesnt want to make contains searches
        mongoQuery.description = { "$regex": description, "$options": "i" }
      }

      if(req.query['minDate']) {
        mongoQuery.date = mongoQuery.date || {};
        mongoQuery.date.$gte = jsonapify.query('minDate');
      }

      if(req.query['maxDate']) {
        mongoQuery.date = mongoQuery.date || {};
        mongoQuery.date.$lte = jsonapify.query('maxDate');
      }

      var amount = parseInt(req.query['amount']);
      if(Number.isFinite(amount)) {
        mongoQuery.amount = jsonapify.query('amount');
      }
      else {
        console.log('amount is not a number ',[ req.query['amount']])
      }

      jsonapify.enumerate([
        'Expense',
        mongoQuery
      ])(req,res,next);
    },
    jsonapify.errorHandler('Expense')
  ]);

  myServerRouter.route('/:id').get([
    tokenUtils.expressJwtMiddleware(),
    canRud(),
    jsonapify.read(['Expense', jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).delete([
    tokenUtils.expressJwtMiddleware(),
    canRud(),
    jsonapify.remove(['Expense',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).patch([
    tokenUtils.expressJwtMiddleware(),
    canRud(),
    modifyHackGuard(),
    jsonapify.update(['Expense',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]);


  app.use('/api/expenses', myServerRouter);
}
