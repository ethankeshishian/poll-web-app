import React from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';
import Poll from './Poll';

function PollContainer() {
  return (
    <div className="main-poll">
      <h1 className="bold title">Today's Poll</h1>
      {/* redux will be implemented here */}
      <Poll
        question="Are you a cat or a dog person?"
        option1="Cat"
        option2="Dog"
      />
    </div>
  );
}

export default PollContainer;
