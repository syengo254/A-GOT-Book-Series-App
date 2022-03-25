import React from 'react';
import './Header.css';
import logo from '../assets/img/logo.png';
import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header>
            <div id="logo">
                <img src={logo} alt="app-logo" />
            </div>
            <nav id="main-nav">
                <Link to="/">Home</Link>
                <Link to="/characters">Characters</Link>
                <Link to="/about">About</Link>
            </nav>
        </header>
     );
}
 
export default Header;