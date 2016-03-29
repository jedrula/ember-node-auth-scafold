import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize: function(snapshot, options) {
    var json = this._super(snapshot, options);
    // just a value added to the model that I want to include in the attributes hash but i dont want to store it in the model
    json.data.attributes.password = snapshot.record.get('volatilePassword');
    return json;
  }
});
