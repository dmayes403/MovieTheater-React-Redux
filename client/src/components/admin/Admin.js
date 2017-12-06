import React, { Component } from 'react';
import './admin.css';

import UserPrivileges from '../user-privileges/userPrivileges';
import TheaterListUpdate from '../theater-list-update/theaterListUpdate';

class Admin extends Component {
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

export default Admin;