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
    description: new jsonapify.Property('description'),
    href: new jsonapify.Property('href'),
    title: new jsonapify.Property('title'),
    currency: new jsonapify.Property('currency'),
    unverified: {
      value: new jsonapify.Property('unverified'),
      nullable: true
    }
  },
  relationships: {
		user: {
      data: new jsonapify.Ref('User', 'user')
    }
	}
});

jsonapify.Runtime.addResource('Expense', resource);

module.exports = resource;
