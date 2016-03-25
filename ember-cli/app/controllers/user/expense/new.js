import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addNew(obj) {
      let userModel = this.get('model');
      obj.user = userModel;
      let expense = this.store.createRecord('expense', obj);
      return expense.save().then(() => {
        this.transitionToRoute('user.expenses', userModel);
      })
    }
  }
});
