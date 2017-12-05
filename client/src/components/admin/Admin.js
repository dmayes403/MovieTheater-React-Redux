import React, { Component } from 'react';
import './admin.css';

import UserPrivileges from '../user-privileges/userPrivileges';

class Admin extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="inner-main-container" style={{paddingTop: '50px'}}>
                    <div>
                        <UserPrivileges />
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;