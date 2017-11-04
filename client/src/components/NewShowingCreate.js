import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as actions from '../actions';

class NewShowingCreate extends Component {
    componentDidMount() {
        // console.log(props.match.params.name);
        console.log(this.props.match.params.id);
        this.props.getMovieDetails(this.props.match.params.id);
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {this.renderDetails()}
            </div>
        )
    }

    renderDetails() {
        return this.props.movieDetails.map(detail => {
            return (
                <div key={detail.key}>
                    <div>{detail.name}</div>
                    <iframe width="420" height="315"
                        src={ `https://www.youtube.com/embed/${detail.key}` }>
                    </iframe>
                </div>
            );
        });
    }
}

function mapStateToProps({ movieDetails }) {
    return { movieDetails };
}

export default connect(mapStateToProps, actions)(NewShowingCreate);
