import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <p className="left heavy">WEB POLL APP</p>
      <a className="header-link heavy" href="#">HOME</a>
      <a className="header-link heavy" href="#">ACCOUNT</a>
      <a className="header-link heavy" href="#">ABOUT</a>
    </div>
  );
}

export default Header;
