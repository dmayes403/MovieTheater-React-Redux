import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as actions from '../actions';
import '../styles/newShowingCreate.css';


class NewShowingCreate extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getMovieDetails(this.props.match.params.id);
        console.log(this.props);
    }

    render() {
        const { movieDetails } = this.props;
        var detailContainerStyles = {
            display: 'flex',
            flexDirection: 'row'
        }

        if (this.props.movieDetails.length > 0) {
            return (
                <div className="create-showing-container">
                    <div style={detailContainerStyles}>
                        <img src={ `http://image.tmdb.org/t/p/w342//${movieDetails[2].poster_path}` }
                            style={{width: '35%'}}/>
                        <div className="description-container">
                            <h2 style={{margin: 'auto', textAlign: 'center'}}>{movieDetails[2].title}</h2>
                            <p>Rating: {movieDetails[1]}</p>
                        </div>
                    </div>
                    <div className="videos-container">
                        {console.log(this.props)}
                        {this.renderVideos()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading... </div>
            );
        }
    }

    renderVideos() {
        if (this.props.movieDetails[0]) {
            return this.props.movieDetails[0].map(detail => {
                return (
                    <div key={detail.key} className="single-video-container">
                        <iframe width="250"
                            src={ `https://www.youtube.com/embed/${detail.key}` } style={{border: 'none'}}
                            allowFullScreen="allowfullscreen">
                        </iframe>
                    </div>
                );
            });
        }
    }
}

function mapStateToProps({ movieDetails }) {
    return { movieDetails };
}

export default connect(mapStateToProps, actions)(NewShowingCreate);
