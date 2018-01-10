import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './header/Header';
import SearchMovies from './search-movies/SearchMovies';
import MovieDetails from './movie-details/MovieDetails';
import CreateShowing from './create-showing/CreateShowing';
import Dashboard from './dashboard/Dashboard';
import AllShowings from './all-showings/AllShowings';
import Admin from './admin/Admin';

import PrivateRoute from './private-route/PrivateRoute';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        //^^ props comes from actions being passed to the connect function below
    }

    // render() {
    //     return (
    //         <MuiThemeProvider>
    //             <BrowserRouter>
    //                 <div className="App" style={{ backgroundColor: "white" }}>
    //                     <Header />
    //                     <Route exact path="/" component={Dashboard} />
    //                     <Route exact path="/search-movies" component={SearchMovies} />
    //                     <Route exact path="/movie-details/:id" component={MovieDetails} />
    //                     <Route path="/create-showing/:id" component={CreateShowing} />
    //                     <Route path="/all-showings" component={AllShowings} />
    //                     <Route path="/admin" component={Admin} />
    //                 </div>
    //             </BrowserRouter>
    //         </MuiThemeProvider>
    //     );
    // }

    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <div className="App" style={{ backgroundColor: "white" }}>
                        <Header />
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/search-movies" component={SearchMovies} />
                        <Route exact path="/movie-details/:id" component={MovieDetails} />
                        <Route path="/create-showing/:id" component={CreateShowing} />
                        <Route path="/all-showings" component={AllShowings} />
                        <PrivateRoute path="/admin" component={Admin} />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default connect(null, actions)(App);
