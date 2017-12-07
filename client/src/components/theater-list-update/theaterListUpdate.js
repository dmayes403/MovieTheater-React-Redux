import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import * as actions from '../../actions';

import './theaterListUpdate.css';

class TheaterListUpdate extends Component {
    state = {
        theaterList: []
    }
    componentDidMount() {
        this.props.getTheaterList();
    }

    render() {
        return (
            <Card className="theater-list-container">
                <form onSubmit={this.props.handleSubmit((theater) => this.addTheater(theater))}>
                    <Field
                        type="text"
                        name="theaterName"
                        component="input"
                        placeholder="Add Theater"
                    />
                </form>
                {this.renderTheaterTable()}
            </Card>
        )
    }

    renderTheaterTable() {
        return (
            <table>
                <tbody>
                    {this.props.theaterList.map(theater => {
                        return (
                            <tr key={theater._id}>
                                <td value={theater} onClick={() => this.deleteTheater(theater)} className="theater-td" style={{maxWidth: '15px'}}><i className="material-icons" style={{cursor: 'pointer', maxWidth: '25px'}}>delete</i></td>
                                <td className="theater-td">{theater.room}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    addTheater(theater) {
        this.props.saveTheater(theater);
    }

    deleteTheater(theater) {
        this.props.deleteTheater(theater);
    }
}

function mapStateToProps(state) {
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