import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { incrementCounter } from '../actions/counter';

class App extends Component {
  constructor(props) {
    super(props);
  }

  incrementCounter () {
    const {dispatch} = this.props;

    dispatch(incrementCounter());
  }


  render () {
    const {counter} = this.props;
    const incrementCounter = this.incrementCounter.bind(this);

    return (
      <div>
        <header>
          <h1>Counter</h1>
        </header>
        <main>
          <p>Count: {counter.count}</p>
          <button onClick={incrementCounter}>Increment</button>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const {counter} = state;

  return {
    counter
  };
}

export default connect(mapStateToProps)(App);
