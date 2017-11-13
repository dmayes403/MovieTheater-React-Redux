import React, { Component } from 'react';
import * as moment from 'moment';

import './dashboard.css';


class Dashboard extends Component {
    state = { focusedDate: 0 };

    render() {
        const dateBoxes = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            dateBoxes.push(
                            <div key={i} className="date-box" className={ this.state.focusedDate === i ? 'highlighted-date-box' : 'date-box' } onClick={() => this.getDate(date, i)}>
                                <div>{moment(date).format("ddd").toString()}</div>
                                <div style={{fontSize: '1.8em'}}>{moment(date).format("D").toString()}</div>
                                <div>{moment(date).format("MMMM").toString()}</div>
                            </div>
                        );
        }

        return (
            <div className="dashboard-container">
                <div style={{display: 'flex', overflow: 'auto'}}>
                    {dateBoxes}
                </div>
            </div>
        );
    }

    getDate(date, index) {
        this.setState({ focusedDate: index });
    }
} 

export default Dashboard;