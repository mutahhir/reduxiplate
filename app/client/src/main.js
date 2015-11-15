import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';

import configureStore from './store/configure-store';
import Root from './containers/root';

let initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

render(
  <Root store={store} history={history}/>,
  document.querySelector('.container')
);
