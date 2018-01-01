import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';

import UserPrivileges from '../user-privileges/userPrivileges';
import TheaterListUpdate from '../theater-list-update/theaterListUpdate';

class Admin extends Component {
    componentDidMount() {
        this.props.fetchUser().then(() => {
            this.checkAuth();
        });
    }

    checkAuth() {
        if (!this.props.auth.admin) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="main-container">
                <div className="inner-main-container" style={{paddingTop: '50px'}}>
                    <div className="flex-row">
                        <UserPrivileges />
                        <TheaterListUpdate />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(withRouter(Admin));