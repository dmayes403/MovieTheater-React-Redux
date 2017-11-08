import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import './create-showing.css';

class CreateShowing extends Component {
    componentDidMount() {
        this.props.getMovieDetails(this.props.match.params.id);
    }

    render() {
        return (
            <div className="create-showing-container">New Showing</div>
        )
    }
}

function mapStateToProps({ movieDetails }) {
    return { movieDetails };
}

export default connect(mapStateToProps, actions)(CreateShowing);