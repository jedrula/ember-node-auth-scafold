import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', {
    path: 'user/:user_id'
  }, function() {
    this.route('edit');
    this.route('expenses', function() {
      this.route('new');
      this.route('edit', {
        path: 'edit/:expense_id'
      });
    });
  });
  this.route('register');
  this.route('login');
  this.route('users');
});

export default Router;
