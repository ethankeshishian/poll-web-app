import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
        <Link className="header-link heavy left" to="/">POLLIFY</Link>
        <Link className="header-link heavy right" to="/">HOME</Link>
        
        <Link className="header-link heavy right" to="/profile">ACCOUNT</Link>
        <Link className="header-link heavy right" to="/about">ABOUT</Link>
    </div>
  );
}


export default Header;
