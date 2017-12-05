import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import * as actions from '../../actions';

import './userPrivileges.css';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class UserPrivileges extends Component {
    componentDidMount() {
        this.props.getAllUsers();
    }

    render() {
        return (
            <Card className="privilege-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th colSpan="2" style={{textAlign: 'center'}}>Creator</th>
                            <th colSpan="2" style={{paddingLeft: '50px', textAlign: 'center'}}>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.allUsers.map(user => 
                            <tr key={user.googleId}>
                                <td>{user.name}</td>
                                <td>{user.email[0]}</td>
                                <td style={{textAlign: 'center'}} className={user.creator ? "highlighted" : ""}>{'True'}</td>
                                <td style={{textAlign: 'center'}}><div className={user.creator ? "" : "highlighted"}>{'False'}</div></td>
                                <td style={{textAlign: 'center', paddingLeft: '50px'}} className={user.admin ? "highlighted" : ""}>{'True'}</td>
                                <td style={{textAlign: 'center'}}><div className={user.admin ? "" : "highlighted"}>{'False'}</div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* <div>
                    {this.renderUsers()}
                </div> */}
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
}

function mapStateToProps({ allUsers }) {
    console.log(allUsers);
    return { allUsers };
}

export default connect(mapStateToProps, actions)(UserPrivileges);