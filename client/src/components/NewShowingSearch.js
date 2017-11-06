import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import '../styles/newShowing.css';

class NewShowingSearch extends Component {
    renderMovies() {
        return this.props.movieSearchResults.map(movie => {
            return (
                <div className="single_movie_container card small" key={movie.id}>
                    <Link to={`/new-showing-create/${movie.id}`} className="linkStyle">
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

//values.movieTitle

NewShowingSearch = connect(mapStateToProps, actions)(NewShowingSearch);
export default reduxForm({
    form: 'newShowingForm'
})(NewShowingSearch);

// export default connect(mapStateToProps, actions)(NewShowing);