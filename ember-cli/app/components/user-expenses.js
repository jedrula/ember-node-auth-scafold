import Ember from 'ember';

export default Ember.Component.extend({
  extraPickadateOptions: {},
  actions: {
    filter() {
      const minDate = this.get('minDate');
      const maxDate = this.get('maxDate');
      this.getAttr('filter')({
        minDate,
        maxDate
      })
    }
  }
});
