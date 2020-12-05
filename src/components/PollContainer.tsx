import React, { useState } from "react";
import "../styles/global.css";
import "../styles/PollContainer.css";
import Poll from "./Poll";

function PollContainer(props: any) {
  if (props.response)
    return (
      <div>
        You're already voted in this poll.
        <br />
        You voted: {props.response.response}
      </div>
    );

  if (props.poll.timestamp_closed)
    return (
      <div>
        This poll has already ended!
        <br />
        Results: {props.poll.results.responses_total} // Vote counts: [4, 5]
      </div>
    );

  return (
    <div className="main-poll">
      {props.mainpoll ? (
        <h1 className="bold title">Today's Poll</h1>
      ) : (
        <h2 className="heavy old-title">{props.date}</h2>
      )}
      {/* CHANGE RESPONSES PROPERTIES */}
      <Poll
        question={props.poll.poll_question || "Loading..."}
        options={props.poll.poll_responses || null}
        mainpoll={props.mainpoll}
        respond={(responseId) => {
          props.respond(props.poll.id, responseId);
        }}
      />
      <div className="poll-footer">
        <h3 className="footer-title" onClick={() => {}}>VIEW DETAILED RESULTS</h3>
        <h3 className="footer-title" onClick={() => props.showSuggestions()}>VOTE FOR TOMORROW'S POLL</h3>
      </div>
    </div>
  );
}

export default PollContainer;
