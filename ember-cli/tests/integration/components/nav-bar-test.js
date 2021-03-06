import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{nav-bar}}`);

  assert.ok(this.$().text().includes('Register'));

  assert.ok(this.$().text().includes('Login'));

  // Template block usage:" + EOL +
  // this.render(hbs`
  //   {{#nav-bar}}
  //     template block text
  //   {{/nav-bar}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
