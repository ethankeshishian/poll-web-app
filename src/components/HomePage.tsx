import React from 'react';
import CommentSection from './CommentSection';
import PollContainer from './PollContainer';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <PollContainer />
      <CommentSection />
    </div>
  );
}

export default HomePage;
