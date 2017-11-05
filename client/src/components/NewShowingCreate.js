import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as actions from '../actions';
import '../styles/newShowingCreate.css';


class NewShowingCreate extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getMovieDetails(this.props.match.params.id);
        console.log(this.props);
    }

    render() {
        return (
            <div className="create-showing-container">
                <div>
                </div>
                <div className="videos-container">
                    {this.renderVideos()}
                </div>
            </div>
        )
    }

    renderVideos() {
        return this.props.movieDetails.map(detail => {
            return (
                <div key={detail.key} className="single-video-container">
                    <iframe width="250"
                        src={ `https://www.youtube.com/embed/${detail.key}` } style={{border: 'none'}}>
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
