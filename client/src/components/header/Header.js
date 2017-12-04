import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
    renderContent() {
        console.log(this.props.auth);
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <a href="/auth/google" className="headerLinkStyle">Login With Google</a>
                );
            default:
                return (
                    <div style={{color: 'white', display: 'flex', flexDirection: 'row'}}>
                        <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
                        <Link to={'/all-showings'} className="headerLinkStyle" style={{marginLeft: '10px'}}>All Showings</Link>
                        <div style={{marginLeft: '10px'}}>|</div>
                        <Link to={'/admin'} className="headerLinkStyle" style={{marginLeft: '10px'}}>Admin</Link>
                        <div style={{marginLeft: '10px'}}>|</div>
                        <a href="/api/logout" className="headerLinkStyle" style={{marginLeft: '10px'}}>Logout</a>
                    </div>
                );
        }
    }

    render() {
        return (
            <div className="container">
                <Link 
                    to={'/'}
                    style={{fontSize: '48px'}}
                    className="headerLinkStyle"
                >
                    Towne Cinemas
                </Link>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
// const Header = () => {
//     return (
//         <div className="container">
//             <Link to={'/'} className="headerLinkStyle"><div style={{fontSize: '48px'}}>Towne Cinemas</div></Link>
//             <div style={{color: 'white', display: 'flex', flexDirection: 'row'}}>
//                 <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
//                 <Link to={'/all-showings'} className="headerLinkStyle" style={{marginLeft: '10px'}}>All Movies</Link>
//                 <div style={{marginLeft: '10px'}}>|</div>
//                 {/* <Link to={'/'} className="headerLinkStyle" style={{marginLeft: '10px'}}>Login</Link> */}
//                 <a href="/auth/google" className="headerLinkStyle" style={{marginLeft: '10px'}}>Login With Google</a>
//             </div>
//         </div>
//     );
// }

// export default Header;