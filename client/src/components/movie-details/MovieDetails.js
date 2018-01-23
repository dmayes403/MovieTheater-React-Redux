import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import * as actions from '../../actions';
import './movieDetails.css';

class MovieDetails extends Component {
    componentDidMount() {
        this.props.getMovieDetails(this.props.match.params.id);
    }

    render() {
        if (this.props.movieDetails.length > 0) {
            return (
                this.renderDetails()
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    renderDetails() {
        const { movieDetails } = this.props;
        var detailContainerStyles = {
            display: 'flex',
            flexDirection: 'row',
            borderBottom: '5px solid #3454b4',
            paddingBottom: '15px'
        }

        return (
            <div className="main-container">
                <div className="large-video-details-container">
                    <div style={detailContainerStyles}>
                        <img src={ `http://image.tmdb.org/t/p/w342//${movieDetails[2].poster_path}` }
                            style={{width: '35%', minWidth: '300px', height: '50%'}}
                            alt="poster"/>
                        <div className="description-container">
                            <h3 style={{margin: 'auto', textAlign: 'center', backgroundColor: '#3454b4', color: 'white', borderRadius: '5px', padding: '5px'}} className="z-depth-3">{movieDetails[2].title}</h3>
                            <p><span style={{textDecoration: 'underline'}}>Rating:</span> {movieDetails[1] ? movieDetails[1] : 'Unknown'}</p>
                            <p><span style={{textDecoration: 'underline'}}>Run Time:</span> {movieDetails[2].runtime} minutes</p>
                            <span style={{textDecoration: 'underline'}}>Production Companies:</span>
                            <ul style={{marginTop: '5px'}}>
                                {this.renderProdComps()}
                            </ul>
                            <span style={{textDecoration: 'underline'}}>Genres:</span>
                            <ul style={{marginTop: '5px'}}>
                                {this.renderGenres()}
                            </ul>
                            <span style={{textDecoration: 'underline'}}>Overview:</span>
                            <p>{movieDetails[2].overview}</p>
                            
                            {this.renderButtons()}
                        </div>
                    </div>
                    <div className="videos-container">
                        {this.renderVideos()}
                    </div>
                </div>

                <div className="small-video-details-container">
                    <div style={{paddingTop: '13px'}}>
                        <h3 style={{margin: 'auto', textAlign: 'center', backgroundColor: '#3454b4', color: 'white', borderRadius: '5px', padding: '5px'}} className="z-depth-3">{movieDetails[2].title}</h3>
                    </div>
                    <Card style={{borderRadius: '5px', padding: '10px', margin: '15px 0px'}}>
                        <div style={{margin: 'auto', textAlign: 'center'}}>
                            <img src={ `http://image.tmdb.org/t/p/w300//${movieDetails[2].poster_path}` }
                                alt="poster"/>
                        </div>
                    </Card>
                    <div style={detailContainerStyles}>
                        <div className="description-container">
                            <p><span style={{textDecoration: 'underline'}}>Rating:</span> {movieDetails[1] ? movieDetails[1] : 'Unknown'}</p>
                            <p><span style={{textDecoration: 'underline'}}>Run Time:</span> {movieDetails[2].runtime} minutes</p>
                            <span style={{textDecoration: 'underline'}}>Production Companies:</span>
                            <ul style={{marginTop: '5px'}}>
                                {this.renderProdComps()}
                            </ul>
                            <span style={{textDecoration: 'underline'}}>Genres:</span>
                            <ul style={{marginTop: '5px'}}>
                                {this.renderGenres()}
                            </ul>
                            <span style={{textDecoration: 'underline'}}>Overview:</span>
                            <p>{movieDetails[2].overview}</p>
                            
                            {this.renderButtons()}
                        </div>
                    </div>
                    <div className="videos-container">
                        {this.renderVideos()}
                    </div>
                </div>
            </div>
        )
    }

    renderVideos() {
        if (this.props.movieDetails[0]) {
            return this.props.movieDetails[0].map(detail => {
                return (
                    <div key={detail.key} className="single-video-container">
                        <iframe width="250"
                            src={ `https://www.youtube.com/embed/${detail.key}` } style={{border: 'none'}}
                            allowFullScreen="allowfullscreen"
                            title={detail.key}>
                        </iframe>
                    </div>
                );
            });
        }
    }

    renderGenres() {
        const { movieDetails } = this.props;
        if (movieDetails[2]) {
            return movieDetails[2].genres.map(genre => {
                return (
                    <div key={genre.id}>
                        <li>{genre.name}</li>
                    </div>
                );
            });
        }
    }

    renderProdComps() {
        const { movieDetails } = this.props;
        if (movieDetails[2]) {
            return movieDetails[2].production_companies.map(prodComp => {
                return (
                    <div key={prodComp.name}>
                        <li>{prodComp.name}</li>
                    </div>
                );
            });
        }
    }

    renderButtons() {
        if (this.props.auth.admin) {
            return (
                <div className="flex-row" style={{justifyContent: 'center'}}>
                    <Link to={`/search-movies`}><h6 className="z-depth-3 button background-blue" style={{padding: '10px'}}>Cancel</h6></Link>
                    <Link to={`/create-showing/${this.props.match.params.id}`}><h6 className="z-depth-3 create-showing">Create Showing</h6></Link>
                </div>
            )
        } else {
            return (
                <div className="flex-row" style={{justifyContent: 'center'}}>
                    <Link to={`/search-movies`}><h6 className="z-depth-3 button background-blue" style={{padding: '10px'}}>Cancel</h6></Link>
                </div>
            )
        }
    }
}

function mapStateToProps({ movieDetails, auth }) {
    return { movieDetails, auth };
}

export default connect(mapStateToProps, actions)(MovieDetails);