import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    const user = this.modelFor('user');
    const expenses = this.store.query('expense', {
      user_id: user.id
    });
    return Ember.RSVP.hash({
      user,
      expenses
    });
  }
});
