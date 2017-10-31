import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import NewShowing from './NewShowing';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <div className="App" style={{backgroundColor: '#a8a8a8'}}> 
            <Header />
            <Route exact path="/new-showing" component={NewShowing} />
        </div>
    </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
