import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="container">
            <Link to={'/'} className="headerLinkStyle"><div style={{fontSize: '48px'}}>Towne Cinemas</div></Link>
            <div style={{color: 'white'}}>
                <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
            </div>
        </div>
    );
}

export default Header;