import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './searchMovies.css';

class SearchMovies extends Component {
    renderMovies() {
        return this.props.movieSearchResults.map(movie => {
            return (
                <div className="single_movie_container card small" key={movie.id}>
                    <Link to={`/movie-details/${movie.id}`} className="linkStyle">
                        <div>
                            <div>
                                <img src={ `http://image.tmdb.org/t/p/w154//${movie.poster_path}` }
                                    alt="poster"/>
                            </div>
                            <div>
                                {movie.title}
                            </div>
                        </div>
                    </ Link>
                </div>
            );
        });
    }

    searchMovies(formValues) {
        this.props.searchMovies(formValues.movieTitle);
    }

    render() {
        return (
            <div className="new-showing-container">
                <div className="form_container">
                    <form onSubmit={this.props.handleSubmit((values) => this.searchMovies(values))}>
                        <Field
                            type="text"
                            name="movieTitle"
                            component="input"
                            placeholder="Search movie title..."
                            style={{width: '200px'}}
                        />
                    </form>
                </div>
                <div className="moviesContainer">
                    {this.renderMovies()}
                </div>
                <div className="emptyGrow"></div>
            </div>
        );
    }
}

function mapStateToProps({ movieSearchResults }) {
    return { movieSearchResults };
}

SearchMovies = connect(mapStateToProps, actions)(SearchMovies);
export default reduxForm({
    form: 'newShowingForm'
})(SearchMovies);