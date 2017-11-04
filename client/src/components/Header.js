import React from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="container">
            <div style={{fontSize: '48px'}}>
                Towne Cinemas
            </div>
            <div style={{color: 'white'}}>
                <Link to={'/new-showing-search'} className="headerLinkStyle" >New Showing</Link>
            </div>
        </div>
    );
}

export default Header;