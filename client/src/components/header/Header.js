import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import './header.css';

class Header extends Component {
    
    render() {
        return (
            <div className="container">
                <Link 
                    to={'/'}
                    className="logoLink"
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
                        <div>
                            <div className="large-header">
                                <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
                                <Link to={'/all-showings'} className="headerLinkStyle" style={{marginLeft: '10px'}}>All Showings</Link>
                                <div style={{marginLeft: '10px'}}>||</div>
                                <Link to={'/admin'} className="headerLinkStyle" style={{marginLeft: '10px'}}>Admin</Link>
                                <div style={{marginLeft: '10px'}}>||</div>
                                <a href="/api/logout" className="headerLinkStyle" style={{marginLeft: '10px'}}>Logout</a>
                            </div>
                            <div className="small-header">
                            <IconMenu
                                iconButtonElement={<IconButton><i className="material-icons">menu</i></IconButton>}
                                onChange={this.handleMenuChange}
                                >
                                <MenuItem value="1" primaryText="Search Movies" />
                                <MenuItem value="2" primaryText="All Showings" />
                                <MenuItem value="3" primaryText="Admin" />
                                <a href="/api/logout"><MenuItem value="4" primaryText="Logout" /></a>
                            </IconMenu>
                                {/* <i className="material-icons">menu</i> */}
                            </div>
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

    handleMenuChange = (event, value) => {
        switch (value) {
            case '1':
                this.props.history.push('/search-movies');
                break;
            case '2':
                this.props.history.push('/all-showings');
                break;
            case '3':
                this.props.history.push('/admin');
                break;
            case '4':
                this.props.history.push('/api/logout');
                break;
            default:
                this.props.history.push('/');
                break;
        }
    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(withRouter(Header));