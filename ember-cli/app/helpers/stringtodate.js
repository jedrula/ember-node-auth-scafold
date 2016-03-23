import Ember from 'ember';

export function stringtodate(params/*, hash*/) {
  const dateInString = params[0];
  return new Date(dateInString);
}

export default Ember.Helper.helper(stringtodate);
