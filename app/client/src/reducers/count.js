import * as ActionTypes from '../action-types';

export default function countReducer (state={count: 0}, action) {
  if (action.type === ActionTypes.INCREMENT_ACTION) {
    return {count: state.count+1};
  }

  return state;
}
