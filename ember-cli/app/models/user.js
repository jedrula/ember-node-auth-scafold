import DS from 'ember-data';

export default DS.Model.extend({
  identification: DS.attr('string'),
  hours: DS.attr('number')
});
