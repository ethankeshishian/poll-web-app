import React from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';
import Poll from './Poll';

function PollContainer(props : any) {

  return (
    <div className="main-poll">
      <h1 className="bold title">Today's Poll</h1>
      {/* CHANGE RESPONSES PROPERTIES */}
      <Poll
        question={props.poll.poll_question || "Loading..."}
        option1={props.poll.poll_responses ? props.poll.poll_responses.lnx : "Loading..."}
        option2={props.poll.poll_responses ? props.poll.poll_responses.mac : "Loading..."}
      />
    </div>
  );
}

export default PollContainer;
