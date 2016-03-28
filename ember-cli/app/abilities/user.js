import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  sessionAccount: Ember.inject.service(),
  canCrud: Ember.computed('sessionAccount.token.scopes.crud.user','id', function() {
    const canCrudScope = this.get('sessionAccount.token.scopes.crud.user');
    return canCrudScope === "*" || canCrudScope === this.get('id');
  })
});
