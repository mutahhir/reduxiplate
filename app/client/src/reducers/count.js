import * as ActionTypes from '../action-types';

export default function countReducer (state={count: 0}, action) {
  if (action.type === ActionTypes.INCREMENT_ACTION) {
    return {count: state.count+1};
  }

  if (action.type === ActionTypes.DECREMENT_ACTION) {
    return {count: state.count-1};
  }

  if (action.type === ActionTypes.RESET_ACTION) {
    return {count: 0};
  }

  return state;
}
