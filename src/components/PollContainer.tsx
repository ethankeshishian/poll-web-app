import React from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';

function PollContainer() {
  return (
    <div className="main-poll">
      <h1 className="bold title">Today's Poll</h1>
      <h3 className="question">This is the question</h3>
      <button className="option-btn">Option 1</button>
      <button className="option-btn">Option 2</button>
    </div>
  );
}

export default PollContainer;
