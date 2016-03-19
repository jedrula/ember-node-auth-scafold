import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  expenses: DS.hasMany('expenses')
});
