import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    remove(expense) {
      return expense.destroyRecord();
    },
    edit() {
      console.log(arguments[0],arguments[1]);
      debugger;
    }
  }
});