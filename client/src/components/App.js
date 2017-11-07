import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import SearchMovies from './SearchMovies';
import MovieDetails from './MovieDetails';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <div className="App" style={{backgroundColor: 'white'}}> 
            <Header />
            <Route exact path="/new-showing-search" component={ SearchMovies } />
            <Route exact path="/new-showing-create/:id" component={ MovieDetails } />
        </div>
    </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
