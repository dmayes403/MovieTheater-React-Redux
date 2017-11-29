import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="container">
            <Link to={'/'} className="headerLinkStyle"><div style={{fontSize: '48px'}}>Towne Cinemas</div></Link>
            <div style={{color: 'white', display: 'flex', flexDirection: 'row'}}>
                <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
                <Link to={'/all-movies'} className="headerLinkStyle" style={{marginLeft: '10px'}}>All Movies</Link>
                <div style={{marginLeft: '10px'}}>|</div>
                <Link to={'/'} className="headerLinkStyle" style={{marginLeft: '10px'}}>Login</Link>
            </div>
        </div>
    );
}

export default Header;