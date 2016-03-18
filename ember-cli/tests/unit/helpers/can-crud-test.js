import { canCrud } from '../../../helpers/can-crud';
import { module, test } from 'qunit';

module('Unit | Helper | can crud');

// Replace this with your real tests.
test('it works', function(assert) {
  const adminStub = {
    get(param) {
      switch(param) {
        case 'admin':
          return true;
        case 'id':
          return 1;
        default:
          return undefined;
      }
    }
  };

  const regularUser = {
    get(param) {
      switch(param) {
        case 'admin':
          return false;
        case 'id':
          return 2;
        default:
          return undefined;
      }
    }
  };
  const adminCanCrud = canCrud([adminStub,regularUser.get('id')]);
  assert.ok(adminCanCrud,'admin can crud');

  const canCrudOwn = canCrud([regularUser,regularUser.get('id')]);
  assert.ok(canCrudOwn,'can crud own');

  const cantCrudOthers = canCrud([regularUser,adminStub.get('id')]);
  assert.notOk(cantCrudOthers,'can crud others');
});
