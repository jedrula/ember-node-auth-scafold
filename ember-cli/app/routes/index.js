import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),
  beforeModel(transition) {

    const id = this.get('session.data.authenticated.user_id');
    if(id) {
      this.transitionTo('user.expenses',id);
    }
    else {
      this.transitionTo('login');
    }
  }
});
