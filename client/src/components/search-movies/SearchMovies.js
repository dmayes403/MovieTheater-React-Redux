import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import _ from 'lodash';

import Paginator from '../paginator/Paginator';

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

                <Paginator pageData={this.props.movieSearchResults.pageData} currentSearch={this.props.formValues && this.props.formValues.movieTitle ? this.props.formValues.movieTitle : 'searchMovieDefault'}/>
            </div>
        );
    }

    renderMovies() {
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
    }

    searchMovies(formValues) {
        // console.log(this.state.form.searchMovies.values)
        console.log(this.props.formValues);
        this.props.searchMovies(formValues.movieTitle, 1);
    }

}

// function mapStateToProps({ movieSearchResults }) {
//     return { movieSearchResults };
// }

function mapStateToProps(state) {
    // If statements are required because form values don't exist on initial load
    if (_.has(state.form, 'searchMovies') && _.has(state.form.searchMovies, 'values')) {
        return { 
            movieSearchResults: state.movieSearchResults,
            formValues: state.form.searchMovies.values
        };
    } else {
        return {
            movieSearchResults: state.movieSearchResults,
        }
    }
}

SearchMovies = connect(mapStateToProps, actions)(SearchMovies);
export default reduxForm({
    form: 'searchMovies'
})(SearchMovies);