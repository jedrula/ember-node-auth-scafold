import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend( AuthenticatedRouteMixin,{
  model() {
    console.log('TODO filter and query for expesnses for specific user');
    return [];
    //return this.get('store').findAll('expenses');
  }
});
