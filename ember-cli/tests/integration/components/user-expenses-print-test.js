import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-expenses-print', 'Integration | Component | user expenses print', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user-expenses-print}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user-expenses-print}}
      template block text
    {{/user-expenses-print}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
