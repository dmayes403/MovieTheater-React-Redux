import React, { Component } from 'react';
import { reduxForm, Field, reset, change } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import * as actions from '../../actions';

import './theaterListUpdate.css';

class TheaterListUpdate extends Component {
    state = {
        theaterList: []
    }
    componentDidMount() {
        this.props.getTheaterList().then(() => {
            this.setState({ theaterList: this.props.theaterList });
        });
    }

    render() {
        return (
            <Card className="theater-list-container">
                <form onSubmit={this.props.handleSubmit((values) => console.log(values))}>
                    <Field
                        type="text"
                        name="theaterName"
                        component="input"
                        placeholder="Add Theater"
                    />
                </form>
                {console.log(this.props.theaterList)}
                {this.props.theaterList.map(theater => {
                    return (
                        <div key={theater._id}>{theater.room}</div>
                    )
                })}
            </Card>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.form.theaterListUpdate);
    return { 
        theaterList: state.theaterList,
        formValues: state.form.theaterListUpdate
    };
}

const afterSubmit = (result, dispatch) => {
    dispatch(reset('theaterListUpdate'));
}

TheaterListUpdate = connect(mapStateToProps, actions)(TheaterListUpdate);
export default reduxForm({
    form: 'theaterListUpdate',
    onSubmitSuccess: afterSubmit
})(TheaterListUpdate);