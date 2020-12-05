import React from 'react';
import '../styles/PollButton.css';

//Typscript note: the following would have been "props" in JS.
//This is saying props is of type object, which contains "question" of type string
function PollButton(props: {
  question: string;
  onClick?: React.MouseEventHandler;
  vote: number;
  voteTotal: number;
  hasVoted: boolean;
}) {
  return (
    <button onClick={props.onClick} className="option-btn">
      <table className="pollbutton-text">
        <tr className="pollbutton-table">
          <td className="pollbutton-icon">
            {props.hasVoted ? (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-check-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fill-rule="evenodd"
                  d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                />
              </svg>
            ) : (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-circle poll-icon"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
              </svg>
            )}
          </td>
          <td className="pollbutton-table-question">{props.question}</td>
          <td>
            {(props.voteTotal
              ? Math.floor((props.vote / props.voteTotal) * 100).toString()
              : 0) + '%'}
          </td>
        </tr>
      </table>
    </button>
  );
}

export default PollButton;
