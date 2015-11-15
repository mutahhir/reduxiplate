import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { incrementCounter, decrementCounter, resetCounter } from '../actions/counter';

class ModifyCounter extends Component {
  constructor(props) {
    super(props);
  }

  incrementCounter () {
    const {dispatch} = this.props;

    dispatch(incrementCounter());
  }
  decrementCounter () {
    const {dispatch} = this.props;

    dispatch(decrementCounter());
  }
  resetCounter () {
    const {dispatch} = this.props;

    dispatch(resetCounter());
  }


  render () {
    const {counter} = this.props;
    const incrementCounter = this.incrementCounter.bind(this);
    const decrementCounter = this.decrementCounter.bind(this);
    const resetCounter = this.resetCounter.bind(this);


    return (
      <div>
        <header>
          <h1>Counter</h1>
        </header>
        <main>
          <p>Count: {counter.count}</p>
          <button onClick={incrementCounter}>Increment</button>
          <button onClick={decrementCounter}>Decrement</button>
          <button onClick={resetCounter}>Reset</button>

          <p><Link to="/">Back to Main</Link></p>
        </main>
      </div>
    );
  }
}

ModifyCounter.propTypes = {
  counter: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const {counter} = state;

  return {
    counter
  };
}

export default connect(mapStateToProps)(ModifyCounter);
