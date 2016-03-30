import Ember from 'ember';
export default Ember.Component.extend({
  didReceiveAttrs() {
    if(!this.get('date')) {
      const initDate = new Date();
      initDate.setMinutes(0);
      this.set('date',initDate);
    }
  },
  actions: {
    timeChanged(newTime) {
      this.get('date').setHours(newTime.getHours(),newTime.getMinutes(),0,0);
    },
    dateChanged(newDate) {
      this.get('date').setFullYear(newDate.getFullYear());
      this.get('date').setMonth(newDate.getMonth());
      this.get('date').setDate(newDate.getDate());
    },
    save() {
      let data = this.getProperties(['amount','date','description','comment']);
      this.get('persist')(data);
    }
  }
});
