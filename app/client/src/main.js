import React from 'react';
import {render} from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

import * as ActionTypes from './action-types';
import App from './containers/app';

const countReducer = (state={count: 0}, action) => {
  if (action.type === ActionTypes.INCREMENT_ACTION) {
    return {count: state.count+1};
  }

  return state;
};

const reducer = combineReducers({
  counter: countReducer,
  routing: routeReducer
});

const store = createStore(reducer);
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.container')
);
