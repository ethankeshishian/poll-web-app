import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import '../styles/PollButton.css';

function PollButton(props: {
  question: string;
  onClick?: React.MouseEventHandler;
  vote: number;
  voteTotal: number;
  hasVoted: boolean;
}) {
  // Calculates percentage of votes given to this option
  const votePercentage: number = props.voteTotal
    ? Math.floor((props.vote / props.voteTotal) * 100)
    : 0;

  // Calculates 100 - the percentage
  const cssVotePercentage: string = (100 - votePercentage).toString() + '%';

  /* Creating an animated button class with keyframes.
     Using styled-components to add variables and keyframes to CSS;
     Impossible otherwise. */
  const CSSKeyframes = keyframes`
      0% {
        background-position: right bottom;
      }
      100% {
        background-position: ${cssVotePercentage} bottom;
      }`;
  const animation = () =>
    css`
      ${CSSKeyframes} 1s ease-out 1 forwards;
    `;
  const StyledButton = styled.button`
      animation:${animation}
      background: linear-gradient(to right, #f26475 50%, #ffc6cd 50%);
      background-size: 200% 100%;
      background-position: right bottom;
      /* transition: all 0.5s ease-out; */
      color: white;
      border-radius: 20px;
      padding: 20px 40px;
      width: 100%;
      display: flex;
      flex-direction: column;
      border: none;
      margin-bottom: 15px;
      font-size: 30px;
      filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.25));
      outline: none;
      cursor: pointer;
    `;
  return (
    <>
      {/* <button
        onClick={props.onClick}
        className={
          props.question === 'Loading...'
            ? 'option-btn'
            : 'option-btn add-animation'
        }
        style={styles}
      > */}
      <StyledButton onClick={props.onClick}>
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
            <td>{votePercentage.toString() + '%'}</td>
          </tr>
        </table>
      </StyledButton>
    </>
  );
}

export default PollButton;
