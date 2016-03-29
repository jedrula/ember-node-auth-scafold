import Ember from 'ember';
export default Ember.Component.extend({
  date: new Date(),
  didReceiveAttrs() {
    this.set('time',this.get('time') || this.get('date'));
  },
  dateAndTime: Ember.computed('date','time',function(){
    const date = this.get('date');
    const time = this.get('time');
    let ret = new Date(date);
    ret.setHours(time.getHours(),time.getMinutes(),time.getSeconds());
    return ret;
  }),
  actions: {
    save() {
      let data = this.getProperties(['amount','description','comment']);
      data.date =  this.get('dateAndTime');
      this.get('persist')(data);
    }
  }
});
