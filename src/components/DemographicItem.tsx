import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import '../styles/DemographicItem.css';
import '../styles/global.css';

function DemographicItem(props: {
  firstAmount: number;
  secondAmount: number;
  thirdAmount: number;
  text: string;
}) {
  const voteTotal = props.firstAmount + props.secondAmount + props.thirdAmount;
  const firstVotePercentage: number = voteTotal
    ? Math.floor((props.firstAmount / voteTotal) * 100)
    : 0;
  const secondVotePercentage: number = voteTotal
    ? Math.floor((props.secondAmount / voteTotal) * 100)
    : 0;
  const thirdVotePercentage: number = voteTotal
    ? Math.floor((props.thirdAmount / voteTotal) * 100)
    : 0;

  const secondVotePercentageCSS: number = voteTotal
    ? Math.floor(((props.secondAmount + props.firstAmount) / voteTotal) * 100)
    : 0;

  // Calculates 100 - the percentage
  const cssFirstVotePercentage: string = firstVotePercentage.toString() + '%';
  const cssSecondVotePercentage: string =
    secondVotePercentageCSS.toString() + '%';

  //   let CSSKeyframes = keyframes`
  //         0% {
  //           background-position: 100 bottom;
  //         }
  //         100% {
  //           background-position: ${cssVotePercentage} bottom;
  //         }`;

  //   const animation = () =>
  //     css`
  //       ${CSSKeyframes} 1s ease-out 1 forwards;
  //     `;

  const DemographicButton = styled.div`
    background: linear-gradient(
      to right,
      ${voteTotal === 0
        ? `#ffc6cd 100%, #ffc6cd 100%`
        : `#f26475 ${cssFirstVotePercentage},
      #649df2 ${cssFirstVotePercentage},
      #649df2 ${cssSecondVotePercentage},
      grey ${cssSecondVotePercentage}`}
    );
    background-size: 100% 100%;
    background-position: right bottom;
    /* transition: all 0.5s ease-out; */
    color: white;
    border-radius: 20px;
    padding: 10px 40px;
    display: flex;
    flex-direction: column;
    border: none;
    margin-bottom: 15px;
    font-size: 30px;
    filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.25));
    outline: none;
  `;

  return (
    <div className="demographic-button-container">
      <DemographicButton className="demographic-text">
        {firstVotePercentage}%-{secondVotePercentage}%-{thirdVotePercentage}%
      </DemographicButton>
      <div className="demographic-button-caption">
        <i>
          Gender distribution for "{props.text}" in order of Female-Male-Other.
        </i>
      </div>
    </div>
  );
}

export default DemographicItem;
