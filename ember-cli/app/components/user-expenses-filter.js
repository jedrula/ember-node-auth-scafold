import Ember from 'ember';

export default Ember.Component.extend({
  extraPickadateOptions: {},

  actions: {
    /**
     * @param  element [minDate or maxDate]
     */
    datePicked(element, newDate) {
      if(newDate) {  //only assign a value if its actually meaningful.
        this.set(element, newDate);
      }
      else {
        this.set(element, undefined);  //make sure date is set to undefined when it does not exist. We do not want null. This way it wont get posted in the form submit
      }
    },
    filter() {
      let data = this.getProperties(['minDate','maxDate','description','amount']);
      this.getAttr('filter')(data);
    }
  }
});
