import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';

import configureStore from './store/configure-store';
import Root from './containers/root';

const store = configureStore();
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

render(
  <Root store={store} history={history}/>,
  document.querySelector('.container')
);
