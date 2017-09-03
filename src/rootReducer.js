import { combineReducers } from 'redux';

import user from './reducers/user';

/**
   combineReducers does "call all reducers", or at least all
   of the slice reducers it is wrapping.
**/
export default combineReducers({
  user
});
