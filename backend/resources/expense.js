var jsonapify = require('jsonapify');
var Expense = require('../models/expense');
var userResource = require('./user');


const resource = new jsonapify.Resource(Expense, {
  type: 'expenses',
  id: {
    value: new jsonapify.Property('_id'),
    writable: false,
  },
  attributes: {
    amount: new jsonapify.Property('amount'),
    date: new jsonapify.Property('date'),
    description: new jsonapify.Property('description'),
    comment: new jsonapify.Property('comment'),
    //TODO time
  },
  relationships: {
		user: {
      data: new jsonapify.Ref('User', 'user')
    }
	}
});

jsonapify.Runtime.addResource('Expense', resource);

module.exports = resource;
