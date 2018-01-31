import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';
import Snackbar from 'material-ui/Snackbar';

import UserPrivileges from '../user-privileges/userPrivileges';
import TheaterListUpdate from '../theater-list-update/theaterListUpdate';

class Admin extends Component {
    state = {
        snackBarOpen: false
    }

    componentDidMount() {
        this.props.fetchUser().then(() => {
            this.checkAuth();
        });
    }

    checkAuth() {
        if (!this.props.auth.admin && !this.props.auth.creator) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                {/* <div className="main-container large-admin">
                    <div className="inner-main-container" style={{paddingTop: '50px'}}>
                        <div className="flex-row">
                            <UserPrivileges snackBarOpen={this.openToaster}/>
                            <TheaterListUpdate />
                            <Snackbar
                                open={this.state.snackBarOpen}
                                message="Saved user privileges"
                                autoHideDuration={3000}
                                onRequestClose={this.closeToaster}
                                contentStyle={{textAlign: 'center'}}
                                />
                        </div>
                    </div>
                </div> */}

                <div className="main-container small-admin">
                    <div className="inner-main-container" style={{paddingTop: '50px'}}>
                        <div className="flex-column">
                            <TheaterListUpdate />
                            <UserPrivileges snackBarOpen={this.openToaster}/>
                            <Snackbar
                                open={this.state.snackBarOpen}
                                message="Saved user privileges"
                                autoHideDuration={3000}
                                onRequestClose={this.closeToaster}
                                contentStyle={{textAlign: 'center'}}
                                />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    openToaster = () => {
        this.setState({ snackBarOpen: true });
    }

    closeToaster = () => {
        this.setState({ snackBarOpen: false });
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(withRouter(Admin));