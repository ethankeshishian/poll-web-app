import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <a className="header-link heavy left" href="/">
        WEB POLL APP
      </a>
      <a className="header-link heavy right" href="#">
        HOME
      </a>
      <a className="header-link heavy right" href="#">
        ACCOUNT
      </a>
      <a className="header-link heavy right" href="#">
        ABOUT
      </a>
    </div>
  );
}

export default Header;
