import Ember from 'ember';

export default Ember.Controller.extend({
  parentctrl: Ember.inject.controller('user.expenses'), 
});
