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
    admin: {
      value: new jsonapify.Property('admin'),
      nullable: true
    },
    usermanager: {
      value: new jsonapify.Property('usermanager'),
      nullable: true
    },
    password: {
      value: new jsonapify.Property('password'),
      readable: false,
      nullable: true
    },
  }
});

//registry.add ? - used to work with circular - now i have problems: https://github.com/alex94puchades/jsonapify/pull/3
jsonapify.Runtime.addResource('User', userResource);

module.exports = userResource;  //TODO check if it works - if so maybe also try using import
