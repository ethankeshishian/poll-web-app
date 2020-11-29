import React from 'react';
import '../styles/AboutPage.css';
import '../styles/global.css';

function AboutPage() {
  return (
    <div className="about-page">
      <h2 className="heavy">About Us</h2>
      <p className="about-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <form>
        <label>
          <textarea className="about-text-box" />
        </label>
      </form>
    </div>
  );
}

export default AboutPage;
