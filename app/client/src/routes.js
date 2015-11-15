import React, { Component } from 'react';
import { Router, Route } from 'react-router';

import App from './containers/app';
import ModifyCounter from './containers/modify-counter';

export default class Routes extends Component {

  static routes () {
    return (
      <div>
        <Route path="/" component={App} />
        <Route path="/modify-counter" component={ModifyCounter} />
      </div>
    );
  }

  render () {
    const { history } = this.props;
    return (
      <Router history={history}>
        {Routes.routes()}
      </Router>
    );
  }
}
