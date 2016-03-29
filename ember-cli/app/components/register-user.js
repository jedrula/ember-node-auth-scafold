import Ember from 'ember';

export default Ember.Component.extend({
  identification: '',
  password: '',
  errorMessage: null,
  actions: {
    register() {
      const properties = this.getProperties(['identification','password']);
      this.get('onSave')(properties).catch((reason) => {

        var duplicateKeyError = (Ember.get(reason,'errors.0.detail') || "").indexOf("E11000") > -1 //"E11000 duplicate key error collection: test.users index: identification_1 dup key: { : "3" }"
        let errors = [];
        if(duplicateKeyError) {
          errors = [{
            message: `user with identification: ${properties.identification} already exists`
          }];
        }
        else {
          errors = reason.errors;
        }
        debugger;
      	this.set('errors', errors);
      });
    }
  }
});
