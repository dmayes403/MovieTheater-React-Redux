import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
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

const PrivateRoute = ({ component: Component, ...rest }) => {
    let authProps = {rest};
    authProps = authProps.rest.auth;
    if (authProps) {
        return (
            <Route {...rest} render={(props) => (
                authProps.admin || authProps.creator
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            )} />
        )
    } else {
        return (
            <div style={{display: 'none'}}>Loading... </div>
        )
    }
}

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        //^^ props comes from actions being passed to the connect function below
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div className="App" style={{ backgroundColor: "white" }}>
                        <Header />
                        <Route exact path="/" component={Dashboard} />
                        <PrivateRoute exact path="/search-movies" component={SearchMovies} auth={this.props.auth} />
                        <Route exact path="/movie-details/:id" component={MovieDetails} />
                        <PrivateRoute path="/create-showing/:id" component={CreateShowing} auth={this.props.auth} />
                        <PrivateRoute path="/all-showings" component={AllShowings} auth={this.props.auth} />
                        <PrivateRoute path="/admin" component={Admin} auth={this.props.auth} />
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);
