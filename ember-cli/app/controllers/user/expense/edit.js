import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    edit(expenseModel, obj) {
      expenseModel.setProperties(obj);
      return expenseModel.save().then(() => {
        const user_id = expenseModel.get('user.id');
        let user = this.store.peekRecord('user',user_id);
        this.transitionToRoute('user.expenses',user);
      });
    }
  }
});
