import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/newShowing.css';

class NewShowing extends Component {
    // componentDidMount() {
    //     this.props.searchMovies();
    // }

    renderMovies() {
        return this.props.movieSearchResults.map(movie => {
            return (
                <div key={movie.id}>
                    <div>
                        {movie.title}
                    </div>
                    <img src={ `http://image.tmdb.org/t/p/w185//${movie.poster_path}` }/>
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
                <form onSubmit={this.props.handleSubmit((values) => this.searchMovies(values))}>
                    <Field
                        type="text"
                        name="movieTitle"
                        component="input"
                        placeholder="Search movie title..."
                        style={{width: '200px'}}
                    />
                </form>
                <div className="movieContainer">
                    {this.renderMovies()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ movieSearchResults }) {
    return { movieSearchResults };
}

//values.movieTitle

NewShowing = connect(mapStateToProps, actions)(NewShowing);
export default reduxForm({
    form: 'newShowingForm'
})(NewShowing);

// export default connect(mapStateToProps, actions)(NewShowing);