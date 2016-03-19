import Ember from 'ember';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    this.amount = '';
  },
  actions: {
    save() {
      this.attrs.persist({
        amount: this.amount
      })
    }
  }
});
