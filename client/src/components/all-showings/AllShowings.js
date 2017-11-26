import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions';

import './AllShowings.css';

class AllShowings extends Component {
    componentDidMount() {
        this.props.getShowings();
    }

}

function mapStateToProps({ movieShowings }) {
    return { movieShowings };
}

export default connect(mapStateToProps, actions)(AllShowings);
