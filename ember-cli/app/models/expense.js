import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),//used to be price
  description: DS.attr('string'),//used to be desc
  user: DS.belongsTo('user'),
  title: DS.attr('string'),
	unverified: DS.attr('boolean', {
   defaultValue: true
  }),
	href: DS.attr('string'),
	currency: DS.attr('string'),
  //TODO legs
  //TODO image
  //TODO comments comment
});
