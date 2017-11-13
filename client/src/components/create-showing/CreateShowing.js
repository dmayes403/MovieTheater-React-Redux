import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, change } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import './createShowing.css';
import theaterList from '../../variables/theaters';
import { DatePicker, TimePicker } from 'redux-form-material-ui';
import _ from 'lodash';
import * as moment from 'moment';

import MenuItem from 'material-ui/MenuItem'

import SelectFieldContainer from '../../material-ui/SelectFieldContainer';



class CreateShowing extends Component {
    state = { 
        showingTimes: [],
        theaterNotSelected: true,
        startDateNotSelected: true,
        updateIndex: null
    }

    componentDidMount() {
        this.props.getMovieDetails(this.props.match.params.id);
    }

    render() {
        if (this.props.movieDetails.length > 0) {
            return (
                this.renderCreateShowing()
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    renderCreateShowing() {
        const { handleSubmit } = this.props;
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
                        style={{width: '30%', minWidth: '300px', height: '50%'}}
                        alt="poster"/>
                    <div className="create-description-container">
                        <h2 style={{margin: 'auto', textAlign: 'center', backgroundColor: '#3454b4', color: 'white', borderRadius: '5px', padding: '5px'}} className="z-depth-3">{movieDetails[2].title}</h2>
                        
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                <form onSubmit={handleSubmit(values => this.addToShowTimes(values))}>
                                    {this.renderField()}
                                    {this.renderDatePicker()}
                                    {this.renderTimePicker()}
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <button className="z-depth-3 add-button" type="submit" onClick={() => this.clearForm()}>Clear</button>
                                        <button className="z-depth-3 add-button" style={{marginLeft: '5px', backgroundColor: '#44ACA1'}} type="submit">Add</button>
                                    </div>
                                </form>
                            </div>
                            <div className="time-table">
                                <table>
                                    <thead>
                                        <tr className="heading">
                                            <th style={{width: '50px'}}></th>
                                            <th>Theater</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th style={{textAlign: 'center'}}>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.showingTimes.map((showTime, index) => 
                                            <tr key={index} style={{color: '#3454b4'}} onClick={() => this.loadShowing(showTime, index)}>
                                                <td onClick={() => this.delete(index)}><i className="material-icons" style={{cursor: 'pointer', maxWidth: '50px'}}>delete</i></td>
                                                <td>{showTime.theaterChoice.name}</td>
                                                <td>{showTime.startDate.toString().split(' ').slice(0, 4).join(' ')}</td>
                                                <td>{showTime.endDate ? showTime.endDate.toString().split(' ').slice(0, 4).join(' ') : showTime.startDate.toString().split(' ').slice(0, 4).join(' ')}</td>
                                                <td style={{textAlign: 'center'}}>{this.convert(showTime.time.toString().split(' ').slice(4, 5).join(' '))}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="bottom-links">
                                    <Link to={`/movie-details/${this.props.match.params.id}`}><h6 className="z-depth-3 cancel-button" onClick={() => this.setState({createShowing: false})}>Cancel</h6></Link>
                                    <button className="z-depth-3 save-button" type="submit">Save</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="videos-container">
                    {this.renderVideos()}
                </div>
            </div>
        )
    }

    convert(time) {
        const theMoment = moment(time, ["HH:mm"])
        return theMoment.format("h:mm A")
    }

    delete(index) {
        let tempState = this.state.showingTimes;
        tempState.splice(index, 1);
        this.setState({ showingTimes: tempState});
    }

    clearForm() {
        this.props.reset();
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
    
    renderField() {
        return (
            <div>
                <div style={{fontSize: '1.2em', marginTop: '15px'}} className="heading">Theater</div>
                <div className="field-line">
                    <Field
                        type="text"
                        floatingLabelText="Theater"
                        component={SelectFieldContainer}
                        name="theaterChoice"
                        label="Theater"
                        onChange={() => this.setState({ theaterNotSelected: false })}>
                        {theaterList.map((theater) =>
                            <MenuItem key={theater.id} value={theater} primaryText={theater.name} style={{fontFamily: '"Prompt", sans-serif'}}/>
                        )}
                    </Field>
                </div>
            </div>
        )
    }

    renderDatePicker() {
        return (
            <div>
                <div style={{fontSize: '1.2em', marginTop: '15px'}} className="heading">Date Range</div>
                <div className="field-line">
                    <Field 
                        name="startDate" 
                        floatingLabelText="Start Date"
                        component={DatePicker} 
                        format={null}
                        autoOk={true}
                        onChange={() => this.setState({ startDateNotSelected: false })}
                        DateTimeFormat={Intl.DateTimeFormat}
                        disabled={this.state.theaterNotSelected}
                    />
                </div>
                <div className="field-line">
                    <Field 
                        name="endDate" 
                        floatingLabelText="End Date (optional)"
                        component={DatePicker} 
                        format={null}
                        autoOk={true}
                        DateTimeFormat={Intl.DateTimeFormat}
                        disabled={this.state.startDateNotSelected}
                    />
                </div>
            </div>
        )
    }

    renderTimePicker() {
        return (
            <div>
                <div style={{fontSize: '1.2em', marginTop: '15px'}} className="heading">Start Time</div>
                <div className="field-line">
                    <Field 
                        name="time" 
                        floatingLabelText="Start Time"
                        component={TimePicker} 
                        format={null}
                        disabled={this.state.startDateNotSelected}
                    />
                </div>
            </div>
        )
    }

    addToShowTimes(values) {
        if (values.theaterChoice) {
            if (this.state.updateIndex !== null) {
                let tempShowTimes = this.state.showingTimes;
                tempShowTimes[this.state.updateIndex] = values;
                this.setState({ showingTimes: tempShowTimes, theaterNotSelected: true, startDateNotSelected: true, updateIndex: null });
            } else {
                let tempShowTimes = this.state.showingTimes;
                tempShowTimes.push(values);
                this.setState({ showingTimes: tempShowTimes, theaterNotSelected: true, startDateNotSelected: true});
            }
        }
    }

    loadShowing(showing, index) {
        console.log(showing);
        console.log(this.props.formValues);
        this.props.dispatch(change('createShowing', 'theaterChoice', showing.theaterChoice));
        this.props.dispatch(change('createShowing', 'startDate', showing.startDate));
        this.props.dispatch(change('createShowing', 'time', showing.time));
        if (showing.endDate) {
            this.props.dispatch(change('createShowing', 'endDate', showing.endDate));
        }
        this.setState({ theaterNotSelected: false, startDateNotSelected: false, updateIndex: index });
    }
}
 
const afterSubmit = (result, dispatch) => {
    dispatch(reset('createShowing'));
}

function mapStateToProps(state) {
    if (_.has(state.form, 'createShowing') && _.has(state.form.createShowing, 'values')) {
        return { 
            movieDetails: state.movieDetails,
            formValues: state.form.createShowing.values
        };
    } else {
        return { 
            movieDetails: state.movieDetails,
        };
    }
}

CreateShowing = connect(mapStateToProps, actions)(CreateShowing);
export default reduxForm({
    form: 'createShowing',
    onSubmitSuccess: afterSubmit
})(CreateShowing);