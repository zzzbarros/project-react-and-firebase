import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header() {
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    Blog<span>React</span>
                </Link>
                <Link to="/Login" className="user-button">
                    Usuario
                </Link>
            </div>
        </header>
    );
}

export default Header;