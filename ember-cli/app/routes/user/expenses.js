import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

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
    params.user_id = user.get('id');
    const expenses = this.store.query('expense', params); //user.get('expenses'); wont work beacause expesnse ids are not stored in user obj in mongo
    return Ember.RSVP.hash({
      user,
      expenses
    });
  }
});
