import React from 'react';
import '../styles/AboutPage.css';
import '../styles/global.css';

function AboutPage() {
  return (
    <div className="about-page">
      <h2 className="about-heading">About Us</h2>
      <p className="about-text">
        We're Pollify &mdash; a social polling application that allows users to
        vote on a new poll every day. Each poll varies in topic, and provides an
        opportunity for users to communicate with the rest of the community. But
        Pollify isn’t just about voting &mdash; we provide demographics to see
        how different people vote based on who they are. Pollify was built by
        five UCLA students who wanted to provide a fun and engaging platform for
        people from all walks of life to share their opinions.
      </p>
      <img className="icon-large" src="logo512.png"></img>
    </div>
  );
}

export default AboutPage;
