import React, { Component } from 'react';
import { Router, Route } from 'react-router';

import App from './containers/app';

export default class Routes extends Component {

  render () {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    );
  }
}
