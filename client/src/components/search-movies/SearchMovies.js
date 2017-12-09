import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './searchMovies.css';

class SearchMovies extends Component {
    componentDidMount() {
        this.props.searchMovies('searchMovieDefault');
    }
    
    render() {
        return (
            <div className="main-container">
                <div className="inner-main-container">
                    <div className="form_container">
                        <Card>
                            <form onSubmit={this.props.handleSubmit((values) => this.searchMovies(values))}>
                                <Field
                                    type="text"
                                    name="movieTitle"
                                    component="input"
                                    placeholder="Search movie title..."
                                    style={{width: '400px', paddingTop: '10px'}}
                                />
                            </form>
                        </Card>
                    </div>
                    <div className="moviesContainer">
                        {this.renderMovies()}
                    </div>
                    <div className="emptyGrow"></div>
                </div>
            </div>
        );
    }

    renderMovies() {
        console.log(this.props.movieSearchResults);
        return this.props.movieSearchResults.movies.map(movie => {
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
        // return <div>working</div>
    }

    searchMovies(formValues) {
        this.props.searchMovies(formValues.movieTitle);
    }

}

function mapStateToProps({ movieSearchResults }) {
    return { movieSearchResults };
}

SearchMovies = connect(mapStateToProps, actions)(SearchMovies);
export default reduxForm({
    form: 'searchMovies'
})(SearchMovies);