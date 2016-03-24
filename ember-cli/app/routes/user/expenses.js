import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// export default Ember.Route.extend( AuthenticatedRouteMixin,{
//   model() {
//     console.log('TODO filter and query for expesnses for specific user');
//     return [];
//   }
// });

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    minDate: {
      refreshModel: true
    },
    maxDate: {
      refreshModel: true
    },
    description: {
      refreshModel: true
    },
    amount: {
      refreshModel: true
    }
  },
  model(params){
    const user = this.modelFor('user');
    params.user_id = user.id;
    const expenses = this.store.query('expense', params);
    return Ember.RSVP.hash({
      user,
      expenses
    });
  }
});
