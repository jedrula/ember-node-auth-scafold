import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  totalSpent: Ember.computed('expenses', function() {
    let ret =  this.get('expenses').reduce((previousValue, item) => previousValue + item.get('amount'),0);
    return ret;
  }),
  avgSpent: Ember.computed('totalSpent', function() {
    const minDate = this.get('minDate');
    const maxDate = this.get('maxDate') || new Date();
    if(minDate) {
      const start = moment(minDate);
      const end = moment(maxDate);
      const duration = moment.duration(end.diff(start));
      const days = Math.ceil(duration.asDays());
      return this.get('totalSpent') / days;
    }

  })
});
