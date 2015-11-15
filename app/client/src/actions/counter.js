import * as ActionTypes from '../action-types';

export function incrementCounter () {
  return {
    type: ActionTypes.INCREMENT_ACTION
  };
}


export function decrementCounter () {
  return {
    type: ActionTypes.DECREMENT_ACTION
  };
}


export function resetCounter () {
  return {
    type: ActionTypes.RESET_ACTION
  };
}
