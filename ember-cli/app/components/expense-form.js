import Ember from 'ember';

//TODO maybe we could have a mixin for common code for components like this one or user-expesnes
export default Ember.Component.extend({
  fields: ['amount','date','description','comment'],
  init(){
    this._super(...arguments);
    this.state = {
      amount: '',
      date: new Date(),
      description: '',
      comment: ''
    };
  },
  _initStateFromAttrs(fields) {
    return fields.forEach(
      (element) => {
        let attr = this.getAttr(element);
        if(attr !== undefined) {
          this.set(`state.${element}`,attr);
        }
      }
    );
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this._initStateFromAttrs(this.fields);
    // let amountAttr = this.getAttr('amount');
    // if(amountAttr !== undefined) {
    //   this.set('state.amount',amountAttr);
    // }
  },
  actions: {
    save() {
      // this.attrs.persist({
      //   amount: this.state.amount
      // });
      this.attrs.persist(this.state);
    }
  }
});
