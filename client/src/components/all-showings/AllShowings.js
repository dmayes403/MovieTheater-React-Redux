import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import _ from 'lodash';
import * as actions from '../../actions';

import './AllShowings.css';

class AllShowings extends Component {
    componentDidMount() {
        this.props.getShowings();
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
                        <Link to={`/create-showing/${showing.movieId}`} className="single-showing card small" key={showingDetails[2].id}><div>
                            <img src={ `http://image.tmdb.org/t/p/w154//${showingDetails[2].poster_path}` }
                            alt="poster"/>
                            <div>
                                {showingDetails[2].original_title}
                            </div>
                        </div></Link>
                    )
                } else {
                    return null;
                }
            })
        );
    }

}

function mapStateToProps({ movieShowings }) {
    // if (movieShowings.length > 0) {
    //     return { movieShowings };
    // } else {
    //     return {};
    // }

    return { movieShowings };
    
}

export default connect(mapStateToProps, actions)(AllShowings);
