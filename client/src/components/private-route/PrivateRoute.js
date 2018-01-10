import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

class PrivateRoute extends Component {

    render() {
        return (
            <div>Private Route</div>
        )
    }

}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(PrivateRoute);

