import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  sessionAccount: Ember.inject.service(),
  canCrud: Ember.computed('sessionAccount.token.scopes.crud.expense','ownerid', function() {
    const canCrudScope = this.get('sessionAccount.token.scopes.crud.expense');
    const ownerId = this.get('ownerid');

    return canCrudScope === "*" || canCrudScope === ownerId;
  })
});
