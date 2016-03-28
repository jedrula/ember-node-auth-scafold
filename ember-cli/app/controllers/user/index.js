import Ember from 'ember';

export default Ember.Controller.extend({
  sessionAccount: Ember.inject.service(),
  actions: {
    toggleAdmin() {
      return this._toggleRole('admin');
    },

    toggleUsermanager() {
      return this._toggleRole('usermanager');
    },
  },
  _toggleRole(role) {
    let user = this.get('model');
    let newVal = !user.get(role);
    user.set(role,newVal);
    return user.save().then(() => {
      if(user.get('id') === this.get('sessionAccount.token.id')) {
        alert('Your session has been invalidated as your role has changed. Please log back in');
        this.get('sessionAccount.session').invalidate();
      }
    });
  }
});
