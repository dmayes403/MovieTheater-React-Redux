import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './admin.css';

import UserPrivileges from '../user-privileges/userPrivileges';
import TheaterListUpdate from '../theater-list-update/theaterListUpdate';

class Admin extends Component {
    componentDidMount() {
        this.checkAuth();
    }

    checkAuth() {
        console.log(this.props.auth);
        if (!this.props.auth) {
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

// export default Admin;

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(withRouter(Admin));