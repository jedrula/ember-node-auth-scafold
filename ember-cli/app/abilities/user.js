import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  sessionAccount: Ember.inject.service(),
  canCrud: Ember.computed('sessionAccount.token.scopes.crud.user','id', function() {
    const canCrudScope = this.get('sessionAccount.token.scopes.crud.user');
    return canCrudScope === "*" || canCrudScope === this.get('id');
  }),
  canToggleAdmin: Ember.computed.alias('sessionAccount.token.scopes.toggleAdmin'),
  canToggleUsermanager: Ember.computed.alias('sessionAccount.token.scopes.toggleUsermanager'),
//comments for checking hacking options
  //  canCrud: true,
  // canToggleAdmin: true,
  // canToggleUsermanager: true,
});
