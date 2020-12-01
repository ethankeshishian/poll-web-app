import React from 'react';
import '../styles/global.css';
import '../styles/PollContainer.css';
import Poll from './Poll';

function PollContainer(props: any) {
  return (
    <div className="main-poll">
      {props.mainpoll ? (
        <h1 className="bold title">Today's Poll</h1>
      ) : (
        <h2 className="heavy old-title">{props.date}</h2>
      )}
      {/* CHANGE RESPONSES PROPERTIES */}
      <Poll
        question={props.poll.poll_question || 'Loading...'}
        options={props.poll.poll_responses || null}
        mainpoll={props.mainpoll}
      />
    </div>
  );
}

export default PollContainer;
