import Ember from 'ember';

export default Ember.Route.extend({
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
