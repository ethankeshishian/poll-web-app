import React from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';
import Poll from './Poll';

function PollContainer(props : {poll: any; respond: (response: Number) => void}) {

  return (
    <div className="main-poll">
      <h1 className="bold title">Today's Poll</h1>
      {/* CHANGE RESPONSES PROPERTIES */}
      <Poll
        question={props.poll.poll_question || "Loading..."}
        options={props.poll.poll_responses || null}
        respond={props.respond}
      />
    </div>
  );
}

export default PollContainer;
