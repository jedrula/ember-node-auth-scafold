import Ember from 'ember';

export default Ember.Component.extend({
  date: new Date(),
  actions: {
    save() {
      let data = this.getProperties(['amount','date','description','comment']);
      this.get('persist')(data);
    }
  }
});
