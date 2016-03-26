import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Route.extend({
  sessionAccount: service(),
  beforeModel(transition) {
    const id = this.get('sessionAccount.token.id');
    if(id) {
      this.transitionTo('user.expenses',id);
    }
    else {
      this.transitionTo('login');
    }
  }
});
