import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import './createShowing.css';
import theaterList from '../../variables/theaters';
import { DatePicker } from 'redux-form-material-ui';

import MenuItem from 'material-ui/MenuItem'

import SelectFieldContainer from '../../material-ui/SelectFieldContainer';

class CreateShowing extends Component {
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
                        style={{width: '35%', minWidth: '300px', height: '50%'}}
                        alt="poster"/>
                    <div className="description-container">
                        <h2 style={{margin: 'auto', textAlign: 'center', backgroundColor: '#3454b4', color: 'white', borderRadius: '5px', padding: '5px'}} className="z-depth-3">{movieDetails[2].title}</h2>
                        
                        <div>
                            <form onSubmit={handleSubmit(values => console.log(values))}>
                                {this.renderField()}
                                <div style={{fontSize: '1.2em'}} className="heading">Choose a date range</div>
                                {this.renderDatePicker()}
                                <button type="submit" style={{marginTop: '50px'}}>Submit</button>
                            </form>
                        </div>

                        <Link to={`/movie-details/${this.props.match.params.id}`}><h6 className="z-depth-3 cancel-button" onClick={() => this.setState({createShowing: false})}>Cancel</h6></Link>
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
    
    renderField() {
        return (
            <div className="field-line state-date-input" id="state-date-input" style={{marginTop: '15px'}}>
                <Field
                    type="text"
                    floatingLabelText="Theater"
                    component={SelectFieldContainer}
                    name="theaterChoice"
                    label="Select a theater">
                    {theaterList.map((theater) =>
                        <MenuItem key={theater.id} value={theater} primaryText={theater.name} style={{fontFamily: '"Prompt", sans-serif'}}/>
                    )}
                </Field>
            </div>
        )
    }

    renderDatePicker() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <div className="field-line">
                    <Field 
                        name="startDate" 
                        floatingLabelText="Start Date"
                        component={DatePicker} 
                        format={null}
                        autoOk={true}
                        DateTimeFormat={Intl.DateTimeFormat}
                        style={{marginTop: 'none'}}
                    />
                </div>
                <div className="field-line">
                    <Field 
                        name="endDate" 
                        floatingLabelText="End Date"
                        component={DatePicker} 
                        format={null}
                        autoOk={true}
                        DateTimeFormat={Intl.DateTimeFormat}
                    />
                </div>
            </div>
        )
    }
}
    

function mapStateToProps({ movieDetails }) {
    return { movieDetails };
}

CreateShowing = connect(mapStateToProps, actions)(CreateShowing);
export default reduxForm({
    form: 'createShowing'
})(CreateShowing);