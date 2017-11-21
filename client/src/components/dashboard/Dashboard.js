import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import _ from 'lodash';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import './dashboard.css';


class Dashboard extends Component {
    state = { 
        focusedDateIndex: 0,
        focusedDate: moment(new Date()).toString()
    };

    componentDidMount() {
        this.props.getShowings();
    }

    render() {
        if (this.props.movieShowings.showings) {
            const dateBoxes = [];
            for (let i = 0; i < 30; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);

                dateBoxes.push(
                                <div key={i} className={ this.state.focusedDateIndex === i ? 'highlighted-date-box' : 'date-box' } onClick={() => this.getDate(date, i)}>
                                    <div>{moment(date).format("ddd").toString()}</div>
                                    <div style={{fontSize: '1.8em'}}>{moment(date).format("D").toString()}</div>
                                    <div>{moment(date).format("MMMM").toString()}</div>
                                </div>
                            );
            }
    
            return (
                <div className="dashboard-container">
                    <div>
                        <div style={{display: 'flex', overflow: 'auto'}}>
                            {dateBoxes}
                        </div>
                    </div>
                    <div>{this.renderShowings()}</div>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    renderShowings() {
        return this.props.movieShowings.showings.map(showing => {
            let showingDetails = [];
            const startDateString = moment(showing.startDate).toString();
            const endDateString = moment(showing.endDate).toString();
            console.log(startDateString);
            // console.log(showing);
            // console.log(this.state.focusedDate);
            this.props.movieShowings.movieDetails.forEach(detail => {
               if (detail[2].id.toString() === showing.movieId) {
                   showingDetails = detail;
               } 
            });

            if (this.state.focusedDate >= startDateString && this.state.focusedDate <= endDateString) {
                console.log(showingDetails[2]);
                return (
                    <div key={showingDetails[2].id} style={{marginTop: '15px', display: 'flex', flexDirection: 'row'}}>
                        {/* {console.log(showingDetails[2])} */}
                        {/* {console.log(showingDetails)} */}
                        <img src={ `http://image.tmdb.org/t/p/w154//${showingDetails[2].poster_path}` }
                        alt="poster"/>
                        <div className="movie-detail-container">
                            <span className="dashboard-movie-title">{showingDetails[2].original_title}</span>
                            <span>{showingDetails[1]}</span>
                            <span>{showingDetails[2].runtime}m</span>
                            <span style={{marginTop: '25px'}}>{showingDetails[2].overview}</span>
                            <Link to={`/movie-details/${showingDetails[2].id}`} className="dashboard-linkStyle" style={{marginTop: '15px'}}>More Details</Link>
                        </div>
                    </div>
                );
            } else {
                return;
            }
        });
    }

    getDate(date, index) {
        this.setState({ focusedDateIndex: index });
        this.setState({ focusedDate: moment(date).toString() });
        console.log(this.state.focusedDate);
    }
} 

function mapStateToProps({ movieShowings }) {
    return { movieShowings };
}

export default connect(mapStateToProps, actions)(Dashboard);