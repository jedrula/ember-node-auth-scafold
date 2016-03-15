import Ember from 'ember';

export default Ember.Component.extend({
  identification: '',
  password: '',
  errorMessage: null,
  actions: {
    register() {
      var properties = this.getProperties(['identification','password']);
      this.attrs.onSave(properties).catch((reason) => {
      	this.set('errors', reason.errors);
      });
    }
  }
});
