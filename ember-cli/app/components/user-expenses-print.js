import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  totalSpent: Ember.computed('expenses', function() {
    let ret =  this.get('expenses').reduce((previousValue, item) => previousValue + item.get('amount'),0);
    return ret;
  }),

  getDates() {
    return this.get('expenses').map((e) => e.get('date'));
  },

  spanFrom: Ember.computed('minDate','expenses', function() {
    const minDate = this.get('minDate');
    if(minDate) {
      return minDate;
    }
    else if (this.get('expenses.length')){
      const min =  Math.min(...this.getDates());
      return new Date(min);
    }
  }),

  spanTo: Ember.computed('maxDate','expenses', function() {
    return this.get('maxDate') || new Date();
  }),

  avgSpent: Ember.computed('totalSpent','spanFrom','spanTo', function() {
    const minDate = this.get('spanFrom');
    const maxDate = this.get('spanTo');
    if(minDate) {
      const start = moment(minDate);
      const end = moment(maxDate);
      const duration = moment.duration(end.diff(start));
      const days = Math.ceil(duration.asDays());
      return this.get('totalSpent') / days;
    }
  })
});
