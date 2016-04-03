import Ember from 'ember';
export default Ember.Component.extend({
  didInitAttrs() {
    //TODO remove just for debugging
    if(!this.get('amount')){
      this.set('amount',2);
      this.set('description','desc');
      this.set('currency','$');
      this.set('href','http://www.onet.pl');
      this.set('title','weoiq osadj');
    }
  },
  actions: {
    save() {
      let data = this.getProperties(['amount','description','currency','href','title']);
      this.get('persist')(data);
    }
  }
});
