import Ember from 'ember';

//TODO maybe we could have a mixin for common code for components like this one or user-expesnes
export default Ember.Component.extend({
  fields: ['amount','date','description','comment'],
  init(){
    this._super(...arguments);
    //set state with only default values
    this.state = {
      date: new Date()
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
  },
  actions: {
    save() {
      this.attrs.persist(this.state);
    }
  }
});
