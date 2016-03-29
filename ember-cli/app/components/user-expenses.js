import Ember from 'ember';

export default Ember.Component.extend({
  sortProperties: ['date:desc'],
  sortedExpenses: Ember.computed.sort('expenses', 'sortProperties'),
  actions: {
    remove(expense) {
      this.getAttr('remove')(expense);  //TODO .then(...) handle errors
    }
  }
});
