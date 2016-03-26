import Ember from 'ember';

export default Ember.Route.extend({
  // //TODO DRY? Maybe it would be better to inherit from index route, or best use some sort of mixin that would make queryParams from parent available in this routes corresponding controller
  // setupController(controller, model) {
  //   this._super(controller, model);
  //   const queryParams = this.paramsFor('user.expenses');
  //   controller.setProperties(queryParams);
  // }
});


// https://github.com/EmberSherpa/fyi/blob/master/query-params-and-nested-routes.md
