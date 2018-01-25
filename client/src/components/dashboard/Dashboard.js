import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
import * as moment from 'moment';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import './dashboard.css';

class Dashboard extends Component {
    state = { 
        focusedDateIndex: 0,
        focusedDate: ''
    };

    componentDidMount() {
        let initialFocusDate = new Date();
        initialFocusDate = moment(initialFocusDate, moment.ISO_8601).format("ddd MMM DD YYYY");
        this.setState({focusedDate: initialFocusDate});

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
                                    <div className="box-date-size">{moment(date, moment.ISO_8601).format("ddd").toString()}</div>
                                    <div className="box-date-size-middle" style={{fontSize: '1.8em'}}>{moment(date, moment.ISO_8601).format("D").toString()}</div>
                                    <div className="box-date-size">{moment(date, moment.ISO_8601).format("MMM").toString()}</div>
                                </div>
                            );
            }
    
            return (
                <div className="main-container">
                    <div className="dashboard-container">
                        <Card style={{borderRadius: '5px', padding: '10px', margin: '15px 0px'}}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div style={{display: 'flex', overflow: 'auto'}}>
                                    {dateBoxes}
                                </div>
                            </div>
                        </Card>
                        <div>{this.renderShowings()}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="main-container">
                    <div>Loading...</div>
                </div>
            )
        }
    }

    renderShowings() {
        let count = 0;
        return this.props.movieShowings.showings.map(showing => {
            count++;
            let showingDetails = [];
            const startDateString = moment(showing.startDate, moment.ISO_8601).format("ddd MMM DD YYYY");
            const endDateString = moment(showing.endDate, moment.ISO_8601).format("ddd MMM DD YYYY");

            this.props.movieShowings.movieDetails.forEach(detail => {
               if (detail[2].id.toString() === showing.movieId) {
                   showingDetails = detail;
               } 
            });

            if (Date.parse(this.state.focusedDate) >= Date.parse(startDateString) && Date.parse(this.state.focusedDate) <= Date.parse(endDateString)) {
                return (
                    <div key={count}>
                        <Card className="large-movie-card" style={{borderRadius: '5px', padding: '10px', margin: '15px 0px'}}><Link to={`/movie-details/${showingDetails[2].id}`}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <img style={{maxHeight: '250px'}} src={`http://image.tmdb.org/t/p/w154//${showingDetails[2].poster_path}`}
                                alt="poster"/>
                                <div className="movie-detail-container">
                                    <span className="dashboard-movie-title">{showingDetails[2].original_title}</span>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        {showing.startTime.map(time => (
                                            <div key={time} className="time-container">{time}</div>
                                        ))}
                                    </div>
                                    <span style={{marginTop: '10px'}}>{showingDetails[1]}</span>
                                    <span>{showingDetails[2].runtime}m</span>
                                    <span style={{marginTop: '25px'}}>{showingDetails[2].overview}</span>
                                </div>
                            </div>
                        </Link></Card>
                        <Card className="small-movie-card" style={{borderRadius: '5px', padding: '10px', margin: '15px 0px'}}><Link to={`/movie-details/${showingDetails[2].id}`}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <img style={{margin: 'auto'}} src={`http://image.tmdb.org/t/p/w300//${showingDetails[2].poster_path}` }
                                alt="poster"/>
                                <div className="movie-detail-container" style={{margin: 'auto'}}>
                                    <span className="dashboard-movie-title">{showingDetails[2].original_title}</span>
                                    <div style={{display: 'flex', flexDirection: 'row', margin: 'auto'}}>
                                        <span style={{paddingBottom: '5px'}}>Rating: {showingDetails[1]}</span>
                                        <span style={{marginLeft: '10px'}}>Run Time: {showingDetails[2].runtime}m</span>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        {showing.startTime.map(time => (
                                            <div key={time} className="time-container">{time}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link></Card>
                    </div>
                );
            } else {
                return null;
            }
        });
    }

    getDate(date, index) {
        this.setState({ 
            focusedDateIndex: index, 
            focusedDate: moment(date, moment.ISO_8601).format("ddd MMM DD YYYY")
        });
    }
} 

function mapStateToProps({ movieShowings }) {
    return { movieShowings };
}

export default connect(mapStateToProps, actions)(Dashboard);