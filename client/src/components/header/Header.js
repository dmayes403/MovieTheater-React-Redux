import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="container">
            <div style={{fontSize: '48px'}}>
                Towne Cinemas
            </div>
            <div style={{color: 'white'}}>
                <Link to={'/search-movies'} className="headerLinkStyle">Search Movies</Link>
            </div>
        </div>
    );
}

export default Header;