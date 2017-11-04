import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import NewShowingSearch from './NewShowingSearch';
import NewShowingCreate from './NewShowingCreate';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <div className="App" style={{backgroundColor: 'white'}}> 
            <Header />
            <Route exact path="/new-showing-search" component={ NewShowingSearch } />
            <Route exact path="/new-showing-create/:id" component={ NewShowingCreate } />
        </div>
    </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
