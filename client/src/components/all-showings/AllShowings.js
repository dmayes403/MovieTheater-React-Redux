import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './AllShowings.css';

class AllShowings extends Component {
    componentDidMount() {
        this.props.fetchUser().then(() => {
            this.checkAuth();
        });
    }

    checkAuth() {
        if (!this.props.auth.admin) {
            this.props.history.push('/');
        } else {
            this.props.getShowings();
        }
    }

    render() {
        if (this.props.movieShowings.showings) {
            return (
                <div className="main-container">
                    <div className="all-showings-container">
                        {this.renderShowings()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    renderShowings() {
        const usedIds = [];

        return (
            this.props.movieShowings.showings.reverse().map(showing => {
                let showingDetails = [];
                this.props.movieShowings.movieDetails.forEach(detail => {
                    if (detail[2].id.toString() === showing.movieId) {
                        showingDetails = detail;
                    } 
                });

                if (usedIds.indexOf(showing.movieId) === -1) {
                    usedIds.push(showing.movieId);

                    return (
                        <div className="single-showing card" key={showingDetails[2].id}>
                            <Link to={`/create-showing/${showing.movieId}`} className="linkStyle">
                                <div>
                                    <div>
                                        <img src={ `http://image.tmdb.org/t/p/w185//${showingDetails[2].poster_path}` }
                                        alt="poster"/>
                                    </div>
                                    <div>
                                        {showingDetails[2].original_title}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                } else {
                    return null;
                }
            })
        );
    }

}

function mapStateToProps({ movieShowings, auth }) {
    // if (movieShowings.movieDetails.length > 0 && movieShowings.showings.length > 0) {
    //     console.log('1');
    //     return { movieShowings };
    // } else {
    //     console.log('2');
    //     movieShowings = {};
    //     movieShowings.movieDetails = [];
    //     movieShowings.showings = [];
    //     return { movieShowings };
    // }

    return { movieShowings, auth };
    
}

export default connect(mapStateToProps, actions)(AllShowings);
