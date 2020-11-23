import React from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';
import PollButton from './PollButton';

function PollContainer() {
  return (
    <div className="main-poll">
      <h1 className="bold title">Today's Poll</h1>
      <h3 className="question">This is the question</h3>
      <PollButton question="Option 1" />
      <PollButton question="Option 2" />
    </div>
  );
}

export default PollContainer;
