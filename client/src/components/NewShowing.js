import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/newShowing.css';

class NewShowing extends Component {
    componentDidMount() {
        this.props.searchMovies();
    }

    renderMovies() {
        return this.props.movieSearchResults.map(movie => {
            return (
                <div key={movie.title}>
                    {movie.title}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="new-showing-container">
                {this.renderMovies()}
            </div>
        );
    }
}

function mapStateToProps({ movieSearchResults }) {
    return { movieSearchResults };
}

export default connect(mapStateToProps, actions)(NewShowing);