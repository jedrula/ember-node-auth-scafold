import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  description: DS.attr('string'),
  comment: DS.attr('string'),
  date: DS.attr('date'),
  user: DS.belongsTo('user')
});
