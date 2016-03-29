import Ember from 'ember';
export default Ember.Controller.extend({
  actions: {
    saveModel(data) {
      var user = this.store.createRecord('user', data);
      //sets password for serializer as here: http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
      user.set('volatilePassword', data.password);
      return user.save().then(() => {
          this.transitionToRoute('user.index',user);
      });
    }
  }
});
