import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
    
    render() {
        return (
            <div className="container">
                <Link 
                    to={'/'}
                    style={{fontSize: '48px'}}
                    className="headerLinkStyle"
                    >
                    Ticket Cinemas
                </Link>
                {this.renderContent()}
            </div>
        );
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <a href="/auth/google" className="headerLinkStyle">Login With Google</a>
                );
            default:
                if (this.props.auth.admin || this.props.auth.creator) {
                    return (
                        <div style={{color: 'white', display: 'flex', flexDirection: 'row'}}>
                            <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
                            <Link to={'/all-showings'} className="headerLinkStyle" style={{marginLeft: '10px'}}>All Showings</Link>
                            <div style={{marginLeft: '10px'}}>||</div>
                            <Link to={'/admin'} className="headerLinkStyle" style={{marginLeft: '10px'}}>Admin</Link>
                            <div style={{marginLeft: '10px'}}>||</div>
                            <a href="/api/logout" className="headerLinkStyle" style={{marginLeft: '10px'}}>Logout</a>
                        </div>
                    );
                } else {
                    return (
                        <div style={{color: 'white', display: 'flex', flexDirection: 'row'}}>
                            <a href="/api/logout" className="headerLinkStyle" style={{marginLeft: '10px'}}>Logout</a>
                        </div>
                    );
                }
        }
    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);