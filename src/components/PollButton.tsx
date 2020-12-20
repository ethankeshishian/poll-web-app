import React, { useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import '../styles/PollButton.css';
//TODO: Try using previous state for poll?
function PollButton(props: {
  question: string;
  onClick?: React.MouseEventHandler;
  vote: number;
  voteTotal: number;
  hasVoted: boolean;
  votedThis: boolean;
  animateFrom0: boolean;
  animateNext: boolean;
  setAnimateFrom0: (val: boolean) => void;
  setAnimateNext: (val: boolean) => void;
  isOld: boolean;
  voteClicks: number;
  setVoteClicks: () => void;
}) {
  const prevVotePercentRef = useRef(0);
  useEffect(() => {
    prevVotePercentRef.current = votePercentage;
  });
  useEffect(() => {
    //will run once
    if (props.hasVoted) props.setVoteClicks();
  }, []);
  const prevVotePercentage = prevVotePercentRef.current;

  // Calculates percentage of votes given to this option
  const votePercentage: number = props.voteTotal
    ? Math.floor((props.vote / props.voteTotal) * 100)
    : 0;
  // Calculates 100 - the percentage
  const cssVotePercentage: string = (100 - votePercentage).toString() + '%';
  const cssPrevVotePercentage: string =
    (100 - prevVotePercentage).toString() + '%';

  const handleClick = (e: any) => {
    if (props.isOld) return;
    if (props.onClick) props.onClick(e);
    if (!props.animateFrom0) props.setAnimateNext(true);
    if (props.hasVoted) props.setAnimateFrom0(false);
    props.setVoteClicks();
  };
  /* Creating an animated button class with keyframes.
     Using styled-components to add variables and keyframes to CSS;
     Impossible otherwise. */
  let CSSKeyframes: any;
  if (props.isOld) {
    CSSKeyframes = keyframes`
        0% {
          background-position: 100 bottom;
        }
        100% {
          background-position: ${cssVotePercentage} bottom;
        }`;
  } else {
    if (props.voteClicks >= 2) {
      CSSKeyframes = keyframes`
      0% {
        background-position: ${cssPrevVotePercentage} bottom;
      }
      100% {
        background-position: ${cssVotePercentage} bottom;
      }`;
    } else {
      CSSKeyframes = keyframes`
        0% {
          background-position: 100 bottom;
        }
        100% {
          background-position: ${cssVotePercentage} bottom;
        }`;
    }
  }

  const animation = () =>
    props.isOld
      ? css`
          ${CSSKeyframes} 1s ease-out 1 forwards;
        `
      : props.hasVoted
      ? css`
          ${CSSKeyframes} 1s ease-out 1 forwards;
        `
      : css`
          ${CSSKeyframes} 1s ease-out 1 forwards paused;
        `;
  const StyledButton = styled.button`

      animation:${animation}
      background: linear-gradient(to right, #f26475 50%, #ffc6cd 50%);
      background-size: 200% 100%;
      background-position: right bottom;
      /* transition: all 0.5s ease-out; */
      color: white;
      border-radius: 20px;
      padding: 10px 40px;
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
      <StyledButton onClick={(e) => handleClick(e)}>
        <table className="pollbutton-text">
          <tr className="pollbutton-table">
            <td className="pollbutton-icon">
              {props.votedThis ? (
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
                    fillRule="evenodd"
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
              {props.isOld
                ? votePercentage.toString() + '%'
                : props.hasVoted
                ? votePercentage.toString() + '%'
                : ''}
            </td>
          </tr>
        </table>
      </StyledButton>
    </>
  );
}

export default PollButton;
