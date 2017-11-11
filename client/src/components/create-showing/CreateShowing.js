import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import * as actions from '../../actions';
import './createShowing.css';
import theatersYo from '../../variables/theaters';

class CreateShowing extends Component {
    constructor(props) {
        super(props);
    
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);
    
        this.state = {
          minDate: minDate,
          maxDate: maxDate,
        };
      }

      handleChangeMinDate = (event, date) => {
        console.log(event)
        console.log(date)
        this.setState({
          minDate: date,
        });
      };
    
      handleChangeMaxDate = (event, date) => {
          console.log(event)
          console.log(date)
        this.setState({
          maxDate: date,
        });
      };
    
      handleToggle = (event, toggled) => {
        this.setState({
          [event.target.name]: toggled,
        });
      };

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
                        
                        <Field name="datePicker" value="datePicker" component={renderDatePicker} />

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
    
    optionsStyle = {
        maxWidth: 255,
        marginRight: 'auto',
      };

}
    
const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
        <div style={this.optionsStyle}>
            <DatePicker
                {...input}
                dateForm="MM/DD/YYYY"
            />
            <DatePicker
                {...input}
                dateForm="MM/DD/YYYY"
            />
        </div>
    )
    


function mapStateToProps({ movieDetails }) {
    return { movieDetails };
}

CreateShowing = connect(mapStateToProps, actions)(CreateShowing);
export default reduxForm({
    form: 'createShowing'
})(CreateShowing);