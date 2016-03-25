import Ember from 'ember';

export default Ember.Component.extend({
  identification: '',
  password: '',
  actions: {
    login() {
      var properties = this.getProperties(['identification','password']);
      this.get('onSave')(properties).catch((reason) => {
      	this.set('errorMessage', reason.err);
      });
  	}
  }
});
