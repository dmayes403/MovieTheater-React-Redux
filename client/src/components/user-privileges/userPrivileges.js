import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import * as actions from '../../actions';
import _ from 'lodash';

import './userPrivileges.css';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class UserPrivileges extends Component {
    state = {
        updatedUsers: [],
    }

    componentDidMount() {
        this.props.getAllUsers().then(users => {
            this.setState({ updatedUsers: _.cloneDeep(this.props.allUsers) });
        })
    }

    render() {
        return (
            <Card className="privilege-container flex-column flex-grow">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th colSpan="2" style={{textAlign: 'center'}}>Creator</th>
                            <th colSpan="2" style={{marginLeft: '50px', textAlign: 'center'}}>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.updatedUsers.map((user, index) => 
                            <tr key={user.googleId}>
                                <td>{user.name}</td>
                                <td>{user.email[0]}</td>
                                <td onClick={() => {this.creatorToTrue(index)}} style={{textAlign: 'center', cursor: 'pointer'}}><div className={user.creator ? "true-highlighted" : ""}>{'True'}</div></td>
                                <td onClick={() => {this.creatorToFalse(index)}} style={{textAlign: 'center', cursor: 'pointer'}}><div className={user.creator ? "" : "false-highlighted"}>{'False'}</div></td>
                                <td onClick={() => {this.adminToTrue(index)}} style={{textAlign: 'center', borderSpacing: '50px', cursor: 'pointer'}}><div className={user.admin ? "true-highlighted" : ""}>{'True'}</div></td>
                                <td onClick={() => {this.adminToFalse(index)}} style={{textAlign: 'center', cursor: 'pointer'}}><div className={user.admin ? "" : "false-highlighted"}>{'False'}</div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <span className="flex-grow"></span>
                <div className="flex-row flex-end">
                    <div className="z-depth-3 button background-blue" onClick={() => this.cancelUserPrivileges()}>Cancel</div>
                    <div className="z-depth-3 button background-green" style={{marginLeft: '10px'}} onClick={() => {this.props.updateUsers(this.state.updatedUsers); this.props.snackBarOpen()}}>Save</div>
                </div>
            </Card>
        )
    }

    renderUsers() {
        return this.props.allUsers.map(user => {
            return (
                <div key={user.name}>
                    {user.name}
                </div>
            )
        })
    }

    creatorToTrue(index) {
        if (this.props.auth.creator) {
            let allTempUsers = this.state.updatedUsers;
            let tempUser = this.state.updatedUsers[index];
            tempUser.creator = true;
            tempUser.admin = true;
            allTempUsers[index] = tempUser;
            this.setState({ updatedUsers: allTempUsers });
        }
    }

    creatorToFalse(index) {
        if (this.props.auth.creator) {
            let allTempUsers = this.state.updatedUsers;
            let tempUser = this.state.updatedUsers[index];
            tempUser.creator = false;
            allTempUsers[index] = tempUser;
            this.setState({ updatedUsers: allTempUsers });
        }
    }

    adminToTrue(index) {
        if (this.props.auth.creator) {
            let allTempUsers = this.state.updatedUsers;
            let tempUser = this.state.updatedUsers[index];
            tempUser.admin = true;
            allTempUsers[index] = tempUser;
            this.setState({ updatedUsers: allTempUsers });
        }
    }

    adminToFalse(index) {
        if (this.props.auth.creator) {
            let allTempUsers = this.state.updatedUsers;
            let tempUser = this.state.updatedUsers[index];
            tempUser.admin = false;
            allTempUsers[index] = tempUser;
            this.setState({ updatedUsers: allTempUsers });
        }
    }

    cancelUserPrivileges() {
        this.setState({ updatedUsers: this.props.allUsers });
    }
}

function mapStateToProps({ allUsers, auth }) {
    return { allUsers, auth };
}

export default connect(mapStateToProps, actions)(UserPrivileges);