//taken from https://github.com/simplabs/ember-simple-auth/blob/master/tests/dummy/app/services/session-account.js
import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  token: Ember.computed('session.data.authenticated', function() {
    let encoded = this.get('session.data.authenticated.token');
    if(encoded) {
      const token =  this.getTokenData(encoded);
      return token;
    }
  }),

  //TODO this is copypasta from jwt from ember-simple-auth, could probably import it somehow
  /**
    Returns the decoded token with accessible returned values.

    @method getTokenData
    @return {object} An object with properties for the session.
  */
  getTokenData(token) {

    const tokenData = atob(token.split('.')[1]);

    try {
      return JSON.parse(tokenData);
    } catch (e) {
      return tokenData;
    }
  }
});
