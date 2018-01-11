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

    // render() {
    //     console.log(this.props);
    //     return (
    //         <div>Private Route</div>
    //     )
    // }

    render() {
        return (
            <Route render = {() => (
                <Component {...this.props} />
            )} />
        )
    }

}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(PrivateRoute);

