import Ember from 'ember';

export default Ember.Controller.extend({
  parentctrl: Ember.inject.controller('user.expenses'),
  actions: {
    remove(expense) {
      return expense.destroyRecord();
    },
    edit() {
      console.log(arguments[0],arguments[1],'TODO edit');
    },
    filter(filterObj) {
      this.transitionToRoute('user.expenses',this.get('model.user'), { queryParams: filterObj });
    }
  }
});
