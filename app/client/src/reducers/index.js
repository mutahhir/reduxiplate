import { combineReducers } from 'redux';

import countReducer from './count';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  counter: countReducer,
  routing: routeReducer
});
