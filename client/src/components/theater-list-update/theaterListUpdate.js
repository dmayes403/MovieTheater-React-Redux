import React, { Component } from 'react';
import { reduxForm, Field, reset, change } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './theaterListUpdate.css';

class TheaterListUpdate extends Component {

}

TheaterListUpdate = connect(mapStateToProps, actions)(TheaterListUpdate);
export default reduxForm({
    form: 'theaterListUpdate',
    onSubmitSuccess: afterSubmit
})(TheaterListUpdate);