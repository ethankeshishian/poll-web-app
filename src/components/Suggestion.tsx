import React from 'react';
import '../styles/Suggestion.css';

//Typscript note: the following would have been "props" in JS.
//This is saying props is of type object, which contains "question" of type string
function Suggestion(props: { poll: {poll_question: string, poll_responses: string[]}, onClick?: React.MouseEventHandler}) {
  return (
    <button onClick={props.onClick} className="option-btn">
        {props.poll.poll_question}
        <br/>
        <div className="responses-box">
            <div className="response-text">{props.poll.poll_responses[0]}</div>
            |
            <div className="response-text">{props.poll.poll_responses[1]}</div>
        </div>
    </button>
  )
}
export default Suggestion;
