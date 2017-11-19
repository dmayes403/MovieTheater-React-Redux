import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset, change } from 'redux-form';
import { Link } from 'react-router-dom';
import './createShowing.css';
import { DatePicker, TimePicker, Checkbox, SelectField } from 'redux-form-material-ui';
import _ from 'lodash';
import * as actions from '../../actions';
import * as moment from 'moment';
import MenuItem from 'material-ui/MenuItem'

import SelectFieldContainer from '../../material-ui/SelectFieldContainer';

import timeOptions from '../../variables/times';



class CreateShowing extends Component {
    state = { 
        showingTimes: [],
        times: [],
        theaterNotSelected: true,
        startDateNotSelected: true,
        updateIndex: null
    }

    componentDidMount() {
        this.props.getMovieDetails(this.props.match.params.id);
        this.props.getTheaterList();
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
                                    {/* {this.renderTimePicker()} */}
                                    {this.renderTimeOptions()}
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <button className="z-depth-3 add-button" onClick={() => this.clearForm()}>Clear</button>
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
                                            <tr key={index} style={{color: '#3454b4'}} className="selectable" onClick={() => this.loadShowing(showTime, index)}>
                                                <td onClick={(event) => this.delete(event, index)}><i className="material-icons" style={{cursor: 'pointer', maxWidth: '50px'}}>delete</i></td>
                                                <td>{showTime.theaterChoice.room}</td>
                                                <td>{showTime.startDate.toString().split(' ').slice(0, 4).join(' ')}</td>
                                                <td>{showTime.endDate ? showTime.endDate.toString().split(' ').slice(0, 4).join(' ') : showTime.startDate.toString().split(' ').slice(0, 4).join(' ')}</td>
                                                {/* <td style={{textAlign: 'center'}}>{this.convert(showTime.time.toString().split(' ').slice(4, 5).join(' '))}</td> */}
                                                <td style={{textAlign: 'center'}}>{showTime.timeOptions[0]}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="bottom-links">
                                    <Link to={`/movie-details/${this.props.match.params.id}`}><h6 className="z-depth-3 cancel-button" onClick={() => this.setState({createShowing: false})}>Cancel</h6></Link>
                                    <button className="z-depth-3 save-button" type="submit" onClick={() => this.props.saveShowing({ movieId: this.props.match.params.id, showDetails: this.state.showingTimes })}>Save</button>
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

    delete(event, index) {
        event.stopPropagation();
        let tempState = this.state.showingTimes;
        tempState.splice(index, 1);
        this.setState({ showingTimes: tempState});
        this.props.reset();
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
                <div className="field-line-theater">
                    <Field
                        type="text"
                        floatingLabelText="Theater"
                        component={SelectFieldContainer}
                        name="theaterChoice"
                        label="Theater"
                        onChange={() => this.setState({ theaterNotSelected: false })}>
                        {this.props.theaterList.map((theater) =>
                            <MenuItem key={theater._id} value={theater} primaryText={theater.room} style={{fontFamily: '"Prompt", sans-serif'}}/>
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
                <button className="z-depth-3 add-time-button" type="submit">Add Time</button>
            </div>
        )
    }

    renderTimeOptions() {
        return (
            <div>
                <div style={{fontSize: '1.2em', marginTop: '15px'}} className="heading">Times</div>
                <div className="field-line">
                    <Field
                        type="text"
                        multiple={true}
                        floatingLabelText="Time(s)"
                        component={SelectField}
                        name="timeOptions"
                        onChange={() => console.log(this.props.formValues)}
                        labelStyle={{top: '-60px'}}
                        selectedMenuItemStyle={{color: '#44ACA1'}}
                        iconStyle={{color: 'blue'}}
                        label="Time(s)">
                        {timeOptions.map((time) =>
                            <MenuItem 
                                key={time.id} 
                                value={time.hour} 
                                primaryText={time.hour} 
                                insetChildren={true}
                                style={{color: 'blue'}}
                                checked={this.props.formValues && this.props.formValues.timeOptions.indexOf(time.hour) > -1}
                                style={{fontFamily: '"Prompt", sans-serif'}}/>
                        )}
                    </Field>
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

        // if (values.theaterChoice) {
        //     if (this.state.updateIndex !== null) {
        //         let tempShowTimes = this.state.showingTimes;
        //         tempShowTimes[this.state.updateIndex] = values;
        //         this.setState({ showingTimes: tempShowTimes, theaterNotSelected: true, startDateNotSelected: true, updateIndex: null });
        //     } else {
        //         let tempShowTimes = this.state.showingTimes;
        //         tempShowTimes.push(values);
        //         this.setState({ showingTimes: tempShowTimes, theaterNotSelected: true, startDateNotSelected: true});
        //     }
        // }
    }

    loadShowing(showing, index) {
        this.props.dispatch(change('createShowing', 'theaterChoice', showing.theaterChoice));
        this.props.dispatch(change('createShowing', 'startDate', showing.startDate));
        // this.props.dispatch(change('createShowing', 'time', showing.time));
        this.props.dispatch(change('createShowing', 'timeOptions', showing.timeOptions));
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
            theaterList: state.theaterList,
            formValues: state.form.createShowing.values,
        };
    } else {
        return { 
            movieDetails: state.movieDetails,
            theaterList: state.theaterList,
        };
    }
}

CreateShowing = connect(mapStateToProps, actions)(CreateShowing);
export default reduxForm({
    form: 'createShowing',
    onSubmitSuccess: afterSubmit
})(CreateShowing);