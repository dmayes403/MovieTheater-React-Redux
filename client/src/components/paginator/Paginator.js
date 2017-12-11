import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './paginator.css';

class Paginator extends Component {
    render () {
        {console.log(this.props)}
        return (
            <div style={{textAlign: 'center'}}>1 2 3</div>
        )
    }
}

export default connect(null, actions)(Paginator);