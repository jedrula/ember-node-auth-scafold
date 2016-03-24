import Ember from 'ember';

export function stringtodate(params/*, hash*/) {
  const dateInString = params[0];

  return dateInString? new Date(dateInString): undefined;
}

export default Ember.Helper.helper(stringtodate);
