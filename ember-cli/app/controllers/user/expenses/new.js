import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addNew(userModel,obj) {
      obj.user = userModel;
      let expense = this.store.createRecord('expense', obj);
      return expense.save();
    }
  }
});
//standardowehaslo
