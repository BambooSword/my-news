import React from 'react';
import {createStore} from 'redux';
import reducer from './reducers';
export default class ReduxIndex extends React.Component {
  inc() {
    return {type:'ADD'};
  }

  dec() {
    return {type:'SUB'};
  }

  componentDidMount() {
    var store = createStore(reducer);

    console.log(store.getState());

    store.dispatch(this.inc());
    console.log(store.getState());

    store.dispatch(this.inc());
    console.log(store.getState());

    store.dispatch(this.dec());
    console.log(store.getState());
  }
  render() {
    return (
      <div>
        REDUX
      </div>
    )
  }
}
