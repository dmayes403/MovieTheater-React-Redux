import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './header/Header';
import SearchMovies from './search-movies/SearchMovies';
import MovieDetails from './movie-details/MovieDetails';
import CreateShowing from './create-showing/CreateShowing';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <div className="App" style={{backgroundColor: 'white'}}> 
            <Header />
            <Route exact path="/search-movies" component={ SearchMovies } />
            <Route exact path="/movie-details/:id" component={ MovieDetails } />
            <Route exact path="/create-showing" component={ CreateShowing } />
        </div>
    </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
