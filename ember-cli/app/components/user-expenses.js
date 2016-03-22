import Ember from 'ember';

export default Ember.Component.extend({
  fields: ['minDate','maxDate'],
  extraPickadateOptions: {},

  init(){
    this._super(...arguments);
    this.state = {
      minDate: undefined,
      maxDate: undefined,
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
    filter() {
      // const minDate = this.get('minDate');
      // const maxDate = this.get('maxDate');
      // this.getAttr('filter')({
      //   minDate,
      //   maxDate
      // })
      this.getAttr('filter')(this.state);
    }
  }
});
