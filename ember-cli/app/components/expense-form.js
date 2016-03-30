import Ember from 'ember';
export default Ember.Component.extend({
  didReceiveAttrs() {
    if(!this.get('date')) {
      let nowDate =  new Date();
      nowDate.setHours(12,0,0,0);
      this.set('date',nowDate);

      let nowTime =  new Date();
      nowTime.setHours(12,0,0,0);
      this.set('time',nowTime);
    }
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
