const express = require('express');
const myServerRouter = express.Router();
const Expense = require('../models/expense');
var tokenUtils = require('../utils/token');
var jsonapify = require('jsonapify');
require('../resources/expense');
//TODO remove debug logger
var logger = require('../utils/logger');
var debugbody = logger.debugbody;
var logErrors = logger.logErrors;


//
module.exports = function (app) {
  myServerRouter.route('/').post([
    debugbody('posting'),
    jsonapify.create('Expense'),
    function(err, req, res, next) {
                console.log('errror in jsonapify!', err);
                next(err);
        },
    jsonapify.errorHandler('Expense')
  ]).get([
    function (req, res, next) {
      var description = jsonapify.query('description');
      console.log('description', description);
      //description = 'FIXME';

      var mongoQuery = {
          user: jsonapify.query('user_id'),
          date: {
            "$gte": jsonapify.query('minDate'),
            "$lte": jsonapify.query('maxDate'),
          },
          
      };

      if(req.query['description']) {
        mongoQuery.$text = { $search : description }; //TODO make full text!
      }
      
      console.log('the response will be sent by the next function ...');
      jsonapify.enumerate([
        'Expense',
        mongoQuery
      ])(req,res,next);
    },
    jsonapify.errorHandler('Expense')
  ]);


  //TODO manage rights to this resource
  myServerRouter.route('/:id').get([
    jsonapify.read(['Expense', jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).delete([
    jsonapify.remove(['Expense',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]).patch([
    jsonapify.update(['Expense',jsonapify.param('id')]),
    jsonapify.errorHandler()
  ]);


  app.use('/api/expenses', myServerRouter);
}
