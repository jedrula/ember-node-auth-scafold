import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  user: DS.belongsTo('user')
});
