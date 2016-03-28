var jsonapify = require('jsonapify');
var User = require('../models/user');



const userResource = new jsonapify.Resource(User, {
  type: 'users',
  id: {
    value: new jsonapify.Property('_id'),
    writable: false,
  },
  attributes: {
    identification: new jsonapify.Property('identification'),
    admin: new jsonapify.Property('admin'),
    usermanager: new jsonapify.Property('usermanager'),
    password: {
      value: new jsonapify.Property('password'),
      readable: false
    },
  },
  // 'relationships': {
  //  'expenses': {
  //    data: new jsonapify.Refs('Expense', 'expenses'),
  //  }
  // },
  //'relationships': {
  //  'entries': new jsonapify.Property('entries'), //<- this sorts of works - it attaches entities in an array
  //}
});

//registry.add ? - used to work with circular - now i have problems: https://github.com/alex94puchades/jsonapify/pull/3
jsonapify.Runtime.addResource('User', userResource);

module.exports = userResource;  //TODO check if it works - if so maybe also try using import
