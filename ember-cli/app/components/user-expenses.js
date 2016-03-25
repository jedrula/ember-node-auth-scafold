import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    remove(expense) {
      this.getAttr('remove')(expense);  //TODO .then(...) handle errors
    }
  }
});
