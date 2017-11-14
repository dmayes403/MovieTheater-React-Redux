import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import './movieDetails.css';


class MovieDetails extends Component {
    componentDidMount() {
        this.props.getMovieDetails(this.props.match.params.id);
        this.props.testBackEnd();
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
            <div className="video-details-container">
                <div style={detailContainerStyles}>
                    <img src={ `http://image.tmdb.org/t/p/w342//${movieDetails[2].poster_path}` }
                        style={{width: '35%', minWidth: '300px', height: '50%'}}
                        alt="poster"/>
                    <div className="description-container">
                        <h2 style={{margin: 'auto', textAlign: 'center', backgroundColor: '#3454b4', color: 'white', borderRadius: '5px', padding: '5px'}} className="z-depth-3">{movieDetails[2].title}</h2>
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
                        <Link to={`/create-showing/${this.props.match.params.id}`}><h6 className="z-depth-3 create-showing" onClick={() => this.setState({createShowing: true})}>Create Showing</h6></Link>
                    </div>
                </div>
                <div className="videos-container">
                    {this.renderVideos()}
                </div>
            </div>
        )
    }

    renderCreateShowing() {
        const { movieDetails } = this.props;
        var detailContainerStyles = {
            display: 'flex',
            flexDirection: 'row',
            borderBottom: '5px solid #3454b4',
            paddingBottom: '15px'
        }

        return (
            <div className="video-details-container">
                <div style={detailContainerStyles}>
                    <img src={ `http://image.tmdb.org/t/p/w342//${movieDetails[2].poster_path}` }
                        style={{width: '35%', minWidth: '300px', height: '50%'}}
                        alt="poster"/>
                    <div className="description-container">
                        <h2 style={{margin: 'auto', textAlign: 'center', backgroundColor: '#3454b4', color: 'white', borderRadius: '5px', padding: '5px'}} className="z-depth-3">{movieDetails[2].title}</h2>
                        
                        <h6 className="z-depth-3 cancel-button" onClick={() => this.setState({createShowing: false})}>Cancel</h6>
                    </div>
                </div>
                <div className="videos-container">
                    {this.renderVideos()}
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
}

function mapStateToProps({ movieDetails }) {
    return { movieDetails };
}

export default connect(mapStateToProps, actions)(MovieDetails);