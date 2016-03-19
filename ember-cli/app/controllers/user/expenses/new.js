import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addNew(obj) {
      //TODO add user id 
      let expense = this.store.createRecord('expense', obj);
      return expense.save();
    }
  }
});
