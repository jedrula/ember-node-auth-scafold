import Ember from 'ember';

export default Ember.Component.extend({
  fields: ['minDate','maxDate','description'],
  extraPickadateOptions: {},

  init(){
    this._super(...arguments);
    this.state = {
      minDate: undefined,
      maxDate: undefined,
      description: undefined
    };
  },

  _initStateFromAttrs(fields) {
    fields.forEach(
      (element) => {
        let attr = this.getAttr(element);
        //if(attr !== undefined) {
          this.set(`state.${element}`,attr);
        //}
      }
    );
  },

  didReceiveAttrs(obj) {
    let newAttrs = obj.newAttrs;
    this._super(...arguments);
    this._initStateFromAttrs(this.fields);
    // let amountAttr = this.getAttr('amount');
    // if(amountAttr !== undefined) {
    //   this.set('state.amount',amountAttr);
    // }
  },

  actions: {
    /**
     * @param  element [minDate or maxDate]
     */
    datePicked(element, newDate) {
      if(newDate) {  //only assign a value if its actually meaningful. 
        this.set(`state.${element}`, newDate);
      }
      else {
        this.set(`state.${element}`, undefined);  //make sure date is set to undefined when it does not exist. We do not want null. This way it wont get posted in the form submit
      }
    },
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
