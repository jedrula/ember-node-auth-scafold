import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-user', 'Integration | Component | login user', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{login-user}}`);

  assert.ok(this.$().text().includes('Login'));

  // There is no Template block usage:" + EOL +
  this.render(hbs`
    {{#login-user}}
      templateblocktext
    {{/login-user}}
  `);

  assert.notOk(this.$().text().includes('template block text'));
});
