import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions';

import './AllShowings.css';

class AllShowings extends Component {
    componentDidMount() {
        this.props.getShowings();
    }

    render() {
        if (this.props.movieShowings.showings) {
            return (
                <div className="all-showings-container">
                    {this.renderShowings()}
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    renderShowings() {
        return (
            this.props.movieShowings.showings.map(showing => {
                let showingDetails = [];
                this.props.movieShowings.movieDetails.forEach(detail => {
                    if (detail[2].id.toString() === showing.movieId) {
                        showingDetails = detail;
                    } 
                });

                return (
                    <div key={showingDetails[2].id} className="single-showing card small">
                        <img src={ `http://image.tmdb.org/t/p/w154//${showingDetails[2].poster_path}` }
                        alt="poster"/>
                        <div>
                            {showingDetails[2].original_title}
                        </div>
                    </div>
                )
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

    console.log(movieShowings);
    return { movieShowings };
    
}

export default connect(mapStateToProps, actions)(AllShowings);
