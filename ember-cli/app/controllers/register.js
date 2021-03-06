import Ember from 'ember';
export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    saveModel(data) {
      let user = this.store.createRecord('user', data);
      //sets password for serializer as here: http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
      user.set('volatilePassword', data.password);
      return user.save().then(() => {
        this.get('session').authenticate('authenticator:jwt', data).then(() => {
          //Ember.run(() => {
            this.transitionToRoute('user.index',user);
          //});
        });
      });
    }
  }
});
